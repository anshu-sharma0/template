import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type OccasionCardProps = {
  icon: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  badge: string;
  decorative: string;
  theme: "birthday" | "wedding";
};

const themeClasses = {
  birthday: {
    surface: "bg-[linear-gradient(135deg,#fffdf9,#fde9e6)]",
    badge: "rose" as const,
    accent: "text-primary",
    visual: "bg-[linear-gradient(145deg,#fff8f3,#f4cfd2)]",
  },
  wedding: {
    surface: "bg-[linear-gradient(135deg,#fffdf9,#f5ead7)]",
    badge: "champagne" as const,
    accent: "text-accent-strong",
    visual: "bg-[linear-gradient(145deg,#fff9ef,#d9c6a5)]",
  },
};

export function OccasionCard({
  icon,
  title,
  description,
  cta,
  href,
  badge,
  decorative,
  theme,
}: OccasionCardProps) {
  const styles = themeClasses[theme];

  return (
    <article
      id={theme === "birthday" ? "birthday-wish" : "wedding-invitation"}
      className={cn(
        "group relative overflow-hidden rounded-[var(--radius-medium)] border border-border p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift md:p-7",
        styles.surface,
      )}
    >
      <div className="absolute right-5 top-5 text-4xl opacity-20 transition duration-300 group-hover:scale-110">
        {icon}
      </div>
      <div className="grid gap-8 md:grid-cols-[1fr_13rem] md:items-end">
        <div className="relative z-10">
          <Badge tone={styles.badge}>{badge}</Badge>
          <h3 className="mt-6 font-display text-4xl leading-tight text-text">{title}</h3>
          <p className="mt-4 max-w-md text-base leading-7 text-text-muted">{description}</p>
          <Button href={href} variant={theme === "birthday" ? "primary" : "dark"} className="mt-7">
            {cta}
          </Button>
        </div>

        <div className="relative min-h-52 overflow-hidden rounded-[var(--radius-medium)] border border-white/70 bg-white/40 p-4">
          <div className={cn("absolute inset-4 rounded-[var(--radius-small)]", styles.visual)} />
          <div className="relative z-10 grid h-full content-between">
            <p className={cn("max-w-28 font-display text-2xl leading-tight", styles.accent)}>
              {decorative}
            </p>
            <div className="ml-auto h-24 w-16 rounded-t-[var(--radius-pill)] rounded-b-[var(--radius-medium)] border border-white/80 bg-white/60 shadow-soft" />
          </div>
        </div>
      </div>
    </article>
  );
}
