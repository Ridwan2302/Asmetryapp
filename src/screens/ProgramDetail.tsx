'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AnatomyPlate } from '@/components/AnatomyPlate';
import { OutlineButton, PrimaryButton } from '@/components/Button';
import { Screen } from '@/components/Screen';
import { getProgram, levelKey, sectionKey } from '@/data/programs';
import { useT } from '@/lib/i18n';
import { useAppStore } from '@/state/store';

export function ProgramDetail({ id }: { id: string }) {
  const router = useRouter();
  const t = useT();
  const program = getProgram(id);
  const [openWeek, setOpenWeek] = useState(1);
  const started = useAppStore((s) => s.started);
  const toggleProgram = useAppStore((s) => s.toggleProgram);
  const sex = useAppStore((s) => s.profile.sex);

  if (!program) {
    return (
      <Screen>
        <p>Program not found.</p>
      </Screen>
    );
  }

  const isActive = started.some((s) => s.id === program.id);

  return (
    <Screen withTabBarSpacing={false}>
      <button onClick={() => router.back()} className="press mb-4 flex items-center gap-1 text-[15px] font-medium text-accent">
        <svg width={10} height={16} viewBox="0 0 10 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 2 2 8l6 6" />
        </svg>
        {t('programs_back')}
      </button>
      <div className="text-[13px] font-semibold text-soft">{t(sectionKey(program.section))}</div>
      <div className="mt-1 text-[32px] leading-[1.05] font-bold tracking-[-0.4px] text-ink">{program.name}</div>
      <div className="mt-1 mb-5 text-[16px] text-soft">{program.tagline}</div>

      <div className="relative mb-5 flex h-[240px] items-center justify-center overflow-hidden rounded-[24px] bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
        {program.img ? (
          <Image src={program.img} alt="" fill className="object-cover" />
        ) : (
          <div className="h-[84%] w-[80%]">
            <AnatomyPlate plate={program.plate} sex={sex} />
          </div>
        )}
        <div className="absolute bottom-3 left-3.5 rounded-full bg-white/85 px-2.5 py-1 backdrop-blur">
          <span className="text-[11px] font-semibold text-ink">
            {t('target_prefix')} · {program.anatomy}
          </span>
        </div>
      </div>

      <div className="mb-6 flex gap-2.5">
        <StatTile value="28" label={t('stat_days')} />
        <StatTile value={String(program.mins)} label={t('stat_min_day')} />
        <StatTile value={t(levelKey(program.level))} label={t('stat_level')} small />
      </div>

      <p className="mb-6 text-[16px] leading-[1.45] text-soft">{program.overview}</p>

      <div className="mb-3 text-[13px] font-semibold tracking-[0.3px] text-soft uppercase">{t('four_week_protocol')}</div>
      {program.weeks.map((w) => {
        const open = openWeek === w.n;
        return (
          <div key={w.n} className="mb-2.5 overflow-hidden rounded-[20px] bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
            <button className="press flex w-full items-center justify-between p-4 text-left" onClick={() => setOpenWeek(open ? 0 : w.n)}>
              <div>
                <div className="text-[12px] font-semibold text-soft">
                  {t('week_label')} {w.n}
                </div>
                <div className="mt-0.5 text-[18px] font-bold text-ink">{w.focus}</div>
              </div>
              <ChevronDown open={open} />
            </button>
            {open && (
              <div className="px-4 pb-3.5">
                {w.tasks.map((task, i) => (
                  <div key={i} className="flex items-center gap-3 border-t border-border py-2.5">
                    <span className="mt-[1px] h-[5px] w-[5px] shrink-0 rounded-full bg-accent" />
                    <span className="flex-1 text-[16px] leading-[1.35] font-medium text-ink">{task}</span>
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
      {isActive && (
        <Link href="/home" className="mt-3 block text-center text-[14px] font-semibold text-accent">
          {t('go_to_checklist')}
        </Link>
      )}
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
