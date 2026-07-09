'use client';

import { useAppStore } from '@/state/store';
import type { Language } from '@/state/types';

const OPTIONS: { value: Language; label: string; short: string }[] = [
  { value: 'en', label: 'English', short: 'EN' },
  { value: 'fr', label: 'Français', short: 'FR' },
];

/** Native-name EN/FR switcher — language names are always shown in their own language,
 * regardless of the app's current language, matching standard language-picker convention. */
export function LanguageToggle({ className = '', size = 'md' }: { className?: string; size?: 'sm' | 'md' }) {
  const language = useAppStore((s) => s.language);
  const setLanguage = useAppStore((s) => s.setLanguage);
  const idx = OPTIONS.findIndex((o) => o.value === language);
  const sm = size === 'sm';

  return (
    <div className={`relative inline-flex rounded-full bg-fill ${sm ? 'p-0.5' : 'p-1'} ${className}`}>
      <div
        className={`absolute top-0.5 bottom-0.5 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition-transform duration-300`}
        style={{ width: `calc(${100 / OPTIONS.length}% - 2px)`, transform: `translateX(calc(${idx * 100}% + ${idx * 2}px))` }}
      />
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          onClick={() => setLanguage(o.value)}
          className={`relative z-10 text-center font-semibold transition-colors ${sm ? 'w-9 py-1 text-[11px]' : 'flex-1 py-[9px] text-[14px]'} ${
            language === o.value ? 'text-ink' : 'text-soft'
          }`}
        >
          {sm ? o.short : o.label}
        </button>
      ))}
    </div>
  );
}
