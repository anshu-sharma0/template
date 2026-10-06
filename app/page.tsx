import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Section } from "@/components/layout/Section";
import { Hero } from "@/components/marketing/Hero";
import { OccasionSection } from "@/components/marketing/OccasionSection";
import { TemplateShowcase } from "@/components/marketing/TemplateShowcase";
import { EmotionalStory } from "@/components/marketing/EmotionalStory";
import { StepTimeline } from "@/components/marketing/StepTimeline";
import { ExperiencePreview } from "@/components/marketing/ExperiencePreview";
import { FeatureHighlights } from "@/components/marketing/FeatureHighlights";
import { Testimonial } from "@/components/marketing/Testimonial";
import { PricingPreview } from "@/components/marketing/PricingPreview";
import { FAQ } from "@/components/marketing/FAQ";
import { CTASection } from "@/components/marketing/CTASection";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { faqs, testimonials } from "@/lib/home-data";

export default function Home() {
  return (
    <PageWrapper>
      {/* 1. Header */}
      <Header />

      <main>
        {/* 2. Hero */}
        <Hero />

        {/* 3. Occasion Selection */}
        <OccasionSection />

        {/* 4. Featured Templates */}
        <TemplateShowcase />

        {/* 5. Emotional Story Section */}
        <EmotionalStory />

        {/* 6. How It Works */}
        <StepTimeline />

        {/* 7. Interactive Experience Preview */}
        <ExperiencePreview />

        {/* 8. Why This Feels Special */}
        <FeatureHighlights />

        {/* 9. Testimonials */}
        <Section background="default" spacing="lg">
          <SectionHeading
            align="center"
            eyebrow="Real Reactions"
            title="Made for moments that matter."
            description="Short notes from people who chose to make their message unforgettable."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
            {testimonials.map((item) => (
              <Testimonial key={item.name} {...item} />
            ))}
          </div>
        </Section>

        {/* 10. Simple Pricing Preview */}
        <PricingPreview />

        {/* 11. FAQ */}
        <FAQ items={faqs} />

        {/* 12. Final CTA */}
        <CTASection />
      </main>

      {/* 13. Footer */}
      <Footer />
    </PageWrapper>
  );
}
