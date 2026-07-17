'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { OutlineButton, PrimaryButton } from '@/components/Button';
import { Screen } from '@/components/Screen';
import { METRIC_CONFIG, MetricConfig } from '@/data/metricConfig';
import { getProgram, localizeProgram } from '@/data/programs';
import { dateStr } from '@/lib/calc';
import { AnalysisResult, analyzeFace, NoFaceDetectedError, preloadFaceModel } from '@/lib/faceAnalysis';
import { Translator, useT } from '@/lib/i18n';
import { useAppStore } from '@/state/store';

type StageKey = 'stage_landmarks' | 'stage_symmetry' | 'stage_proportions' | 'stage_scoring' | 'stage_compiling';
const STAGE_KEYS: StageKey[] = ['stage_landmarks', 'stage_symmetry', 'stage_proportions', 'stage_scoring', 'stage_compiling'];

/** The real analysis usually finishes in well under a second — that reads as fake/broken, so we
 * hold the scanning UI open for at least this long to make the scan feel substantial. */
const MIN_SCAN_MS = 6000;
const MIN_ERROR_MS = 1500;

type Phase = 'idle' | 'camera' | 'scanning' | 'result' | 'error';

export default function ScanPage() {
  const t = useT();
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
    streamRef.current?.getTracks().forEach((track) => track.stop());
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

    const start = Date.now();
    progressTimer.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(97, Math.round((elapsed / MIN_SCAN_MS) * 100));
      setProgress(pct);
      setStageIdx(Math.min(STAGE_KEYS.length - 1, Math.floor((elapsed / MIN_SCAN_MS) * STAGE_KEYS.length)));
    }, 80);

    analyzeFace(canvas, canvas.width, canvas.height)
      .then(async (res) => {
        const elapsed = Date.now() - start;
        if (elapsed < MIN_SCAN_MS) await sleep(MIN_SCAN_MS - elapsed);
        if (progressTimer.current) clearInterval(progressTimer.current);
        setProgress(100);
        await sleep(250);
        setResult(res);
        setPhase('result');
      })
      .catch(async (err) => {
        const elapsed = Date.now() - start;
        if (elapsed < MIN_ERROR_MS) await sleep(MIN_ERROR_MS - elapsed);
        if (progressTimer.current) clearInterval(progressTimer.current);
        setErrorMsg(err instanceof NoFaceDetectedError ? err.message : t('error_generic'));
        setPhase('error');
      });
  }

  if (phase === 'result' && result) {
    return <ResultView captureUrl={captureUrl} result={result} onDone={resetToIdle} t={t} />;
  }

  return (
    <Screen>
      <div className="mb-6 text-[28px] font-bold tracking-[-0.4px] text-ink">{t('facial_scan_title')}</div>

      <div
        className="relative h-[420px] w-full overflow-hidden rounded-[28px] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.12)]"
        style={{
          background:
            'radial-gradient(140% 100% at 50% -10%, rgba(10,132,255,0.55), transparent 62%), radial-gradient(120% 90% at 50% 115%, rgba(10,132,255,0.32), transparent 62%), radial-gradient(90% 70% at 50% 50%, rgba(56,189,248,0.12), transparent 70%), #0a0d12',
        }}
      >
        {phase === 'camera' && !cameraError && (
          <video ref={videoRef} muted playsInline className="absolute inset-0 h-full w-full object-cover [transform:scaleX(-1)]" />
        )}

        {(phase === 'idle' || (phase === 'camera' && cameraError)) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            {!cameraError ? (
              <>
                <div className="h-[160px] w-[128px] rounded-[74px_74px_64px_64px] border-2 border-dashed border-white/25" />
                <div className="text-center text-[14px] font-medium text-white/50">{t('position_face')}</div>
              </>
            ) : (
              <>
                <div className="text-[13px] font-medium text-white/50">{t('camera_unavailable')}</div>
                <div className="text-[20px] font-bold text-white">{t('upload_instead')}</div>
              </>
            )}
          </div>
        )}

        {phase === 'scanning' && (
          <div className="absolute inset-0">
            {captureUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={captureUrl} alt="" className="absolute inset-0 h-full w-full object-cover [transform:scaleX(-1)] brightness-[0.85]" />
            )}
            <div
              className="pointer-events-none absolute inset-0 animate-[scan-mesh-pulse_2.2s_ease-in-out_infinite]"
              style={{ backgroundImage: 'linear-gradient(rgba(10,132,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(10,132,255,0.16) 1px, transparent 1px)', backgroundSize: '18px 18px' }}
            />
            <div className="pointer-events-none absolute top-0 right-0 left-0 h-[110px] animate-[scanline_2.4s_linear_infinite] bg-gradient-to-b from-transparent via-[#0A84FF] to-transparent opacity-90 shadow-[0_0_24px_6px_rgba(10,132,255,0.6)]" />
            <div className="absolute right-5 bottom-5 left-5">
              <div className="mb-2 h-1 overflow-hidden rounded-full bg-white/15">
                <div className="h-full rounded-full bg-[#0A84FF] transition-[width] duration-150" style={{ width: `${progress}%` }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-white">{t(STAGE_KEYS[stageIdx])}…</span>
                <span className="text-[13px] font-bold text-white">{progress}%</span>
              </div>
            </div>
          </div>
        )}

        {phase === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-8 text-center">
            <div className="text-[13px] font-medium text-white/50">{t('analysis_failed')}</div>
            <div className="text-[18px] font-semibold text-white">{errorMsg}</div>
          </div>
        )}

        <Corner className="top-4 left-4 border-t-2 border-l-2" />
        <Corner className="top-4 right-4 border-t-2 border-r-2" />
        <Corner className="bottom-4 left-4 border-b-2 border-l-2" />
        <Corner className="right-4 bottom-4 border-r-2 border-b-2" />
      </div>

      {(phase === 'idle' || phase === 'error') && (
        <>
          <div className="mt-5 flex flex-col gap-2.5">
            <PrimaryButton label={t('begin_live_scan')} onClick={handleBeginLiveScan} />
            <OutlineButton label={t('upload_photo')} onClick={handleUploadPhoto} />
          </div>
          <div className="mt-6 space-y-0.5">
            <Requirement label={t('req_neutral_expr')} value={t('req_required')} />
            <Requirement label={t('req_even_light')} value={t('req_required')} />
            <Requirement label={t('req_hair')} value={t('req_advised')} last />
          </div>
        </>
      )}

      {phase === 'camera' && !cameraError && (
        <div className="mt-6 flex items-center justify-center gap-8">
          <button onClick={resetToIdle} className="text-[15px] font-medium text-soft">
            {t('cancel')}
          </button>
          <button onClick={handleCapture} className="press flex h-[76px] w-[76px] items-center justify-center rounded-full border-[3px] border-ink">
            <div className="h-[60px] w-[60px] rounded-full bg-ink" />
          </button>
          <span className="w-[52px]" />
        </div>
      )}
      {phase === 'camera' && cameraError && (
        <div className="mt-5">
          <OutlineButton label={t('upload_photo')} onClick={handleUploadPhoto} />
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
      {/* No `capture` attribute: this should open the photo gallery/library, not jump straight to the camera. */}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelected} />
    </Screen>
  );
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function Corner({ className }: { className: string }) {
  return <div className={`absolute h-6 w-6 border-white/70 ${className}`} />;
}

