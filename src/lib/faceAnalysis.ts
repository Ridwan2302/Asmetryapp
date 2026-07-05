import FaceDetection, { Contour, Landmark, Point } from '@react-native-ml-kit/face-detection';
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import type { ScanMetrics } from '../state/types';
import { luminanceStats, decodePng } from './pngPixels';

export interface AnalysisResult {
  metrics: ScanMetrics;
  overall: number;
}

/** No face found, or detection genuinely failed — caller should ask the user to retake the photo. */
export class NoFaceDetectedError extends Error {}

const clamp = (v: number, min = 50, max = 96) => Math.max(min, Math.min(max, v));
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/**
 * Derives the seven facial-harmony metrics from real ML Kit face-landmark/contour geometry
 * (frontal-photo proxies — see per-metric comments), plus a genuine pixel-texture read of the
 * cheek skin for the skin-clarity score. Only the overall weighting formula (symmetry weighted
 * 1.3x) is carried over verbatim from the design's mocked prototype; everything feeding it here
 * is computed from the actual captured photo.
 */
export async function analyzeFace(imageUri: string, imageWidth: number, imageHeight: number): Promise<AnalysisResult> {
  const faces = await FaceDetection.detect(imageUri, {
    performanceMode: 'accurate',
    landmarkMode: 'all',
    contourMode: 'all',
    classificationMode: 'none',
  });

  if (!faces.length) throw new NoFaceDetectedError('No face detected in the captured photo.');
  const face = faces[0];
  const landmarks = face.landmarks;
  const contours = face.contours;
  const faceContour = contours?.face?.points;

  if (!landmarks || !faceContour || faceContour.length < 8) {
    throw new NoFaceDetectedError('Face was detected but landmarks were incomplete — retake with more even lighting.');
  }

  const mid = (landmarks.leftEye.position.x + landmarks.rightEye.position.x) / 2;
  const faceTop = Math.min(...faceContour.map((p) => p.y));
  const faceBottom = Math.max(...faceContour.map((p) => p.y));
  const faceHeight = Math.max(1, faceBottom - faceTop);

  const widthAtFraction = (fraction: number): number => {
    const targetY = faceTop + fraction * faceHeight;
    let band = 0.05;
    let pts: Point[] = [];
    while (pts.length < 2 && band < 0.4) {
      pts = faceContour.filter((p) => Math.abs(p.y - targetY) < band * faceHeight);
      band += 0.05;
    }
    if (pts.length < 2) return faceBottom - faceTop; // degenerate fallback
    const xs = pts.map((p) => p.x);
    return Math.max(...xs) - Math.min(...xs);
  };

  const sym = symmetryScore(landmarks, mid, faceHeight);
  const jaw = jawlineScore(widthAtFraction);
  const canthal = canthalTiltScore(contours?.leftEye?.points, contours?.rightEye?.points, mid);
  const cheek = cheekboneScore(landmarks, faceTop, faceHeight, widthAtFraction);
  const eye = underEyeScore(contours?.leftEye?.points, contours?.rightEye?.points, landmarks);
  const prop = proportionScore(landmarks, contours, faceTop, faceBottom);
  const skin = await skinClarityScore(imageUri, landmarks, imageWidth, imageHeight);

  const metrics: ScanMetrics = { sym, jaw, canthal, cheek, eye, prop, skin };
  const overall = Math.round((sym * 1.3 + jaw + canthal + cheek + eye + prop + skin) / 7.3);

  return { metrics, overall };
}

/** Compares left/right landmark pairs against the eye-line midpoint — horizontal balance plus
 * a penalty for vertical (roll) misalignment between paired features. */
function symmetryScore(landmarks: Record<string, Landmark>, mid: number, faceHeight: number): number {
  const pairs: [string, string][] = [
    ['leftEye', 'rightEye'],
    ['leftCheek', 'rightCheek'],
    ['leftEar', 'rightEar'],
  ];
  const ratios: number[] = [];
  for (const [lKey, rKey] of pairs) {
    const l = landmarks[lKey]?.position;
    const r = landmarks[rKey]?.position;
    if (!l || !r) continue;
    const dl = mid - l.x;
    const dr = r.x - mid;
    if (dl <= 0 || dr <= 0) continue;
    const hSym = 1 - Math.abs(dl - dr) / Math.max(dl, dr);
    const vSym = clamp01(1 - (Math.abs(l.y - r.y) / faceHeight) * 4);
    ratios.push(hSym * 0.7 + vSym * 0.3);
  }
  const avg = ratios.length ? ratios.reduce((a, b) => a + b, 0) / ratios.length : 0.6;
  return Math.round(clamp(50 + clamp01(avg) * 46));
}

/** Taper from cheek-height width to near-chin width — a narrower jaw relative to the cheeks
 * reads as a sharper, more defined jawline in a frontal photo. */
function jawlineScore(widthAtFraction: (f: number) => number): number {
  const cheekWidth = widthAtFraction(0.38);
  const jawWidth = widthAtFraction(0.88);
  const taper = cheekWidth > 0 ? clamp01(1 - jawWidth / cheekWidth) : 0.15;
  return Math.round(clamp(50 + clamp01(taper / 0.35) * 46));
}

