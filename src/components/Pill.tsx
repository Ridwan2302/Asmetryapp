export function Pill({ label, tone = 'ink', className = '' }: { label: string; tone?: 'ink' | 'paper'; className?: string }) {
  const isPaper = tone === 'paper';
  return (
    <span
      className={`inline-block rounded-full border px-[10px] py-[4px] font-ui text-[10px] tracking-[1px] ${
        isPaper ? 'border-[rgba(244,242,237,0.3)] text-paper' : 'border-border-strong text-ink'
      } ${className}`}
    >
      {label}
    </span>
  );
}
