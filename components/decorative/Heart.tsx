import { cn } from "@/lib/cn";

type HeartProps = {
  className?: string;
};

export function Heart({ className }: HeartProps) {
  return (
    <span aria-hidden="true" className={cn("inline-block font-display text-primary", className)}>
      ♥
    </span>
  );
}
