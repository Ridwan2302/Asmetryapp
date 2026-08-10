'use client';

import { useEffect, useState } from 'react';
import { useT } from '@/lib/i18n';

const CURRENT_BUILD_ID = process.env.NEXT_PUBLIC_BUILD_ID ?? null;
const POLL_MS = 5 * 60 * 1000;

/** Polls the server's current build id (see /api/build-id) and shows a reload banner
 * once it differs from the build the page was actually loaded with — i.e. a newer
 * version has been deployed while this tab was still open. */
export function UpdateBanner() {
  const t = useT();
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    if (!CURRENT_BUILD_ID) return;

    let cancelled = false;
    async function check() {
      try {
        const res = await fetch('/api/build-id', { cache: 'no-store' });
        const data = (await res.json()) as { buildId: string | null };
        if (!cancelled && data.buildId && data.buildId !== CURRENT_BUILD_ID) {
          setAvailable(true);
        }
      } catch {
        // offline or transient network error — just try again on the next tick
      }
    }

    check();
    const interval = setInterval(check, POLL_MS);
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', check);

    function onVisible() {
      if (document.visibilityState === 'visible') check();
    }

    return () => {
      cancelled = true;
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', check);
    };
  }, []);

  if (!available) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[calc(env(safe-area-inset-bottom)+14px)]">
      <div className="flex w-full max-w-[456px] animate-[slide-up_0.4s_cubic-bezier(0.34,1.56,0.64,1)] items-center gap-3 rounded-[22px] border border-border bg-card p-3 shadow-[0_4px_10px_rgba(0,0,0,0.06),0_16px_40px_rgba(0,0,0,0.16)] backdrop-blur-xl">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
          <RefreshIcon />
        </span>
        <div className="min-w-0 flex-1 text-[14px] font-semibold text-ink">{t('update_available_title')}</div>
        <button
          onClick={() => window.location.reload()}
          className="press shrink-0 rounded-full bg-accent px-4 py-[9px] text-[14px] font-semibold text-white"
        >
          {t('update_button')}
        </button>
      </div>
    </div>
  );
}

function RefreshIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 11a8 8 0 0 0-14.9-3.5M4 13a8 8 0 0 0 14.9 3.5" />
      <path d="M5 4v4h4M19 20v-4h-4" />
    </svg>
  );
}
