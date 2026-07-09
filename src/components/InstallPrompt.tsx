'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useT } from '@/lib/i18n';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'asmetry_install_dismissed';

function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(display-mode: standalone)').matches || (window.navigator as unknown as { standalone?: boolean }).standalone === true;
}

function isIos(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

export function InstallPrompt() {
  const t = useT();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  // `visible`/`ios` start false so the server render and the pre-hydration client render match
  // (avoiding a hydration mismatch); this effect is what's allowed to differ post-hydration
  // once we can actually read navigator/localStorage on the client.
  const [{ visible, ios }, setDisplay] = useState({ visible: false, ios: false });
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    if (isStandalone()) return;
    if (localStorage.getItem(DISMISS_KEY)) return;

    if (isIos()) {
      // Deliberately deferred to an effect (not a lazy useState initializer) so the very first
      // client render matches the server's (both hidden) before this client-only UA/localStorage
      // check can run — a lazy initializer would run during SSR too and risk a hydration mismatch.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay({ visible: true, ios: true });
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setDisplay({ visible: true, ios: false });
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, '1');
    setDisplay((d) => ({ ...d, visible: false }));
  }

  async function handleInstall() {
    if (!deferredPrompt) return;
    setInstalling(true);
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setInstalling(false);
    if (outcome === 'accepted') {
      localStorage.setItem(DISMISS_KEY, '1');
    }
    setDisplay((d) => ({ ...d, visible: false }));
    setDeferredPrompt(null);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-[calc(env(safe-area-inset-top)+10px)]">
      <div className="w-full max-w-[456px] animate-[slide-up_0.4s_cubic-bezier(0.34,1.56,0.64,1)] rounded-[22px] border border-white/14 bg-white/10 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[13px] shadow-sm">
            <Image src="/icons/icon-192.png" alt="Asmetry" fill className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-semibold text-ink">{t('install_title')}</div>
            <div className="truncate text-[13px] text-soft">{ios ? t('install_ios_hint') : t('install_android_hint')}</div>
          </div>
          {ios ? (
            <span className="flex shrink-0 items-center justify-center rounded-full bg-fill p-2">
              <ShareIcon />
            </span>
          ) : (
            <button
              onClick={handleInstall}
              disabled={installing}
              className="press shrink-0 rounded-full bg-accent px-4 py-[9px] text-[14px] font-semibold text-white disabled:opacity-50"
            >
              {installing ? '…' : t('install_button')}
            </button>
          )}
          <button onClick={dismiss} className="press shrink-0 text-[20px] leading-none text-soft" aria-label={t('dismiss')}>
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

function ShareIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#f5f5f7" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12" />
      <path d="M8 7l4-4 4 4" />
      <path d="M5 12v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7" />
    </svg>
  );
}
