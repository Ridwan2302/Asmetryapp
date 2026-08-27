/** A tiny, single-color glyph per plan topic — paired with its accent color (data/planTopics.ts)
 * so a step reads as "which subject" without having to read the badge text. */
export function TopicIcon({ programId, size = 12, color = 'currentColor' }: { programId: string; size?: number; color?: string }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

  switch (programId) {
    case 'face-structure':
      return (
        <svg {...common}>
          <path d="M12 3c-4 0-6 3-6 7 0 5 3 9 6 9s6-4 6-9c0-4-2-7-6-7Z" />
          <path d="M9 10h.01M15 10h.01" />
        </svg>
      );
    case 'jawmaxing':
      return (
        <svg {...common}>
          <path d="M4 8c1 6 4 11 8 11s7-5 8-11" />
          <path d="M4 8c2-1 4 1 8 1s6-2 8-1" />
        </svg>
      );
    case 'hunter-eyes':
      return (
        <svg {...common}>
          <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6Z" />
          <circle cx={12} cy={12} r={2.5} />
        </svg>
      );
    case 'skinmaxing':
      return (
        <svg {...common}>
          <path d="M4 6h16M4 12h10M4 18h13" />
        </svg>
      );
    case 'skin-clarity':
      return (
        <svg {...common}>
          <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />
        </svg>
      );
    case 'posture':
      return (
        <svg {...common}>
          <circle cx={12} cy={5} r={2} />
          <path d="M12 7v6M12 13l-3 7M12 13l3 7M8 11h8" />
        </svg>
      );
    case 'bodymaxing':
      return (
        <svg {...common}>
          <path d="M5 8v8M19 8v8" />
          <path d="M2 12h3M19 12h3" />
          <rect x={5} y={9} width={2} height={6} rx={0.5} />
          <rect x={17} y={9} width={2} height={6} rx={0.5} />
          <path d="M7 12h10" />
        </svg>
      );
    case 'sleep':
      return (
        <svg {...common}>
          <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
        </svg>
      );
    case 'hydration':
      return (
        <svg {...common}>
          <path d="M12 3s6.5 7 6.5 12a6.5 6.5 0 1 1-13 0C5.5 10 12 3 12 3Z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx={12} cy={12} r={8} />
        </svg>
      );
  }
}
