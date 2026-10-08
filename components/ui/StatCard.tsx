"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface StatCardProps {
  icon?: ReactNode;
  value: string | number;
  label: string;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  className?: string;
}

export function StatCard({
  icon,
  value,
  label,
  trend,
  trendDirection = "up",
  className,
}: StatCardProps) {
  const trendColors = {
    up: "text-emerald-600 bg-emerald-50 border-emerald-200",
    down: "text-rose-600 bg-rose-50 border-rose-200",
    neutral: "text-[var(--love-text-muted)] bg-[var(--love-surface-blush)] border-[var(--love-border)]",
  };

  return (
    <div className={cn("rounded-2xl bg-white p-5 border border-[var(--love-border)] shadow-love-card flex flex-col justify-between", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[var(--love-text-muted)]">{label}</span>
        {icon && <span className="text-lg">{icon}</span>}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <span className="font-serif text-3xl font-bold text-[var(--love-text-heading)]">{value}</span>
        {trend && (
          <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-bold border", trendColors[trendDirection])}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
