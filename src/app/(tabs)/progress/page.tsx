'use client';

import Link from 'next/link';
import { Screen } from '@/components/Screen';
import { deltaColorClass, signedDelta } from '@/lib/calc';
import { useT } from '@/lib/i18n';
import { useAppStore } from '@/state/store';
import type { ScanEntry } from '@/state/types';

export default function ProgressPage() {
  const t = useT();
  const scans = useAppStore((s) => s.scans);

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
        <TrendChart points={recent} minS={minS} span={span} />
      </div>

      <div className="mb-3 text-[13px] font-semibold tracking-[0.3px] text-soft uppercase">{t('every_scan')}</div>
      {scanArchive.map((s, i) => {
        const older = scanArchive[i + 1];
        const delta = older ? s.overall - older.overall : 0;
        const note = !older ? t('baseline_note') : delta > 0 ? t('improved') : delta < 0 ? t('dipped') : t('held');
        return (
          <div key={s.id} className="mb-2.5 flex items-center gap-3.5 rounded-2xl bg-card p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]">
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
          </div>
        );
      })}
    </Screen>
  );
}

/** Line chart: SVG for the stroke/fill (fine to stretch non-uniformly), plain HTML dots on top
 * (kept off the SVG's own coordinate system so they stay perfectly round at any width). */
function TrendChart({ points, minS, span }: { points: ScanEntry[]; minS: number; span: number }) {
  const n = points.length;
  const coords = points.map((p, i) => ({
    x: n > 1 ? (i / (n - 1)) * 100 : 50,
    y: 110 - ((p.overall - minS) / span) * 70,
  }));
  const linePath = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ');
  const areaPath = `${linePath} L ${coords[n - 1].x} 130 L ${coords[0].x} 130 Z`;

  return (
    <div>
      <div className="relative h-[130px] w-full">
        <svg viewBox="0 0 100 130" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0A84FF" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#0A84FF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#trendFill)" />
          <path d={linePath} fill="none" stroke="#0A84FF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
        {coords.map((c, i) => (
          <div
            key={i}
            className={`absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${
              i === n - 1 ? 'border-accent bg-accent' : 'border-accent bg-white'
            }`}
            style={{ left: `${c.x}%`, top: `${(c.y / 130) * 100}%` }}
          />
        ))}
      </div>
      <div className="mt-2 flex">
        {points.map((p, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <span className="text-[13px] font-bold text-ink">{p.overall}</span>
            <span className="text-[11px] font-medium text-soft">{p.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
