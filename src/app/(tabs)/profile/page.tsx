'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { OutlineButton, PrimaryButton } from '@/components/Button';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Pill } from '@/components/Pill';
import { Screen } from '@/components/Screen';
import { TrashIcon } from '@/components/TrashIcon';
import { bmiOf } from '@/lib/calc';
import { TranslationKey, useT } from '@/lib/i18n';
import { requestNotificationPermission } from '@/lib/notifications';
import { stopSpeaking } from '@/lib/speech';
import { useAppStore } from '@/state/store';
import { Settings } from '@/state/types';

const SETTINGS_ROWS: { id: keyof Settings; labelKey: TranslationKey }[] = [
  { id: 'notifications', labelKey: 'setting_notifications' },
  { id: 'haptics', labelKey: 'setting_haptics' },
  { id: 'voice', labelKey: 'setting_voice' },
  { id: 'grid', labelKey: 'setting_grid' },
  { id: 'private', labelKey: 'setting_private' },
];

export default function ProfilePage() {
  const router = useRouter();
  const t = useT();
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
  const healthy = bmi > 0 && bmi >= 18.5 && bmi < 25;
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
      <div className="mb-8 text-[34px] leading-[1.05] font-bold tracking-[-0.6px] text-ink">{t('profile_title')}</div>

      <div className="mb-8 flex flex-col items-center text-center">
        <div className="relative mb-3.5 h-[104px] w-[104px] overflow-hidden rounded-full bg-fill">
          {profilePic ? (
            <Image src={profilePic} alt="" fill className="object-cover" unoptimized />
          ) : (
            <span className="flex h-full items-center justify-center text-[13px] font-medium text-soft">{t('no_photo')}</span>
          )}
        </div>
        <div className="text-[22px] font-bold text-ink">{profile.name || t('profile_name_fallback')}</div>
        <div className="mt-0.5 text-[13px] text-soft">
          {t('member_since')} {profile.since}
        </div>
        <div className="mt-4 flex gap-2.5">
          <button onClick={() => fileRef.current?.click()} className="press rounded-full bg-accent px-4 py-2 text-[13px] font-semibold text-white">
            {t('set_photo')}
          </button>
          <button onClick={() => setProfilePic(null)} className="press rounded-full bg-fill px-4 py-2 text-[13px] font-semibold text-ink">
            {t('delete')}
          </button>
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleSetPhoto} />
      </div>

      <div className="mb-8 flex items-center gap-5 rounded-[20px] bg-card p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
        <div className="relative h-[180px] w-[104px] shrink-0 overflow-hidden rounded-[18px]">
          <Image src="/images/body-model.png" alt="" fill className="object-cover object-top" />
        </div>
        <div className="flex-1">
          <div className="text-[13px] font-medium text-soft">{t('your_anatomy_model')}</div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-[38px] leading-[0.85] font-bold text-ink">{bmi ? bmi.toFixed(1) : '—'}</span>
            <span className="text-[12px] font-medium text-soft">{t('bmi_short')}</span>
          </div>
          <Pill label={bmiCategoryLabel(bmi, t)} tone={healthy ? 'success' : 'ink'} className="mt-2" />
          <div className="mt-3 space-y-0.5 text-[13px] text-soft">
            <div className="flex justify-between">
              <span>{t('stat_age')}</span>
              <span className="font-medium text-ink">
                {profile.age} {t('yrs')}
              </span>
            </div>
            <div className="flex justify-between">
              <span>{t('stat_height')}</span>
              <span className="font-medium text-ink">{profile.height} cm</span>
            </div>
            <div className="flex justify-between">
              <span>{t('stat_weight')}</span>
              <span className="font-medium text-ink">{profile.weight} kg</span>
            </div>
          </div>
          <button onClick={() => router.push('/edit-stats')} className="mt-3 text-[13px] font-semibold text-accent">
            {t('edit_stats')}
          </button>
        </div>
      </div>

      <div className="mb-7 flex gap-2.5">
        <StatTile value={String(scans.length)} label={t('stat_scans')} />
        <StatTile value={String(started.length)} label={t('stat_active')} />
        <StatTile value={String(daysDone)} label={t('stat_days_done')} />
      </div>

      <div className="mb-2 text-[20px] font-bold tracking-[-0.3px] text-ink">{t('settings_title')}</div>
      <div className="overflow-hidden rounded-[20px] bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
        {SETTINGS_ROWS.map((row) => (
          <button
            key={row.id}
            onClick={() => {
              toggleSetting(row.id);
              if (row.id === 'notifications' && !settings.notifications) void requestNotificationPermission();
              if (row.id === 'voice' && settings.voice) stopSpeaking();
            }}
            className="flex w-full items-center justify-between border-b border-border px-4 py-3.5 text-left"
          >
            <span className="text-[16px] font-medium text-ink">{t(row.labelKey)}</span>
            <span className={`relative h-[26px] w-11 rounded-full transition-colors ${settings[row.id] ? 'bg-success' : 'bg-fill-strong'}`}>
              <span className="absolute top-[3px] h-5 w-5 rounded-full bg-white shadow-sm transition-all" style={{ left: settings[row.id] ? 21 : 3 }} />
            </span>
          </button>
        ))}
        <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
          <span className="text-[16px] font-medium text-ink">{t('setting_appearance')}</span>
          <DarkModeToggle />
        </div>
        <div className="px-4 py-3.5">
          <span className="mb-2 block text-[16px] font-medium text-ink">{t('setting_language')}</span>
          <LanguageToggle />
        </div>
      </div>

      <div className="mt-8 mb-2 text-[20px] font-bold tracking-[-0.3px] text-ink">{t('danger_zone')}</div>
      {!confirmReset ? (
        <button
          onClick={() => setConfirmReset(true)}
          className="press flex w-full items-center justify-between rounded-[20px] bg-card p-4 text-left shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]"
        >
          <div>
            <div className="text-[17px] font-semibold text-negative">{t('start_fresh')}</div>
            <div className="mt-0.5 text-[13px] text-soft">{t('start_fresh_desc')}</div>
          </div>
          <span className="text-negative">
            <TrashIcon size={18} />
          </span>
        </button>
      ) : (
        <div className="rounded-[20px] bg-card p-4">
          <div className="text-[19px] font-bold text-ink">{t('confirm_reset_title')}</div>
          <p className="mt-1.5 text-[14px] leading-[1.5] text-soft">{t('confirm_reset_body')}</p>
          <div className="mt-4 flex gap-2.5">
            <OutlineButton label={t('keep_my_data')} onClick={() => setConfirmReset(false)} className="!py-3.5" />
            <PrimaryButton label={t('erase_everything')} onClick={handleResetApp} className="!bg-negative !py-3.5" />
          </div>
        </div>
      )}

      <p className="mt-5 text-center text-[12px] text-soft">{t('footer_note')}</p>
    </Screen>
  );
}

function bmiCategoryLabel(bmi: number, t: ReturnType<typeof useT>): string {
  if (bmi < 18.5) return t('bmi_underweight');
  if (bmi < 25) return t('bmi_healthy');
  if (bmi < 30) return t('bmi_overweight');
  return t('bmi_high');
}

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex-1 rounded-[18px] bg-fill py-4 text-center">
      <div className="text-[24px] font-bold text-ink">{value}</div>
      <div className="text-[11px] font-medium text-soft">{label}</div>
    </div>
  );
}