function Requirement({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`flex justify-between py-2 ${!last ? 'border-b border-border' : ''}`}>
      <span className="text-[14px] text-soft">{label}</span>
      <span className="text-[14px] font-medium text-ink">{value}</span>
    </div>
  );
}

function ResultView({ captureUrl, result, onDone, t }: { captureUrl: string | null; result: AnalysisResult; onDone: () => void; t: Translator }) {
  const router = useRouter();
  const addScan = useAppStore((s) => s.addScan);
  const scans = useAppStore((s) => s.scans);
  const setProfilePic = useAppStore((s) => s.setProfilePic);
  const started = useAppStore((s) => s.started);
  const toggleProgram = useAppStore((s) => s.toggleProgram);
  const language = useAppStore((s) => s.language);
  const setTheme = useAppStore((s) => s.setTheme);

  const sorted = [...METRIC_CONFIG].sort((a, b) => result.metrics[a.key] - result.metrics[b.key]);
  const seenPrograms = new Set<string>();
  const picks: MetricConfig[] = [];
  for (const m of sorted) {
    if (!seenPrograms.has(m.programId)) {
      seenPrograms.add(m.programId);
      picks.push(m);
    }
    if (picks.length >= 3) break;
  }

  useEffect(() => {
    const isFirstScan = scans.length === 0;
    addScan({
      id: `${Date.now()}`,
      date: dateStr(),
      title: t('new_scan_title'),
      overall: result.overall,
      thumb: captureUrl,
      m: result.metrics,
    });
    if (isFirstScan && captureUrl) {
      setProfilePic(captureUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleStartProgram() {
    const top = picks[0];
    if (top && !started.some((s) => s.id === top.programId)) {
      toggleProgram(top.programId);
    }
    onDone();
    router.push('/home');
    setTimeout(() => setTheme('dark'), 3000);
  }

  return (
    <Screen>
      <div className="mb-8 text-[13px] font-medium text-soft">
        {t('analysis_complete')} · {dateStr()}
      </div>

      <div className="relative">
        <div className="relative z-10 flex justify-center">
          <div className="h-[128px] w-[128px] overflow-hidden rounded-full ring-[5px] ring-paper">
            {captureUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={captureUrl} alt="" className="h-full w-full object-cover [transform:scaleX(-1)]" />
            ) : (
              <div className="h-full w-full bg-fill" />
            )}
          </div>
        </div>
        <div className="-mt-16 rounded-[28px] bg-[#111113] px-5 pt-20 pb-7">
          <div className="grid grid-cols-2 gap-x-5 gap-y-7">
            <MetricTile label={t('overall')} value={result.overall} />
            {METRIC_CONFIG.map((m) => (
              <MetricTile key={m.key} label={t(m.labelKey)} value={result.metrics[m.key]} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-7 mb-3 text-[13px] font-semibold tracking-[0.3px] text-soft uppercase">{t('recommended_programs')}</div>
      {picks.map((m) => {
        const program = getProgram(m.programId);
        if (!program) return null;
        const isActive = started.some((s) => s.id === m.programId);
        const copy = localizeProgram(program, language);
        return (
          <div key={m.programId} className="mb-2.5 flex items-center justify-between rounded-2xl bg-card p-3.5 px-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
            <div>
              <div className="text-[17px] font-semibold text-ink">{copy.name}</div>
              <div className="mt-0.5 text-[13px] text-soft">
                {t(m.labelKey)} · {result.metrics[m.key]}
              </div>
            </div>
            <button
              onClick={() => toggleProgram(m.programId)}
              className={`press rounded-full px-4 py-2 text-[13px] font-semibold ${isActive ? 'bg-accent text-white' : 'bg-accent/10 text-accent'}`}
            >
              {isActive ? t('added') : t('add')}
            </button>
          </div>
        );
      })}

      <PrimaryButton label={t('start_program')} onClick={handleStartProgram} className="mt-4" />
    </Screen>
  );
}

function MetricTile({ label, value }: { label: string; value: number }) {
  const barColor = value >= 80 ? '#34d399' : value >= 65 ? '#a3e635' : '#f59e0b';
  return (
    <div>
      <div className="text-[12px] leading-[1.3] font-bold tracking-[0.2px] text-white/80">{label}</div>
      <div className="mt-1 text-[32px] leading-none font-bold text-white">{value}</div>
      <div className="mt-2.5 h-[6px] overflow-hidden rounded-full bg-white/15">
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: barColor }} />
      </div>
    </div>
  );
}
