import type { DialogHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type DialogProps = DialogHTMLAttributes<HTMLDialogElement> & {
  children: ReactNode;
};

export function Dialog({ children, className, ...props }: DialogProps) {
  return (
    <dialog
      className={cn(
        "w-[min(92vw,36rem)] rounded-[var(--radius-medium)] border border-border bg-surface p-0 text-text shadow-lift backdrop:bg-text/35",
        className,
      )}
      {...props}
    >
      {children}
    </dialog>
  );
}
