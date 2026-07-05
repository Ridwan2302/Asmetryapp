'use client';

import { useAppStore } from '@/state/store';
import type { Language } from '@/state/types';

const OPTIONS: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
];

/** Native-name EN/FR switcher — language names are always shown in their own language,
 * regardless of the app's current language, matching standard language-picker convention. */
export function LanguageToggle({ className = '' }: { className?: string }) {
  const language = useAppStore((s) => s.language);
  const setLanguage = useAppStore((s) => s.setLanguage);
  const idx = OPTIONS.findIndex((o) => o.value === language);

  return (
    <div className={`relative flex rounded-[14px] bg-fill p-1 ${className}`}>
      <div
        className="absolute top-1 bottom-1 rounded-[10px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition-transform duration-300"
        style={{ width: `calc(${100 / OPTIONS.length}% - 4px)`, transform: `translateX(calc(${idx * 100}% + ${idx * 4}px))` }}
      />
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          onClick={() => setLanguage(o.value)}
          className={`relative z-10 flex-1 py-[9px] text-center text-[14px] font-semibold transition-colors ${language === o.value ? 'text-ink' : 'text-soft'}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
