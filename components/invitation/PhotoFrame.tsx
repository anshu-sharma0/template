import { ImageFrame } from "@/components/ui/ImageFrame";
import { cn } from "@/lib/cn";

type PhotoFrameProps = {
  label?: string;
  className?: string;
  variant?: "portrait" | "polaroid" | "editorial" | "square";
};

export function PhotoFrame({ label = "Personal photo", className, variant = "portrait" }: PhotoFrameProps) {
  return (
    <ImageFrame variant={variant} label={label} className={cn("shadow-soft", className)}>
      <div className="absolute inset-x-5 bottom-5 h-px bg-white/60" />
      <div className="absolute left-5 top-5 h-10 w-14 rounded-[var(--radius-small)] bg-white/25" />
    </ImageFrame>
  );
}
