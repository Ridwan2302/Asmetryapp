'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppStore } from '@/state/store';

export default function RootGate() {
  const router = useRouter();
  const onboarded = useAppStore((s) => s.onboarded);

  useEffect(() => {
    router.replace(onboarded ? '/home' : '/onboarding');
  }, [onboarded, router]);

  return null;
}
