'use client';

import { useState, type ReactNode } from 'react';
import { findDemoEntry } from '@/lib/demoVideos';
import { Translator } from '@/lib/i18n';
import { OutlineButton, PrimaryButton } from '@/components/Button';
import { ProgressBar } from '@/components/ProgressBar';

/** A guided, one-step-at-a-time walk-through of today's tasks — the coach gives the next
 * instruction, the person acts on it, then asks for the next one. Replaces handing someone a
 * static checklist and leaving them to work out how to execute each line themselves. */
export function GuidedSession({
  programName,
  dayNum,
  weekFocus,
  weekWhy,
  welcomeBody,
  welcomeExtra,
  stepTopics,
  stepReasons,
  stepLocked,
  stepUnlockLabels,
  tasks,
  enTasks,
  checks,
  language,
  onStepDone,
  onFinish,
  onClose,
  t,
}: {
  programName: string;
  dayNum: number;
  weekFocus: string;
  weekWhy: string;
  /** Overrides the templated "day X of your {program} program" sentence — for callers (like the
   * merged daily plan) that aren't a single catalog program and need their own wording. */
  welcomeBody?: string;
  /** Extra content rendered on the welcome screen below the intro text, e.g. a list of what
   * today's session actually covers. */
  welcomeExtra?: ReactNode;
  /** Parallel to `tasks` — a short badge shown above each step (topic + when, e.g. "Sommeil · Matin"). */
  stepTopics?: ReactNode[];
  /** Parallel to `tasks` — a one-line reminder of the specific problem this step addresses. */
  stepReasons?: (string | null)[];
  /** Parallel to `tasks` — whether this step's time-of-day hasn't arrived yet. */
  stepLocked?: boolean[];
  /** Parallel to `tasks` — shown on the lock screen, e.g. "planned for evening, from 17h00". */
  stepUnlockLabels?: string[];
  tasks: string[];
  enTasks: string[];
  checks: Record<number, boolean>;
  language: 'en' | 'fr';
  onStepDone: (index: number) => void;
  onFinish: () => void;
  onClose: () => void;
  t: Translator;
}) {
  const firstUnfinished = tasks.findIndex((_, i) => !checks[i]);
  // -1 = welcome, 0..tasks.length-1 = a step, tasks.length = completion.
  const [screen, setScreen] = useState<number>(firstUnfinished === -1 ? tasks.length : -1);
  // Indices where the person chose "I'll do it now anyway" past a time-of-day lock.
  const [bypassed, setBypassed] = useState<Set<number>>(new Set());

  function goToFirstStep() {
    const next = tasks.findIndex((_, i) => !checks[i]);
    setScreen(next === -1 ? tasks.length : next);
  }

  function completeCurrentStep() {
    if (screen >= 0 && screen < tasks.length && !checks[screen]) onStepDone(screen);
    setScreen((s) => (typeof s === 'number' ? Math.min(tasks.length, s + 1) : s));
  }

  const isCurrentStepLocked = screen >= 0 && screen < tasks.length && !!stepLocked?.[screen] && !bypassed.has(screen);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-paper">
      <div className="flex items-center gap-3 px-5 pt-[calc(env(safe-area-inset-top)+16px)] pb-3">
        <button
          onClick={onClose}
          aria-label={t('dismiss')}
          className="press flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fill text-[15px] leading-none text-soft"
        >
          ×
        </button>
        {screen >= 0 && screen < tasks.length && <ProgressBar pct={((screen + 1) / tasks.length) * 100} className="flex-1" />}
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-2 pb-10">
        {screen === -1 && (
          <div className="flex min-h-full flex-col justify-center">
            <WelcomeScreen
              programName={programName}
              dayNum={dayNum}
              weekFocus={weekFocus}
              weekWhy={weekWhy}
              welcomeBody={welcomeBody}
              welcomeExtra={welcomeExtra}
              onNext={goToFirstStep}
              t={t}
            />
          </div>
        )}
        {screen >= 0 && screen < tasks.length && isCurrentStepLocked && (
          <LockedStepScreen
            badge={stepTopics?.[screen]}
            unlockLabel={stepUnlockLabels?.[screen]}
            onBack={screen > 0 ? () => setScreen((s) => (typeof s === 'number' ? s - 1 : s)) : undefined}
            onBypass={() => setBypassed((prev) => new Set(prev).add(screen))}
            t={t}
          />
        )}
        {screen >= 0 && screen < tasks.length && !isCurrentStepLocked && (
          <StepScreen
            index={screen}
            total={tasks.length}
            task={tasks[screen]}
            taskEn={enTasks[screen] ?? tasks[screen]}
            done={!!checks[screen]}
            language={language}
            topic={stepTopics?.[screen]}
            reason={stepReasons?.[screen]}
            onBack={screen > 0 ? () => setScreen((s) => (typeof s === 'number' ? s - 1 : s)) : undefined}
            onDone={completeCurrentStep}
            t={t}
          />
        )}
        {screen === tasks.length && (
          <div className="flex min-h-full flex-col justify-center">
            <CompleteScreen onFinish={onFinish} t={t} />
          </div>
        )}
      </div>
    </div>
  );
}

