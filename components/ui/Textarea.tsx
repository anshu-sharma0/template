import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  helperText?: string;
};

export function Textarea({ label, helperText, className, id, ...props }: TextareaProps) {
  const textareaId = id ?? props.name;

  return (
    <label className="grid gap-2 text-sm font-semibold text-[var(--love-text-heading)]">
      {label ? <span>{label}</span> : null}
      <textarea
        id={textareaId}
        className={cn(
          "min-h-32 rounded-[var(--radius-medium)] border border-[var(--love-border)] bg-white px-4 py-3 text-base text-[var(--love-text-heading)] shadow-inner-soft outline-none transition",
          "placeholder:text-[var(--love-text-muted)] focus:border-[var(--love-crimson)] focus:ring-4 focus:ring-pink-100",
          className,
        )}
        {...props}
      />
      {helperText ? <span className="text-sm font-normal text-[var(--love-text-muted)]">{helperText}</span> : null}
    </label>
  );
}
