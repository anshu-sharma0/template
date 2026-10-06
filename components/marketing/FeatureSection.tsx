import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type FeatureSectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  visual: ReactNode;
  reverse?: boolean;
};

export function FeatureSection({ eyebrow, title, description, visual, reverse = false }: FeatureSectionProps) {
  return (
    <div className={cn("grid gap-10 lg:grid-cols-2 lg:items-center", reverse && "lg:[&>*:first-child]:order-2")}>
      <div>
        {eyebrow ? <p className="text-sm font-medium text-primary">{eyebrow}</p> : null}
        <h2 className="mt-4 font-display text-5xl leading-tight text-text">{title}</h2>
        <p className="mt-5 text-lg leading-8 text-text-muted">{description}</p>
      </div>
      <div>{visual}</div>
    </div>
  );
}
