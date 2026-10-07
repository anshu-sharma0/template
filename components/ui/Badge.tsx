import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "rose" | "champagne" | "lavender" | "neutral" | "gold" | "emerald" | "sage";

export type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: BadgeTone;
};

const tones: Record<BadgeTone, string> = {
  rose: "bg-primary-soft text-primary-strong",
  champagne: "bg-accent-soft text-accent-strong",
  lavender: "bg-lavender text-charcoal",
  neutral: "bg-surface-soft text-text-muted",
  gold: "bg-amber-100 text-amber-800 border border-amber-300",
  emerald: "bg-emerald-100 text-emerald-800 border border-emerald-300",
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
