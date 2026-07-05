interface RingProgressProps {
  pct: number; // 0-100
  size?: number;
  strokeWidth?: number;
  trackColor?: string;
  fillColor?: string;
  children?: React.ReactNode;
}

/** Apple Activity-ring style circular progress indicator. */
export function RingProgress({ pct, size = 168, strokeWidth = 14, trackColor = 'rgba(255,255,255,0.14)', fillColor = '#0A84FF', children }: RingProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, pct));
  const offset = circumference * (1 - clamped / 100);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={trackColor} strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={fillColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}
