import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "rose" | "champagne" | "lavender" | "neutral" | "gold" | "emerald" | "sage";

export type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: BadgeTone;
};

const tones: Record<BadgeTone, string> = {
  rose: "bg-[var(--love-surface-blush)] text-[var(--love-crimson)] border border-[var(--love-border)]",
  champagne: "bg-[var(--love-surface-cream)] text-amber-900 border border-amber-200",
  lavender: "bg-purple-50 text-[var(--love-text-heading)] border border-purple-200",
  neutral: "bg-[var(--love-surface-blush)] text-[var(--love-text-muted)] border border-[var(--love-border-subtle)]",
  gold: "bg-amber-50 text-amber-900 border border-amber-300",
  emerald: "bg-emerald-50 text-emerald-800 border border-emerald-200",
  sage: "bg-emerald-50 text-emerald-900 border border-emerald-200",
};

export function Badge({ children, className, tone = "rose" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-(--radius-pill) px-3 py-1 text-xs font-medium leading-none",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
