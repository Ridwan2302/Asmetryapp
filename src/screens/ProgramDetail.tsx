'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AnatomyPlate } from '@/components/AnatomyPlate';
import { OutlineButton, PrimaryButton } from '@/components/Button';
import { Screen } from '@/components/Screen';
import { getProgram } from '@/data/programs';
import { useAppStore } from '@/state/store';

export function ProgramDetail({ id }: { id: string }) {
  const router = useRouter();
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
      <button onClick={() => router.back()} className="mb-4 font-ui text-[11px] tracking-[1px] text-soft">
        ← PROGRAMS
      </button>
      <div className="font-ui text-[10px] tracking-[2px] text-soft">{program.section}</div>
      <div className="mt-1 font-display text-[38px] leading-[1.02] text-ink">{program.name}</div>
      <div className="mt-1 mb-5 font-display text-[19px] text-[#3B352D] italic">{program.tagline}</div>

      <div className="relative mb-5 flex h-[230px] items-center justify-center overflow-hidden rounded-[22px] border border-border-strong bg-card">
        {program.img ? (
          <Image src={program.img} alt="" fill className="object-cover" />
        ) : (
          <div className="h-[84%] w-[80%]">
            <AnatomyPlate plate={program.plate} sex={sex} />
          </div>
        )}
        <div className="absolute bottom-[10px] left-[14px] rounded-md bg-[rgba(244,242,237,0.7)] px-[6px] py-[2px]">
          <span className="font-ui text-[8px] tracking-[1px] text-soft">TARGET · {program.anatomy}</span>
        </div>
      </div>

      <div className="mb-[22px] flex gap-2">
        <StatTile value="28" label="DAYS" />
        <StatTile value={String(program.mins)} label="MIN / DAY" />
        <StatTile value={program.level} label="LEVEL" small />
      </div>

      <p className="mb-6 font-display text-[19px] leading-[1.4] text-[#3B352D]">{program.overview}</p>

      <div className="mb-3 font-ui text-[10px] tracking-[2px] text-ink">THE 4-WEEK PROTOCOL</div>
      {program.weeks.map((w) => {
        const open = openWeek === w.n;
        return (
          <div key={w.n} className="mb-[10px] overflow-hidden rounded-2xl border border-border bg-card">
            <button
              className="flex w-full items-center justify-between p-[15px] px-4 text-left"
              onClick={() => setOpenWeek(open ? 0 : w.n)}
            >
              <div>
                <div className="font-ui text-[9px] tracking-[1.5px] text-soft">WEEK {w.n}</div>
                <div className="mt-[2px] font-display text-[20px] text-ink">{w.focus}</div>
              </div>
              <span className="font-ui text-[14px] text-soft">{open ? '▾' : '▸'}</span>
            </button>
            {open && (
              <div className="px-4 pb-[14px]">
                {w.tasks.map((task, i) => (
                  <div key={i} className="flex gap-3 border-t border-border-soft py-2">
                    <span className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-accent" />
                    <span className="font-display text-[17px] leading-[1.35] text-ink">{task}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div className="mt-[22px]">
        {isActive ? (
          <OutlineButton label="STOP PROGRAM" onClick={() => toggleProgram(program.id)} />
        ) : (
          <PrimaryButton label="START PROGRAM" onClick={() => toggleProgram(program.id)} />
        )}
      </div>
      {isActive && (
        <Link href="/home" className="mt-[10px] block text-center font-ui text-[10px] tracking-[1px] text-soft underline">
          GO TO TODAY&apos;S CHECKLIST →
        </Link>
      )}
    </Screen>
  );
}

function StatTile({ value, label, small }: { value: string; label: string; small?: boolean }) {
  return (
    <div className="flex-1 rounded-[14px] border border-border p-3 text-center">
      <div className={`font-display text-ink ${small ? 'pt-2 text-[15px]' : 'text-[26px]'}`}>{value}</div>
      <div className="font-ui text-[8px] tracking-[1px] text-soft">{label}</div>
    </div>
  );
}
