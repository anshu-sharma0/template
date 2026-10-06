import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type SheetProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  side?: "left" | "right";
};

export function Sheet({ children, className, side = "right", ...props }: SheetProps) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 z-50 w-[min(88vw,24rem)] border-border bg-surface p-6 shadow-lift",
        side === "right" ? "right-0 border-l" : "left-0 border-r",
        className,
      )}
      {...props}
    >
      {children}
    </aside>
  );
}
