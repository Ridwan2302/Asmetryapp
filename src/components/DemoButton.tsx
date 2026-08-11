'use client';

import { useState } from 'react';
import { findDemoEntry } from '@/lib/demoVideos';
import { useT } from '@/lib/i18n';
import { youtubeEmbedUrl, youtubeSearchUrl, youtubeThumbnailUrl } from '@/lib/youtube';
import { useAppStore } from '@/state/store';

/** "Demo" chip next to a task — opens a scrollable modal with a detailed how-to guide for
 * the task, plus a curated video in the user's current language that plays inline in the app
 * (click-to-play, so it doesn't autoplay sound while they're still reading the guide). A video
 * only ever shows in the language the app is currently set to — never the other language's clip
 * as a fallback. */
export function DemoButton({ taskEn }: { taskEn: string }) {
  const t = useT();
  const language = useAppStore((s) => s.language);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const entry = findDemoEntry(taskEn);
  const videoId = entry?.videoId?.[language];

  function handleOpen(e: React.MouseEvent) {
    e.stopPropagation();
    setPlaying(false);
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
              {entry ? (
                <>
                  <div className="text-[11px] font-semibold tracking-[0.3px] text-white/50 uppercase">{t('how_to_title')}</div>
                  <p className="mt-1.5 text-[14px] leading-[1.55] text-white/90">{language === 'fr' ? entry.guide.fr : entry.guide.en}</p>

                  {videoId ? (
                    <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-[14px] bg-black">
                      {playing ? (
                        <iframe
                          src={youtubeEmbedUrl(videoId, language)}
                          className="absolute inset-0 h-full w-full"
                          title={taskEn}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <button onClick={() => setPlaying(true)} className="press absolute inset-0 h-full w-full">
                          {/* eslint-disable-next-line @next/next/no-img-element -- external YouTube thumbnail, not a local/optimizable asset */}
                          <img src={youtubeThumbnailUrl(videoId)} alt="" className="h-full w-full object-cover opacity-80" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-black shadow-lg">
                              <PlayIcon />
                            </span>
                          </div>
                        </button>
                      )}
                    </div>
                  ) : (
                    <a
                      href={youtubeSearchUrl(taskEn)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="press mt-4 inline-block text-[13px] font-semibold text-accent"
                    >
                      {t('search_on_youtube_hint')} →
                    </a>
                  )}
                </>
              ) : (
                <a
                  href={youtubeSearchUrl(taskEn)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-[14px] bg-white/[0.04] px-6 text-center"
                >
                  <span className="text-[13px] font-semibold text-white">{t('guide_unavailable_title')}</span>
                  <span className="text-[12px] text-white/50">{t('guide_unavailable_body')}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PlayIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7Z" />
    </svg>
  );
}
