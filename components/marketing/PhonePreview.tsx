import { InvitationPreview, type InvitationPreviewVariant } from "@/components/invitation/InvitationPreview";
import { cn } from "@/lib/cn";

type PhonePreviewProps = {
  variant?: InvitationPreviewVariant;
  className?: string;
  size?: "sm" | "md" | "lg";
  floating?: boolean;
  label?: string;
};

const sizes = {
  sm: "w-[13rem]",
  md: "w-[16rem]",
  lg: "w-[min(74vw,21rem)]",
};

export function PhonePreview({
  variant = "birthday",
  className,
  size = "md",
  floating = false,
  label = "Digital experience preview",
}: PhonePreviewProps) {
  return (
    <div
      aria-label={label}
      role="img"
      className={cn(
        "relative aspect-[9/18.6] rounded-[2rem] border border-white/70 bg-charcoal p-2 shadow-phone",
        sizes[size],
        floating && "motion-safe:animate-gentle-float",
        className,
      )}
    >
      <div className="absolute left-1/2 top-2 z-20 h-1.5 w-16 -translate-x-1/2 rounded-[var(--radius-pill)] bg-white/20" />
      <div className="relative h-full overflow-hidden rounded-[1.55rem] bg-surface">
        <InvitationPreview variant={variant} />
      </div>
    </div>
  );
}
