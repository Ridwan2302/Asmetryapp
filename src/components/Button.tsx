'use client';

import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export function PrimaryButton({ label, className = '', ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`w-full rounded-[20px] bg-ink py-[19px] text-center font-ui text-[12px] font-semibold tracking-[2px] text-paper transition-opacity active:opacity-85 disabled:opacity-35 ${className}`}
    >
      {label}
    </button>
  );
}

export function OutlineButton({ label, className = '', ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`w-full rounded-[20px] border border-border-strong py-[19px] text-center font-ui text-[12px] font-semibold tracking-[2px] text-ink transition-opacity active:opacity-60 disabled:opacity-35 ${className}`}
    >
      {label}
    </button>
  );
}
