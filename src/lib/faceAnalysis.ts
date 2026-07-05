import { FaceLandmarker, FilesetResolver, NormalizedLandmark } from '@mediapipe/tasks-vision';
import type { ScanMetrics } from '../state/types';

export interface AnalysisResult {
  metrics: ScanMetrics;
  overall: number;
}

export class NoFaceDetectedError extends Error {}

const MODEL_URL = 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';

let landmarkerPromise: Promise<FaceLandmarker> | null = null;

function getLandmarker(): Promise<FaceLandmarker> {
  if (!landmarkerPromise) {
    landmarkerPromise = FilesetResolver.forVisionTasks('/mediapipe/wasm').then((fileset) =>
      FaceLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: MODEL_URL, delegate: 'GPU' },
        runningMode: 'IMAGE',
        numFaces: 1,
        outputFaceBlendshapes: false,
        outputFacialTransformationMatrixes: false,
      })
    );
  }
  return landmarkerPromise;
}

/** Warms up the model in the background (call as soon as the Scan tab mounts, so the first
 * real scan doesn't pay the full WASM+model download cost after the user already captured a photo). */
export function preloadFaceModel() {
  getLandmarker().catch(() => {});
}

type Point = { x: number; y: number };

const clamp = (v: number, min = 50, max = 96) => Math.max(min, Math.min(max, v));
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

function uniqueIndices(connections: { start: number; end: number }[]): number[] {
  const set = new Set<number>();
  for (const c of connections) {
    set.add(c.start);
    set.add(c.end);
  }
  return [...set];
}

function toPixelPoints(indices: number[], landmarks: NormalizedLandmark[], width: number, height: number): Point[] {
  return indices.map((i) => ({ x: landmarks[i].x * width, y: landmarks[i].y * height }));
}

/**
 * Derives the seven facial-harmony metrics from a real MediaPipe FaceLandmarker mesh (468
 * points) run entirely in the browser — geometry proxies, not random numbers — plus a genuine
 * pixel-luminance-variance read of the cheek skin via Canvas for skin clarity.
 */
export async function analyzeFace(source: HTMLCanvasElement, width: number, height: number): Promise<AnalysisResult> {
  const landmarker = await getLandmarker();
  const result = landmarker.detect(source);

  if (!result.faceLandmarks.length) {
    throw new NoFaceDetectedError('No face detected in the captured photo.');
  }
  const mesh = result.faceLandmarks[0];

  const ovalPts = toPixelPoints(uniqueIndices(FaceLandmarker.FACE_LANDMARKS_FACE_OVAL), mesh, width, height);
  const leftEyePts = toPixelPoints(uniqueIndices(FaceLandmarker.FACE_LANDMARKS_LEFT_EYE), mesh, width, height);
  const rightEyePts = toPixelPoints(uniqueIndices(FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE), mesh, width, height);
  const leftBrowPts = toPixelPoints(uniqueIndices(FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW), mesh, width, height);
  const rightBrowPts = toPixelPoints(uniqueIndices(FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW), mesh, width, height);
  const noseTip = { x: mesh[1].x * width, y: mesh[1].y * height };

  const faceTop = Math.min(...ovalPts.map((p) => p.y));
  const faceBottom = Math.max(...ovalPts.map((p) => p.y));
  const faceHeight = Math.max(1, faceBottom - faceTop);

  const eyeCenter = (pts: Point[]): Point => ({
    x: pts.reduce((a, p) => a + p.x, 0) / pts.length,
    y: pts.reduce((a, p) => a + p.y, 0) / pts.length,
  });
  const leftEyeCenter = eyeCenter(leftEyePts);
  const rightEyeCenter = eyeCenter(rightEyePts);
  const mid = (leftEyeCenter.x + rightEyeCenter.x) / 2;

  const widthAtFraction = (fraction: number): number => {
    const targetY = faceTop + fraction * faceHeight;
    let band = 0.05;
    let pts: Point[] = [];
    while (pts.length < 2 && band < 0.4) {
      pts = ovalPts.filter((p) => Math.abs(p.y - targetY) < band * faceHeight);
      band += 0.05;
    }
    if (pts.length < 2) return faceBottom - faceTop;
    const xs = pts.map((p) => p.x);
    return Math.max(...xs) - Math.min(...xs);
  };

  const cheekPoint = (side: 'left' | 'right'): Point => {
    const band = ovalPts.filter((p) => {
      const f = (p.y - faceTop) / faceHeight;
      return f > 0.3 && f < 0.55;
    });
    const candidates = band.length ? band : ovalPts;
    const filtered = candidates.filter((p) => (side === 'left' ? p.x > mid : p.x < mid));
    const pool = filtered.length ? filtered : candidates;
    return pool.reduce((best, p) => (Math.abs(p.x - mid) > Math.abs(best.x - mid) ? p : best), pool[0]);
  };
  const leftCheek = cheekPoint('left');
  const rightCheek = cheekPoint('right');

  const sym = symmetryScore(leftEyeCenter, rightEyeCenter, leftCheek, rightCheek, mid, faceHeight);
  const jaw = jawlineScore(widthAtFraction);
  const canthal = canthalTiltScore(leftEyePts, rightEyePts, mid);
  const cheek = cheekboneScore(leftCheek, rightCheek, faceTop, faceHeight, mid, widthAtFraction);
  const eye = underEyeScore(leftEyePts, rightEyePts, leftEyeCenter, rightEyeCenter);
  const prop = proportionScore(leftBrowPts, rightBrowPts, noseTip, faceTop, faceBottom);
  const skin = skinClarityScore(source, leftCheek, rightCheek, width);

  const metrics: ScanMetrics = { sym, jaw, canthal, cheek, eye, prop, skin };
  const overall = Math.round((sym * 1.3 + jaw + canthal + cheek + eye + prop + skin) / 7.3);

  return { metrics, overall };
}

