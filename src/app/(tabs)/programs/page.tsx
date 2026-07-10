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
      <div className="mb-2 text-[34px] leading-[1.05] font-bold tracking-[-0.6px] text-ink">{t('programs_title')}</div>
      <p className="mb-8 text-[15px] leading-[1.5] text-soft">{t('programs_intro')}</p>

      <div className="relative mb-9 h-[220px] overflow-hidden rounded-[26px]">
        <Image src="/images/programs-features.png" alt="" fill className="object-cover object-top" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pt-10 pb-3">
          <span className="text-[12px] font-medium text-white/90">{t('feature_map_caption')}</span>
        </div>
      </div>

      {PROGRAM_SECTIONS.map((section) => {
        const items = ASMETRY_PROGRAMS.filter((p) => p.section === section);
        return (
          <div key={section} className="mb-9">
            <div className="mb-3.5 text-[20px] font-bold tracking-[-0.3px] text-ink">{t(sectionKey(section))}</div>
            <div className="-mx-[26px] flex gap-3.5 overflow-x-auto px-[26px] pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {items.map((p) => {
                const isActive = started.some((s) => s.id === p.id);
                const copy = localizeProgram(p, language);
                return (
                  <Link key={p.id} href={`/program/${p.id}`} className="press relative h-[248px] w-[172px] shrink-0 overflow-hidden rounded-[22px]">
                    {p.img ? (
                      <Image src={p.img} alt="" fill sizes="172px" className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/70 to-[#7c5cff]/70 text-white">
                        <PlateIcon plate={p.plate} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleProgram(p.id);
                      }}
                      className={`press absolute top-3 right-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        isActive ? 'bg-accent text-white' : 'bg-white/90 text-[#1d1d1f]'
                      }`}
                    >
                      {isActive ? t('active') : t('start')}
                    </button>
                    <div className="absolute inset-x-0 bottom-0 p-3.5">
                      <div className="text-[16px] leading-[1.15] font-bold text-white">{copy.name}</div>
                      <div className="mt-1 text-[11px] font-medium text-white/70">
                        {p.mins} {t('min_unit')} · {t(levelKey(p.level))}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}

      <p className="mt-1.5 text-center text-[12px] leading-[1.5] text-soft">{t('programs_disclaimer')}</p>
    </Screen>
  );
}

function PlateIcon({ plate }: { plate: AnatomyPlate }) {
  const common = { width: 34, height: 34, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
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
