'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { ActiveProgramCard } from '@/components/ActiveProgramCard';
import { Pill } from '@/components/Pill';
import { RingProgress } from '@/components/RingProgress';
import { Screen } from '@/components/Screen';
import { deltaVsPrior, gradeOf, greeting } from '@/lib/calc';
import { useT } from '@/lib/i18n';
import { useAppStore } from '@/state/store';

export default function HomePage() {
  const t = useT();
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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="text-[14px] font-medium text-soft">{greeting(t)}</div>
          <div className="mt-1 text-[36px] leading-[1.05] font-bold tracking-[-0.6px] text-ink">{profile.name || t('profile_name_fallback')}</div>
        </div>
        <button onClick={() => fileRef.current?.click()} className="press relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-fill">
          {profilePic ? (
            <Image src={profilePic} alt="" fill className="object-cover" unoptimized />
          ) : (
            <span className="flex h-full items-center justify-center text-[10px] font-medium text-soft">{t('avatar_add')}</span>
          )}
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePickAvatar} />
      </div>

      <div className="relative mb-4 h-[300px] overflow-hidden rounded-[28px]">
        {latest?.thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={latest.thumb} alt="" className="absolute inset-0 h-full w-full object-cover [transform:scaleX(-1)]" />
        ) : (
          <Image src="/images/onboarding/welcome-hero.png" alt="" fill sizes="480px" className="object-cover" priority />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/25" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-6">
          <span className="text-[13px] font-semibold text-white/70">{t('harmony_index')}</span>
          <Pill label={overall != null ? gradeOf(overall, t) : t('not_scanned')} tone="paper" />
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-6 px-6 pb-6">
          <RingProgress pct={overall ?? 0} size={104} strokeWidth={9} fillColor="#0A84FF">
            <div className="text-[28px] leading-none font-bold text-white">{overall != null ? overall : '00'}</div>
          </RingProgress>
          <div className="min-w-0 flex-1">
            <div className="text-[16px] leading-[1.3] font-semibold text-white">{overall != null ? deltaVsPrior(delta, t) : t('take_first_scan')}</div>
            <div className="mt-1.5 text-[13px] text-white/60">{latest ? `${t('last_scan_prefix')} ${latest.date}` : t('score_placeholder')}</div>
          </div>
        </div>
      </div>

      <Link
        href="/scan"
        className="press mt-4 flex items-center justify-between rounded-[20px] bg-card p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]"
      >
        <div>
          <div className="text-[19px] font-bold tracking-[-0.2px] text-ink">{t('new_analysis')}</div>
          <div className="mt-0.5 text-[13px] text-soft">{t('scan_90s')}</div>
        </div>
        <div className="flex h-10 w-16 items-center justify-center rounded-full bg-accent">
          <div className="h-[26px] w-[20px] rounded-[11px_11px_9px_9px] border-[1.5px] border-dashed border-white/70" />
        </div>
      </Link>

      <div className="mt-8 mb-4 flex items-baseline justify-between">
        <span className="text-[20px] font-extrabold tracking-[-0.3px] text-ink">{t('active_programs_today')}</span>
        <Link href="/programs" className="text-[13px] font-semibold text-accent">
          {t('library')}
        </Link>
      </div>

      {started.length === 0 ? (
        <Link href="/programs" className="press block rounded-[20px] bg-fill p-8 text-center">
          <div className="text-[17px] font-semibold text-ink">{t('start_a_program')}</div>
        </Link>
      ) : (
        started.map((s) => <ActiveProgramCard key={s.id} started={s} />)
      )}
    </Screen>
  );
}
