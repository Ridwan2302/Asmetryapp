'use client';

import { useState } from 'react';
import { useT, type TranslationKey } from '@/lib/i18n';

const MESSAGE_KEYS: TranslationKey[] = [
  'encouragement_1',
  'encouragement_2',
  'encouragement_3',
  'encouragement_4',
  'encouragement_5',
  'encouragement_6',
  'encouragement_7',
  'encouragement_8',
];

/** Shown right after logging a day that didn't finish the program (finishing the program has its
 * own dedicated completion screen already) — picks one encouraging line at random so it doesn't
 * feel identical every day, and calls out week milestones specially. */
export function EncouragementModal({ day, onClose }: { day: number; onClose: () => void }) {
  const t = useT();
  const [messageKey] = useState(() => MESSAGE_KEYS[Math.floor(Math.random() * MESSAGE_KEYS.length)]);
  const weekJustCompleted = day > 0 && day < 28 && day % 7 === 0 ? day / 7 : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-8" onClick={onClose}>
      <div
        className="w-full max-w-[300px] rounded-[22px] bg-card p-6 text-center shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
          <SparkIcon />
        </div>
        <div className="text-[18px] font-bold tracking-[-0.2px] text-ink">
          {weekJustCompleted ? (
            <>
              {t('week_label')} {weekJustCompleted} {t('week_complete_suffix')}
            </>
          ) : (
            t('encouragement_title')
          )}
        </div>
        <p className="mt-2 text-[14px] leading-[1.5] text-soft">{t(messageKey)}</p>
        <button onClick={onClose} className="press mt-5 w-full rounded-full bg-accent py-3 text-[14px] font-semibold text-white">
          {t('continue_cta')}
        </button>
      </div>
    </div>
  );
}

function SparkIcon() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2Z" />
    </svg>
  );
}
