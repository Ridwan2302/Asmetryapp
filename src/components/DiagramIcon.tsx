import { DiagramKind } from '@/lib/demoVideos';

/** Small reusable line-art icon per step action-type. One icon per DiagramKind, applied across
 * every step in every guide — not a bespoke illustration per step (~350 of them). */
export function DiagramIcon({ kind, className }: { kind: DiagramKind; className?: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  };

  switch (kind) {
    case 'press':
      return (
        <svg {...common}>
          <circle cx="12" cy="13" r="7" />
          <path d="M12 4v3" />
          <path d="M12 4l-2 2M12 4l2 2" />
        </svg>
      );
    case 'circular':
      return (
        <svg {...common}>
          <path d="M18 8a6 6 0 1 0 1.5 5.5" />
          <path d="M18 4v4h-4" />
        </svg>
      );
    case 'hold':
      return (
        <svg {...common}>
          <circle cx="12" cy="13" r="8" />
          <path d="M12 9v4l3 2" />
          <path d="M9 2h6" />
        </svg>
      );
    case 'stretch':
      return (
        <svg {...common}>
          <path d="M12 3v7" />
          <path d="M6 6l3 4M18 6l-3 4" />
          <path d="M6 21c1-4 3-6 6-6s5 2 6 6" />
        </svg>
      );
    case 'breathe':
      return (
        <svg {...common}>
          <path d="M4 12c2-3 4-4 6-4s3 2 3 4-1 4-3 4-4-1-6-4Z" />
          <path d="M13 12h7" />
          <path d="M17 9l3 3-3 3" />
        </svg>
      );
    case 'posture':
      return (
        <svg {...common}>
          <circle cx="12" cy="5" r="2.2" />
          <path d="M12 7.2v7" />
          <path d="M8 10h8" />
          <path d="M9.5 21l2.5-6.8L14.5 21" />
        </svg>
      );
    case 'chew':
      return (
        <svg {...common}>
          <path d="M6 10c0-3 2.5-5 6-5s6 2 6 5-2.5 5-6 5-6-2-6-5Z" />
          <path d="M8 15l1 5M16 15l-1 5M12 16v5" />
        </svg>
      );
    case 'apply':
      return (
        <svg {...common}>
          <path d="M12 3c2 3 4 5.8 4 8.5A4 4 0 0 1 8 11.5C8 8.8 10 6 12 3Z" />
          <path d="M7 20h10" />
        </svg>
      );
    case 'cold':
      return (
        <svg {...common}>
          <path d="M12 3v18" />
          <path d="M5 7l14 10M19 7L5 17" />
        </svg>
      );
    case 'groom':
      return (
        <svg {...common}>
          <path d="M6 5l6 6M18 5l-6 6" />
          <path d="M9 11l7 7 2-2-7-7" />
          <circle cx="5" cy="19" r="2" />
          <circle cx="5" cy="6" r="2" />
        </svg>
      );
    case 'diet':
      return (
        <svg {...common}>
          <path d="M7 3v7a2 2 0 0 0 4 0V3" />
          <path d="M9 10v11" />
          <path d="M16 3c-1.2 1.2-2 2.8-2 5s.8 3.8 2 5v8" />
        </svg>
      );
    case 'repeat':
      return (
        <svg {...common}>
          <path d="M4 10a8 8 0 0 1 14-4.9" />
          <path d="M18 3v4h-4" />
          <path d="M20 14a8 8 0 0 1-14 4.9" />
          <path d="M6 21v-4h4" />
        </svg>
      );
    case 'check':
      return (
        <svg {...common}>
          <rect x="4.5" y="3.5" width="15" height="17" rx="2.5" />
          <path d="M8.5 9h7M8.5 13h7M8.5 17h4" />
        </svg>
      );
    case 'general':
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 16v-4" />
          <circle cx="12" cy="8.3" r="0.15" fill="currentColor" stroke="none" />
          <path d="M12 8.3h.01" strokeWidth="2.4" />
        </svg>
      );
  }
}
