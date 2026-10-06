import { pricingConfig } from "@/lib/home-data";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "./SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Sparkle } from "@/components/decorative/Sparkle";

export function PricingPreview() {
  return (
    <Section background="warm" spacing="lg">
      <SectionHeading
        align="center"
        eyebrow="Pricing Preview"
        title="Something special shouldn't feel complicated."
        description="One simple price for a complete, personalized digital keepsake experience."
      />

      <div className="mt-12 max-w-xl mx-auto">
        <article className="relative overflow-hidden rounded-3xl border border-border/90 bg-[linear-gradient(135deg,#fffdf9_0%,#fff5ee_100%)] p-8 sm:p-10 shadow-lift text-center">
          <Badge tone="champagne" className="mx-auto">
            {pricingConfig.label}
          </Badge>

          <div className="mt-6 flex items-baseline justify-center gap-1">
            <span className="font-display text-6xl md:text-7xl font-semibold text-text tracking-tight">
              {pricingConfig.price}
            </span>
          </div>

          <p className="mt-3 text-base text-text-muted">
            {pricingConfig.subtitle}
          </p>

          <div className="my-8 border-t border-border/80" />

          <ul className="grid gap-3 text-left max-w-md mx-auto text-sm text-text-muted">
            {pricingConfig.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary text-xs font-bold">
                  ✓
                </span>
                <span className="text-text font-medium">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <Button href={pricingConfig.href} size="lg" className="w-full shadow-soft">
              <span>{pricingConfig.cta}</span>
              <Sparkle className="text-accent text-sm ml-2" />
            </Button>
          </div>
        </article>
      </div>
    </Section>
  );
}
