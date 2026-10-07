"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon = "🔍",
  title = "No results found",
  description = "Try adjusting your filters or search terms.",
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-3xl bg-white border border-[#e8d5cf] shadow-xs max-w-md mx-auto my-8", className)}>
      <div className="grid size-16 place-items-center rounded-2xl bg-[#fceae6] text-3xl text-[#b05765] shadow-xs mb-4">
        {icon}
      </div>
      <h3 className="font-serif text-xl font-bold text-[#2c2224]">{title}</h3>
      <p className="mt-2 text-xs text-[#6e5d60] leading-relaxed">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
