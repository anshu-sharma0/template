import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: "rose" | "champagne" | "lavender" | "neutral";
};

const tones = {
  rose: "bg-primary-soft text-primary-strong",
  champagne: "bg-accent-soft text-accent-strong",
  lavender: "bg-lavender text-charcoal",
  neutral: "bg-surface-soft text-text-muted",
};

export function Badge({ children, className, tone = "rose" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-[var(--radius-pill)] px-3 py-1 text-xs font-medium leading-none",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
