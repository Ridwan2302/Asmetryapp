'use client';

import Link from 'next/link';
import { getProgram, localizeProgram } from '@/data/programs';
import type { AnatomyPlate } from '@/data/programs';
import { useT } from '@/lib/i18n';
import { useAppStore } from '@/state/store';
import type { StartedProgram } from '@/state/types';
import { ProgressBar } from './ProgressBar';

export function ActiveProgramCard({ started }: { started: StartedProgram }) {
  const t = useT();
  const language = useAppStore((s) => s.language);
  const program = getProgram(started.id);

  if (!program) return null;

  const copy = localizeProgram(program, language);
  const isComplete = started.done >= 28;
  const dayNum = Math.min(28, started.done + 1);
  const week = Math.min(4, Math.ceil(dayNum / 7));
  const wk = copy.weeks[week - 1] ?? copy.weeks[0];
  const tasks = wk.tasks;
  const doneCount = tasks.reduce((acc, _, i) => acc + (started.checks[i] ? 1 : 0), 0);
  const allDone = tasks.length > 0 && doneCount === tasks.length;
  const overallPct = (started.done / 28) * 100;
  const todayPct = tasks.length ? (doneCount / tasks.length) * 100 : 0;

  return (
    <Link
      href={`/program/${started.id}`}
      className="press mb-3 block rounded-[22px] bg-card p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]"
    >
      <div className="flex w-full items-start gap-3">
        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] bg-accent/10 text-accent">
          <PlateIcon plate={program.plate} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[19px] font-bold tracking-[-0.2px] text-ink">{copy.name}</div>
          <div className="mt-0.5 text-[13px] text-soft">
            {isComplete ? t('program_complete_title') : `${t('week_label')} ${week} · ${wk.focus}`}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 pl-2.5">
          <span className={`text-[15px] font-semibold ${isComplete ? 'text-success' : 'text-ink'}`}>
            {started.done}
            <span className="text-soft">/28</span>
          </span>
          <ChevronIcon />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="w-14 text-[11px] font-medium text-soft">{t('overall')}</span>
        <ProgressBar pct={overallPct} fillClassName={isComplete ? 'bg-success' : undefined} className="flex-1" />
      </div>
      {!isComplete && (
        <div className="mt-2 flex items-center gap-2">
          <span className="w-14 text-[11px] font-medium text-soft">{t('today')}</span>
          <ProgressBar pct={todayPct} fillClassName={allDone ? 'bg-success' : 'bg-accent'} className="flex-1" />
          <span className={`w-10 text-right text-[12px] font-bold ${allDone ? 'text-success' : 'text-ink'}`}>
            {doneCount}/{tasks.length}
          </span>
        </div>
      )}
    </Link>
  );
}

function ChevronIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function PlateIcon({ plate }: { plate: AnatomyPlate }) {
  const common = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (plate) {
    case 'face':
      return (
        <svg {...common}>
          <path d="M12 3.5c-3.6 0-6 2.9-6 7 0 4.6 2.9 8.5 6 8.5s6-3.9 6-8.5c0-4.1-2.4-7-6-7Z" />
          <path d="M9.5 12.2h.01M14.5 12.2h.01" />
          <path d="M10 16c.7.6 1.4.9 2 .9s1.3-.3 2-.9" />
        </svg>
      );
    case 'jaw':
      return (
        <svg {...common}>
          <path d="M6 4.5v6.5c0 5 2.8 8.5 6 8.5s6-3.5 6-8.5V4.5" />
          <path d="M9.5 15.5c.8.6 1.6.9 2.5.9s1.7-.3 2.5-.9" />
        </svg>
      );
    case 'eyes':
      return (
        <svg {...common}>
          <path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12Z" />
          <circle cx={12} cy={12} r={2.6} />
        </svg>
      );
    case 'posture':
      return (
        <svg {...common}>
          <circle cx={13} cy={4.2} r={1.8} />
          <path d="M13 7v6.5M13 7 9 9.5M13 9.5l4 1.5M13 13.5l-3 7M13 13.5l3.5 7" />
          <path d="M20 3v18" strokeDasharray="2 2.5" strokeWidth={1.2} opacity={0.5} />
        </svg>
      );
    case 'skin':
      return (
        <svg {...common}>
          <path d="M12 3c2.7 3.2 4.3 6.5 4.3 9.3a4.3 4.3 0 1 1-8.6 0C7.7 9.5 9.3 6.2 12 3Z" />
        </svg>
      );
    case 'sleep':
      return (
        <svg {...common}>
          <path d="M20 14.7A8.5 8.5 0 1 1 9.3 4a6.5 6.5 0 0 0 10.7 10.7Z" />
        </svg>
      );
    case 'body':
    default:
      return (
        <svg {...common}>
          <circle cx={12} cy={5.5} r={2.6} />
          <path d="M7 21l1.5-8.5a3.5 3.5 0 0 1 3.5-3h0a3.5 3.5 0 0 1 3.5 3L17 21" />
          <path d="M9 12.5v8.5M15 12.5v8.5" />
        </svg>
      );
  }
}