function symmetryScore(leftEye: Point, rightEye: Point, leftCheek: Point, rightCheek: Point, mid: number, faceHeight: number): number {
  const pairSym = (l: Point, r: Point) => {
    const dl = mid - l.x;
    const dr = r.x - mid;
    if (dl <= 0 || dr <= 0) return null;
    const hSym = 1 - Math.abs(dl - dr) / Math.max(dl, dr);
    const vSym = clamp01(1 - (Math.abs(l.y - r.y) / faceHeight) * 4);
    return hSym * 0.7 + vSym * 0.3;
  };
  const ratios = [pairSym(leftEye, rightEye), pairSym(leftCheek, rightCheek)].filter((v): v is number => v != null);
  const avg = ratios.length ? ratios.reduce((a, b) => a + b, 0) / ratios.length : 0.6;
  return Math.round(clamp(50 + clamp01(avg) * 46));
}

function jawlineScore(widthAtFraction: (f: number) => number): number {
  const cheekWidth = widthAtFraction(0.38);
  const jawWidth = widthAtFraction(0.88);
  const taper = cheekWidth > 0 ? clamp01(1 - jawWidth / cheekWidth) : 0.15;
  return Math.round(clamp(50 + clamp01(taper / 0.35) * 46));
}

function canthalTiltScore(left: Point[], right: Point[], mid: number): number {
  const tilt = (points: Point[]) => {
    let outer = points[0];
    let inner = points[0];
    for (const p of points) {
      if (Math.abs(p.x - mid) > Math.abs(outer.x - mid)) outer = p;
      if (Math.abs(p.x - mid) < Math.abs(inner.x - mid)) inner = p;
    }
    const dx = Math.abs(outer.x - inner.x) || 1;
    const dy = inner.y - outer.y;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  };
  const tiltDeg = (tilt(left) + tilt(right)) / 2;
  return Math.round(clamp(50 + (tiltDeg + 5) * 3.5));
}

function cheekboneScore(leftCheek: Point, rightCheek: Point, faceTop: number, faceHeight: number, mid: number, widthAtFraction: (f: number) => number): number {
  const cheekY = (leftCheek.y + rightCheek.y) / 2;
  const fraction = clamp01((cheekY - faceTop) / faceHeight);
  const halfWidth = widthAtFraction(fraction) / 2 || 1;
  const avgDist = (Math.abs(mid - leftCheek.x) + Math.abs(rightCheek.x - mid)) / 2;
  const ratio = clamp01(avgDist / halfWidth);
  return Math.round(clamp(50 + ratio * 46));
}

function underEyeScore(left: Point[], right: Point[], leftCenter: Point, rightCenter: Point): number {
  const bulge = (points: Point[], center: Point) => {
    const xs = points.map((p) => p.x);
    const eyeWidth = Math.max(...xs) - Math.min(...xs) || 1;
    const lowerBulge = Math.max(...points.map((p) => p.y)) - center.y;
    return clamp01(1 - (lowerBulge / eyeWidth) * 3);
  };
  const avg = (bulge(left, leftCenter) + bulge(right, rightCenter)) / 2;
  return Math.round(clamp(50 + avg * 46));
}

function proportionScore(leftBrow: Point[], rightBrow: Point[], noseTip: Point, faceTop: number, faceBottom: number): number {
  const browY = (Math.min(...leftBrow.map((p) => p.y)) + Math.min(...rightBrow.map((p) => p.y))) / 2;
  const third1 = browY - faceTop;
  const third2 = noseTip.y - browY;
  const third3 = faceBottom - noseTip.y;
  if (third1 <= 0 || third2 <= 0 || third3 <= 0) return 68;

  const avg = (third1 + third2 + third3) / 3;
  const deviation = (Math.abs(third1 - avg) + Math.abs(third2 - avg) + Math.abs(third3 - avg)) / (3 * avg);
  return Math.round(clamp(50 + clamp01(1 - deviation * 2.5) * 46));
}

/** Real per-pixel luminance variance of two cropped cheek patches, read straight off the
 * canvas via getImageData — smoother, more even skin texture reads as higher clarity. */
function skinClarityScore(source: HTMLCanvasElement, leftCheek: Point, rightCheek: Point, imageWidth: number): number {
  try {
    const ctx = source.getContext('2d');
    if (!ctx) return 70;
    const patchSize = Math.max(16, Math.min(64, Math.round(imageWidth * 0.08)));

    const stdDevs: number[] = [];
    for (const p of [leftCheek, rightCheek]) {
      const x = Math.max(0, Math.min(source.width - patchSize, Math.round(p.x - patchSize / 2)));
      const y = Math.max(0, Math.min(source.height - patchSize, Math.round(p.y - patchSize / 2)));
      const { data } = ctx.getImageData(x, y, patchSize, patchSize);
      const pixelCount = data.length / 4;
      const luminances = new Float64Array(pixelCount);
      let sum = 0;
      for (let i = 0, px = 0; i < data.length; i += 4, px++) {
        const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
        luminances[px] = lum;
        sum += lum;
      }
      const mean = sum / pixelCount;
      let variance = 0;
      for (let px = 0; px < pixelCount; px++) {
        const d = luminances[px] - mean;
        variance += d * d;
      }
      stdDevs.push(Math.sqrt(variance / pixelCount));
    }
    const avgStdDev = stdDevs.reduce((a, b) => a + b, 0) / stdDevs.length;
    return Math.round(clamp(100 - avgStdDev * 1.6));
  } catch {
    return 70;
  }
}
