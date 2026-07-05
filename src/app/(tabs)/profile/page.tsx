'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { OutlineButton, PrimaryButton } from '@/components/Button';
import { Pill } from '@/components/Pill';
import { Screen } from '@/components/Screen';
import { bmiCategory, bmiOf } from '@/lib/calc';
import { requestNotificationPermission } from '@/lib/notifications';
import { useAppStore } from '@/state/store';
import { Settings } from '@/state/types';

const SETTINGS_ROWS: { id: keyof Settings; label: string }[] = [
  { id: 'notifications', label: 'Program reminders' },
  { id: 'haptics', label: 'Haptic feedback' },
  { id: 'grid', label: 'Scan grid overlay' },
  { id: 'private', label: 'Private mode' },
];

export default function ProfilePage() {
  const router = useRouter();
  const profile = useAppStore((s) => s.profile);
  const profilePic = useAppStore((s) => s.profilePic);
  const setProfilePic = useAppStore((s) => s.setProfilePic);
  const scans = useAppStore((s) => s.scans);
  const started = useAppStore((s) => s.started);
  const settings = useAppStore((s) => s.settings);
  const toggleSetting = useAppStore((s) => s.toggleSetting);
  const resetApp = useAppStore((s) => s.resetApp);
  const fileRef = useRef<HTMLInputElement>(null);

  const [confirmReset, setConfirmReset] = useState(false);

  const bmi = bmiOf(profile.height, profile.weight);
  const daysDone = started.reduce((acc, s) => acc + s.done, 0);

  function handleSetPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfilePic(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleResetApp() {
    resetApp();
    setConfirmReset(false);
    router.replace('/onboarding');
  }

  return (
    <Screen>
      <div className="font-ui text-[11px] tracking-[3px] text-soft">MODULE 04</div>
      <div className="mt-1 mb-6 font-display text-[34px] text-ink">Profile</div>

      <div className="mb-6 flex flex-col items-center text-center">
        <div className="relative mb-[14px] h-[110px] w-[110px] overflow-hidden rounded-full border border-border bg-placeholder">
          {profilePic ? (
            <Image src={profilePic} alt="" fill className="object-cover" unoptimized />
          ) : (
            <span className="flex h-full items-center justify-center font-ui text-[9px] tracking-[1px] text-soft">NO PHOTO</span>
          )}
        </div>
        <div className="font-display text-[28px] text-ink">{profile.name || 'You'}</div>
        <div className="mt-[2px] font-ui text-[9px] tracking-[2px] text-soft">MEMBER · {profile.since}</div>
        <div className="mt-4 flex gap-[10px]">
          <button onClick={() => fileRef.current?.click()} className="rounded-full bg-ink px-4 py-2 font-ui text-[10px] tracking-[1px] text-paper">
            SET PHOTO
          </button>
          <button onClick={() => setProfilePic(null)} className="rounded-full border border-border-strong px-4 py-2 font-ui text-[10px] tracking-[1px] text-ink">
            DELETE
          </button>
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleSetPhoto} />
      </div>

      <div className="mb-6 flex items-center gap-4 rounded-[22px] border border-border bg-card p-[18px]">
        <div className="relative h-[190px] w-[110px] shrink-0 overflow-hidden rounded-2xl">
          <Image src="/images/body-model.png" alt="" fill className="object-cover object-top" />
        </div>
        <div className="flex-1">
          <div className="font-ui text-[9px] tracking-[1.5px] text-soft">YOUR ANATOMY MODEL</div>
          <div className="mt-[6px] flex items-baseline gap-[6px]">
            <span className="font-display text-[44px] leading-[0.85] text-ink">{bmi ? bmi.toFixed(1) : '—'}</span>
            <span className="font-ui text-[9px] text-soft">BMI</span>
          </div>
          <Pill label={bmiCategory(bmi)} className="mt-2" />
          <div className="mt-3 font-ui text-[9.5px] leading-[1.8] text-soft">
            <div className="flex justify-between">
              <span>AGE</span>
              <span>{profile.age} YRS</span>
            </div>
            <div className="flex justify-between">
              <span>HEIGHT</span>
              <span>{profile.height} CM</span>
            </div>
            <div className="flex justify-between">
              <span>WEIGHT</span>
              <span>{profile.weight} KG</span>
            </div>
          </div>
          <button onClick={() => router.push('/edit-stats')} className="mt-3 font-ui text-[9px] tracking-[1px] text-ink underline">
            EDIT STATS
          </button>
        </div>
      </div>

      <div className="mb-[26px] flex gap-2">
        <StatTile value={String(scans.length)} label="SCANS" />
        <StatTile value={String(started.length)} label="ACTIVE" />
        <StatTile value={String(daysDone)} label="DAYS DONE" />
      </div>

      <div className="mb-1 font-ui text-[10px] tracking-[2px] text-ink">SETTINGS</div>
      {SETTINGS_ROWS.map((row) => (
        <button
          key={row.id}
          onClick={() => {
            toggleSetting(row.id);
            if (row.id === 'notifications' && !settings.notifications) void requestNotificationPermission();
          }}
          className="flex w-full items-center justify-between border-t border-border py-[15px] text-left"
        >
          <span className="font-display text-[19px] text-ink">{row.label}</span>
          <span className={`relative h-[26px] w-11 rounded-full transition-colors ${settings[row.id] ? 'bg-accent' : 'bg-[rgba(20,17,14,0.18)]'}`}>
            <span
              className="absolute top-[3px] h-5 w-5 rounded-full bg-paper transition-all"
              style={{ left: settings[row.id] ? 21 : 3 }}
            />
          </span>
        </button>
      ))}

      <div className="mt-[22px] mb-[10px] font-ui text-[10px] tracking-[2px] text-ink">DANGER ZONE</div>
      {!confirmReset ? (
        <button
          onClick={() => setConfirmReset(true)}
          className="flex w-full items-center justify-between rounded-2xl border border-border-strong p-4 px-[18px] text-left"
        >
          <div>
            <div className="font-display text-[20px] text-ink">Start Fresh</div>
            <div className="mt-[2px] font-ui text-[9px] text-soft">Erase everything and begin from zero</div>
          </div>
          <span className="text-[18px]">🗑</span>
        </button>
      ) : (
        <div className="rounded-2xl border border-ink p-[18px]">
          <div className="font-display text-[21px] text-ink">Start completely over?</div>
          <p className="mt-[6px] font-ui text-[11px] leading-[1.6] text-soft">
            This permanently erases your profile, photo, scan history, and every active program. This cannot be undone.
          </p>
          <div className="mt-4 flex gap-[10px]">
            <OutlineButton label="KEEP MY DATA" onClick={() => setConfirmReset(false)} className="!py-[14px]" />
            <PrimaryButton label="ERASE EVERYTHING" onClick={handleResetApp} className="!py-[14px]" />
          </div>
        </div>
      )}

      <p className="mt-4 text-center font-ui text-[9px] tracking-[1px] text-[#C3BDB2]">asmetry.io v2.0 · DATA STAYS ON DEVICE</p>
    </Screen>
  );
}

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex-1 rounded-2xl border border-border py-4 text-center">
      <div className="font-display text-[30px] text-ink">{value}</div>
      <div className="font-ui text-[8px] tracking-[1px] text-soft">{label}</div>
    </div>
  );
}
