import { cn } from "@/lib/cn";

type PetalProps = {
  className?: string;
};

export function Petal({ className }: PetalProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block h-5 w-3 rounded-[70%_0_70%_0] bg-peach shadow-soft",
        className,
      )}
    />
  );
}
