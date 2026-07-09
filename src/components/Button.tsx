'use client';

import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export function PrimaryButton({ label, className = '', ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`press w-full rounded-2xl bg-gradient-to-b from-[#3fb2ff] to-[#0a6ee0] py-[17px] text-center text-[17px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_10px_30px_rgba(10,132,255,0.45)] disabled:opacity-35 ${className}`}
    >
      {label}
    </button>
  );
}

/** Apple-style "gray fill" secondary button (kept the OutlineButton name to avoid touching every call site). */
export function OutlineButton({ label, className = '', ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`press w-full rounded-2xl bg-fill py-[17px] text-center text-[17px] font-semibold text-ink disabled:opacity-35 ${className}`}
    >
      {label}
    </button>
  );
}

export function TintButton({ label, className = '', ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`press rounded-full bg-accent/18 px-4 py-2 text-center text-[13px] font-semibold text-[#5cb3ff] disabled:opacity-35 ${className}`}
    >
      {label}
    </button>
  );
}
