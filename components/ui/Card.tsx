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
        "rounded-2xl border border-[var(--love-border)] bg-white shadow-love-card",
        interactive && "transition duration-300 hover:-translate-y-1 hover:shadow-love-lift",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
