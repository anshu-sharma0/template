import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type UploadAreaProps = {
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
};

export function UploadArea({ title, description, action, className }: UploadAreaProps) {
  return (
    <div
      className={cn(
        "grid min-h-40 place-items-center rounded-[var(--radius-medium)] border border-dashed border-primary/35 bg-primary-soft/25 p-6 text-center",
        className,
      )}
    >
      <div className="grid max-w-xs gap-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-[var(--radius-pill)] bg-surface text-primary">
          +
        </div>
        <div>
          <p className="font-medium text-text">{title}</p>
          <p className="mt-1 text-sm text-text-muted">{description}</p>
        </div>
        {action ? <div>{action}</div> : null}
      </div>
    </div>
  );
}
