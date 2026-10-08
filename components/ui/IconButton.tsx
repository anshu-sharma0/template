import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: ReactNode;
  variant?: "light" | "dark" | "outline";
};

const variants = {
  light: "bg-white text-[var(--love-text-heading)] shadow-soft hover:bg-[var(--love-surface-blush)]",
  dark: "bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-rose)] text-white hover:opacity-95 shadow-soft",
  outline: "border border-[var(--love-border)] bg-transparent text-[var(--love-text-heading)] hover:bg-[var(--love-surface-blush)]",
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
