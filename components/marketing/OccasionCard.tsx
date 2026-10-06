import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PhonePreview } from "./PhonePreview";
import { cn } from "@/lib/cn";
import type { InvitationPreviewVariant } from "@/components/invitation/InvitationPreview";

type OccasionCardProps = {
  label: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  theme: "birthday" | "wedding";
  previewVariant: InvitationPreviewVariant;
};

const themeStyles = {
  birthday: {
    badge: "rose" as const,
    bg: "bg-[linear-gradient(135deg,#fffdf9_0%,#fff2ef_100%)] hover:bg-[linear-gradient(135deg,#fffbf8_0%,#fde8e5_100%)]",
    visualBg: "bg-[linear-gradient(180deg,#fff8f3,#f6dce0)]",
  },
  wedding: {
    badge: "champagne" as const,
    bg: "bg-[linear-gradient(135deg,#fffdf9_0%,#f9f3e8_100%)] hover:bg-[linear-gradient(135deg,#fffbf6_0%,#f4e9d5_100%)]",
    visualBg: "bg-[linear-gradient(180deg,#fffaf2,#eadbbf)]",
  },
};

export function OccasionCard({
  label,
  title,
  description,
  cta,
  href,
  theme,
  previewVariant,
}: OccasionCardProps) {
  const style = themeStyles[theme];

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-border p-6 sm:p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        style.bg,
      )}
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_14rem] lg:items-center">
        {/* Text Content */}
        <div className="flex flex-col justify-between">
          <div>
            <Badge tone={style.badge}>{label}</Badge>

            <h3 className="mt-5 font-display text-3xl font-normal leading-snug text-text md:text-4xl">
              {title}
            </h3>

            <p className="mt-3 text-base leading-7 text-text-muted">
              {description}
            </p>
          </div>

          <div className="mt-8">
            <Button
              href={href}
              variant={theme === "birthday" ? "primary" : "dark"}
              className="inline-flex items-center gap-2 group-hover:gap-3 transition-all"
            >
              <span>{cta}</span>
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Button>
          </div>
        </div>

        {/* Visual Preview Frame */}
        <div className="relative mx-auto flex h-72 w-full max-w-[14rem] items-center justify-center overflow-hidden rounded-2xl border border-white/80 bg-white/40 p-4 backdrop-blur shadow-inner-soft">
          <div className="scale-90 transition-transform duration-500 group-hover:scale-95">
            <PhonePreview variant={previewVariant} size="sm" />
          </div>
        </div>
      </div>
    </article>
  );
}

