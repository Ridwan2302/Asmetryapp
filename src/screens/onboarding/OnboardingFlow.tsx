'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { OutlineButton, PrimaryButton } from '@/components/Button';
import { Pill } from '@/components/Pill';
import { bmiAdvice, bmiCategory, bmiOf } from '@/lib/calc';
import { useAppStore } from '@/state/store';
import { Sex } from '@/state/types';

const introData = [
  {
    label: 'STEP 01 · ANALYZE',
    title: 'Scan your face',
    body: 'A quick capture measures symmetry, proportion and seven structural traits.',
    img: '/images/onboarding/intro-scan.png',
  },
  {
    label: 'STEP 02 · PROTOCOL',
    title: 'Follow the program',
    body: 'Get 4-week daily protocols built around your weakest metrics — mewing, jawmaxing, hunter eyes and more.',
    img: '/images/onboarding/intro-jaw.png',
  },
  {
    label: 'STEP 03 · TRACK',
    title: 'Watch it change',
    body: 'Check off daily tasks, get reminders, and re-scan to see the structure improve.',
    img: '/images/onboarding/welcome-hero.png',
  },
];

export function OnboardingFlow({ mode }: { mode: 'initial' | 'edit' }) {
  const router = useRouter();
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
      name: (name || 'You').trim(),
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
    <div className="min-h-dvh">
      {step === 0 && <Welcome onNext={next} />}
      {step >= 1 && step <= 3 && <Intro idx={step - 1} onNext={next} onSkip={skipIntro} />}
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
        />
      )}
      {step >= 5 && (
        <ResultStep
          bmi={bmiLive}
          age={parseInt(age, 10) || profile.age}
          height={parseInt(height, 10) || profile.height}
          weight={parseInt(weight, 10) || profile.weight}
          onFinish={finish}
        />
      )}
    </div>
  );
}

function Welcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex min-h-dvh flex-col justify-between px-[30px] pt-[calc(env(safe-area-inset-top)+40px)] pb-[46px]">
      <div className="flex items-center gap-3">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.12)]">
          <Image src="/images/logo.png" alt="Asmetry logo" fill className="object-cover" />
        </div>
        <div>
          <div className="font-display text-[28px] leading-none font-bold tracking-[-0.5px] text-ink">
            asmetry<span className="font-normal text-soft">.io</span>
          </div>
          <div className="mt-[3px] font-ui text-[8.5px] tracking-[2.5px] text-soft">FACIAL ANALYSIS · LOOKSMAXING OS</div>
        </div>
      </div>

      <div className="my-6 flex flex-1 items-center">
        <div className="relative aspect-square w-full overflow-hidden rounded-[26px] shadow-[0_24px_50px_rgba(0,0,0,0.28)]">
          <Image src="/images/onboarding/welcome-hero.png" alt="" fill className="object-cover" priority />
        </div>
      </div>

      <div>
        <div className="mb-[22px] max-w-[320px] font-display text-[32px] leading-[1.15] text-ink">
          Measure your face.
          <br />
          Follow the protocol.
          <br />
          Watch the structure change.
        </div>
        <PrimaryButton label="BEGIN →" onClick={onNext} />
        <div className="mt-4 text-center font-ui text-[9px] tracking-[1px] text-soft">TAKES 90 SECONDS · DATA STAYS ON DEVICE</div>
      </div>
    </div>
  );
}

