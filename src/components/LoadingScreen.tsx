import Image from 'next/image';

export function LoadingScreen() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#0f1111]">
      <div className="relative h-24 w-24 [animation:pop-in_0.4s_cubic-bezier(0.34,1.56,0.64,1)]">
        <Image src="/images/splash-logo.png" alt="" fill priority className="object-contain" />
      </div>
    </div>
  );
}
