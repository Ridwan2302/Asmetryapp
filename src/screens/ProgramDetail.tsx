'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AnatomyPlate } from '@/components/AnatomyPlate';
import { OutlineButton, PrimaryButton } from '@/components/Button';
import { Screen } from '@/components/Screen';
import { getProgram, levelKey, localizeProgram, sectionKey } from '@/data/programs';
import { useT } from '@/lib/i18n';
import { plateTint } from '@/lib/plateColors';
import { useAppStore } from '@/state/store';

export function ProgramDetail({ id }: { id: string }) {
  const router = useRouter();
  const t = useT();
  const language = useAppStore((s) => s.language);
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
  const copy = localizeProgram(program, language);

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

      <div className="mb-3.5 text-[22px] font-bold tracking-[-0.3px] text-ink">{t('four_week_protocol')}</div>
      {copy.weeks.map((w) => {
        const open = openWeek === w.n;
        return (
          <div key={w.n} className="mb-3 overflow-hidden rounded-[20px] bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
            <button className="press flex w-full items-center justify-between p-4 text-left" onClick={() => setOpenWeek(open ? 0 : w.n)}>
              <div className="flex items-center gap-3">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${plateTint(program.plate)}`}>{w.n}</span>
                <div>
                  <div className="text-[11px] font-semibold tracking-[0.3px] text-soft uppercase">
                    {t('week_label')} {w.n}
                  </div>
                  <div className="text-[17px] font-bold text-ink">{w.focus}</div>
                </div>
              </div>
              <ChevronDown open={open} />
            </button>
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
