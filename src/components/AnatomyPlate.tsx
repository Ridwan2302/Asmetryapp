import React from 'react';
import Svg, { Circle, G, Line, Path, Text as SvgText } from 'react-native-svg';
import { colors } from '../theme/tokens';
import type { AnatomyPlate as AnatomyPlateKey } from '../data/programs';

/** Code-drawn line-art plates for programs that ship without a hero photo (Sleep, Hydration).
 * Ported from the design reference's plateSVG()/bodyPlateSVG() path data. */
export function AnatomyPlate({ plate }: { plate: AnatomyPlateKey }) {
  if (plate === 'sleep') return <SleepPlate />;
  return <BodyPlate />;
}

const labelProps = { fontFamily: 'Montserrat_400Regular', fontSize: 6.5, letterSpacing: 0.4, fill: colors.ink, stroke: 'none' as const };
const lineProps = { stroke: colors.ink, strokeWidth: 0.5 };

function SleepPlate() {
  return (
    <Svg viewBox="0 0 320 210" width="100%" height="100%">
      <Circle cx={160} cy={105} r={72} stroke={colors.ink} strokeWidth={1.2} opacity={0.5} fill="none" />
      <Path
        d="M160 33 A72 72 0 0 1 232 105 A72 72 0 0 1 196 168"
        stroke={colors.ink}
        strokeWidth={4}
        opacity={0.9}
        fill="none"
      />
      <Line x1={160} y1={105} x2={160} y2={33} stroke={colors.ink} strokeWidth={0.8} strokeDasharray="3 3" opacity={0.6} />
      <Line x1={160} y1={105} x2={196} y2={168} stroke={colors.ink} strokeWidth={0.8} strokeDasharray="3 3" opacity={0.6} />
      <Path d="M60 105 q10 -22 20 0 q10 22 20 0" stroke={colors.ink} strokeWidth={1.2} fill="none" />
      <SvgText x={150} y={112} fontFamily="Montserrat_400Regular" fontSize={12} fill={colors.ink}>Z</SvgText>
      <G>
        <Line {...lineProps} x1={232} y1={105} x2={264} y2={98} />
        <SvgText {...labelProps} x={266} y={100}>SLEEP WINDOW</SvgText>
        <Line {...lineProps} x1={80} y1={96} x2={80} y2={60} />
        <SvgText {...labelProps} x={40} y={54}>DEEP-WAVE</SvgText>
        <SvgText {...labelProps} x={120} y={200} opacity={0.6}>24-HOUR CIRCADIAN CYCLE</SvgText>
      </G>
    </Svg>
  );
}

function BodyPlate() {
  const wide = 1;
  const cx = 80;
  return (
    <Svg viewBox="0 0 160 300" width="100%" height="100%">
      <Circle cx={cx} cy={30} r={18} stroke={colors.ink} strokeWidth={1.5} fill="none" />
      <Path d={`M${cx} 48 L${cx} 62`} stroke={colors.ink} strokeWidth={1.5} fill="none" />
      <Path d={`M${cx - 46 * wide} 78 Q${cx} 62 ${cx + 46 * wide} 78`} stroke={colors.ink} strokeWidth={1.6} fill="none" />
      <Path
        d={`M${cx - 44 * wide} 80 L${cx - 52 * wide} 150 L${cx - 42 * wide} 154 L${cx - 30 * wide} 96`}
        stroke={colors.ink}
        strokeWidth={1.4}
        fill="none"
      />
      <Path
        d={`M${cx + 44 * wide} 80 L${cx + 52 * wide} 150 L${cx + 42 * wide} 154 L${cx + 30 * wide} 96`}
        stroke={colors.ink}
        strokeWidth={1.4}
        fill="none"
      />
      <Path d={`M${cx - 34 * wide} 86 Q${cx} 108 ${cx + 34 * wide} 86`} stroke={colors.ink} strokeWidth={1} fill="none" />
      <Path
        d={`M${cx - 30 * wide} 92 L${cx - 22} 170 L${cx} 176 L${cx + 22} 170 L${cx + 30 * wide} 92`}
        stroke={colors.ink}
        strokeWidth={1.4}
        fill="none"
      />
      <Line x1={cx} y1={100} x2={cx} y2={168} stroke={colors.ink} strokeWidth={0.8} opacity={0.6} />
      <Path d="M64 118 L96 118 M62 134 L98 134 M64 150 L96 150" stroke={colors.ink} strokeWidth={0.8} opacity={0.7} fill="none" />
      <Path d="M68 176 L60 260 L72 262 L78 190" stroke={colors.ink} strokeWidth={1.4} fill="none" />
      <Path d="M92 176 L100 260 L88 262 L82 190" stroke={colors.ink} strokeWidth={1.4} fill="none" />
      <G>
        <Line {...lineProps} x1={cx + 40 * wide} y1={82} x2={150} y2={76} />
        <SvgText {...labelProps} x={120} y={72}>DELTOID</SvgText>
        <Line {...lineProps} x1={96} y1={108} x2={140} y2={112} />
        <SvgText {...labelProps} x={120} y={126}>PECTORAL</SvgText>
        <Line {...lineProps} x1={96} y1={140} x2={140} y2={150} />
        <SvgText {...labelProps} x={126} y={164}>CORE</SvgText>
      </G>
    </Svg>
  );
}
