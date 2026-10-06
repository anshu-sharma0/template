import type { ReactNode } from "react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <Badge tone="champagne" className={align === "center" ? "mx-auto" : ""}>
          {eyebrow}
        </Badge>
      ) : null}
      <h2 className="mt-5 font-display text-4xl leading-tight text-text md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-lg leading-8 text-text-muted">{description}</p> : null}
    </div>
  );
}
