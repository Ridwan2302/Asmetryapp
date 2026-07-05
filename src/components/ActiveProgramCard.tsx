'use client';

import { getProgram } from '@/data/programs';
import { tapHaptic } from '@/lib/haptics';
import { requestNotificationPermission } from '@/lib/notifications';
import { useAppStore } from '@/state/store';
import type { StartedProgram } from '@/state/types';
import { ProgressBar } from './ProgressBar';

export function ActiveProgramCard({ started }: { started: StartedProgram }) {
  const program = getProgram(started.id);
  const toggleExpanded = useAppStore((s) => s.toggleExpanded);
  const toggleTask = useAppStore((s) => s.toggleTask);
  const logDay = useAppStore((s) => s.logDay);
  const setReminder = useAppStore((s) => s.setReminder);
  const toggleProgram = useAppStore((s) => s.toggleProgram);

  if (!program) return null;

  const dayNum = Math.min(28, started.done + 1);
  const week = Math.min(4, Math.ceil(dayNum / 7));
  const wk = program.weeks[week - 1] ?? program.weeks[0];
  const tasks = wk.tasks;
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
          <div className="text-[19px] font-bold tracking-[-0.2px] text-ink">{program.name}</div>
          <div className="mt-0.5 text-[13px] text-soft">
            Week {week} · {wk.focus}
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
        <span className="w-14 text-[11px] font-medium text-soft">Overall</span>
        <ProgressBar pct={overallPct} className="flex-1" />
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="w-14 text-[11px] font-medium text-soft">Today</span>
        <ProgressBar pct={todayPct} fillClassName={allDone ? 'bg-success' : 'bg-accent'} className="flex-1" />
        <span className={`w-10 text-right text-[12px] font-bold ${allDone ? 'text-success' : 'text-ink'}`}>
          {doneCount}/{tasks.length}
        </span>
      </div>

      {started.expanded && (
        <div className="mt-4">
          <div className="mb-1.5 text-[12px] font-semibold tracking-[0.3px] text-soft uppercase">Today · Day {dayNum}</div>
          {tasks.map((text, i) => {
            const checked = !!started.checks[i];
            return (
              <button key={i} className="press flex w-full items-start gap-3 py-[9px] text-left" onClick={() => handleToggleTask(i)}>
                <span
                  className={`mt-[1px] flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-[13px] text-white transition-colors ${
                    checked ? 'bg-accent' : 'bg-fill-strong'
                  }`}
                >
                  {checked && '✓'}
                </span>
                <span className={`text-[16px] leading-[1.3] font-medium ${checked ? 'text-soft line-through' : 'text-ink'}`}>{text}</span>
              </button>
            );
          })}

          <div className="mt-3.5 flex items-center justify-between border-t border-border pt-3.5">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-medium text-soft">Remind</span>
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
              {started.done >= 28 ? 'Complete' : allDone ? 'Log Day ✓' : 'Finish Tasks'}
            </button>
          </div>
          <button onClick={handleStop} className="mt-3 block w-full py-1.5 text-center text-[13px] font-medium text-negative">
            Stop Program
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
