'use client';

import Link from 'next/link';
import { Screen } from '@/components/Screen';
import { deltaColorClass, signedDelta } from '@/lib/calc';
import { useAppStore } from '@/state/store';

export default function ProgressPage() {
  const scans = useAppStore((s) => s.scans);

  if (scans.length === 0) {
    return (
      <Screen>
        <div className="font-ui text-[11px] tracking-[3px] text-soft">MODULE 03</div>
        <div className="mt-1 mb-[22px] font-display text-[34px] text-ink">Progress</div>
        <Link href="/scan" className="block rounded-[20px] border border-dashed border-border-strong p-[30px] text-center">
          <div className="font-display text-[20px] text-[#3B352D]">No scans yet</div>
          <div className="mt-[6px] font-ui text-[10px] tracking-[1px] text-soft">RUN YOUR FIRST ANALYSIS →</div>
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
      <div className="font-ui text-[11px] tracking-[3px] text-soft">MODULE 03</div>
      <div className="mt-1 mb-[22px] font-display text-[34px] text-ink">Progress</div>

      <div className="mb-[22px] flex items-end justify-between">
        <div>
          <div className="font-ui text-[10px] tracking-[1.5px] text-soft">CURRENT SCORE</div>
          <div className="mt-1 font-display text-[72px] leading-[0.85] text-ink">{latest.overall}</div>
        </div>
        <div className="text-right">
          <div className="font-ui text-[9px] tracking-[1px] text-soft">VS LAST SCAN</div>
          <div className={`font-display text-[32px] leading-[1] ${deltaColorClass(progDelta)}`}>{signedDelta(progDelta)}</div>
        </div>
      </div>

      <div className="mb-7 rounded-[22px] border border-border bg-card p-5 px-5">
        <div className="mb-[18px] flex items-baseline justify-between">
          <span className="font-ui text-[10px] tracking-[1.5px] text-soft">HARMONY INDEX · TREND</span>
          <span className="font-ui text-[11px] text-ink">{signedDelta(trendDeltaNum)} SINCE BASELINE</span>
        </div>
        <div className="flex h-[130px] items-end gap-[10px]">
          {recent.map((s, i) => (
            <div key={s.id} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <span className="font-display text-[18px] text-ink">{s.overall}</span>
              <div
                className={`w-full rounded-t-[5px] ${i === recent.length - 1 ? 'bg-accent' : 'bg-[rgba(20,17,14,0.25)]'}`}
                style={{ height: Math.round(((s.overall - minS) / span) * 70 + 20) }}
              />
              <span className="font-ui text-[8px] tracking-[0.5px] text-soft">{s.date}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3 font-ui text-[10px] tracking-[2px] text-ink">EVERY SCAN</div>
      {scanArchive.map((s, i) => {
        const older = scanArchive[i + 1];
        const delta = older ? s.overall - older.overall : 0;
        const note = !older ? 'BASELINE' : delta > 0 ? 'IMPROVED' : delta < 0 ? 'DIPPED' : 'HELD';
        return (
          <div key={s.id} className="mb-[10px] flex items-center gap-[14px] rounded-2xl border border-border bg-card p-3">
            <div className="h-16 w-[52px] shrink-0 overflow-hidden rounded-[10px] bg-[#E7E3DA]">
              {s.thumb && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={s.thumb} alt="" className="h-full w-full object-cover [transform:scaleX(-1)]" />
              )}
            </div>
            <div className="flex-1">
              <div className="font-display text-[20px] text-ink">{s.title}</div>
              <div className="font-ui text-[9px] tracking-[1px] text-soft">
                {s.date} · {note}
              </div>
            </div>
            <div className="text-right">
              <div className="font-display text-[28px] leading-[1] text-ink">{s.overall}</div>
              <div className={`font-ui text-[9px] ${older ? deltaColorClass(delta) : 'text-soft'}`}>{older ? signedDelta(delta) : 'BASE'}</div>
            </div>
          </div>
        );
      })}
    </Screen>
  );
}
