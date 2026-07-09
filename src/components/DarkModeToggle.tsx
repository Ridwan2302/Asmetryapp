'use client';

import { useT } from '@/lib/i18n';
import { useAppStore } from '@/state/store';

/** Compact glass pill switcher between light and dark mode — sun/moon thumb slides across a frosted track. */
export function DarkModeToggle() {
  const t = useT();
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? t('switch_to_light_mode') : t('switch_to_dark_mode')}
      className="press relative flex h-9 w-16 shrink-0 items-center rounded-full border border-white/25 bg-white/10 px-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_10px_rgba(0,0,0,0.15)] backdrop-blur-md"
    >
      <span
        className="absolute top-1 left-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#1d1d1f] shadow-[0_1px_3px_rgba(0,0,0,0.25)] transition-transform duration-300"
        style={{ transform: isDark ? 'translateX(28px)' : 'translateX(0)' }}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={12} cy={12} r={4.5} />
      <path d="M12 2.5v2.5M12 19v2.5M21.5 12H19M5 12H2.5M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4 5.6 5.6" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M20.5 14.7A8.5 8.5 0 0 1 9.3 3.5a8.5 8.5 0 1 0 11.2 11.2Z" />
    </svg>
  );
}
