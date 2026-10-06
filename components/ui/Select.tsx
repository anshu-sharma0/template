import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  helperText?: string;
};

export function Select({ label, helperText, className, id, children, ...props }: SelectProps) {
  const selectId = id ?? props.name;

  return (
    <label className="grid gap-2 text-sm font-medium text-text">
      {label ? <span>{label}</span> : null}
      <select
        id={selectId}
        className={cn(
          "min-h-12 rounded-[var(--radius-medium)] border border-border bg-surface px-4 text-base text-text shadow-inner-soft outline-none transition",
          "focus:border-primary/60 focus:ring-4 focus:ring-primary-soft",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {helperText ? <span className="text-sm font-normal text-text-muted">{helperText}</span> : null}
    </label>
  );
}
