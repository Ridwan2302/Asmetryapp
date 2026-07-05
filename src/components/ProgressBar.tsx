interface ProgressBarProps {
  pct: number; // 0-100
  height?: number;
  trackClassName?: string;
  fillClassName?: string;
  className?: string;
}

export function ProgressBar({ pct, height = 6, trackClassName = 'bg-fill', fillClassName = 'bg-accent', className = '' }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, pct));
  return (
    <div className={`overflow-hidden rounded-full ${trackClassName} ${className}`} style={{ height }}>
      <div className={`h-full rounded-full transition-[width] duration-500 ${fillClassName}`} style={{ width: `${clamped}%` }} />
    </div>
  );
}
