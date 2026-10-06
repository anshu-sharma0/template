import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: ReactNode;
  variant?: "light" | "dark" | "outline";
};

const variants = {
  light: "bg-surface text-text shadow-soft hover:bg-surface-soft",
  dark: "bg-text text-white hover:bg-charcoal",
  outline: "border border-border bg-transparent text-text hover:bg-surface-soft",
};

export function IconButton({
  label,
  children,
  className,
  variant = "light",
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      aria-label={label}
      type={type}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-[var(--radius-pill)] transition duration-300",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
