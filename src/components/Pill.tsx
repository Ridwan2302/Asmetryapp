export function Pill({ label, tone = 'ink', className = '' }: { label: string; tone?: 'ink' | 'paper' | 'accent' | 'success'; className?: string }) {
  const toneClass = {
    ink: 'bg-fill text-ink',
    paper: 'bg-white/15 text-white',
    accent: 'bg-ink text-white',
    success: 'bg-ink text-white',
  }[tone];
  return <span className={`inline-block rounded-full px-3 py-[5px] text-[12px] font-semibold ${toneClass} ${className}`}>{label}</span>;
}
