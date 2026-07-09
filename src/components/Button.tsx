'use client';

import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export function PrimaryButton({ label, className = '', ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`press w-full rounded-2xl bg-ink py-[17px] text-center text-[17px] font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.15),0_10px_20px_rgba(0,0,0,0.18)] disabled:opacity-35 dark:bg-white dark:text-[#1d1d1f] ${className}`}
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
      className={`press rounded-full bg-accent/10 px-4 py-2 text-center text-[13px] font-semibold text-accent disabled:opacity-35 ${className}`}
    >
      {label}
    </button>
  );
}
