'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { OutlineButton, PrimaryButton } from '@/components/Button';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Pill } from '@/components/Pill';
import { bmiAdvice, bmiCategory, bmiOf } from '@/lib/calc';
import { Translator, useT } from '@/lib/i18n';
import { useAppStore } from '@/state/store';
import { Sex } from '@/state/types';

const introData: {
  stepKey: 'intro1_step' | 'intro2_step' | 'intro3_step';
  titleKey: 'intro1_title' | 'intro2_title' | 'intro3_title';
  bodyKey: 'intro1_body' | 'intro2_body' | 'intro3_body';
  img: string;
}[] = [
  { stepKey: 'intro1_step', titleKey: 'intro1_title', bodyKey: 'intro1_body', img: '/images/onboarding/intro-scan.png' },
  { stepKey: 'intro2_step', titleKey: 'intro2_title', bodyKey: 'intro2_body', img: '/images/onboarding/intro-jaw.png' },
  { stepKey: 'intro3_step', titleKey: 'intro3_title', bodyKey: 'intro3_body', img: '/images/onboarding/welcome-hero.png' },
];

export function OnboardingFlow({ mode }: { mode: 'initial' | 'edit' }) {
  const router = useRouter();
  const t = useT();
  const profile = useAppStore((s) => s.profile);
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const updateProfile = useAppStore((s) => s.updateProfile);

  const [step, setStep] = useState(mode === 'edit' ? 4 : 0);
  const [name, setName] = useState(profile.name);
  const [sex, setSex] = useState<Sex>(profile.sex);
  const [age, setAge] = useState(mode === 'edit' ? String(profile.age) : '');
  const [height, setHeight] = useState(mode === 'edit' ? String(profile.height) : '');
  const [weight, setWeight] = useState(mode === 'edit' ? String(profile.weight) : '');

  const bmiLive = useMemo(() => {
    const h = parseInt(height, 10) || profile.height;
    const w = parseInt(weight, 10) || profile.weight;
    return bmiOf(h, w);
  }, [height, weight, profile.height, profile.weight]);

  const statsReady = !!(age && height && weight);

  function next() {
    setStep((s) => s + 1);
  }
  function skipIntro() {
    setStep(4);
  }
  function finish() {
    const finalProfile = {
      name: (name || t('profile_name_fallback')).trim(),
      sex,
      age: parseInt(age, 10) || 24,
      height: parseInt(height, 10) || 178,
      weight: parseInt(weight, 10) || 72,
      since: profile.since,
    };
    if (mode === 'edit') {
      updateProfile(finalProfile);
      router.back();
    } else {
      completeOnboarding(finalProfile);
      router.replace('/home');
    }
  }

  return (
    <div className="min-h-dvh bg-paper">
      {step === 0 && <Welcome onNext={next} t={t} />}
      {step >= 1 && step <= 3 && <Intro idx={step - 1} onNext={next} onSkip={skipIntro} t={t} />}
      {step === 4 && (
        <StatsForm
          name={name}
          setName={setName}
          sex={sex}
          setSex={setSex}
          age={age}
          setAge={setAge}
          height={height}
          setHeight={setHeight}
          weight={weight}
          setWeight={setWeight}
          ready={statsReady}
          onNext={next}
          t={t}
        />
      )}
      {step >= 5 && (
        <ResultStep
          bmi={bmiLive}
          age={parseInt(age, 10) || profile.age}
          height={parseInt(height, 10) || profile.height}
          weight={parseInt(weight, 10) || profile.weight}
          onFinish={finish}
          t={t}
        />
      )}
    </div>
  );
}

function Welcome({ onNext, t }: { onNext: () => void; t: Translator }) {
  return (
    <div className="flex min-h-dvh flex-col justify-between px-6 pt-[calc(env(safe-area-inset-top)+28px)] pb-10">
      <div className="flex items-center gap-3">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[12px] shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
          <Image src="/icons/icon-192.png" alt="Asmetry" fill className="object-cover" />
        </div>
        <div>
          <div className="text-[19px] font-bold tracking-[-0.3px] text-ink">
            asmetry<span className="font-medium text-soft">.io</span>
          </div>
          <div className="text-[13px] text-soft">{t('brand_tagline')}</div>
        </div>
      </div>

      <div className="my-6 flex flex-1 items-center">
        <div className="relative aspect-square w-full overflow-hidden rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
          <Image src="/images/onboarding/welcome-hero.png" alt="" fill className="object-cover" priority />
        </div>
      </div>

      <div>
        <h1 className="mb-6 text-[32px] leading-[1.15] font-bold tracking-[-0.5px] text-ink">{t('welcome_headline')}</h1>
        <div className="mb-4">
          <div className="mb-1.5 text-[13px] font-medium text-soft">{t('language_label')}</div>
          <LanguageToggle />
        </div>
        <PrimaryButton label={t('welcome_begin')} onClick={onNext} />
        <div className="mt-4 text-center text-[12px] text-soft">{t('welcome_subtitle')}</div>
      </div>
    </div>
  );
}

