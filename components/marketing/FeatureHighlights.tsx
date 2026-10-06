import { featureHighlights } from "@/lib/home-data";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "./SectionHeading";

const iconsMap = ["✦", "✿", "◈", "❖"];

export function FeatureHighlights() {
  return (
    <Section background="surface" spacing="lg">
      <SectionHeading
        align="center"
        eyebrow="Thoughtful Details"
        title="Why this feels special"
        description="Crafted to make digital moments feel emotional, personal, and timeless."
      />

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {featureHighlights.map((feature, index) => (
          <article
            key={feature.title}
            className="group flex flex-col justify-between rounded-3xl border border-border bg-background p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
          >
            <div>
              <div className="flex size-10 items-center justify-center rounded-xl bg-surface-soft font-serif text-lg text-primary shadow-inner-soft transition-transform group-hover:scale-110">
                {iconsMap[index % iconsMap.length]}
              </div>

              <h3 className="mt-5 font-display text-2xl font-normal text-text">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-text-muted">
                {feature.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
