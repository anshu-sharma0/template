import { steps } from "@/lib/home-data";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "./SectionHeading";
import { Sparkle } from "@/components/decorative/Sparkle";

export function StepTimeline() {
  return (
    <Section id="how-it-works" background="warm" spacing="lg">
      <SectionHeading
        align="center"
        eyebrow="How It Works"
        title="Made simple. Made personal."
        description="Four thoughtful steps to create a digital memory they will treasure."
      />

      {/* Visual Timeline Progression */}
      <div className="relative mt-16 max-w-6xl mx-auto">
        {/* Horizontal Connecting Line (Desktop) */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute top-7 left-[8%] right-[8%] h-0.5 bg-[linear-gradient(90deg,var(--primary-soft)_0%,var(--accent)_50%,var(--primary-soft)_100%)] z-0"
        />

        {/* Vertical Connecting Line (Mobile) */}
        <div
          aria-hidden="true"
          className="lg:hidden absolute top-7 bottom-7 left-[2.25rem] w-0.5 bg-border z-0"
        />

        <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6 relative z-10">
          {steps.map((step) => (
            <li key={step.number} className="relative flex lg:flex-col items-start lg:items-center gap-6 lg:text-center group">
              {/* Step Circle Badge */}
              <div className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-surface bg-background font-display text-lg font-semibold text-primary shadow-soft transition-transform duration-300 group-hover:scale-110 group-hover:bg-surface">
                {step.number}
              </div>

              {/* Step Card Content */}
              <div className="flex-1 rounded-2xl border border-border bg-surface p-6 shadow-soft transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lift w-full">
                <div className="flex items-center justify-between lg:justify-center gap-2 mb-2">
                  <h3 className="font-display text-2xl font-normal text-text">
                    {step.title}
                  </h3>
                  <Sparkle className="text-accent text-sm lg:hidden" />
                </div>
                <p className="text-sm leading-6 text-text-muted">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

