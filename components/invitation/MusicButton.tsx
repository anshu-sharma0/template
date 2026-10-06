import { cn } from "@/lib/cn";

type MusicButtonProps = {
  className?: string;
  isPlaying?: boolean;
  label?: string;
  onToggle?: () => void;
};

export function MusicButton({
  className,
  isPlaying = false,
  label = "Music preview",
  onToggle,
}: MusicButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      aria-pressed={isPlaying}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-soft backdrop-blur transition-all duration-200",
        isPlaying
          ? "border-primary bg-primary text-white shadow-lift"
          : "border-border bg-white/80 text-primary hover:bg-white",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className,
      )}
    >
      <span className={isPlaying ? "animate-spin" : ""}>♪</span>
      <span>{isPlaying ? "Playing melody..." : label || "Play music"}</span>
    </button>
  );
}

