'use client';

import { useT } from '@/lib/i18n';
import { youtubeSearchUrl } from '@/lib/youtube';

/** Small "Demo" chip next to a task — links out to a pre-filled YouTube search for that task. */
export function DemoButton({ task }: { task: string }) {
  const t = useT();
  return (
    <a
      href={youtubeSearchUrl(task)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="press shrink-0 rounded-full bg-gray-400/15 px-2 py-[3px] text-[10px] font-medium text-gray-500"
    >
      {t('demo')}
    </a>
  );
}
