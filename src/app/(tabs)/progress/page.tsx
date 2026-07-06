'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Screen } from '@/components/Screen';
import { TrashIcon } from '@/components/TrashIcon';
import { deltaColorClass, signedDelta } from '@/lib/calc';
import { useT } from '@/lib/i18n';
import { useAppStore } from '@/state/store';

export default function ProgressPage() {
  const t = useT();
  const scans = useAppStore((s) => s.scans);
  const deleteScan = useAppStore((s) => s.deleteScan);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  if (scans.length === 0) {
    return (
      <Screen>
        <div className="mb-6 text-[28px] font-bold tracking-[-0.4px] text-ink">{t('progress_title')}</div>
        <Link href="/scan" className="press block rounded-[20px] bg-fill p-8 text-center">
          <div className="text-[17px] font-semibold text-ink">{t('no_scans_yet')}</div>
          <div className="mt-1 text-[13px] font-medium text-accent">{t('run_first_analysis')}</div>
        </Link>
      </Screen>
    );
  }

  const latest = scans[scans.length - 1];
  const prev = scans.length > 1 ? scans[scans.length - 2] : latest;
  const progDelta = latest.overall - prev.overall;

  const recent = scans.slice(-4);
  const maxS = Math.max(...recent.map((x) => x.overall));
  const minS = Math.min(...recent.map((x) => x.overall)) - 6;
  const span = Math.max(1, maxS - minS + 1);

  const trendDeltaNum = latest.overall - scans[0].overall;
  const scanArchive = [...scans].reverse();

  return (
    <Screen>
      <div className="mb-6 text-[28px] font-bold tracking-[-0.4px] text-ink">{t('progress_title')}</div>

      <div className="mb-6 flex items-end justify-between">
        <div>
          <div className="text-[13px] font-medium text-soft">{t('current_score')}</div>
          <div className="mt-1 text-[56px] leading-[0.85] font-bold text-ink">{latest.overall}</div>
        </div>
        <div className="text-right">
          <div className="text-[12px] font-medium text-soft">{t('vs_last_scan')}</div>
          <div className={`text-[26px] leading-[1] font-bold ${deltaColorClass(progDelta)}`}>{signedDelta(progDelta)}</div>
        </div>
      </div>

      <div className="mb-7 rounded-[24px] bg-card p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
        <div className="mb-4 flex items-baseline justify-between">
          <span className="text-[13px] font-semibold text-soft">{t('harmony_trend')}</span>
          <span className={`text-[13px] font-bold ${deltaColorClass(trendDeltaNum)}`}>
            {signedDelta(trendDeltaNum)} {t('since_baseline')}
          </span>
        </div>
        <div className="flex h-[130px] items-end gap-2.5">
          {recent.map((s, i) => (
            <div key={s.id} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <span className="text-[15px] font-bold text-ink">{s.overall}</span>
              <div
                className={`w-full rounded-t-[6px] ${i === recent.length - 1 ? 'bg-accent' : 'bg-fill-strong'}`}
                style={{ height: Math.round(((s.overall - minS) / span) * 70 + 20) }}
              />
              <span className="text-[11px] font-medium text-soft">{s.date}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3 text-[13px] font-semibold tracking-[0.3px] text-soft uppercase">{t('every_scan')}</div>
      {scanArchive.map((s, i) => {
        const older = scanArchive[i + 1];
        const delta = older ? s.overall - older.overall : 0;
        const note = !older ? t('baseline_note') : delta > 0 ? t('improved') : delta < 0 ? t('dipped') : t('held');
        const confirming = confirmId === s.id;
        return (
          <div key={s.id} className="mb-2.5 flex items-center gap-3.5 rounded-2xl bg-card p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
            {confirming ? (
              <div className="flex flex-1 items-center justify-between py-1">
                <span className="text-[14px] font-medium text-ink">{t('delete_scan_confirm')}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setConfirmId(null)} className="press rounded-full bg-fill px-3.5 py-[7px] text-[13px] font-semibold text-ink">
                    {t('cancel')}
                  </button>
                  <button
                    onClick={() => {
                      deleteScan(s.id);
                      setConfirmId(null);
                    }}
                    className="press rounded-full bg-negative px-3.5 py-[7px] text-[13px] font-semibold text-white"
                  >
                    {t('delete')}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="h-16 w-[52px] shrink-0 overflow-hidden rounded-[12px] bg-placeholder">
                  {s.thumb && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.thumb} alt="" className="h-full w-full object-cover [transform:scaleX(-1)]" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-[17px] font-semibold text-ink">{s.title}</div>
                  <div className="text-[13px] text-soft">
                    {s.date} · {note}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[22px] leading-[1] font-bold text-ink">{s.overall}</div>
                  <div className={`text-[12px] font-semibold ${older ? deltaColorClass(delta) : 'text-soft'}`}>{older ? signedDelta(delta) : t('base')}</div>
                </div>
                <button
                  onClick={() => setConfirmId(s.id)}
                  aria-label={t('delete')}
                  className="press flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-soft"
                >
                  <TrashIcon />
                </button>
              </>
            )}
          </div>
        );
      })}
    </Screen>
  );
}
