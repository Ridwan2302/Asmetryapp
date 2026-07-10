'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TranslationKey, useT } from '@/lib/i18n';

const TABS: { href: string; labelKey: TranslationKey; icon: (active: boolean, color: string) => React.ReactNode }[] = [
  {
    href: '/home',
    labelKey: 'tab_home',
    icon: (active, c) =>
      active ? (
        <svg width={20} height={20} viewBox="0 0 24 24" fill={c}>
          <path d="M12 2.5 2 10.8V21a1 1 0 0 0 1 1h5.5a1 1 0 0 0 1-1v-5.8a2.5 2.5 0 0 1 5 0V21a1 1 0 0 0 1 1H21a1 1 0 0 0 1-1V10.8L12 2.5Z" />
        </svg>
      ) : (
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5.5 9.5V20h13V9.5" />
        </svg>
      ),
  },
  {
    href: '/scan',
    labelKey: 'tab_scan',
    icon: (active, c) => (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8" />
        <path d="M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8" />
        <path d="M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16" />
        <path d="M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
        <circle cx={12} cy={12} r={3.2} fill={active ? c : 'none'} />
      </svg>
    ),
  },
  {
    href: '/programs',
    labelKey: 'tab_programs',
    icon: (active, c) =>
      active ? (
        <svg width={20} height={20} viewBox="0 0 24 24" fill={c}>
          <path d="M12 2 2 7.5 12 13l10-5.5L12 2Z" />
          <path d="M2 12l10 5.5L22 12l-10-5.5L2 12Z" opacity={0.55} />
          <path d="M2 16.5 12 22l10-5.5-2-1.1-8 4.4-8-4.4-2 1.1Z" opacity={0.3} />
        </svg>
      ) : (
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3 3 7.5l9 4.5 9-4.5Z" />
          <path d="M3 12l9 4.5 9-4.5" />
          <path d="M3 16.5 12 21l9-4.5" />
        </svg>
      ),
  },
  {
    href: '/progress',
    labelKey: 'tab_progress',
    icon: (active, c) => (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20V4" />
        <path d="M4 20h16" />
        <path d="M8 16l3.5-4.5 3 2L20 7" />
      </svg>
    ),
  },
  {
    href: '/profile',
    labelKey: 'tab_profile',
    icon: (active, c) =>
      active ? (
        <svg width={20} height={20} viewBox="0 0 24 24" fill={c}>
          <circle cx={12} cy={8} r={4} />
          <path d="M4 21a8 8 0 0 1 16 0 1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
        </svg>
      ) : (
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <circle cx={12} cy={8} r={3.4} />
          <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
        </svg>
      ),
  },
];

export function TabBar() {
  const pathname = usePathname();
  const t = useT();
  const activeIndex = Math.max(
    0,
    TABS.findIndex((tab) => pathname === tab.href || pathname.startsWith(tab.href + '/'))
  );

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 flex justify-center px-4"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 20px)' }}
    >
      <div className="relative flex items-center gap-0.5 rounded-full border border-border bg-card/80 p-1 shadow-[0_8px_28px_rgba(0,0,0,0.14)] backdrop-blur-xl">
        <div
          className="absolute top-1 bottom-1 rounded-[14px] border border-white/25 bg-fill backdrop-blur-md transition-transform duration-300 ease-out"
          style={{ width: `calc(${100 / TABS.length}% - 4px)`, transform: `translateX(calc(${activeIndex} * 100% + ${activeIndex * 4}px))` }}
        />
        {TABS.map((tab, i) => {
          const active = i === activeIndex;
          const color = active ? '#0A84FF' : '#8E8E93';
          return (
            <Link key={tab.href} href={tab.href} className="press relative z-10 flex flex-1 flex-col items-center gap-0.5 px-2.5 py-1.5">
              {tab.icon(active, color)}
              <span className="text-[8.5px] font-medium" style={{ color }}>
                {t(tab.labelKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
