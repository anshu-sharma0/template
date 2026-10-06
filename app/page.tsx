import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/marketing/CTASection";
import { EmotionalStory } from "@/components/marketing/EmotionalStory";
import { ExperiencePreview } from "@/components/marketing/ExperiencePreview";
import { FAQ } from "@/components/marketing/FAQ";
import { Hero } from "@/components/marketing/Hero";
import { OccasionCard } from "@/components/marketing/OccasionCard";
import { PricingCard } from "@/components/marketing/PricingCard";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { StepTimeline } from "@/components/marketing/StepTimeline";
import { TemplateCard } from "@/components/marketing/TemplateCard";
import { Testimonial } from "@/components/marketing/Testimonial";
import { faqs, occasions, pricing, templates, testimonials } from "@/lib/home-data";

export default function Home() {
  return (
    <PageWrapper>
      <Header />
      <main>
        <Hero />

        <Section id="occasions" background="surface" spacing="lg">
          <SectionHeading
            align="center"
            eyebrow="Choose the occasion"
            title="What are you creating?"
            description="Start with the feeling, then shape it into a beautiful experience."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {occasions.map((occasion) => (
              <OccasionCard key={occasion.title} {...occasion} />
            ))}
          </div>
        </Section>

        <Section id="templates" background="default" spacing="lg">
          <SectionHeading
            align="center"
            eyebrow="See what you can create"
            title="Made for moments that matter."
            description="Choose a beautiful starting point and make it yours."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {templates.map((template) => (
              <TemplateCard key={template.name} {...template} />
            ))}
          </div>
        </Section>

        <StepTimeline />
        <ExperiencePreview />
        <EmotionalStory />

        <Section background="default" spacing="lg">
          <SectionHeading
            align="center"
            eyebrow="Real reactions"
            title="The best part is what happens after they open it."
            description="A few tiny stories from people who wanted their message to feel less ordinary."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Testimonial key={`${testimonial.name}-${testimonial.occasion}`} {...testimonial} />
            ))}
          </div>
        </Section>

        <Section background="warm" spacing="lg">
          <SectionHeading
            align="center"
            eyebrow="Pricing preview"
            title="Simple, clear and made for one beautiful moment."
            description="Payments are not implemented in this phase. These prices are frontend placeholders for the product experience."
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {pricing.map((item) => (
              <PricingCard key={item.title} {...item} />
            ))}
          </div>
        </Section>

        <Section background="surface" spacing="lg">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <SectionHeading
              eyebrow="FAQ"
              title="Before you create yours."
              description="Product-focused answers for the first version of the experience."
            />
            <FAQ items={faqs} />
          </div>
        </Section>

        <CTASection />
      </main>
      <Footer />
    </PageWrapper>
  );
}
