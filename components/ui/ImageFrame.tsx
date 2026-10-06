import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ImageFrameVariant =
  | "portrait"
  | "landscape"
  | "square"
  | "circle"
  | "rounded"
  | "fullBleed"
  | "polaroid"
  | "editorial";

type ImageFrameProps = {
  variant?: ImageFrameVariant;
  children?: ReactNode;
  className?: string;
  label?: string;
};

const variants: Record<ImageFrameVariant, string> = {
  portrait: "aspect-[4/5] rounded-[var(--radius-medium)]",
  landscape: "aspect-[16/10] rounded-[var(--radius-medium)]",
  square: "aspect-square rounded-[var(--radius-medium)]",
  circle: "aspect-square rounded-[var(--radius-pill)]",
  rounded: "aspect-[5/4] rounded-[var(--radius-medium)]",
  fullBleed: "aspect-[16/9]",
  polaroid: "aspect-[4/5] rounded-[var(--radius-small)] border-[10px] border-white border-b-[34px] shadow-soft",
  editorial: "aspect-[3/4] rounded-t-[var(--radius-medium)] rounded-b-[var(--radius-small)]",
};

export function ImageFrame({
  variant = "rounded",
  children,
  className,
  label = "Photo preview",
}: ImageFrameProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative overflow-hidden bg-[linear-gradient(135deg,#f7d8d4,#fff9ef_46%,#d8c3a4)]",
        variants[variant],
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_18%,rgba(255,255,255,0.75),transparent_34%),linear-gradient(155deg,transparent_52%,rgba(44,37,36,0.16))]" />
      {children ? <div className="relative z-10 h-full">{children}</div> : null}
    </div>
  );
}
