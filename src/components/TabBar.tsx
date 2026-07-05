'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS: { href: string; label: string; icon: (color: string) => React.ReactNode }[] = [
  {
    href: '/home',
    label: 'HOME',
    icon: (c) => (
      <svg width={21} height={21} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5.5 9.5V20h13V9.5" />
      </svg>
    ),
  },
  {
    href: '/scan',
    label: 'SCAN',
    icon: (c) => (
      <svg width={21} height={21} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8" />
        <path d="M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8" />
        <path d="M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16" />
        <path d="M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
        <circle cx={12} cy={12} r={3} />
      </svg>
    ),
  },
  {
    href: '/programs',
    label: 'PROGRAMS',
    icon: (c) => (
      <svg width={21} height={21} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 3 7.5l9 4.5 9-4.5Z" />
        <path d="M3 12l9 4.5 9-4.5" />
        <path d="M3 16.5 12 21l9-4.5" />
      </svg>
    ),
  },
  {
    href: '/progress',
    label: 'PROGRESS',
    icon: (c) => (
      <svg width={21} height={21} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20V4" />
        <path d="M4 20h16" />
        <path d="M8 16l3.5-4.5 3 2L20 7" />
      </svg>
    ),
  },
  {
    href: '/profile',
    label: 'PROFILE',
    icon: (c) => (
      <svg width={21} height={21} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <circle cx={12} cy={8} r={3.4} />
        <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
      </svg>
    ),
  },
];

export function TabBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-[480px] -translate-x-1/2">
      <div
        className="flex items-start gap-1 border-t border-border bg-[rgba(244,242,237,0.85)] px-2 pt-[14px] backdrop-blur-md"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 14px)' }}
      >
        {TABS.map((tab) => {
          const active = pathname === tab.href || pathname.startsWith(tab.href + '/');
          const color = active ? '#14110E' : '#9C968B';
          return (
            <Link key={tab.href} href={tab.href} className="flex flex-1 flex-col items-center gap-1.5">
              {tab.icon(color)}
              <span className="font-ui text-[8.5px] font-semibold tracking-[1px]" style={{ color }}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
