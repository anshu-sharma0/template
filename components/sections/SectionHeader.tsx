"use client";

import type { ReactNode } from "react";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center" | "right";
  badgeTone?: BadgeTone;
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  badgeTone = "rose",
  action,
  className,
}: SectionHeaderProps) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div className={cn("flex flex-col max-w-3xl mb-12 md:mb-16", alignClasses[align], className)}>
      {eyebrow && (
        <Badge tone={badgeTone} className="mb-3.5 px-3.5 py-1 text-xs tracking-wider uppercase shadow-xs">
          ✨ {eyebrow}
        </Badge>
      )}

      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--love-text-heading)] leading-[1.15]">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-base sm:text-lg text-[var(--love-text-body)] leading-relaxed max-w-2xl">
          {description}
        </p>
      )}

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
