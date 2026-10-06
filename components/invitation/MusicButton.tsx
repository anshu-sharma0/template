import { cn } from "@/lib/cn";

type MusicButtonProps = {
  className?: string;
};

export function MusicButton({ className }: MusicButtonProps) {
  return (
    <button
      type="button"
      aria-label="Music preview"
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-[var(--radius-pill)] border border-border bg-white/75 text-sm text-primary shadow-soft backdrop-blur",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className,
      )}
    >
      ♪
    </button>
  );
}
