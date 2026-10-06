import { occasions } from "@/lib/home-data";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "./SectionHeading";
import { OccasionCard } from "./OccasionCard";

export function OccasionSection() {
  return (
    <Section id="occasions" background="surface" spacing="lg">
      <SectionHeading
        align="center"
        eyebrow="Occasion Selection"
        title="Choose the moment worth making special."
        description="Start with something personal, beautiful and made just for them."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
        {occasions.map((occasion) => (
          <OccasionCard key={occasion.label} {...occasion} />
        ))}
      </div>
    </Section>
  );
}
