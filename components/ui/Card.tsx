import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  interactive?: boolean;
};

export function Card({ children, className, interactive = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-medium)] border border-border bg-surface shadow-soft",
        interactive && "transition duration-300 hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