function Intro({ idx, onNext, onSkip }: { idx: number; onNext: () => void; onSkip: () => void }) {
  const cur = introData[idx];
  return (
    <div className="flex min-h-dvh flex-col justify-between px-[34px] pt-[calc(env(safe-area-inset-top)+56px)] pb-[46px]">
      <div>
        <div className="font-ui text-[11px] tracking-[3px] text-soft">{cur.label}</div>
        <div className="relative my-[22px] h-[300px] overflow-hidden rounded-[22px] shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
          <Image src={cur.img} alt="" fill className="object-cover" />
        </div>
        <div className="font-display text-[40px] leading-[1.02] tracking-[-0.5px] text-ink">{cur.title}</div>
        <div className="mt-[14px] font-display text-[20px] leading-[1.4] text-[#3B352D]">{cur.body}</div>
      </div>
      <div>
        <div className="mb-[22px] flex justify-center gap-[6px]">
          {introData.map((_, i) => (
            <div
              key={i}
              className="h-[6px] rounded-full transition-all"
              style={{ width: i === idx ? 20 : 6, backgroundColor: i === idx ? '#14110E' : 'rgba(20,17,14,0.2)' }}
            />
          ))}
        </div>
        <PrimaryButton label={idx === 2 ? 'CONTINUE' : 'NEXT →'} onClick={onNext} />
        <button onClick={onSkip} className="mt-[14px] block w-full text-center font-ui text-[9px] tracking-[1px] text-soft">
          SKIP INTRO
        </button>
      </div>
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
}) {
  const { name, setName, sex, setSex, age, setAge, height, setHeight, weight, setWeight, ready, onNext } = props;
  return (
    <div className="min-h-dvh px-[34px] pt-[calc(env(safe-area-inset-top)+60px)] pb-[46px]">
      <div className="font-ui text-[11px] tracking-[3px] text-soft">STEP 04 · YOUR BASELINE</div>
      <div className="mt-[6px] mb-7 font-display text-[40px] leading-[1.02] tracking-[-0.5px] text-ink">Tell us about you</div>

      <label className="mb-2 block font-ui text-[10px] tracking-[1.5px] text-soft">NAME</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className="mb-[26px] w-full border-0 border-b border-[rgba(20,17,14,0.25)] bg-transparent py-[10px] font-ui text-[18px] text-ink outline-none placeholder:text-soft"
      />

      <label className="mb-[10px] block font-ui text-[10px] tracking-[1.5px] text-soft">SEX (FOR ANATOMY MODEL)</label>
      <div className="mb-[26px] flex gap-2">
        {(['M', 'F'] as Sex[]).map((v) => (
          <button
            key={v}
            onClick={() => setSex(v)}
            className={`flex-1 rounded-[14px] border border-border-strong py-[13px] text-center font-ui text-[11px] tracking-[1px] ${
              sex === v ? 'bg-ink text-paper' : 'bg-transparent text-ink'
            }`}
          >
            {v === 'M' ? 'MALE' : 'FEMALE'}
          </button>
        ))}
      </div>

      <div className="flex gap-[14px]">
        <div className="flex-1">
          <label className="mb-2 block font-ui text-[10px] tracking-[1.5px] text-soft">AGE</label>
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="24"
            inputMode="numeric"
            className="w-full border-0 border-b border-[rgba(20,17,14,0.25)] bg-transparent py-[10px] font-ui text-[18px] text-ink outline-none placeholder:text-soft"
          />
        </div>
        <div className="flex-1">
          <label className="mb-2 block font-ui text-[10px] tracking-[1.5px] text-soft">HEIGHT · CM</label>
          <input
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="178"
            inputMode="numeric"
            className="w-full border-0 border-b border-[rgba(20,17,14,0.25)] bg-transparent py-[10px] font-ui text-[18px] text-ink outline-none placeholder:text-soft"
          />
        </div>
        <div className="flex-1">
          <label className="mb-2 block font-ui text-[10px] tracking-[1.5px] text-soft">WEIGHT · KG</label>
          <input
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="72"
            inputMode="numeric"
            className="w-full border-0 border-b border-[rgba(20,17,14,0.25)] bg-transparent py-[10px] font-ui text-[18px] text-ink outline-none placeholder:text-soft"
          />
        </div>
      </div>

      <div className="mt-10">{ready ? <PrimaryButton label="CALCULATE →" onClick={onNext} /> : <OutlineButton label="CALCULATE →" onClick={onNext} />}</div>
    </div>
  );
}

function ResultStep({ bmi, age, height, weight, onFinish }: { bmi: number; age: number; height: number; weight: number; onFinish: () => void }) {
  return (
    <div className="flex min-h-dvh flex-col justify-between px-[34px] pt-[calc(env(safe-area-inset-top)+50px)] pb-[46px]">
      <div>
        <div className="font-ui text-[11px] tracking-[3px] text-soft">STEP 05 · YOUR MODEL</div>
        <div className="mt-[6px] mb-5 font-display text-[38px] leading-[1.02] tracking-[-0.5px] text-ink">Baseline captured</div>
        <div className="flex items-center gap-[18px]">
          <div className="relative h-[240px] w-[150px] shrink-0 overflow-hidden rounded-2xl">
            <Image src="/images/body-model.png" alt="" fill className="object-cover object-top" />
          </div>
          <div className="flex-1">
            <div className="font-ui text-[10px] tracking-[1.5px] text-soft">BODY MASS INDEX</div>
            <div className="mt-[6px] font-display text-[64px] leading-[0.85] text-ink">{bmi ? bmi.toFixed(1) : '—'}</div>
            <Pill label={bmiCategory(bmi)} className="mt-2" />
            <div className="mt-4 font-ui text-[10px] leading-[1.9] text-soft">
              <StatRow label="AGE" value={`${age} YRS`} />
              <StatRow label="HEIGHT" value={`${height} CM`} />
              <StatRow label="WEIGHT" value={`${weight} KG`} last />
            </div>
          </div>
        </div>
        <div className="mt-6 font-display text-[19px] leading-[1.4] text-[#3B352D]">{bmiAdvice(bmi)}</div>
      </div>
      <PrimaryButton label="ENTER ASMETRY →" onClick={onFinish} />
    </div>
  );
}

function StatRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={`flex justify-between py-[3px] ${!last ? 'border-b border-border-soft' : ''}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
