import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

type PricingCardProps = {
  title: string;
  price: string;
  description: string;
  cta: string;
  href: string;
  tone: "birthday" | "wedding";
};

export function PricingCard({ title, price, description, cta, href, tone }: PricingCardProps) {
  const isBirthday = tone === "birthday";

  return (
    <article
      className={cn(
        "rounded-[var(--radius-medium)] border border-border bg-surface p-6 shadow-soft",
        !isBirthday && "bg-[linear-gradient(135deg,#fffdf9,#f7eddc)]",
      )}
    >
      <Badge tone={isBirthday ? "rose" : "champagne"}>{title}</Badge>
      <p className="mt-7 text-sm text-text-muted">Starting from</p>
      <p className="mt-2 font-display text-6xl leading-none text-text">{price}</p>
      <p className="mt-5 text-base leading-7 text-text-muted">{description}</p>
      <Button href={href} variant={isBirthday ? "primary" : "dark"} className="mt-7" fullWidth>
        {cta}
      </Button>
    </article>
  );
}
