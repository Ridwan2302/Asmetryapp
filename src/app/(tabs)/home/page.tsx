'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { ActiveProgramCard } from '@/components/ActiveProgramCard';
import { DotGrid } from '@/components/DotGrid';
import { Pill } from '@/components/Pill';
import { ProgressBar } from '@/components/ProgressBar';
import { Screen } from '@/components/Screen';
import { deltaVsPrior, gradeOf, greeting } from '@/lib/calc';
import { useAppStore } from '@/state/store';

export default function HomePage() {
  const profile = useAppStore((s) => s.profile);
  const profilePic = useAppStore((s) => s.profilePic);
  const setProfilePic = useAppStore((s) => s.setProfilePic);
  const scans = useAppStore((s) => s.scans);
  const started = useAppStore((s) => s.started);
  const fileRef = useRef<HTMLInputElement>(null);

  const hasScans = scans.length > 0;
  const latest = hasScans ? scans[scans.length - 1] : null;
  const prev = scans.length > 1 ? scans[scans.length - 2] : latest;
  const overall = latest?.overall ?? null;
  const delta = latest && prev ? latest.overall - prev.overall : 0;

  function handlePickAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfilePic(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  return (
    <Screen>
      <div className="mb-[26px] flex items-start justify-between">
        <div>
          <div className="font-ui text-[11px] tracking-[3px] text-soft">{greeting()}</div>
          <div className="mt-[6px] font-display text-[34px] leading-none text-ink">{profile.name || 'You'}</div>
        </div>
        <button
          onClick={() => fileRef.current?.click()}
          className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full border border-border bg-placeholder"
        >
          {profilePic ? (
            <Image src={profilePic} alt="" fill className="object-cover" unoptimized />
          ) : (
            <span className="flex h-full items-center justify-center text-center font-ui text-[8px] leading-[1.3] tracking-[1px] text-soft">
              SET
              <br />
              PHOTO
            </span>
          )}
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePickAvatar} />
      </div>

      <div className="relative overflow-hidden rounded-[26px] bg-ink px-7 pt-[30px] pb-[26px]">
        <DotGrid />
        <div className="relative">
          <div className="flex items-center justify-between">
            <span className="font-ui text-[10px] tracking-[2.5px] text-[rgba(244,242,237,0.6)]">FACIAL HARMONY INDEX</span>
            <Pill label={overall != null ? gradeOf(overall) : 'UNSCANNED'} tone="paper" />
          </div>
          <div className="mt-[14px] flex items-baseline gap-[6px]">
            <span className="font-display text-[96px] leading-[0.85] text-paper">{overall ?? '—'}</span>
            {overall != null && <span className="font-display text-[30px] text-[rgba(244,242,237,0.5)]">/100</span>}
          </div>
          <ProgressBar pct={overall ?? 0} height={4} trackClassName="bg-[rgba(244,242,237,0.16)]" fillClassName="bg-paper" className="my-[22px]" />
          <div className="flex justify-between font-ui text-[10px] tracking-[1px] text-[rgba(244,242,237,0.5)]">
            <span>{overall != null ? deltaVsPrior(delta) : 'TAKE YOUR FIRST SCAN'}</span>
            {latest && <span>LAST SCAN {latest.date}</span>}
          </div>
        </div>
      </div>

      <Link
        href="/scan"
        className="mt-[14px] flex items-center justify-between rounded-[20px] border border-border bg-paper px-[22px] py-[18px]"
      >
        <div>
          <div className="font-display text-[22px] text-ink">New Analysis</div>
          <div className="mt-[2px] font-ui text-[10px] tracking-[1px] text-soft">SCAN · 90 SECONDS</div>
        </div>
        <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-accent text-[18px] text-paper">→</div>
      </Link>

      <div className="mt-[34px] mb-[14px] flex items-baseline justify-between">
        <span className="font-ui text-[11px] tracking-[2px] text-ink">ACTIVE PROGRAMS · TODAY</span>
        <Link href="/programs" className="border-b border-[rgba(20,17,14,0.2)] font-ui text-[10px] tracking-[1px] text-soft">
          LIBRARY
        </Link>
      </div>

      {started.length === 0 ? (
        <Link href="/programs" className="block rounded-[20px] border border-dashed border-border-strong p-[30px] text-center">
          <div className="font-display text-[20px] text-[#3B352D]">No active programs yet</div>
          <div className="mt-[6px] font-ui text-[10px] tracking-[1px] text-soft">BROWSE THE LIBRARY →</div>
        </Link>
      ) : (
        started.map((s) => <ActiveProgramCard key={s.id} started={s} />)
      )}
    </Screen>
  );
}
