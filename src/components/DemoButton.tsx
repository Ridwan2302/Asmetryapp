'use client';

import { useEffect, useState } from 'react';
import { DiagramIcon } from '@/components/DiagramIcon';
import { formatCountdown, formatDuration, findDemoEntry, guideDurationSeconds } from '@/lib/demoVideos';
import { tapHaptic } from '@/lib/haptics';
import { useT } from '@/lib/i18n';
import { useSpeak } from '@/lib/voice';
import { useAppStore } from '@/state/store';

interface TimerState {
  stepIdx: number;
  remaining: number;
}

/** "Demo" chip next to a task — opens a scrollable modal with a detailed step-by-step guide for
 * the task: a clear title, exactly how to do it (with a duration and a diagram per step), the
 * single biggest benefit, and a real countdown timer that walks through the steps. No video, no
 * external link — self-contained. Renders nothing when no guide is curated for that task. */
export function DemoButton({ taskEn }: { taskEn: string }) {
  const t = useT();
  const language = useAppStore((s) => s.language);
  const [open, setOpen] = useState(false);
  const entry = findDemoEntry(taskEn);

  if (!entry) return null;

  const guide = language === 'fr' ? entry.guide.fr : entry.guide.en;
  const totalSeconds = guideDurationSeconds(guide);

  function handleOpen(e: React.MouseEvent) {
    e.stopPropagation();
    setOpen(true);
  }

  return (
    <>
      <button onClick={handleOpen} className="press shrink-0 rounded-full bg-fill px-2 py-[3px] text-[10px] font-medium text-soft">
        {t('demo')} · {formatDuration(totalSeconds)}
      </button>

      {open && <GuideModal taskEn={taskEn} title={guide.title} steps={guide.steps} benefits={guide.benefits} onClose={() => setOpen(false)} />}
    </>
  );
}

function GuideModal({
  taskEn,
  title,
  steps,
  benefits,
  onClose,
}: {
  taskEn: string;
  title: string;
  steps: { text: string; seconds: number; diagram: import('@/lib/demoVideos').DiagramKind }[];
  benefits: string[];
  onClose: () => void;
}) {
  const t = useT();
  const speak = useSpeak();
  const [running, setRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [timer, setTimer] = useState<TimerState>({ stepIdx: 0, remaining: steps[0]?.seconds ?? 0 });

  // Countdown tick, one per second while running.
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setTimer((prev) => {
        if (prev.remaining > 1) return { ...prev, remaining: prev.remaining - 1 };
        const nextIdx = prev.stepIdx + 1;
        if (nextIdx >= steps.length) {
          setRunning(false);
          setDone(true);
          tapHaptic();
          return { ...prev, remaining: 0 };
        }
        tapHaptic();
        return { stepIdx: nextIdx, remaining: steps[nextIdx].seconds };
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, steps]);

  // Narrate the current step out loud (gated by the voice-guide setting) as the timer runs.
  useEffect(() => {
    if (!running) return;
    speak(steps[timer.stepIdx]?.text ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, timer.stepIdx]);

  function handleStartPause(e: React.MouseEvent) {
    e.stopPropagation();
    tapHaptic();
    if (done) {
      setDone(false);
      setTimer({ stepIdx: 0, remaining: steps[0]?.seconds ?? 0 });
      setRunning(true);
      return;
    }
    setHasStarted(true);
    setRunning((r) => !r);
  }

  function handleReset(e: React.MouseEvent) {
    e.stopPropagation();
    tapHaptic();
    setRunning(false);
    setHasStarted(false);
    setDone(false);
    setTimer({ stepIdx: 0, remaining: steps[0]?.seconds ?? 0 });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-6"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div
        className="flex max-h-[85vh] w-full max-w-[360px] flex-col overflow-hidden rounded-[20px] bg-[#0a0a0c] shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 py-2 pr-2 pl-3.5">
          <span className="truncate text-[12px] font-medium text-white/70">{taskEn}</span>
          <button
            onClick={onClose}
            aria-label={t('dismiss')}
            className="press flex h-6 w-6 shrink-0 items-center justify-center text-[18px] leading-none text-white/70"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto p-4">
          <div className="text-[16px] font-bold leading-[1.25] text-white">{title}</div>

          <div className="mt-4 flex items-center justify-between rounded-[16px] bg-white/[0.06] p-3.5">
            <div>
              <div className="text-[11px] font-semibold tracking-[0.3px] text-white/50 uppercase">
                {done ? t('timer_done') : `${t('guide_step_label')} ${timer.stepIdx + 1}/${steps.length}`}
              </div>
              <div className="mt-0.5 text-[26px] font-bold tabular-nums leading-none text-white">{done ? '✓' : formatCountdown(timer.remaining)}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleReset}
                aria-label={t('timer_reset')}
                className="press flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70"
              >
                <ResetIcon />
              </button>
              <button
                onClick={handleStartPause}
                className="press flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white"
                aria-label={running ? t('timer_pause') : done || !hasStarted ? t('timer_start') : t('timer_resume')}
              >
                {running ? <PauseIcon /> : <PlayIcon />}
              </button>
            </div>
          </div>

          <div className="mt-4 text-[11px] font-semibold tracking-[0.3px] text-white/50 uppercase">{t('how_to_title')}</div>
          <ol className="mt-2 space-y-2">
            {steps.map((step, i) => {
              const active = running && i === timer.stepIdx;
              return (
                <li
                  key={i}
                  className={`flex items-center gap-2.5 rounded-[14px] p-2 text-[14px] leading-[1.5] transition-colors ${
                    active ? 'bg-accent/15 text-white' : 'text-white/90'
                  }`}
                >
                  <span
                    className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full ${
                      active ? 'bg-accent text-white' : 'bg-white/10 text-white/70'
                    }`}
                  >
                    <DiagramIcon kind={step.diagram} className="h-[16px] w-[16px]" />
                  </span>
                  <span className="flex-1">{step.text}</span>
                  <span className="shrink-0 text-[11px] font-medium text-white/40">{formatDuration(step.seconds)}</span>
                </li>
              );
            })}
          </ol>

          <div className="mt-5 text-[11px] font-semibold tracking-[0.3px] text-white/50 uppercase">{t('guide_benefits_title')}</div>
          <ul className="mt-2 space-y-1.5">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex gap-2 text-[14px] leading-[1.5] text-white/90">
                <span className="mt-[7px] h-[4px] w-[4px] shrink-0 rounded-full bg-accent" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="5" width="4" height="14" />
      <rect x="14" y="5" width="4" height="14" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10a8 8 0 1 1 2.3 5.7" />
      <path d="M4 4v6h6" />
    </svg>
  );
}
