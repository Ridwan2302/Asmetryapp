'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/state/store';
import { InstallPrompt } from './InstallPrompt';

export function Providers({ children }: { children: React.ReactNode }) {
  // `hasHydrated` defaults to false in the store's initial state, so the server render and
  // the first client render (before this effect fires) both render nothing here — that keeps
  // them identical and avoids a hydration mismatch. `onRehydrateStorage` (in store.ts) flips
  // it to true once the persisted state has actually finished loading from localStorage.
  const hasHydrated = useAppStore((s) => s.hasHydrated);

  useEffect(() => {
    useAppStore.persist.rehydrate();
  }, []);

  return (
    <div className="mx-auto min-h-dvh w-full max-w-[480px] bg-paper text-ink shadow-[0_0_80px_rgba(0,0,0,0.5)]">
      {hasHydrated ? (
        <>
          <InstallPrompt />
          {children}
        </>
      ) : null}
    </div>
  );
}
