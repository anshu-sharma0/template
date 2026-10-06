import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  description?: string;
};

export function Switch({ label, description, className, ...props }: SwitchProps) {
  return (
    <label className={cn("flex items-center justify-between gap-4 text-sm text-text", className)}>
      <span className="grid gap-1">
        <span className="font-medium">{label}</span>
        {description ? <span className="text-text-muted">{description}</span> : null}
      </span>
      <input type="checkbox" role="switch" className="peer sr-only" {...props} />
      <span
        aria-hidden="true"
        className="relative h-7 w-12 rounded-[var(--radius-pill)] bg-border transition after:absolute after:left-1 after:top-1 after:size-5 after:rounded-[var(--radius-pill)] after:bg-white after:shadow-sm after:transition peer-checked:bg-primary peer-checked:after:translate-x-5 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-primary"
      />
    </label>
  );
}
