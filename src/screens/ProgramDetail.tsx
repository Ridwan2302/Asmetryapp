'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AnatomyPlate } from '@/components/AnatomyPlate';
import { OutlineButton, PrimaryButton } from '@/components/Button';
import { DemoButton } from '@/components/DemoButton';
import { Screen } from '@/components/Screen';
import { getProgram, levelKey, localizeProgram, sectionKey } from '@/data/programs';
import { tapHaptic } from '@/lib/haptics';
import { useT } from '@/lib/i18n';
import { requestNotificationPermission } from '@/lib/notifications';
import { plateTint } from '@/lib/plateColors';
import { useAppStore } from '@/state/store';

export function ProgramDetail({ id }: { id: string }) {
  const router = useRouter();
  const t = useT();
  const language = useAppStore((s) => s.language);
  const program = getProgram(id);
  const [openWeekOverride, setOpenWeekOverride] = useState<number | null>(null);
  const started = useAppStore((s) => s.started);
  const toggleProgram = useAppStore((s) => s.toggleProgram);
  const toggleTask = useAppStore((s) => s.toggleTask);
  const logDay = useAppStore((s) => s.logDay);
  const restartProgram = useAppStore((s) => s.restartProgram);
  const setReminder = useAppStore((s) => s.setReminder);
  const sex = useAppStore((s) => s.profile.sex);

  if (!program) {
    return (
      <Screen>
        <p>Program not found.</p>
      </Screen>
    );
  }

  const startedProgram = started.find((s) => s.id === program.id);
  const isActive = !!startedProgram;
  const isComplete = !!startedProgram && startedProgram.done >= 28;
  const copy = localizeProgram(program, language);

  const dayNum = startedProgram ? Math.min(28, startedProgram.done + 1) : 1;
  const todayWeek = Math.min(4, Math.ceil(dayNum / 7));
  const todayWk = copy.weeks[todayWeek - 1] ?? copy.weeks[0];
  const todayTasks = todayWk.tasks;
  const enTodayTasks = (program.weeks[todayWeek - 1] ?? program.weeks[0]).tasks;
  const doneCount = startedProgram ? todayTasks.reduce((acc, _, i) => acc + (startedProgram.checks[i] ? 1 : 0), 0) : 0;
  const allDone = todayTasks.length > 0 && doneCount === todayTasks.length;
  const openWeek = openWeekOverride ?? (isActive ? todayWeek : 1);

  function handleToggleTask(i: number) {
    tapHaptic();
    toggleTask(program!.id, i);
  }

  function handleLogDay() {
    if (!allDone) return;
    tapHaptic();
    logDay(program!.id);
  }

  function handleReminderChange(time: string) {
    setReminder(program!.id, time);
    void requestNotificationPermission();
  }

  function handleRestart() {
    tapHaptic();
    restartProgram(program!.id);
    setOpenWeekOverride(null);
  }

  return (
    <Screen withTabBarSpacing={false}>
      <div className="relative -mx-[26px] mb-6 flex h-[320px] items-center justify-center overflow-hidden">
        {program.img ? (
          <Image src={program.img} alt="" fill sizes="480px" className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/70 to-[#7c5cff]/70">
            <div className="h-[70%] w-[60%] text-white">
              <AnatomyPlate plate={program.plate} sex={sex} />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/25" />
        <button
          onClick={() => router.back()}
          aria-label={t('programs_back')}
          className="press absolute top-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-md"
        >
          <svg width={10} height={16} viewBox="0 0 10 16" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 2 2 8l6 6" />
          </svg>
        </button>
        <div className="absolute top-4 right-4 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-md">
          <span className="text-[11px] font-semibold text-white">{copy.anatomy}</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 px-6 pb-5">
          <div className="text-[12px] font-semibold tracking-[0.3px] text-white/70 uppercase">{t(sectionKey(program.section))}</div>
          <div className="mt-1 text-[30px] leading-[1.05] font-bold tracking-[-0.4px] text-white">{copy.name}</div>
          <div className="mt-1.5 text-[15px] text-white/75">{copy.tagline}</div>
        </div>
      </div>

      <div className="mb-6 flex gap-2.5">
        <StatTile value="28" label={t('stat_days')} />
        <StatTile value={String(program.mins)} label={t('stat_min_day')} />
        <StatTile value={t(levelKey(program.level))} label={t('stat_level')} small />
      </div>

      <p className="mb-7 text-[16px] leading-[1.5] text-soft">{copy.overview}</p>

      {startedProgram && isComplete && (
        <div className="mb-7 overflow-hidden rounded-[20px] bg-card p-5 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-success">
            <CheckBadgeIcon />
          </div>
          <div className="text-[19px] font-bold tracking-[-0.2px] text-ink">{t('program_complete_title')}</div>
          <p className="mx-auto mt-1.5 max-w-[42ch] text-[14px] leading-[1.45] text-soft">{t('program_complete_body')}</p>
          <div className="mt-4 flex flex-col gap-2.5">
            <button onClick={handleRestart} className="press rounded-full bg-accent px-4 py-[11px] text-[14px] font-semibold text-white">
              {t('restart_program')}
            </button>
            <button
              onClick={() => router.push('/programs')}
              className="press rounded-full bg-fill px-4 py-[11px] text-[14px] font-semibold text-ink"
            >
              {t('explore_programs')}
            </button>
          </div>
        </div>
      )}

      {startedProgram && !isComplete && (
        <div className="mb-7">
          <div className="mb-3.5 flex items-center justify-between">
            <div className="text-[22px] font-bold tracking-[-0.3px] text-ink">
              {t('today_day')} {dayNum}
            </div>
            <span className={`text-[13px] font-bold ${allDone ? 'text-success' : 'text-ink'}`}>
              {doneCount}/{todayTasks.length}
            </span>
          </div>
          <div className="mb-3.5 overflow-hidden rounded-[20px] bg-card px-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
            {todayTasks.map((text, i) => {
              const checked = !!startedProgram.checks[i];
              return (
                <div key={i} className="flex w-full items-center gap-3 border-b border-border py-[9px] last:border-b-0">
                  <button className="press flex flex-1 items-start gap-3 text-left" onClick={() => handleToggleTask(i)}>
                    <span
                      className={`mt-[1px] flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-[13px] text-white transition-colors ${
                        checked ? 'bg-accent' : 'bg-fill-strong'
                      }`}
                    >
                      {checked && '✓'}
                    </span>
                    <span className={`text-[16px] leading-[1.3] font-medium ${checked ? 'text-soft' : 'text-ink'}`}>{text}</span>
                  </button>
                  <DemoButton taskEn={enTodayTasks[i] ?? text} />
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between rounded-[16px] bg-fill p-3">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-medium text-soft">{t('remind')}</span>
              <input
                type="time"
                value={startedProgram.reminder}
                onChange={(e) => handleReminderChange(e.target.value)}
                className="rounded-[10px] bg-card px-2.5 py-[6px] text-[13px] font-medium text-ink outline-none"
              />
            </div>
            <button
              onClick={handleLogDay}
              disabled={!allDone}
              className={`press rounded-full px-4 py-[9px] text-[13px] font-semibold ${allDone ? 'bg-accent text-white' : 'bg-card text-soft'}`}
            >
              {allDone ? t('log_day') : t('finish_tasks')}
            </button>
          </div>
        </div>
      )}

      <div className="mb-3.5 text-[22px] font-bold tracking-[-0.3px] text-ink">{t('four_week_protocol')}</div>
      {copy.weeks.map((w) => {
        const locked = isActive && w.n > todayWeek;
        const open = !locked && openWeek === w.n;
        return (
          <div
            key={w.n}
            className={`mb-3 overflow-hidden rounded-[20px] bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] ${locked ? 'opacity-50' : ''}`}
          >
            <button
              className="press flex w-full items-center justify-between p-4 text-left disabled:cursor-not-allowed"
              disabled={locked}
              onClick={() => setOpenWeekOverride(open ? 0 : w.n)}
            >
              <div className="flex items-center gap-3">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${plateTint(program.plate)}`}>{w.n}</span>
                <div>
                  <div className="text-[11px] font-semibold tracking-[0.3px] text-soft uppercase">
                    {t('week_label')} {w.n}
                    {locked && ` · ${t('week_locked_badge')}`}
                  </div>
                  <div className="text-[17px] font-bold text-ink">{w.focus}</div>
                </div>
              </div>
              {locked ? <LockIcon /> : <ChevronDown open={open} />}
            </button>
            {locked && <div className="px-4 pb-4 text-[13px] text-soft">{t('week_locked_hint')}</div>}
            {open && (
              <div className="px-4 pb-4">
                {w.tasks.map((task, i) => (
                  <div key={i} className="flex items-center gap-3 border-t border-border py-2.5 first:border-t-0">
                    <span className="mt-[1px] h-[6px] w-[6px] shrink-0 rounded-full bg-accent" />
                    <span className="flex-1 text-[15px] leading-[1.35] font-medium text-ink">{task}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div className="mt-6">
        {isActive ? (
          <OutlineButton label={t('stop_program')} onClick={() => toggleProgram(program.id)} />
        ) : (
          <PrimaryButton label={t('start_program')} onClick={() => toggleProgram(program.id)} />
        )}
      </div>
    </Screen>
  );
}

function StatTile({ value, label, small }: { value: string; label: string; small?: boolean }) {
  return (
    <div className="flex-1 rounded-[16px] bg-fill p-3 text-center">
      <div className={`font-bold text-ink ${small ? 'pt-1.5 text-[15px]' : 'text-[22px]'}`}>{value}</div>
      <div className="text-[11px] font-medium text-soft">{label}</div>
    </div>
  );
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#8E8E93"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
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