/** Eye-corner angle: outer corner higher than inner corner (in image space, smaller y) reads
 * as a positive ("hunter-eye") canthal tilt. */
function canthalTiltScore(left?: Contour['points'], right?: Contour['points'], mid?: number): number {
  if (!left?.length || !right?.length || mid == null) return 68;
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

/** How close each cheek landmark sits to the face's outer contour at that height — cheekbones
 * that push out toward the jawline's silhouette read as more prominent. */
function cheekboneScore(
  landmarks: Record<string, Landmark>,
  faceTop: number,
  faceHeight: number,
  widthAtFraction: (f: number) => number
): number {
  const l = landmarks.leftCheek?.position;
  const r = landmarks.rightCheek?.position;
  if (!l || !r) return 68;
  const cheekY = (l.y + r.y) / 2;
  const fraction = clamp01((cheekY - faceTop) / faceHeight);
  const halfWidth = widthAtFraction(fraction) / 2 || 1;
  const mid = (l.x + r.x) / 2;
  const avgDist = (Math.abs(mid - l.x) + Math.abs(r.x - mid)) / 2;
  const ratio = clamp01(avgDist / halfWidth);
  return Math.round(clamp(50 + ratio * 46));
}

/** Lower-eyelid contour bulge relative to eye width, as a puffiness proxy — the closest a
 * frontal-photo landmark set can get to "under-eye clarity" without a dedicated skin-tone read. */
function underEyeScore(left?: Contour['points'], right?: Contour['points'], landmarks?: Record<string, Landmark>): number {
  const scoreEye = (points?: Point[], eyeLandmark?: Point) => {
    if (!points?.length || !eyeLandmark) return null;
    const xs = points.map((p) => p.x);
    const eyeWidth = Math.max(...xs) - Math.min(...xs) || 1;
    const lowerBulge = Math.max(...points.map((p) => p.y)) - eyeLandmark.y;
    return clamp01(1 - (lowerBulge / eyeWidth) * 3);
  };
  const l = scoreEye(left, landmarks?.leftEye?.position);
  const r = scoreEye(right, landmarks?.rightEye?.position);
  const vals = [l, r].filter((v): v is number => v != null);
  const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0.55;
  return Math.round(clamp(50 + avg * 46));
}

/** Classic vertical-thirds balance: brow-to-nose-base and nose-base-to-chin against the face's
 * top-to-brow span. Equal thirds score highest. */
function proportionScore(
  landmarks: Record<string, Landmark>,
  contours: Record<string, Contour> | undefined,
  faceTop: number,
  faceBottom: number
): number {
  const browY =
    contours?.leftEyebrowTop?.points?.length && contours?.rightEyebrowTop?.points?.length
      ? (Math.min(...contours.leftEyebrowTop.points.map((p) => p.y)) + Math.min(...contours.rightEyebrowTop.points.map((p) => p.y))) / 2
      : faceTop + (faceBottom - faceTop) * 0.32;
  const noseY = landmarks.noseBase?.position?.y ?? faceTop + (faceBottom - faceTop) * 0.62;

  const third1 = browY - faceTop;
  const third2 = noseY - browY;
  const third3 = faceBottom - noseY;
  if (third1 <= 0 || third2 <= 0 || third3 <= 0) return 68;

  const avg = (third1 + third2 + third3) / 3;
  const deviation = (Math.abs(third1 - avg) + Math.abs(third2 - avg) + Math.abs(third3 - avg)) / (3 * avg);
  return Math.round(clamp(50 + clamp01(1 - deviation * 2.5) * 46));
}

/** Real per-pixel luminance variance of two cropped cheek patches — smoother, more even skin
 * texture reads as higher clarity. Falls back to a fixed midline score if the crop/decode
 * pipeline fails for any reason (unsupported PNG encoding, out-of-bounds crop, etc). */
async function skinClarityScore(uri: string, landmarks: Record<string, Landmark>, imageWidth: number, imageHeight: number): Promise<number> {
  try {
    const patchSize = Math.max(24, Math.min(80, Math.round(imageWidth * 0.08)));
    const points = [landmarks.leftCheek?.position, landmarks.rightCheek?.position].filter((p): p is Point => !!p);
    if (!points.length) return 70;

    const stdDevs: number[] = [];
    for (const p of points) {
      const originX = Math.max(0, Math.min(imageWidth - patchSize, Math.round(p.x - patchSize / 2)));
      const originY = Math.max(0, Math.min(imageHeight - patchSize, Math.round(p.y - patchSize / 2)));
      const rendered = await ImageManipulator.manipulate(uri).crop({ originX, originY, width: patchSize, height: patchSize }).renderAsync();
      const result = await rendered.saveAsync({ base64: true, format: SaveFormat.PNG, compress: 1 });
      if (!result.base64) continue;
      const png = decodePng(result.base64);
      const { stdDev } = luminanceStats(png);
      stdDevs.push(stdDev);
    }
    if (!stdDevs.length) return 70;
    const avgStdDev = stdDevs.reduce((a, b) => a + b, 0) / stdDevs.length;
    return Math.round(clamp(100 - avgStdDev * 1.6));
  } catch {
    return 70;
  }
}
