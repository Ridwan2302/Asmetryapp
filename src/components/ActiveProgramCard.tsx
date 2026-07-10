'use client';

import { getProgram, localizeProgram } from '@/data/programs';
import { useT } from '@/lib/i18n';
import { tapHaptic } from '@/lib/haptics';
import { requestNotificationPermission } from '@/lib/notifications';
import { useAppStore } from '@/state/store';
import type { StartedProgram } from '@/state/types';
import { DemoButton } from './DemoButton';
import { ProgressBar } from './ProgressBar';

export function ActiveProgramCard({ started }: { started: StartedProgram }) {
  const t = useT();
  const language = useAppStore((s) => s.language);
  const program = getProgram(started.id);
  const toggleExpanded = useAppStore((s) => s.toggleExpanded);
  const toggleTask = useAppStore((s) => s.toggleTask);
  const logDay = useAppStore((s) => s.logDay);
  const setReminder = useAppStore((s) => s.setReminder);
  const toggleProgram = useAppStore((s) => s.toggleProgram);

  if (!program) return null;

  const copy = localizeProgram(program, language);
  const dayNum = Math.min(28, started.done + 1);
  const week = Math.min(4, Math.ceil(dayNum / 7));
  const wk = copy.weeks[week - 1] ?? copy.weeks[0];
  const tasks = wk.tasks;
  const enTasks = (program.weeks[week - 1] ?? program.weeks[0]).tasks;
  const doneCount = tasks.reduce((acc, _, i) => acc + (started.checks[i] ? 1 : 0), 0);
  const allDone = tasks.length > 0 && doneCount === tasks.length;
  const overallPct = (started.done / 28) * 100;
  const todayPct = tasks.length ? (doneCount / tasks.length) * 100 : 0;

  function handleReminderChange(time: string) {
    setReminder(started.id, time);
    void requestNotificationPermission();
  }

  function handleToggleTask(i: number) {
    tapHaptic();
    toggleTask(started.id, i);
  }

  function handleLogDay() {
    if (!allDone) return;
    tapHaptic();
    logDay(started.id);
  }

  function handleStop() {
    tapHaptic();
    toggleProgram(started.id);
  }

  return (
    <div className="mb-3 rounded-[22px] bg-card p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
      <button className="press flex w-full items-start justify-between text-left" onClick={() => toggleExpanded(started.id)}>
        <div className="flex-1">
          <div className="text-[19px] font-bold tracking-[-0.2px] text-ink">{copy.name}</div>
          <div className="mt-0.5 text-[13px] text-soft">
            {t('week_label')} {week} · {wk.focus}
          </div>
        </div>
        <div className="flex items-center gap-2 pl-2.5">
          <span className="text-[15px] font-semibold text-ink">
            {started.done}
            <span className="text-soft">/28</span>
          </span>
          <ChevronIcon expanded={!!started.expanded} />
        </div>
      </button>

      <div className="mt-3 flex items-center gap-2">
        <span className="w-14 text-[11px] font-medium text-soft">{t('overall')}</span>
        <ProgressBar pct={overallPct} className="flex-1" />
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="w-14 text-[11px] font-medium text-soft">{t('today')}</span>
        <ProgressBar pct={todayPct} fillClassName={allDone ? 'bg-success' : 'bg-accent'} className="flex-1" />
        <span className={`w-10 text-right text-[12px] font-bold ${allDone ? 'text-success' : 'text-ink'}`}>
          {doneCount}/{tasks.length}
        </span>
      </div>

      {started.expanded && (
        <div className="mt-4">
          <div className="mb-3.5 flex items-center gap-3 rounded-[16px] bg-fill p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-card text-ink">
              <CalendarIcon />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-semibold tracking-[0.3px] text-soft uppercase">
                {t('today_day')} {dayNum}
              </div>
              <div className="truncate text-[15px] font-semibold text-ink">{wk.focus}</div>
            </div>
            <ChevronIcon expanded={false} />
          </div>
          {tasks.map((text, i) => {
            const checked = !!started.checks[i];
            return (
              <div key={i} className="flex w-full items-center gap-3 py-[9px]">
                <button className="press flex flex-1 items-start gap-3 text-left" onClick={() => handleToggleTask(i)}>
                  <span
                    className={`mt-[1px] flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-[13px] text-white transition-colors ${
                      checked ? 'bg-accent' : 'bg-fill-strong'
                    }`}
                  >
                    {checked && '✓'}
                  </span>
                  <span className={`text-[16px] leading-[1.3] font-medium ${checked ? 'text-soft line-through' : 'text-ink'}`}>{text}</span>
                </button>
                <DemoButton taskEn={enTasks[i] ?? text} />
              </div>
            );
          })}

          <div className="mt-3.5 flex items-center justify-between border-t border-border pt-3.5">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-medium text-soft">{t('remind')}</span>
              <input
                type="time"
                value={started.reminder}
                onChange={(e) => handleReminderChange(e.target.value)}
                className="rounded-[10px] bg-fill px-2.5 py-[6px] text-[13px] font-medium text-ink outline-none"
              />
            </div>
            <button
              onClick={handleLogDay}
              disabled={!allDone}
              className={`press rounded-full px-4 py-[9px] text-[13px] font-semibold ${allDone ? 'bg-accent text-white' : 'bg-fill text-soft'}`}
            >
              {started.done >= 28 ? t('complete') : allDone ? t('log_day') : t('finish_tasks')}
            </button>
          </div>
          <button onClick={handleStop} className="mt-3 block w-full py-1.5 text-center text-[13px] font-medium text-negative">
            {t('stop_program')}
          </button>
        </div>
      )}
    </div>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
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
      className={`transition-transform ${expanded ? 'rotate-90' : ''}`}
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <rect x={3.5} y={5} width={17} height={15.5} rx={3.5} />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
      <circle cx={16.5} cy={16.5} r={3.2} fill="currentColor" stroke="none" />
      <path d="M15.2 16.5l1 1 1.8-2" stroke="var(--color-card)" strokeWidth={1.4} />
    </svg>
  );
}
