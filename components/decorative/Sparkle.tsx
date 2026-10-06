import { cn } from "@/lib/cn";

type SparkleProps = {
  className?: string;
};

export function Sparkle({ className }: SparkleProps) {
  return (
    <span aria-hidden="true" className={cn("inline-block font-display text-accent", className)}>
      ✦
    </span>
  );
}
