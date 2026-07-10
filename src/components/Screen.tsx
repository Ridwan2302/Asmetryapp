/** Standard screen padding: safe-area top, 26px sides, clears the fixed tab bar at the bottom. */
export function Screen({ children, withTabBarSpacing = true }: { children: React.ReactNode; withTabBarSpacing?: boolean }) {
  return (
    <div
      className="min-h-dvh px-[26px] pt-[calc(env(safe-area-inset-top)+24px)]"
      style={{ paddingBottom: withTabBarSpacing ? 'calc(env(safe-area-inset-bottom) + 92px)' : 'calc(env(safe-area-inset-bottom) + 40px)' }}
    >
      {children}
    </div>
  );
}
