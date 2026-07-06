'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Screen } from '@/components/Screen';
import { ASMETRY_PROGRAMS, PROGRAM_SECTIONS, levelKey, localizeProgram, sectionKey } from '@/data/programs';
import type { AnatomyPlate } from '@/data/programs';
import { useT } from '@/lib/i18n';
import { useAppStore } from '@/state/store';

export default function ProgramsPage() {
  const t = useT();
  const language = useAppStore((s) => s.language);
  const started = useAppStore((s) => s.started);
  const toggleProgram = useAppStore((s) => s.toggleProgram);

  return (
    <Screen>
      <div className="mb-5 text-[28px] font-bold tracking-[-0.4px] text-ink">{t('programs_title')}</div>

      <div className="relative mb-3 h-[190px] overflow-hidden rounded-[24px] bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
        <Image src="/images/programs-features.png" alt="" fill className="object-cover object-top" />
        <div className="absolute inset-x-0 bottom-0 bg-black/35 px-3.5 pt-4 pb-2">
          <span className="text-[11px] font-medium text-white">{t('feature_map_caption')}</span>
        </div>
      </div>
      <p className="mb-7 text-[14px] leading-[1.5] text-soft">{t('programs_intro')}</p>

      {PROGRAM_SECTIONS.map((section) => {
        const items = ASMETRY_PROGRAMS.filter((p) => p.section === section);
        return (
          <div key={section} className="mb-7">
            <div className="mb-2.5 text-[13px] font-semibold tracking-[0.3px] text-soft uppercase">{t(sectionKey(section))}</div>
            {items.map((p) => {
              const isActive = started.some((s) => s.id === p.id);
              const copy = localizeProgram(p, language);
              return (
                <Link
                  key={p.id}
                  href={`/program/${p.id}`}
                  className="press mb-3.5 flex items-center gap-3.5 rounded-[26px] bg-card p-3 pr-4 shadow-[0_2px_6px_rgba(0,0,0,0.04),0_18px_40px_rgba(0,0,0,0.09)] ring-1 ring-black/[0.03] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(0,0,0,0.05),0_24px_48px_rgba(0,0,0,0.12)]"
                >
                  <div className="relative h-[78px] w-[78px] shrink-0 overflow-hidden rounded-[20px] bg-fill shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]">
                    {p.img ? (
                      <Image src={p.img} alt="" fill sizes="78px" className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/20 to-accent/5 text-accent">
                        <PlateIcon plate={p.plate} />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="line-clamp-2 text-[16px] leading-[1.2] font-bold tracking-[-0.2px] text-ink">{copy.name}</div>
                    <div className="mt-1 truncate text-[13px] text-soft">{copy.tagline}</div>
                    <div className="mt-1.5 text-[11px] font-medium text-soft">
                      {t('days_28')} · {p.mins} {t('min_unit')} · {t(levelKey(p.level))}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleProgram(p.id);
                    }}
                    className={`press shrink-0 rounded-full px-3.5 py-2 text-[13px] font-semibold whitespace-nowrap ${
                      isActive ? 'bg-accent text-white' : 'bg-accent/10 text-accent'
                    }`}
                  >
                    {isActive ? t('active') : t('start')}
                  </button>
                </Link>
              );
            })}
          </div>
        );
      })}

      <p className="mt-1.5 text-center text-[12px] leading-[1.5] text-soft">{t('programs_disclaimer')}</p>
    </Screen>
  );
}

function PlateIcon({ plate }: { plate: AnatomyPlate }) {
  const common = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (plate === 'sleep') {
    return (
      <svg {...common}>
        <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 3c2.5 3 4 6.2 4 9a4 4 0 1 1-8 0c0-2.8 1.5-6 4-9Z" />
    </svg>
  );
}
