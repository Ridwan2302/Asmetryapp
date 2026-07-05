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
    <div className="mb-3 rounded-[20px] border border-border bg-card p-[18px]">
      <button className="flex w-full items-start justify-between text-left" onClick={() => toggleExpanded(started.id)}>
        <div className="flex-1">
          <div className="font-display text-[22px] leading-[1.05] text-ink">{program.name}</div>
          <div className="mt-[3px] font-ui text-[9px] tracking-[1px] text-soft">
            WEEK {week} · {wk.focus}
          </div>
        </div>
        <div className="pl-[10px] text-right">
          <span className="font-display text-[24px] text-ink">{started.done}</span>
          <span className="font-ui text-[10px] text-soft">/28</span>
          <div className="mt-[2px] font-ui text-[14px] text-soft">{started.expanded ? '▾' : '▸'}</div>
        </div>
      </button>

      <div className="mt-[10px] flex items-center gap-2">
        <span className="w-[52px] font-ui text-[8px] tracking-[1px] text-soft">OVERALL</span>
        <ProgressBar pct={overallPct} className="flex-1" />
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="w-[52px] font-ui text-[8px] tracking-[1px] text-soft">TODAY</span>
        <ProgressBar pct={todayPct} fillClassName={allDone ? 'bg-success' : 'bg-accent'} className="flex-1" />
        <span className={`w-[34px] text-right font-ui text-[9px] font-bold ${allDone ? 'text-success' : 'text-ink'}`}>
          {doneCount}/{tasks.length}
        </span>
      </div>

      {started.expanded && (
        <div className="mt-4">
          <div className="mb-2 font-ui text-[9px] tracking-[1.5px] text-soft">TODAY · DAY {dayNum}</div>
          {tasks.map((text, i) => {
            const checked = !!started.checks[i];
            return (
              <button key={i} className="flex w-full items-start gap-3 py-[9px] text-left" onClick={() => handleToggleTask(i)}>
                <span
                  className={`mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border-[1.5px] text-[12px] text-paper ${
                    checked ? 'border-accent bg-accent' : 'border-[rgba(20,17,14,0.3)] bg-transparent'
                  }`}
                >
                  {checked && '✓'}
                </span>
                <span className={`font-display text-[17px] leading-[1.3] ${checked ? 'text-soft line-through' : 'text-ink'}`}>{text}</span>
              </button>
            );
          })}

          <div className="mt-[14px] flex items-center justify-between border-t border-border-soft pt-[14px]">
            <div className="flex items-center gap-2">
              <span className="font-ui text-[9px] tracking-[1px] text-soft">REMIND</span>
              <input
                type="time"
                value={started.reminder}
                onChange={(e) => handleReminderChange(e.target.value)}
                className="rounded-[10px] border border-border-strong bg-transparent px-2 py-[5px] font-ui text-[12px] text-ink outline-none"
              />
            </div>
            <button
              onClick={handleLogDay}
              disabled={!allDone}
              className={`rounded-full border border-border-strong px-4 py-[9px] font-ui text-[10px] tracking-[1px] ${
                allDone ? 'bg-accent text-paper' : 'bg-transparent text-soft'
              }`}
            >
              {started.done >= 28 ? 'COMPLETE' : allDone ? 'LOG DAY ✓' : 'FINISH TASKS'}
            </button>
          </div>
          <button onClick={handleStop} className="mt-3 block w-full py-[6px] text-center font-ui text-[9px] tracking-[1.5px] text-soft">
            ■ STOP PROGRAM
          </button>
        </div>
      )}
    </div>
  );
}
