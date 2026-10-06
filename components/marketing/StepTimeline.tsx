import { steps } from "@/lib/home-data";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "./SectionHeading";

export function StepTimeline() {
  return (
    <Section id="how-it-works" background="warm" spacing="lg">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading
          eyebrow="How it works"
          title="From idea to unforgettable."
          description="A guided creation flow that keeps the focus on the person, the feeling and the preview."
        />

        <ol className="relative grid gap-8 md:grid-cols-3 md:gap-4">
          <span aria-hidden="true" className="absolute left-6 top-8 h-[calc(100%-4rem)] w-px bg-border md:left-0 md:right-0 md:top-9 md:mx-auto md:h-px md:w-[calc(100%-5rem)]" />
          {steps.map((step) => (
            <li key={step.number} className="relative grid gap-4 pl-16 md:pl-0 md:pt-20">
              <span className="absolute left-0 top-0 grid size-12 place-items-center rounded-[var(--radius-pill)] border border-border bg-surface font-display text-lg text-primary shadow-soft md:left-1/2 md:-translate-x-1/2">
                {step.number}
              </span>
              <div className="rounded-[var(--radius-medium)] border border-border bg-surface p-5 shadow-soft">
                <h3 className="font-display text-3xl leading-tight text-text">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-text-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
