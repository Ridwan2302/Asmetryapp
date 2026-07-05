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
      <div className="mb-6 text-[28px] font-bold tracking-[-0.4px] text-ink">Profile</div>

      <div className="mb-6 flex flex-col items-center text-center">
        <div className="relative mb-3.5 h-[104px] w-[104px] overflow-hidden rounded-full bg-fill shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
          {profilePic ? (
            <Image src={profilePic} alt="" fill className="object-cover" unoptimized />
          ) : (
            <span className="flex h-full items-center justify-center text-[13px] font-medium text-soft">No photo</span>
          )}
        </div>
        <div className="text-[22px] font-bold text-ink">{profile.name || 'You'}</div>
        <div className="mt-0.5 text-[13px] text-soft">Member since {profile.since}</div>
        <div className="mt-4 flex gap-2.5">
          <button onClick={() => fileRef.current?.click()} className="press rounded-full bg-ink px-4 py-2 text-[13px] font-semibold text-white">
            Set Photo
          </button>
          <button onClick={() => setProfilePic(null)} className="press rounded-full bg-fill px-4 py-2 text-[13px] font-semibold text-ink">
            Delete
          </button>
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleSetPhoto} />
      </div>

      <div className="mb-6 flex items-center gap-4 rounded-[24px] bg-card p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
        <div className="relative h-[180px] w-[104px] shrink-0 overflow-hidden rounded-[18px]">
          <Image src="/images/body-model.png" alt="" fill className="object-cover object-top" />
        </div>
        <div className="flex-1">
          <div className="text-[13px] font-medium text-soft">Your Anatomy Model</div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-[38px] leading-[0.85] font-bold text-ink">{bmi ? bmi.toFixed(1) : '—'}</span>
            <span className="text-[12px] font-medium text-soft">BMI</span>
          </div>
          <Pill label={bmiCategory(bmi)} tone={bmiCategory(bmi) === 'HEALTHY RANGE' ? 'success' : 'ink'} className="mt-2" />
          <div className="mt-3 space-y-0.5 text-[13px] text-soft">
            <div className="flex justify-between">
              <span>Age</span>
              <span className="font-medium text-ink">{profile.age} yrs</span>
            </div>
            <div className="flex justify-between">
              <span>Height</span>
              <span className="font-medium text-ink">{profile.height} cm</span>
            </div>
            <div className="flex justify-between">
              <span>Weight</span>
              <span className="font-medium text-ink">{profile.weight} kg</span>
            </div>
          </div>
          <button onClick={() => router.push('/edit-stats')} className="mt-3 text-[13px] font-semibold text-accent underline underline-offset-2">
            Edit Stats
          </button>
        </div>
      </div>

      <div className="mb-7 flex gap-2.5">
        <StatTile value={String(scans.length)} label="Scans" />
        <StatTile value={String(started.length)} label="Active" />
        <StatTile value={String(daysDone)} label="Days Done" />
      </div>

      <div className="mb-1 text-[13px] font-semibold tracking-[0.3px] text-soft uppercase">Settings</div>
      <div className="rounded-[20px] bg-card px-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
        {SETTINGS_ROWS.map((row, i) => (
          <button
            key={row.id}
            onClick={() => {
              toggleSetting(row.id);
              if (row.id === 'notifications' && !settings.notifications) void requestNotificationPermission();
            }}
            className={`flex w-full items-center justify-between py-3.5 text-left ${i > 0 ? 'border-t border-border' : ''}`}
          >
            <span className="text-[16px] font-medium text-ink">{row.label}</span>
            <span className={`relative h-[26px] w-11 rounded-full transition-colors ${settings[row.id] ? 'bg-success' : 'bg-fill-strong'}`}>
              <span className="absolute top-[3px] h-5 w-5 rounded-full bg-white shadow-sm transition-all" style={{ left: settings[row.id] ? 21 : 3 }} />
            </span>
          </button>
        ))}
      </div>

      <div className="mt-7 mb-2.5 text-[13px] font-semibold tracking-[0.3px] text-soft uppercase">Danger Zone</div>
      {!confirmReset ? (
        <button onClick={() => setConfirmReset(true)} className="press flex w-full items-center justify-between rounded-[20px] bg-card p-4 text-left shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
          <div>
            <div className="text-[17px] font-semibold text-negative">Start Fresh</div>
            <div className="mt-0.5 text-[13px] text-soft">Erase everything and begin from zero</div>
          </div>
          <span className="text-[18px]">🗑</span>
        </button>
      ) : (
        <div className="rounded-[20px] bg-card p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
          <div className="text-[19px] font-bold text-ink">Start completely over?</div>
          <p className="mt-1.5 text-[14px] leading-[1.5] text-soft">
            This permanently erases your profile, photo, scan history, and every active program. This cannot be undone.
          </p>
          <div className="mt-4 flex gap-2.5">
            <OutlineButton label="Keep My Data" onClick={() => setConfirmReset(false)} className="!py-3.5" />
            <PrimaryButton label="Erase Everything" onClick={handleResetApp} className="!bg-negative !py-3.5" />
          </div>
        </div>
      )}

      <p className="mt-5 text-center text-[12px] text-soft">asmetry.io · Data stays on this device</p>
    </Screen>
  );
}

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex-1 rounded-[18px] bg-fill py-4 text-center">
      <div className="text-[24px] font-bold text-ink">{value}</div>
      <div className="text-[11px] font-medium text-soft">{label}</div>
    </div>
  );
}