function WelcomeScreen({
  programName,
  dayNum,
  weekFocus,
  weekWhy,
  welcomeBody,
  welcomeExtra,
  onNext,
  t,
}: {
  programName: string;
  dayNum: number;
  weekFocus: string;
  weekWhy: string;
  welcomeBody?: string;
  welcomeExtra?: ReactNode;
  onNext: () => void;
  t: Translator;
}) {
  const body =
    welcomeBody ??
    t('guided_welcome_body_tpl').replace('{day}', String(dayNum)).replace('{program}', programName).replace('{focus}', weekFocus);
  return (
    <div className="text-center">
      <div className="mb-2 text-[12px] font-semibold tracking-[0.3px] text-soft uppercase">{t('guided_welcome_eyebrow')}</div>
      <h2 className="mb-4 text-[30px] leading-[1.1] font-bold tracking-[-0.4px] text-ink">{t('guided_welcome_title')}</h2>
      <p className="mx-auto max-w-[38ch] text-[16px] leading-[1.5] text-soft">{body}</p>
      <p className="mx-auto mt-3 max-w-[38ch] text-[14px] leading-[1.5] text-soft/80">{weekWhy}</p>
      {welcomeExtra}
      <PrimaryButton label={t('guided_start_cta')} onClick={onNext} className="mt-8" />
    </div>
  );
}

function StepScreen({
  index,
  total,
  task,
  taskEn,
  done,
  language,
  topic,
  reason,
  onBack,
  onDone,
  t,
}: {
  index: number;
  total: number;
  task: string;
  taskEn: string;
  done: boolean;
  language: 'en' | 'fr';
  topic?: ReactNode;
  reason?: string | null;
  onBack?: () => void;
  onDone: () => void;
  t: Translator;
}) {
  const entry = findDemoEntry(taskEn);
  const guide = entry ? (language === 'fr' ? entry.guide.fr : entry.guide.en) : null;

  return (
    <div>
      {topic && <div className="mb-2.5">{topic}</div>}
      <div className="mb-5 text-[13px] font-semibold tracking-[0.2px] text-accent">
        {t('guided_step_of_tpl').replace('{n}', String(index + 1)).replace('{total}', String(total))}
      </div>
      {reason && (
        <div className="mb-4 rounded-[14px] bg-fill px-3.5 py-2.5 text-[13px] leading-[1.4] text-ink/80">
          <span className="font-semibold text-ink">{t('guided_reason_prefix')}</span>
          {reason}
        </div>
      )}
      <div className="mb-1.5 text-[13px] font-medium text-soft">{t('guided_step_lead')}</div>
      <h2 className="mb-5 text-[24px] leading-[1.2] font-bold tracking-[-0.3px] text-ink">{guide?.title ?? task}</h2>

      {guide ? (
        <>
          <ol className="space-y-3">
            {guide.steps.map((step, i) => (
              <li key={i} className="flex gap-3 rounded-[16px] bg-card p-3.5 text-[15px] leading-[1.45] text-ink shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
                <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-fill text-[12px] font-bold text-ink">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          {guide.benefits.length > 0 && (
            <div className="mt-5 rounded-[16px] bg-fill p-3.5">
              <div className="mb-1.5 text-[11px] font-semibold tracking-[0.3px] text-soft uppercase">{t('guide_benefits_title')}</div>
              <ul className="space-y-1">
                {guide.benefits.map((b, i) => (
                  <li key={i} className="flex gap-2 text-[13px] leading-[1.45] text-ink/80">
                    <span className="mt-[7px] h-[4px] w-[4px] shrink-0 rounded-full bg-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <p className="rounded-[16px] bg-card p-4 text-[16px] leading-[1.5] text-ink shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">{task}</p>
      )}

      <div className="mt-8 flex gap-3">
        {onBack && <OutlineButton label={t('guided_back_cta')} onClick={onBack} className="!w-auto flex-1" />}
        <PrimaryButton label={done ? t('guided_next_cta') : t('guided_step_done_cta')} onClick={onDone} className="!w-auto flex-[2]" />
      </div>
    </div>
  );
}

function LockedStepScreen({
  badge,
  unlockLabel,
  onBack,
  onBypass,
  t,
}: {
  badge?: ReactNode;
  unlockLabel?: string;
  onBack?: () => void;
  onBypass: () => void;
  t: Translator;
}) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center text-center">
      {badge && <div className="mb-4">{badge}</div>}
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-fill text-soft">
        <LockIcon />
      </div>
      <h2 className="mb-2 text-[22px] font-bold text-ink">{t('guided_locked_title')}</h2>
      <p className="mx-auto max-w-[34ch] text-[14px] leading-[1.5] text-soft">{unlockLabel}</p>
      <button onClick={onBypass} className="press mt-6 text-[14px] font-semibold text-accent">
        {t('guided_locked_bypass')}
      </button>
      {onBack && (
        <button onClick={onBack} className="press mt-5 text-[13px] font-medium text-soft">
          {t('guided_back_cta')}
        </button>
      )}
    </div>
  );
}

function LockIcon() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x={5} y={11} width={14} height={9} rx={2} />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function CompleteScreen({ onFinish, t }: { onFinish: () => void; t: Translator }) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
        <CheckIcon />
      </div>
      <h2 className="mb-3 text-[26px] leading-[1.15] font-bold tracking-[-0.3px] text-ink">{t('guided_complete_title')}</h2>
      <p className="mx-auto max-w-[36ch] text-[15px] leading-[1.5] text-soft">{t('guided_complete_body')}</p>
      <PrimaryButton label={t('guided_finish_cta')} onClick={onFinish} className="mt-8" />
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={12} cy={12} r={9} />
      <path d="M8 12.5l2.5 2.5L16 9.5" />
    </svg>
  );
}
