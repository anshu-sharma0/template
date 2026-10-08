import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  helperText?: string;
};

export function Select({ label, helperText, className, id, children, ...props }: SelectProps) {
  const selectId = id ?? props.name;

  return (
    <label className="grid gap-2 text-sm font-medium text-[var(--love-text-heading)]">
      {label ? <span>{label}</span> : null}
      <select
        id={selectId}
        className={cn(
          "min-h-12 rounded-2xl border border-[var(--love-border)] bg-white px-4 text-base text-[var(--love-text-heading)] shadow-inner-soft outline-none transition",
          "focus:border-[var(--love-crimson)] focus:ring-4 focus:ring-pink-100",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {helperText ? <span className="text-sm font-normal text-[var(--love-text-muted)]">{helperText}</span> : null}
    </label>
  );
}
