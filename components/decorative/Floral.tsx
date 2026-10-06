import { cn } from "@/lib/cn";

type FloralProps = {
  className?: string;
};

export function Floral({ className }: FloralProps) {
  return (
    <div aria-hidden="true" className={cn("flex items-center gap-3 text-accent", className)}>
      <span className="h-px w-12 bg-current" />
      <span className="size-2 rotate-45 rounded-[2px] border border-current" />
      <span className="h-px w-12 bg-current" />
    </div>
  );
}
