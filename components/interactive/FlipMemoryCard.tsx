"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface FlipMemoryCardProps {
  front: ReactNode;
  back: ReactNode;
  height?: string;
  trigger?: "click" | "hover";
  className?: string;
}

export function FlipMemoryCard({
  front,
  back,
  height = "h-64",
  trigger = "click",
  className,
}: FlipMemoryCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={cn("group perspective-1000 w-full cursor-pointer", height, className)}
      onClick={() => trigger === "click" && setIsFlipped(!isFlipped)}
      onMouseEnter={() => trigger === "hover" && setIsFlipped(true)}
      onMouseLeave={() => trigger === "hover" && setIsFlipped(false)}
    >
      <div
        className={cn(
          "relative size-full rounded-3xl transition-transform duration-700 transform-style-3d shadow-love-card hover:shadow-love-lift",
          isFlipped && "rotate-y-180"
        )}
      >
        {/* Front Face */}
        <div className="absolute inset-0 size-full rounded-3xl bg-white p-6 border border-[var(--love-border)] backface-hidden flex flex-col justify-between">
          {front}
          <div className="mt-2 text-right text-[10px] font-bold text-[var(--love-crimson)] uppercase tracking-wider">
            Tap to flip 🔄
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 size-full rounded-3xl bg-gradient-to-br from-white via-[var(--love-surface-blush)] to-[var(--love-surface-rose)] p-6 border border-[var(--love-border)] backface-hidden rotate-y-180 flex flex-col justify-between">
          {back}
          <div className="mt-2 text-right text-[10px] font-bold text-[var(--love-crimson)] uppercase tracking-wider">
            Tap to flip 🔄
          </div>
        </div>
      </div>
    </div>
  );
}
