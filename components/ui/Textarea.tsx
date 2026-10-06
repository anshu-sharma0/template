import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  helperText?: string;
};

export function Textarea({ label, helperText, className, id, ...props }: TextareaProps) {
  const textareaId = id ?? props.name;

  return (
    <label className="grid gap-2 text-sm font-medium text-text">
      {label ? <span>{label}</span> : null}
      <textarea
        id={textareaId}
        className={cn(
          "min-h-32 rounded-[var(--radius-medium)] border border-border bg-surface px-4 py-3 text-base text-text shadow-inner-soft outline-none transition",
          "placeholder:text-text-muted/70 focus:border-primary/60 focus:ring-4 focus:ring-primary-soft",
          className,
        )}
        {...props}
      />
      {helperText ? <span className="text-sm font-normal text-text-muted">{helperText}</span> : null}
    </label>
  );
}
