import { cn } from "@/lib/cn";

type SoftGlowProps = {
  className?: string;
};

export function SoftGlow({ className }: SoftGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 h-64 bg-[linear-gradient(180deg,rgba(176,87,101,0.13),rgba(246,220,224,0))]",
        className,
      )}
    />
  );
}
