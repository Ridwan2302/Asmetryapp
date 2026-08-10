'use client';

import { useEffect, useRef, useState } from 'react';
import { findDemoVideoId } from '@/lib/demoVideos';
import { useT } from '@/lib/i18n';
import { loadYouTubeIframeApi, youtubeSearchUrl, type YTPlayer } from '@/lib/youtube';

const PLAYER_READY_TIMEOUT_MS = 6000;

/** Small "Demo" chip next to a task — opens an in-app video preview for that task, always in English.
 * Plays through the YouTube IFrame Player API rather than a raw iframe embed so a video that's been
 * deleted, made private, or had embedding disabled surfaces as a catchable error — the panel then
 * falls back to a "search on YouTube" link instead of showing a dead player. */
export function DemoButton({ taskEn }: { taskEn: string }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [broken, setBroken] = useState(false);
  const videoId = findDemoVideoId(taskEn);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);

  useEffect(() => {
    if (!open || !videoId) return;
    let cancelled = false;

    const timeout = setTimeout(() => {
      if (!cancelled) setBroken(true);
    }, PLAYER_READY_TIMEOUT_MS);

    loadYouTubeIframeApi()
      .then((YT) => {
        if (cancelled || !containerRef.current) return;
        playerRef.current = new YT.Player(containerRef.current, {
          videoId,
          playerVars: { hl: 'en', cc_lang_pref: 'en', modestbranding: 1, rel: 0, autoplay: 1, mute: 1 },
          events: {
            onReady: () => clearTimeout(timeout),
            onError: () => {
              clearTimeout(timeout);
              if (!cancelled) setBroken(true);
            },
          },
        });
      })
      .catch(() => {
        clearTimeout(timeout);
        if (!cancelled) setBroken(true);
      });

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [open, videoId]);

  const showFallback = !videoId || broken;

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setBroken(false);
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
            {showFallback ? (
              <a
                href={youtubeSearchUrl(taskEn)}
                target="_blank"
                rel="noopener noreferrer"
                className="press flex aspect-square w-full flex-col items-center justify-center gap-2 bg-white/[0.04] px-6 text-center"
              >
                <span className="text-[13px] font-semibold text-white">No preview yet</span>
                <span className="text-[12px] text-white/50">Tap to search on YouTube</span>
              </a>
            ) : (
              <div className="relative aspect-square w-full bg-black">
                <div ref={containerRef} className="absolute inset-0 h-full w-full" />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
