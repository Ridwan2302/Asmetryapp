'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PrimaryButton } from '@/components/Button';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Pill } from '@/components/Pill';
import { useT } from '@/lib/i18n';

const STEPS: { titleKey: 'intro1_title' | 'intro2_title' | 'intro3_title'; bodyKey: 'intro1_body' | 'intro2_body' | 'intro3_body'; img: string }[] = [
  { titleKey: 'intro1_title', bodyKey: 'intro1_body', img: '/images/onboarding/intro-scan.png' },
  { titleKey: 'intro2_title', bodyKey: 'intro2_body', img: '/images/onboarding/intro-jaw.png' },
  { titleKey: 'intro3_title', bodyKey: 'intro3_body', img: '/images/onboarding/welcome-hero.png' },
];

const WHY: { titleKey: 'landing_why_1_title' | 'landing_why_2_title' | 'landing_why_3_title'; bodyKey: 'landing_why_1_body' | 'landing_why_2_body' | 'landing_why_3_body' }[] = [
  { titleKey: 'landing_why_1_title', bodyKey: 'landing_why_1_body' },
  { titleKey: 'landing_why_2_title', bodyKey: 'landing_why_2_body' },
  { titleKey: 'landing_why_3_title', bodyKey: 'landing_why_3_body' },
];

export function LandingPage() {
  const router = useRouter();
  const t = useT();

  function getStarted() {
    router.push('/onboarding');
  }

  return (
    <div className="min-h-dvh bg-paper">
      <div className="flex items-center justify-between px-6 pt-[calc(env(safe-area-inset-top)+20px)]">
        <div className="flex items-center gap-2.5">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-[10px] shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
            <Image src="/icons/icon-192.png" alt="Asmetry" fill className="object-cover" />
          </div>
          <div className="text-[17px] font-bold tracking-[-0.3px] text-ink">
            asmetry<span className="font-medium text-soft">.io</span>
          </div>
        </div>
        <LanguageToggle size="sm" />
      </div>

      <div className="px-6 pt-6 pb-10">
        <Pill label={t('landing_badge')} tone="accent" />

        <h1 className="mt-4 text-[34px] leading-[1.1] font-bold tracking-[-0.5px] text-ink">{t('welcome_headline')}</h1>
        <p className="mt-3 text-[16px] leading-[1.45] text-soft">{t('brand_tagline')}</p>

        <div className="my-6 relative aspect-square w-full overflow-hidden rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
          <Image src="/images/onboarding/welcome-hero.png" alt="" fill className="object-cover" priority />
        </div>

        <PrimaryButton label={t('landing_get_started')} onClick={getStarted} />
        <div className="mt-3 text-center text-[12px] text-soft">{t('welcome_subtitle')}</div>

        <div className="mt-3 text-center text-[13px] text-soft">
          {t('landing_already')}{' '}
          <Link href="/home" className="font-semibold text-accent">
            {t('landing_open_app')}
          </Link>
        </div>
      </div>

      <div className="px-6 pb-10">
        <div className="mb-1 text-[13px] font-semibold tracking-[0.3px] text-soft uppercase">{t('landing_how_it_works')}</div>
        <p className="mb-5 text-[15px] text-soft">{t('landing_how_it_works_sub')}</p>

        <div className="space-y-3">
          {STEPS.map((step, i) => (
            <div key={i} className="flex items-center gap-3.5 rounded-[20px] bg-card p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[14px]">
                <Image src={step.img} alt="" fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="text-[16px] font-bold text-ink">
                  {i + 1}. {t(step.titleKey)}
                </div>
                <div className="mt-0.5 text-[13px] leading-[1.35] text-soft">{t(step.bodyKey)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 pb-10">
        <div className="mb-4 text-[13px] font-semibold tracking-[0.3px] text-soft uppercase">{t('landing_why_title')}</div>
        <div className="space-y-4">
          {WHY.map((w, i) => (
            <div key={i} className="flex gap-3.5">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[13px] font-bold text-accent">{i + 1}</div>
              <div>
                <div className="text-[16px] font-bold text-ink">{t(w.titleKey)}</div>
                <div className="mt-0.5 text-[14px] leading-[1.45] text-soft">{t(w.bodyKey)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 pb-10">
        <div className="rounded-[24px] bg-gradient-to-br from-[#1c1c1e] to-[#0a0a0c] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
          <div className="text-[17px] font-bold text-white">{t('landing_install_title')}</div>
          <p className="mt-1.5 text-[14px] leading-[1.45] text-white/60">{t('landing_install_body')}</p>
        </div>
      </div>

      <div className="px-6 pb-16 text-center">
        <h2 className="mb-2 text-[24px] leading-[1.15] font-bold tracking-[-0.3px] text-ink">{t('landing_final_cta_title')}</h2>
        <p className="mb-5 text-[15px] text-soft">{t('landing_final_cta_body')}</p>
        <PrimaryButton label={t('landing_get_started')} onClick={getStarted} />

        <p className="mt-8 text-[12px] text-soft">
          asmetry.io · {new Date().getFullYear()} · {t('landing_footer_rights')}
        </p>
      </div>
    </div>
  );
}
