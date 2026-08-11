'use client';

import { useState } from 'react';
import { findDemoEntry } from '@/lib/demoVideos';
import { useT } from '@/lib/i18n';
import { useAppStore } from '@/state/store';

/** "Demo" chip next to a task — opens a scrollable modal with a detailed step-by-step guide for
 * the task: a clear title, exactly how to do it, and the benefits. No video, no external link —
 * self-contained. Renders nothing when no guide is curated for that task. */
export function DemoButton({ taskEn }: { taskEn: string }) {
  const t = useT();
  const language = useAppStore((s) => s.language);
  const [open, setOpen] = useState(false);
  const entry = findDemoEntry(taskEn);

  if (!entry) return null;

  const guide = language === 'fr' ? entry.guide.fr : entry.guide.en;

  function handleOpen(e: React.MouseEvent) {
    e.stopPropagation();
    setOpen(true);
  }

  return (
    <>
      <button onClick={handleOpen} className="press shrink-0 rounded-full bg-fill px-2 py-[3px] text-[10px] font-medium text-soft">
        {t('demo')}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-6"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
        >
          <div
            className="flex max-h-[80vh] w-full max-w-[360px] flex-col overflow-hidden rounded-[20px] bg-[#0a0a0c] shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 py-2 pr-2 pl-3.5">
              <span className="truncate text-[12px] font-medium text-white/70">{taskEn}</span>
              <button
                onClick={() => setOpen(false)}
                aria-label={t('dismiss')}
                className="press flex h-6 w-6 shrink-0 items-center justify-center text-[18px] leading-none text-white/70"
              >
                ×
              </button>
            </div>

            <div className="overflow-y-auto p-4">
              <div className="text-[16px] font-bold leading-[1.25] text-white">{guide.title}</div>

              <div className="mt-4 text-[11px] font-semibold tracking-[0.3px] text-white/50 uppercase">{t('how_to_title')}</div>
              <ol className="mt-2 space-y-2">
                {guide.steps.map((step, i) => (
                  <li key={i} className="flex gap-2.5 text-[14px] leading-[1.5] text-white/90">
                    <span className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-white/10 text-[11px] font-semibold text-white/70">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-5 text-[11px] font-semibold tracking-[0.3px] text-white/50 uppercase">{t('guide_benefits_title')}</div>
              <ul className="mt-2 space-y-1.5">
                {guide.benefits.map((benefit, i) => (
                  <li key={i} className="flex gap-2 text-[14px] leading-[1.5] text-white/90">
                    <span className="mt-[7px] h-[4px] w-[4px] shrink-0 rounded-full bg-accent" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
