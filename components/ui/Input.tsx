import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
};

export function Input({ label, helperText, className, id, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="grid gap-2 text-sm font-semibold text-[var(--love-text-heading)]">
      {label ? <span>{label}</span> : null}
      <input
        id={inputId}
        className={cn(
          "min-h-12 rounded-[var(--radius-medium)] border border-[var(--love-border)] bg-white px-4 text-base text-[var(--love-text-heading)] shadow-inner-soft outline-none transition",
          "placeholder:text-[var(--love-text-muted)] focus:border-[var(--love-crimson)] focus:ring-4 focus:ring-pink-100",
          className,
        )}
        {...props}
      />
      {helperText ? <span className="text-sm font-normal text-[var(--love-text-muted)]">{helperText}</span> : null}
    </label>
  );
}
