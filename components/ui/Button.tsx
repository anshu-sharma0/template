import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "soft" | "dark";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-[var(--love-crimson)] via-[var(--love-rose)] to-[var(--love-pink)] text-white shadow-soft shadow-pink-500/20 hover:opacity-95 focus-visible:outline-primary",
  secondary:
    "bg-white text-[var(--love-text-heading)] shadow-soft ring-1 ring-[var(--love-border)] hover:bg-[var(--love-surface-blush)] focus-visible:outline-primary",
  outline:
    "border border-[var(--love-border)] bg-transparent text-[var(--love-text-heading)] hover:border-[var(--love-crimson)]/50 hover:bg-[var(--love-surface-blush)] focus-visible:outline-primary",
  ghost: "bg-transparent text-[var(--love-text-muted)] hover:bg-[var(--love-surface-blush)] hover:text-[var(--love-text-heading)] focus-visible:outline-primary",
  soft: "bg-[var(--love-surface-rose)] text-[var(--love-crimson)] hover:bg-pink-200/60 focus-visible:outline-primary",
  dark: "bg-gradient-to-r from-[var(--love-text-heading)] to-[#3f2229] text-white hover:opacity-95 focus-visible:outline-[var(--love-text-heading)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 text-sm",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-base",
};

type CommonButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  ariaLabel?: string;
};

type AnchorButtonProps = CommonButtonProps & {
  href: string;
  target?: string;
  rel?: string;
};

type NativeButtonProps = CommonButtonProps & {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

export function Button(props: ButtonProps) {
  const {
    children,
    className,
    variant = "primary",
    size = "md",
    fullWidth = false,
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] font-medium leading-none transition duration-300 ease-out",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 active:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-55",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    className,
  );

  if ("href" in props) {
    const { href, target, rel, ariaLabel } = props;
    return (
      <a href={href} target={target} rel={rel} aria-label={ariaLabel} className={classes}>
        {children}
      </a>
    );
  }

  const { type = "button", disabled, onClick, ariaLabel } = props;
  return (
    <button type={type} disabled={disabled} onClick={onClick} aria-label={ariaLabel} className={classes}>
      {children}
    </button>
  );
}
