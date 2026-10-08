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
        "relative overflow-hidden bg-linear-to-br from-[#ffe4ea] via-[#fff0f3] to-[#ffd6e0] border border-pink-200/60",
        variants[variant],
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_18%,rgba(255,255,255,0.85),transparent_40%),linear-gradient(155deg,transparent_52%,rgba(255,105,180,0.08))]" />
      <div className="absolute inset-0 flex items-center justify-center text-pink-300/80 text-lg font-serif select-none pointer-events-none">
        ♥
      </div>
      {children ? <div className="relative z-10 h-full">{children}</div> : null}
    </div>
  );
}