function Intro({ idx, onNext, onSkip, t }: { idx: number; onNext: () => void; onSkip: () => void; t: Translator }) {
  const cur = introData[idx];
  return (
    <div className="flex min-h-dvh flex-col justify-between px-6 pt-[calc(env(safe-area-inset-top)+24px)] pb-10">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <Pill label={t(cur.stepKey)} tone="accent" />
          <button onClick={onSkip} className="text-[14px] font-medium text-soft">
            {t('skip_intro')}
          </button>
        </div>
        <div className="relative mb-6 h-[320px] overflow-hidden rounded-[28px] shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
          <Image src={cur.img} alt="" fill className="object-cover" />
        </div>
        <h2 className="text-[28px] leading-[1.15] font-bold tracking-[-0.4px] text-ink">{t(cur.titleKey)}</h2>
        <p className="mt-2 text-[16px] leading-[1.45] text-soft">{t(cur.bodyKey)}</p>
      </div>
      <div>
        <div className="mb-5 flex justify-center gap-[6px]">
          {introData.map((_, i) => (
            <div
              key={i}
              className="h-[7px] rounded-full transition-all"
              style={{ width: i === idx ? 22 : 7, backgroundColor: i === idx ? '#0A84FF' : 'rgba(0,0,0,0.12)' }}
            />
          ))}
        </div>
        <PrimaryButton label={idx === 2 ? t('continue') : t('next')} onClick={onNext} />
      </div>
    </div>
  );
}

function SegmentedControl<T extends string>({ value, options, onChange }: { value: T; options: { value: T; label: string }[]; onChange: (v: T) => void }) {
  const idx = options.findIndex((o) => o.value === value);
  return (
    <div className="relative flex rounded-[14px] bg-fill p-1">
      <div
        className="absolute top-1 bottom-1 rounded-[10px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition-transform duration-300"
        style={{ width: `calc(${100 / options.length}% - 4px)`, transform: `translateX(calc(${idx * 100}% + ${idx * 4}px))` }}
      />
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`relative z-10 flex-1 py-[9px] text-center text-[14px] font-semibold transition-colors ${value === o.value ? 'text-ink' : 'text-soft'}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function FormField({ label, value, onChange, placeholder, inputMode }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; inputMode?: 'numeric' | 'text' }) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-medium text-soft">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className="w-full rounded-[14px] bg-fill px-4 py-[13px] text-[17px] text-ink outline-none placeholder:text-soft/70 focus:ring-2 focus:ring-accent/40"
      />
    </div>
  );
}

function StatsForm(props: {
  name: string;
  setName: (v: string) => void;
  sex: Sex;
  setSex: (v: Sex) => void;
  age: string;
  setAge: (v: string) => void;
  height: string;
  setHeight: (v: string) => void;
  weight: string;
  setWeight: (v: string) => void;
  ready: boolean;
  onNext: () => void;
  t: Translator;
}) {
  const { name, setName, sex, setSex, age, setAge, height, setHeight, weight, setWeight, ready, onNext, t } = props;
  return (
    <div className="min-h-dvh px-6 pt-[calc(env(safe-area-inset-top)+24px)] pb-10">
      <Pill label={t('stats_step')} tone="accent" className="mb-4" />
      <h2 className="mb-6 text-[28px] leading-[1.15] font-bold tracking-[-0.4px] text-ink">{t('stats_title')}</h2>

      <div className="space-y-5">
        <FormField label={t('field_name')} value={name} onChange={setName} placeholder={t('field_name_placeholder')} />

        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-soft">{t('field_sex')}</label>
          <SegmentedControl
            value={sex}
            onChange={setSex}
            options={[
              { value: 'M', label: t('sex_male') },
              { value: 'F', label: t('sex_female') },
            ]}
          />
        </div>

        <div className="flex gap-3">
          <FormField label={t('field_age')} value={age} onChange={setAge} placeholder="24" inputMode="numeric" />
          <FormField label={t('field_height')} value={height} onChange={setHeight} placeholder="178" inputMode="numeric" />
          <FormField label={t('field_weight')} value={weight} onChange={setWeight} placeholder="72" inputMode="numeric" />
        </div>
      </div>

      <div className="mt-10">
        {ready ? <PrimaryButton label={t('calculate')} onClick={onNext} /> : <OutlineButton label={t('calculate')} onClick={onNext} />}
      </div>
    </div>
  );
}

function ResultStep({ bmi, age, height, weight, onFinish, t }: { bmi: number; age: number; height: number; weight: number; onFinish: () => void; t: Translator }) {
  const healthy = bmi > 0 && bmi >= 18.5 && bmi < 25;
  return (
    <div className="flex min-h-dvh flex-col justify-between px-6 pt-[calc(env(safe-area-inset-top)+24px)] pb-10">
      <div>
        <Pill label={t('result_step')} tone="accent" className="mb-4" />
        <h2 className="mb-5 text-[28px] leading-[1.15] font-bold tracking-[-0.4px] text-ink">{t('baseline_captured')}</h2>
        <div className="flex items-center gap-4 rounded-[24px] bg-card p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
          <div className="relative h-[190px] w-[120px] shrink-0 overflow-hidden rounded-[16px]">
            <Image src="/images/body-model.png" alt="" fill className="object-cover object-top" />
          </div>
          <div className="flex-1">
            <div className="text-[13px] font-medium text-soft">{t('bmi_label')}</div>
            <div className="mt-1 text-[48px] leading-[0.9] font-bold text-ink">{bmi ? bmi.toFixed(1) : '—'}</div>
            <Pill label={bmiCategory(bmi, t)} tone={healthy ? 'success' : 'ink'} className="mt-2" />
            <div className="mt-3 space-y-1 text-[13px] text-soft">
              <StatRow label={t('stat_age')} value={`${age} ${t('yrs')}`} />
              <StatRow label={t('stat_height')} value={`${height} cm`} />
              <StatRow label={t('stat_weight')} value={`${weight} kg`} />
            </div>
          </div>
        </div>
        <p className="mt-5 text-[16px] leading-[1.45] text-soft">{bmiAdvice(bmi, t)}</p>
      </div>
      <PrimaryButton label={t('enter_asmetry')} onClick={onFinish} />
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  );
}
