import type { AnatomyPlate as AnatomyPlateKey } from '../data/programs';
import type { Sex } from '../state/types';

/** Code-drawn line-art plates for programs that ship without a hero photo (Sleep, Hydration).
 * Ported verbatim from the design reference's plateSVG()/bodyPlateSVG() path data. */
export function AnatomyPlate({ plate, sex = 'M' }: { plate: AnatomyPlateKey; sex?: Sex }) {
  if (plate === 'sleep') return <SleepPlate />;
  return <BodyPlate sex={sex} />;
}

function SleepPlate() {
  return (
    <svg viewBox="0 0 320 210" width="100%" height="100%" fill="none" stroke="currentColor" className="text-ink" preserveAspectRatio="xMidYMid meet">
      <circle cx={160} cy={105} r={72} strokeWidth={1.2} opacity={0.5} />
      <path d="M160 33 A72 72 0 0 1 232 105 A72 72 0 0 1 196 168" strokeWidth={4} opacity={0.9} />
      <line x1={160} y1={105} x2={160} y2={33} strokeWidth={0.8} strokeDasharray="3 3" opacity={0.6} />
      <line x1={160} y1={105} x2={196} y2={168} strokeWidth={0.8} strokeDasharray="3 3" opacity={0.6} />
      <path d="M60 105 q10 -22 20 0 q10 22 20 0" strokeWidth={1.2} />
      <text x={150} y={112} fontFamily="var(--font-ui)" fontSize={12} fill="currentColor" stroke="none">
        Z
      </text>
      <g fontFamily="var(--font-ui)" fontSize={6.5} letterSpacing={0.4} fill="currentColor" stroke="none">
        <line x1={232} y1={105} x2={264} y2={98} stroke="currentColor" strokeWidth={0.5} />
        <text x={266} y={100}>SLEEP WINDOW</text>
        <line x1={80} y1={96} x2={80} y2={60} stroke="currentColor" strokeWidth={0.5} />
        <text x={40} y={54}>DEEP-WAVE</text>
        <text x={120} y={200} opacity={0.6}>24-HOUR CIRCADIAN CYCLE</text>
      </g>
    </svg>
  );
}

function BodyPlate({ sex }: { sex: Sex }) {
  const wide = sex === 'F' ? 0.86 : 1;
  const cx = 80;
  return (
    <svg viewBox="0 0 160 300" width="100%" height="100%" fill="none" stroke="currentColor" className="text-ink" preserveAspectRatio="xMidYMid meet">
      <circle cx={cx} cy={30} r={18} strokeWidth={1.5} />
      <path d={`M${cx} 48 L${cx} 62`} strokeWidth={1.5} />
      <path d={`M${cx - 46 * wide} 78 Q${cx} 62 ${cx + 46 * wide} 78`} strokeWidth={1.6} />
      <path d={`M${cx - 44 * wide} 80 L${cx - 52 * wide} 150 L${cx - 42 * wide} 154 L${cx - 30 * wide} 96`} strokeWidth={1.4} />
      <path d={`M${cx + 44 * wide} 80 L${cx + 52 * wide} 150 L${cx + 42 * wide} 154 L${cx + 30 * wide} 96`} strokeWidth={1.4} />
      <path d={`M${cx - 34 * wide} 86 Q${cx} 108 ${cx + 34 * wide} 86`} strokeWidth={1} />
      <path d={`M${cx - 30 * wide} 92 L${cx - 22} 170 L${cx} 176 L${cx + 22} 170 L${cx + 30 * wide} 92`} strokeWidth={1.4} />
      <line x1={cx} y1={100} x2={cx} y2={168} strokeWidth={0.8} opacity={0.6} />
      <path d="M64 118 L96 118 M62 134 L98 134 M64 150 L96 150" strokeWidth={0.8} opacity={0.7} />
      <path d="M68 176 L60 260 L72 262 L78 190" strokeWidth={1.4} />
      <path d="M92 176 L100 260 L88 262 L82 190" strokeWidth={1.4} />
      <g fontFamily="var(--font-ui)" fontSize={6.5} letterSpacing={0.4} fill="currentColor" stroke="none">
        <line x1={cx + 40 * wide} y1={82} x2={150} y2={76} stroke="currentColor" strokeWidth={0.4} />
        <text x={120} y={72}>DELTOID</text>
        <line x1={96} y1={108} x2={140} y2={112} stroke="currentColor" strokeWidth={0.4} />
        <text x={120} y={126}>PECTORAL</text>
        <line x1={96} y1={140} x2={140} y2={150} stroke="currentColor" strokeWidth={0.4} />
        <text x={126} y={164}>CORE</text>
      </g>
    </svg>
  );
}
