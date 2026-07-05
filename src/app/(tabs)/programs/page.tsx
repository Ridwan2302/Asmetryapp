'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Screen } from '@/components/Screen';
import { ASMETRY_PROGRAMS, PROGRAM_SECTIONS } from '@/data/programs';
import { useAppStore } from '@/state/store';

export default function ProgramsPage() {
  const started = useAppStore((s) => s.started);
  const toggleProgram = useAppStore((s) => s.toggleProgram);

  return (
    <Screen>
      <div className="font-ui text-[11px] tracking-[3px] text-soft">MODULE 02</div>
      <div className="mt-1 mb-[18px] font-display text-[34px] text-ink">Programs</div>

      <div className="relative mb-[10px] h-[200px] overflow-hidden rounded-[22px] border border-border-strong bg-card">
        <Image src="/images/programs-features.png" alt="" fill className="object-cover object-top" />
        <div className="absolute inset-x-0 bottom-0 bg-[rgba(20,17,14,0.4)] px-[14px] pt-5 pb-2">
          <span className="font-ui text-[8px] tracking-[1px] text-paper">FIG. 1 — FEATURE MAP</span>
        </div>
      </div>
      <p className="mb-[26px] font-ui text-[9.5px] leading-[1.6] text-soft">
        Each program is a complete 4-week protocol with a daily checklist. Start one and it appears on Home.
      </p>

      {PROGRAM_SECTIONS.map((section) => {
        const items = ASMETRY_PROGRAMS.filter((p) => p.section === section);
        return (
          <div key={section} className="mb-[26px]">
            <div className="mb-3 flex items-center gap-[10px]">
              <span className="font-ui text-[10px] tracking-[2px] text-ink">{section}</span>
              <span className="h-px flex-1 bg-border" />
            </div>
            {items.map((p) => {
              const isActive = started.some((s) => s.id === p.id);
              return (
                <Link
                  key={p.id}
                  href={`/program/${p.id}`}
                  className="mb-[10px] flex items-start rounded-[18px] border border-border bg-card p-4 px-[18px]"
                >
                  <div className="flex-1 pr-3">
                    <div className="font-display text-[22px] leading-[1.05] text-ink">{p.name}</div>
                    <div className="mt-1 font-ui text-[9px] tracking-[1px] text-soft">{p.tagline}</div>
                    <div className="mt-2 font-ui text-[9px] tracking-[1px] text-soft">
                      28 DAYS · {p.mins} MIN · {p.level}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleProgram(p.id);
                    }}
                    className={`rounded-full border border-border-strong px-[14px] py-[7px] font-ui text-[10px] tracking-[1px] whitespace-nowrap ${
                      isActive ? 'bg-accent text-paper' : 'bg-transparent text-accent'
                    }`}
                  >
                    {isActive ? 'ACTIVE' : 'START'}
                  </button>
                </Link>
              );
            })}
          </div>
        );
      })}

      <p className="mt-1.5 text-center font-ui text-[8.5px] leading-[1.6] tracking-[0.3px] text-soft">
        Programs are educational and not medical advice. Consult a professional before starting.
      </p>
    </Screen>
  );
}
