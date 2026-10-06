import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  description?: string;
};

export function Checkbox({ label, description, className, ...props }: CheckboxProps) {
  return (
    <label className={cn("flex gap-3 text-sm text-text", className)}>
      <input
        type="checkbox"
        className="mt-0.5 size-5 rounded-[4px] border-border accent-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        {...props}
      />
      <span className="grid gap-1">
        <span className="font-medium">{label}</span>
        {description ? <span className="text-text-muted">{description}</span> : null}
      </span>
    </label>
  );
}
