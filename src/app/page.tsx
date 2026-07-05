'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LandingPage } from '@/screens/LandingPage';
import { useAppStore } from '@/state/store';

/** Returning/onboarded visitors (mainly the installed PWA, whose manifest start_url is "/")
 * skip straight to the app. First-time visitors — e.g. from a shared link — see the marketing
 * landing page instead of being dropped straight into onboarding. */
export default function RootGate() {
  const router = useRouter();
  const onboarded = useAppStore((s) => s.onboarded);

  useEffect(() => {
    if (onboarded) router.replace('/home');
  }, [onboarded, router]);

  if (onboarded) return null;
  return <LandingPage />;
}
