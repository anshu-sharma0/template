import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
};

export function Input({ label, helperText, className, id, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <label className="grid gap-2 text-sm font-medium text-text">
      {label ? <span>{label}</span> : null}
      <input
        id={inputId}
        className={cn(
          "min-h-12 rounded-[var(--radius-medium)] border border-border bg-surface px-4 text-base text-text shadow-inner-soft outline-none transition",
          "placeholder:text-text-muted/70 focus:border-primary/60 focus:ring-4 focus:ring-primary-soft",
          className,
        )}
        {...props}
      />
      {helperText ? <span className="text-sm font-normal text-text-muted">{helperText}</span> : null}
    </label>
  );
}
