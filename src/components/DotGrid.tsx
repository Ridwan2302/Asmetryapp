/** Subtle pulsing dotted-grid background for the score hero card. */
export function DotGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 animate-[dotgrid-pulse_6s_ease-in-out_infinite]"
      style={{
        backgroundImage: 'radial-gradient(rgba(244,242,237,0.14) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }}
    />
  );
}
