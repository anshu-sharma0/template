"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  align?: "left" | "center";
  bgVariant?: "soft" | "gradient" | "glass";
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
  align = "center",
  bgVariant = "gradient",
  className,
}: PageHeaderProps) {
  const bgStyles = {
    soft: "bg-[#fffbf8] border-b border-[var(--love-border)]/60",
    gradient: "bg-gradient-to-b from-white via-[var(--love-surface-blush)] to-[#fff0f3] border-b border-[var(--love-border)]",
    glass: "bg-white/80 backdrop-blur-md border-b border-[var(--love-border)]/60",
  };

  return (
    <section className={cn("relative overflow-hidden py-12 sm:py-16 lg:py-20", bgStyles[bgVariant], className)}>
      {/* Decorative background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-96 rounded-full bg-gradient-to-tr from-[var(--love-crimson)]/10 via-[var(--love-pink)]/15 to-transparent blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-10 right-10 size-64 rounded-full bg-[#ffccd5]/20 blur-2xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className={cn("mb-6 flex items-center text-xs font-medium text-[#8e7b7e]", align === "center" && "justify-center")}>
            <ol className="flex items-center space-x-2">
              {breadcrumbs.map((item, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2 text-[#caaeb3]">/</span>}
                  {item.href ? (
                    <Link href={item.href} className="hover:text-[#b05765] transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-[#2c2224] font-semibold">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className={cn("flex flex-col max-w-4xl", align === "center" ? "mx-auto text-center items-center" : "items-start")}>
          {eyebrow && (
            <Badge tone="rose" className="mb-4 px-4 py-1.5 text-xs font-bold tracking-wider uppercase shadow-xs">
              ✨ {eyebrow}
            </Badge>
          )}

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2c2224] leading-[1.12]">
            {title}
          </h1>

          {description && (
            <p className="mt-5 text-base sm:text-xl text-[#6e5d60] leading-relaxed max-w-2xl">
              {description}
            </p>
          )}

          {actions && (
            <div className={cn("mt-8 flex flex-wrap gap-4 items-center", align === "center" && "justify-center")}>
              {actions}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
