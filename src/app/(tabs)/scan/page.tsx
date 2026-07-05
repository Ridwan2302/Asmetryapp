'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { OutlineButton, PrimaryButton } from '@/components/Button';
import { Screen } from '@/components/Screen';
import { METRIC_CONFIG } from '@/data/metricConfig';
import { getProgram } from '@/data/programs';
import { band, dateStr, gradeOf, noteFor, summaryFor } from '@/lib/calc';
import { AnalysisResult, analyzeFace, NoFaceDetectedError, preloadFaceModel } from '@/lib/faceAnalysis';
import { useAppStore } from '@/state/store';

const STAGES = ['DETECTING LANDMARKS', 'MAPPING SYMMETRY AXIS', 'MEASURING PROPORTIONS', 'SCORING FEATURES', 'COMPILING PROTOCOL'];

type Phase = 'idle' | 'camera' | 'scanning' | 'result' | 'error';

export default function ScanPage() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [cameraError, setCameraError] = useState(false);
  const [captureUrl, setCaptureUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    preloadFaceModel();
    return () => {
      stopCamera();
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, []);

  function stopCamera() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }

  function resetToIdle() {
    stopCamera();
    setPhase('idle');
    setCaptureUrl(null);
    setResult(null);
    setProgress(0);
    setStageIdx(0);
    setCameraError(false);
  }

  async function handleBeginLiveScan() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      streamRef.current = stream;
      setCameraError(false);
      setPhase('camera');
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
      });
    } catch {
      setCameraError(true);
      setPhase('camera');
    }
  }

  function handleCapture() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !video.videoWidth) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(video, 0, 0);
    stopCamera();
    const url = canvas.toDataURL('image/jpeg', 0.85);
    runAnalysis(canvas, url);
  }

  function handleUploadPhoto() {
    fileRef.current?.click();
  }

  function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      const url = canvas.toDataURL('image/jpeg', 0.85);
      runAnalysis(canvas, url);
    };
    img.src = URL.createObjectURL(file);
  }

  function runAnalysis(canvas: HTMLCanvasElement, url: string) {
    setCaptureUrl(url);
    setPhase('scanning');
    setProgress(0);
    setStageIdx(0);

    let p = 0;
    progressTimer.current = setInterval(() => {
      p = Math.min(92, p + 4 + Math.floor(Math.random() * 5));
      setProgress(p);
      setStageIdx(Math.min(STAGES.length - 1, Math.floor(p / 20)));
    }, 160);

    analyzeFace(canvas, canvas.width, canvas.height)
      .then((res) => {
        if (progressTimer.current) clearInterval(progressTimer.current);
        setProgress(100);
        setResult(res);
        setPhase('result');
      })
      .catch((err) => {
        if (progressTimer.current) clearInterval(progressTimer.current);
        setErrorMsg(
          err instanceof NoFaceDetectedError
            ? err.message
            : 'Something went wrong analyzing that photo. Please try again with clearer, even lighting.'
        );
        setPhase('error');
      });
  }

  if (phase === 'result' && result) {
    return <ResultView captureUrl={captureUrl} result={result} onDone={resetToIdle} />;
  }

  return (
    <Screen>
      <div className="font-ui text-[11px] tracking-[3px] text-soft">MODULE 01</div>
      <div className="mt-1 mb-[22px] font-display text-[34px] text-ink">Facial Scan</div>

      <div className="relative h-[400px] w-full overflow-hidden rounded-[24px] bg-ink">
        {phase === 'camera' && !cameraError && (
          <video ref={videoRef} muted playsInline className="absolute inset-0 h-full w-full object-cover [transform:scaleX(-1)]" />
        )}

        {(phase === 'idle' || (phase === 'camera' && cameraError)) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-[14px]">
            {!cameraError ? (
              <>
                <div className="h-[150px] w-[120px] rounded-[70px_70px_60px_60px] border border-[rgba(244,242,237,0.3)]" />
                <div className="text-center font-ui text-[10px] tracking-[2px] text-[rgba(244,242,237,0.6)]">
                  POSITION FACE
                  <br />
                  WITHIN THE OUTLINE
                </div>
              </>
            ) : (
              <>
                <div className="font-ui text-[10px] tracking-[1px] text-[rgba(244,242,237,0.7)]">CAMERA UNAVAILABLE</div>
                <div className="font-display text-[20px] text-paper">Upload a photo instead</div>
              </>
            )}
          </div>
        )}

        {phase === 'scanning' && (
          <div className="absolute inset-0">
            {captureUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={captureUrl} alt="" className="absolute inset-0 h-full w-full object-cover [transform:scaleX(-1)]" />
            )}
            <div className="absolute top-5 right-[18px] left-[18px] h-[2px] animate-[scanline_1.6s_ease-in-out_infinite_alternate] bg-gradient-to-r from-transparent via-paper to-transparent shadow-[0_0_14px_#F4F2ED]" />
            <div className="absolute right-5 bottom-5 left-5">
              <div className="flex justify-between font-ui text-[10px] tracking-[1px] text-paper">
                <span>ANALYZING</span>
                <span>{progress}%</span>
              </div>
              <div className="mt-[6px] font-ui text-[10px] text-[rgba(244,242,237,0.7)]">{STAGES[stageIdx]}_</div>
            </div>
          </div>
        )}

        {phase === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-[10px] px-[30px] text-center">
            <div className="font-ui text-[10px] tracking-[1px] text-[rgba(244,242,237,0.7)]">ANALYSIS FAILED</div>
            <div className="font-display text-[20px] text-paper">{errorMsg}</div>
          </div>
        )}

        <Corner className="top-[18px] left-[18px] border-t-[1.5px] border-l-[1.5px]" />
        <Corner className="top-[18px] right-[18px] border-t-[1.5px] border-r-[1.5px]" />
        <Corner className="bottom-[18px] left-[18px] border-b-[1.5px] border-l-[1.5px]" />
        <Corner className="right-[18px] bottom-[18px] border-r-[1.5px] border-b-[1.5px]" />
      </div>

      {(phase === 'idle' || phase === 'error') && (
        <>
          <div className="mt-5 flex flex-col gap-[10px]">
            <PrimaryButton label="BEGIN LIVE SCAN" onClick={handleBeginLiveScan} />
            <OutlineButton label="UPLOAD PHOTO" onClick={handleUploadPhoto} />
          </div>
          <div className="mt-5">
            <Requirement label="NEUTRAL EXPRESSION" value="REQUIRED" />
            <Requirement label="EVEN FRONTAL LIGHT" value="REQUIRED" />
            <Requirement label="HAIR OFF FOREHEAD" value="ADVISED" last />
          </div>
        </>
      )}

      {phase === 'camera' && !cameraError && (
        <div className="mt-5 flex items-center justify-center gap-6">
          <button onClick={resetToIdle} className="font-ui text-[10px] tracking-[1px] text-soft">
            CANCEL
          </button>
          <button onClick={handleCapture} className="flex h-[70px] w-[70px] items-center justify-center rounded-full border-2 border-ink">
            <div className="h-[56px] w-[56px] rounded-full bg-ink" />
          </button>
          <span className="w-[52px]" />
        </div>
      )}
      {phase === 'camera' && cameraError && (
        <div className="mt-5">
          <OutlineButton label="UPLOAD PHOTO" onClick={handleUploadPhoto} />
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
      <input ref={fileRef} type="file" accept="image/*" capture="user" className="hidden" onChange={handleFileSelected} />
    </Screen>
  );
}

