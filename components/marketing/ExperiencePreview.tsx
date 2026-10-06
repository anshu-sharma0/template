import { Section } from "@/components/layout/Section";
import { SectionHeading } from "./SectionHeading";
import { PhonePreview } from "./PhonePreview";

export function ExperiencePreview() {
  return (
    <Section background="default" spacing="lg">
      <SectionHeading
        align="center"
        eyebrow="Recipient experience"
        title="This is not just a card."
        description="The person you love opens a small digital moment built around their name, your words and a beautiful preview."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <article className="grid gap-8 rounded-[var(--radius-medium)] border border-border bg-[linear-gradient(135deg,#fffdf9,#fdebe8)] p-6 shadow-soft md:grid-cols-[0.8fr_1fr] md:items-center">
          <PhonePreview variant="birthday" size="sm" className="mx-auto" />
          <div>
            <p className="text-sm font-medium text-primary">Birthday Wish</p>
            <h3 className="mt-3 font-display text-4xl leading-tight text-text">Someone made something special for you.</h3>
            <p className="mt-4 text-base leading-7 text-text-muted">
              A gentle opening, a personal birthday message, a photo moment and a closing note made with love.
            </p>
          </div>
        </article>

        <article className="grid gap-8 rounded-[var(--radius-medium)] border border-border bg-[linear-gradient(135deg,#fffdf9,#f3e7d4)] p-6 shadow-soft md:grid-cols-[0.8fr_1fr] md:items-center">
          <PhonePreview variant="wedding" size="sm" className="mx-auto" />
          <div>
            <p className="text-sm font-medium text-accent-strong">Wedding Invitation</p>
            <h3 className="mt-3 font-display text-4xl leading-tight text-text">Together with their families.</h3>
            <p className="mt-4 text-base leading-7 text-text-muted">
              Names, date, story and invitation details presented like a refined wedding microsite.
            </p>
          </div>
        </article>
      </div>
    </Section>
  );
}
