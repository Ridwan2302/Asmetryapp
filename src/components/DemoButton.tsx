'use client';

import { useState } from 'react';
import { findDemoVideoId } from '@/lib/demoVideos';
import { useT } from '@/lib/i18n';
import { youtubeEmbedUrl, youtubeSearchUrl } from '@/lib/youtube';

/** Small "Demo" chip next to a task — opens an in-app video preview for that task, always in English. */
export function DemoButton({ taskEn }: { taskEn: string }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const videoId = findDemoVideoId(taskEn);

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className="press shrink-0 rounded-full bg-fill px-2 py-[3px] text-[10px] font-medium text-soft"
      >
        {t('demo')}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-8"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
        >
          <div
            className="w-full max-w-[280px] overflow-hidden rounded-[20px] bg-[#0a0a0c] shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between py-2 pr-2 pl-3.5">
              <span className="truncate text-[12px] font-medium text-white/70">{taskEn}</span>
              <button
                onClick={() => setOpen(false)}
                aria-label={t('dismiss')}
                className="press flex h-6 w-6 shrink-0 items-center justify-center text-[18px] leading-none text-white/70"
              >
                ×
              </button>
            </div>
            {videoId ? (
              <div className="relative aspect-square w-full bg-black">
                <iframe
                  src={youtubeEmbedUrl(videoId)}
                  className="absolute inset-0 h-full w-full"
                  title={taskEn}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <a
                href={youtubeSearchUrl(taskEn)}
                target="_blank"
                rel="noopener noreferrer"
                className="press flex aspect-square w-full flex-col items-center justify-center gap-2 bg-white/[0.04] px-6 text-center"
              >
                <span className="text-[13px] font-semibold text-white">No preview yet</span>
                <span className="text-[12px] text-white/50">Tap to search on YouTube</span>
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
