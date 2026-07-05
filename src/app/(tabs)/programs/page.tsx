'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Screen } from '@/components/Screen';
import { ASMETRY_PROGRAMS, PROGRAM_SECTIONS, levelKey, sectionKey } from '@/data/programs';
import { useT } from '@/lib/i18n';
import { useAppStore } from '@/state/store';

export default function ProgramsPage() {
  const t = useT();
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
              return (
                <Link
                  key={p.id}
                  href={`/program/${p.id}`}
                  className="press mb-2.5 flex items-start rounded-[20px] bg-card p-4 px-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex-1 pr-3">
                    <div className="text-[18px] font-bold tracking-[-0.2px] text-ink">{p.name}</div>
                    <div className="mt-0.5 text-[13px] text-soft">{p.tagline}</div>
                    <div className="mt-1.5 text-[12px] font-medium text-soft">
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