function Corner({ className }: { className: string }) {
  return <div className={`absolute h-[26px] w-[26px] border-paper ${className}`} />;
}

function Requirement({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`flex justify-between py-1 ${!last ? 'border-b border-border-soft' : ''}`}>
      <span className="font-ui text-[10px] tracking-[0.5px] text-soft">{label}</span>
      <span className="font-ui text-[10px] tracking-[0.5px] text-soft">{value}</span>
    </div>
  );
}

function ResultView({ captureUrl, result, onDone }: { captureUrl: string | null; result: AnalysisResult; onDone: () => void }) {
  const router = useRouter();
  const addScan = useAppStore((s) => s.addScan);
  const started = useAppStore((s) => s.started);
  const toggleProgram = useAppStore((s) => s.toggleProgram);

  const sorted = [...METRIC_CONFIG].sort((a, b) => result.metrics[a.key] - result.metrics[b.key]);
  const seenPrograms = new Set<string>();
  const picks = [];
  for (const m of sorted) {
    if (!seenPrograms.has(m.programId)) {
      seenPrograms.add(m.programId);
      picks.push(m);
    }
    if (picks.length >= 3) break;
  }

  function handleSave() {
    addScan({
      id: `${Date.now()}`,
      date: dateStr(),
      title: 'New Scan',
      overall: result.overall,
      thumb: captureUrl,
      m: result.metrics,
    });
    onDone();
    router.push('/progress');
  }

  return (
    <Screen>
      <div className="font-ui text-[11px] tracking-[3px] text-soft">ANALYSIS COMPLETE · {dateStr()}</div>
      <div className="my-[6px] mb-[22px] flex items-end justify-between">
        <div className="font-display text-[34px] leading-none text-ink">Your Results</div>
        <div className="text-right">
          <div className="font-display text-[54px] leading-[0.8] text-ink">{result.overall}</div>
          <div className="font-ui text-[9px] tracking-[1px] text-soft">{gradeOf(result.overall)}</div>
        </div>
      </div>

      <div className="mb-6 flex gap-3">
        {captureUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={captureUrl} alt="" className="h-[120px] w-[96px] rounded-[14px] border border-border object-cover [transform:scaleX(-1)]" />
        )}
        <div className="flex-1 font-display text-[19px] leading-[1.35] text-[#3B352D]">{summaryFor(result.overall)}</div>
      </div>

      {METRIC_CONFIG.map((m) => {
        const value = result.metrics[m.key];
        return (
          <div key={m.key} className="border-t border-border py-[14px]">
            <div className="flex items-baseline justify-between">
              <span className="font-ui text-[11px] tracking-[1.5px] text-ink">{m.label}</span>
              <span>
                <span className="font-display text-[26px] text-ink">{value}</span>
                <span className="font-ui text-[10px] text-soft"> {band(value)}</span>
              </span>
            </div>
            <div className="my-[8px] h-[2px] bg-border-soft">
              <div className="h-full bg-accent" style={{ width: `${value}%` }} />
            </div>
            <div className="font-ui text-[9.5px] leading-[1.5] text-soft">{noteFor(value, m.notes)}</div>
          </div>
        );
      })}

      <div className="mt-[26px] mb-3 font-ui text-[11px] tracking-[2px] text-ink">RECOMMENDED PROGRAMS</div>
      {picks.map((m) => {
        const program = getProgram(m.programId);
        if (!program) return null;
        const isActive = started.some((s) => s.id === m.programId);
        return (
          <div key={m.programId} className="mb-[10px] flex items-center justify-between rounded-2xl border border-border bg-card p-[14px] px-4">
            <div>
              <div className="font-display text-[20px] text-ink">{program.name}</div>
              <div className="mt-[2px] font-ui text-[9px] tracking-[1px] text-soft">
                {m.label} · {result.metrics[m.key]}
              </div>
            </div>
            <button
              onClick={() => toggleProgram(m.programId)}
              className={`rounded-full border border-border-strong px-[14px] py-[7px] font-ui text-[10px] tracking-[1px] ${
                isActive ? 'bg-accent text-paper' : 'bg-transparent text-accent'
              }`}
            >
              {isActive ? 'ADDED' : 'ADD'}
            </button>
          </div>
        );
      })}

      <PrimaryButton label="SAVE TO PROGRESS →" onClick={handleSave} className="mt-4" />
    </Screen>
  );
}
