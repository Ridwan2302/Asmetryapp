'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { ActiveProgramCard } from '@/components/ActiveProgramCard';
import { OutlineButton, PrimaryButton } from '@/components/Button';
import { DemoButton } from '@/components/DemoButton';
import { EncouragementModal } from '@/components/EncouragementModal';
import { Pill } from '@/components/Pill';
import { RingProgress } from '@/components/RingProgress';
import { Screen } from '@/components/Screen';
import { METRIC_CONFIG } from '@/data/metricConfig';
import { getProgram, localizeProgram } from '@/data/programs';
import { deltaVsPrior, gradeOf, greeting } from '@/lib/calc';
import { CoachState, getCoachState } from '@/lib/coach';
import { requestNotificationPermission } from '@/lib/notifications';
import { useT, Translator } from '@/lib/i18n';
import { useAutoSpeak } from '@/lib/voice';
import { useAppStore } from '@/state/store';

export default function HomePage() {
  const t = useT();
  const router = useRouter();
  const profile = useAppStore((s) => s.profile);
  const profilePic = useAppStore((s) => s.profilePic);
  const setProfilePic = useAppStore((s) => s.setProfilePic);
  const scans = useAppStore((s) => s.scans);
  const started = useAppStore((s) => s.started);
  const plan = useAppStore((s) => s.plan);
  const language = useAppStore((s) => s.language);
  const toggleTask = useAppStore((s) => s.toggleTask);
  const logPlanDay = useAppStore((s) => s.logPlanDay);
  const restartPlan = useAppStore((s) => s.restartPlan);
  const setReminder = useAppStore((s) => s.setReminder);
  const fileRef = useRef<HTMLInputElement>(null);

  const hasScans = scans.length > 0;
  const latest = hasScans ? scans[scans.length - 1] : null;
  const prev = scans.length > 1 ? scans[scans.length - 2] : latest;
  const overall = latest?.overall ?? null;
  const delta = latest && prev ? latest.overall - prev.overall : 0;

  function handlePickAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfilePic(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  // ---------- plan aggregation ----------
  const planPrograms = plan ? plan.programIds.map((id) => started.find((s) => s.id === id)).filter((s): s is NonNullable<typeof s> => !!s) : [];
  const planDay = planPrograms.length ? Math.min(28, Math.min(...planPrograms.map((s) => s.done)) + 1) : null;
  const planComplete = planPrograms.length > 0 && planPrograms.every((s) => s.done >= 28);

  const planTaskGroups = plan
    ? planPrograms
        .map((sp) => {
          const program = getProgram(sp.id);
          if (!program) return null;
          const copy = localizeProgram(program, language);
          const dayNum = Math.min(28, sp.done + 1);
          const week = Math.min(4, Math.ceil(dayNum / 7));
          const wk = copy.weeks[week - 1] ?? copy.weeks[0];
          const enWk = program.weeks[week - 1] ?? program.weeks[0];
          return { sp, program, copy, wk, enWk };
        })
        .filter((g): g is NonNullable<typeof g> => !!g)
    : [];

  const planDoneCount = planTaskGroups.reduce((acc, g) => acc + g.wk.tasks.reduce((a, _, i) => a + (g.sp.checks[i] ? 1 : 0), 0), 0);
  const planTotalTasks = planTaskGroups.reduce((acc, g) => acc + g.wk.tasks.length, 0);
  const planAllDone = planTotalTasks > 0 && planDoneCount === planTotalTasks;
  const planAnyDone = planDoneCount > 0;

  const otherStarted = started.filter((s) => !plan || !plan.programIds.includes(s.id));

  const weakestMetric = latest ? [...METRIC_CONFIG].sort((a, b) => latest.m[a.key] - latest.m[b.key])[0] : null;

  const improvement = (() => {
    if (!plan || scans.length < 2) return null;
    const origin = scans.find((s) => s.id === plan.scanId);
    if (!origin || origin.id === latest?.id) return null;
    const candidates = METRIC_CONFIG.filter((m) => plan.programIds.includes(m.programId));
    if (!candidates.length || !latest) return null;
    const target = candidates.reduce((worst, m) => (origin.m[m.key] < origin.m[worst.key] ? m : worst), candidates[0]);
    const d = latest.m[target.key] - origin.m[target.key];
    return d > 0 ? { label: t(target.labelKey), delta: d } : null;
  })();

  const coach: CoachState = getCoachState({
    hasScans,
    hasPlan: !!plan,
    hasOtherStartedPrograms: otherStarted.length > 0,
    planDay,
    planAnyDone,
    planAllDone,
    planComplete,
    weakestMetricLabel: weakestMetric ? t(weakestMetric.labelKey) : null,
    improvement,
  });

  const [encouragementDay, setEncouragementDay] = useState<number | null>(null);

  function handleLogPlanDay() {
    if (!plan || !planAllDone || planDay == null) return;
    logPlanDay(plan.programIds);
    if (planDay < 28) setEncouragementDay(planDay);
  }

  function handleRestartPlan() {
    if (!plan) return;
    restartPlan(plan.programIds);
  }

  function handlePlanReminderChange(time: string) {
    if (!plan) return;
    plan.programIds.forEach((id) => setReminder(id, time));
    void requestNotificationPermission();
  }

  return (
    <Screen>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="text-[14px] font-medium text-soft">{greeting(t)}</div>
          <div className="mt-1 text-[36px] leading-[1.05] font-bold tracking-[-0.6px] text-ink">{profile.name || t('profile_name_fallback')}</div>
        </div>
        <button onClick={() => fileRef.current?.click()} className="press relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-fill">
          {profilePic ? (
            <Image src={profilePic} alt="" fill className="object-cover" unoptimized />
          ) : (
            <span className="flex h-full items-center justify-center text-[10px] font-medium text-soft">{t('avatar_add')}</span>
          )}
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePickAvatar} />
      </div>

      <div className="relative mb-4 h-[300px] overflow-hidden rounded-[28px] bg-fill">
        {latest?.thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={latest.thumb} alt="" className="absolute inset-0 h-full w-full object-cover [transform:scaleX(-1)]" />
        ) : (
          <Image src="/images/home-hero-default.png" alt="" fill sizes="480px" className="object-cover" priority />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/25" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-6">
          <span className="text-[13px] font-semibold text-white/70">{t('harmony_index')}</span>
          <Pill label={overall != null ? gradeOf(overall, t) : t('not_scanned')} tone="paper" />
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-6 px-6 pb-6">
          <RingProgress pct={overall ?? 0} size={104} strokeWidth={9} fillColor="#0A84FF">
            <div className="text-[28px] leading-none font-bold text-white">{overall != null ? overall : '00'}</div>
          </RingProgress>
          <div className="min-w-0 flex-1">
            <div className="text-[16px] leading-[1.3] font-semibold text-white">{overall != null ? deltaVsPrior(delta, t) : t('take_first_scan')}</div>
            <div className="mt-1.5 text-[13px] text-white/60">{latest ? `${t('last_scan_prefix')} ${latest.date}` : t('score_placeholder')}</div>
          </div>
        </div>
      </div>

      <CoachCard coach={coach} />

      <Link
        href="/scan"
        className="press mt-4 flex items-center justify-between rounded-[20px] bg-card p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]"
      >
        <div>
          <div className="text-[19px] font-bold tracking-[-0.2px] text-ink">{t('new_analysis')}</div>
          <div className="mt-0.5 text-[13px] text-soft">{t('scan_90s')}</div>
        </div>
        <div className="flex h-10 w-16 items-center justify-center rounded-full bg-accent">
          <div className="h-[26px] w-[20px] rounded-[11px_11px_9px_9px] border-[1.5px] border-dashed border-white/70" />
        </div>
      </Link>

      {plan && (
        <>
          <div className="mt-8 mb-4 flex items-baseline justify-between">
            <span className="text-[20px] font-black tracking-[-0.3px] text-ink">{t('your_plan_title')}</span>
            {!planComplete && planDay != null && (
              <span className="text-[13px] font-bold text-ink">
                {t('coach_day_label')} {planDay} <span className="text-soft">{t('coach_of_28')}</span>
              </span>
            )}
          </div>

          {planComplete ? (
            <div className="mb-7 overflow-hidden rounded-[20px] bg-card p-5 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
                <CheckBadgeIcon />
              </div>
              <div className="text-[19px] font-bold tracking-[-0.2px] text-ink">{t('coach_plan_complete_title')}</div>
              <p className="mx-auto mt-1.5 max-w-[42ch] text-[14px] leading-[1.45] text-soft">{t('coach_plan_complete_body')}</p>
              <div className="mt-4 flex flex-col gap-2.5">
                <PrimaryButton label={t('rescan_cta')} onClick={() => router.push('/scan')} />
                <OutlineButton label={t('restart_program')} onClick={handleRestartPlan} />
              </div>
            </div>
          ) : (
            <div className="mb-7">
              {planTaskGroups.map((g) => {
                const groupDone = g.wk.tasks.reduce((acc, _, i) => acc + (g.sp.checks[i] ? 1 : 0), 0);
                return (
                  <div key={g.sp.id} className="mb-3.5 overflow-hidden rounded-[20px] bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
                    <div className="border-b border-border px-4 pt-3.5 pb-3">
                      <div className="flex items-center justify-between">
                        <div className="text-[15px] font-bold tracking-[-0.1px] text-ink">{g.copy.name}</div>
                        <span className={`text-[12px] font-bold ${groupDone === g.wk.tasks.length ? 'text-success' : 'text-soft'}`}>
                          {groupDone}/{g.wk.tasks.length}
                        </span>
                      </div>
                      <div className="mt-0.5 text-[11px] font-semibold tracking-[0.2px] text-accent uppercase">{g.wk.focus}</div>
                      <p className="mt-1.5 text-[13px] leading-[1.5] text-soft">{g.wk.why}</p>
                    </div>
                    <div className="px-4">
                      {g.wk.tasks.map((text, i) => {
                        const checked = !!g.sp.checks[i];
                        const enTask = g.enWk.tasks[i] ?? text;
                        return (
                          <div key={i} className="flex w-full items-center gap-3 border-b border-border py-[9px] last:border-b-0">
                            <button className="press flex flex-1 items-start gap-3 text-left" onClick={() => toggleTask(g.sp.id, i)}>
                              <span
                                className={`mt-[1px] flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-[13px] text-white transition-colors ${
                                  checked ? 'bg-accent' : 'bg-fill-strong'
                                }`}
                              >
                                {checked && '✓'}
                              </span>
                              <span className={`text-[16px] leading-[1.3] font-medium ${checked ? 'text-soft' : 'text-ink'}`}>{text}</span>
                            </button>
                            <DemoButton taskEn={enTask} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              <div className="flex items-center justify-between rounded-[16px] bg-fill p-3">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium text-soft">{t('remind')}</span>
                  <input
                    type="time"
                    value={planPrograms[0]?.reminder ?? '08:00'}
                    onChange={(e) => handlePlanReminderChange(e.target.value)}
                    className="rounded-[10px] bg-card px-2.5 py-[6px] text-[13px] font-medium text-ink outline-none"
                  />
                </div>
                <button
                  onClick={handleLogPlanDay}
                  disabled={!planAllDone}
                  className={`press rounded-full px-4 py-[9px] text-[13px] font-semibold ${planAllDone ? 'bg-accent text-white' : 'bg-card text-soft'}`}
                >
                  {planAllDone ? t('log_day') : t('finish_tasks')}
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {(otherStarted.length > 0 || !plan) && (
        <>
          <div className="mt-8 mb-4 flex items-baseline justify-between">
            <span className="text-[20px] font-black tracking-[-0.3px] text-ink">{plan ? t('other_active_programs') : t('active_programs_today')}</span>
            <Link href="/programs" className="text-[13px] font-semibold text-accent">
              {t('library')}
            </Link>
          </div>

          {otherStarted.length === 0 ? (
            <Link href="/programs" className="press block rounded-[20px] bg-fill p-8 text-center">
              <div className="text-[17px] font-semibold text-ink">{t('start_a_program')}</div>
            </Link>
          ) : (
            otherStarted.map((s) => <ActiveProgramCard key={s.id} started={s} />)
          )}
        </>
      )}

      {encouragementDay != null && <EncouragementModal day={encouragementDay} onClose={() => setEncouragementDay(null)} />}
    </Screen>
  );
}

function coachMessage(coach: CoachState, t: Translator): string {
  switch (coach.kind) {
    case 'no_scan':
      return t('coach_no_scan');
    case 'scan_no_plan':
      return `${coach.metricLabel} ${t('coach_scan_no_plan_body')}`;
    case 'has_started_no_plan':
      return t('coach_has_started_no_plan');
    case 'plan_progress':
      return coach.status === 'done' ? t('coach_plan_done_body') : coach.status === 'partial' ? t('coach_plan_partial_body') : t('coach_plan_not_started_body');
    case 'plan_complete':
      return `${t('coach_plan_complete_title')}. ${t('coach_plan_complete_body')}`;
  }
}

function CoachCard({ coach }: { coach: CoachState }) {
  const t = useT();
  useAutoSpeak(coachMessage(coach, t));
  return (
    <div className="mt-4 rounded-[20px] bg-ink p-4 dark:bg-card dark:ring-1 dark:ring-border">
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-white dark:bg-accent/15 dark:text-accent">
          <SparkleIcon />
        </span>
        <span className="text-[11px] font-semibold tracking-[0.3px] text-white/60 uppercase dark:text-soft">{t('coach_section_title')}</span>
      </div>

      {coach.kind === 'no_scan' && <p className="mt-2 text-[14px] leading-[1.5] text-white dark:text-ink">{t('coach_no_scan')}</p>}

      {coach.kind === 'scan_no_plan' && (
        <p className="mt-2 text-[14px] leading-[1.5] text-white dark:text-ink">
          <span className="font-bold">{coach.metricLabel}</span> {t('coach_scan_no_plan_body')}
        </p>
      )}

      {coach.kind === 'has_started_no_plan' && <p className="mt-2 text-[14px] leading-[1.5] text-white dark:text-ink">{t('coach_has_started_no_plan')}</p>}

      {coach.kind === 'plan_progress' && (
        <>
          <div className="mt-2 text-[13px] font-bold text-white dark:text-ink">
            {t('coach_day_label')} {coach.day} {t('coach_of_28')}
          </div>
          <p className="mt-0.5 text-[14px] leading-[1.5] text-white/85 dark:text-soft">
            {coach.status === 'done' ? t('coach_plan_done_body') : coach.status === 'partial' ? t('coach_plan_partial_body') : t('coach_plan_not_started_body')}
          </p>
          {coach.improvement && (
            <span className="mt-2 inline-block rounded-full bg-success/20 px-2.5 py-1 text-[11px] font-bold text-success">
              {coach.improvement.label} +{coach.improvement.delta}
            </span>
          )}
        </>
      )}

      {coach.kind === 'plan_complete' && (
        <>
          <div className="mt-2 text-[13px] font-bold text-white dark:text-ink">{t('coach_plan_complete_title')}</div>
          <p className="mt-0.5 text-[14px] leading-[1.5] text-white/85 dark:text-soft">{t('coach_plan_complete_body')}</p>
        </>
      )}
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2Z" />
    </svg>
  );
}

function CheckBadgeIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={12} cy={12} r={9} />
      <path d="M8 12.5l2.5 2.5L16 9.5" />
    </svg>
  );
}
