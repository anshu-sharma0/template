import { PageWrapper } from "@/components/layout/PageWrapper";
import {
  HeroSection,
  FeatureGridSection,
  ProcessStepsSection,
  StatsSection,
  TestimonialSection,
  PricingSection,
  FAQSection,
  CTASection,
} from "@/components/sections";
import { OccasionSection } from "@/components/marketing/OccasionSection";
import { TemplateShowcase } from "@/components/marketing/TemplateShowcase";
import { EmotionalStory } from "@/components/marketing/EmotionalStory";
import { ExperiencePreview } from "@/components/marketing/ExperiencePreview";
import { faqs, testimonials } from "@/lib/home-data";

export default function Home() {
  const homeFeatures = [
    {
      icon: "🎂",
      title: "Virtual Cake & Candles",
      description: "Recipients tap or blow on screen to blow virtual birthday candles with sound effects & confetti.",
      badge: "Interactive",
      linkText: "Create Birthday Surprise",
      linkHref: "/birthday/create",
    },
    {
      icon: "💍",
      title: "Digital RSVP & Venue Maps",
      description: "Collect instant guest attendances, dietary notes, and provide 1-tap Google Maps venue directions.",
      badge: "Wedding Ready",
      linkText: "Create Wedding Invitation",
      linkHref: "/wedding/create",
    },
    {
      icon: "🎁",
      title: "Interactive Scratch Cards",
      description: "Add mystery scratch card reveals for secret wishes, surprise gifts, or hidden memory photos.",
      badge: "Popular",
    },
    {
      icon: "🎵",
      title: "Ambient Background Audio",
      description: "Upload personal voice notes or choose romantic, acoustic, or cheerful ambient soundtrack melodies.",
      badge: "Audio FX",
    },
    {
      icon: "📸",
      title: "3D Photo Storybooks",
      description: "Display touch-responsive memory flip cards and high-resolution photo galleries.",
      badge: "Gallery",
    },
    {
      icon: "⚡",
      title: "Instant Shareable Links",
      description: "No app downloads needed. Share private links directly on WhatsApp, QR code, or Email.",
      badge: "Instant Share",
    },
  ];

  return (
    <PageWrapper>
      <main>
        {/* 1. Hero Section */}
        <HeroSection
          eyebrow="Create & Share Digital Memories"
          title="Turn your feelings into"
          highlightText="unforgettable digital surprises."
          description="Craft personalized birthday wishes and elegant wedding invitations with interactive candles, custom audio, memory galleries, and instant RSVPs."
          primaryAction={{ label: "Create Your Surprise ✨", href: "/templates" }}
          secondaryAction={{ label: "Explore Examples", href: "#occasions" }}
          metrics={[
            { value: "50,000+", label: "Surprises Sent" },
            { value: "4.95 ★", label: "Joy Score" },
            { value: "100%", label: "Free Instant Draft" },
          ]}
        />

        {/* 2. Occasion Selection */}
        <div id="occasions">
          <OccasionSection />
        </div>

        {/* 3. Featured Templates Showcase */}
        <TemplateShowcase />

        {/* 4. Emotional Story Section */}
        <EmotionalStory />

        {/* 5. How It Works - Process Steps */}
        <ProcessStepsSection
          eyebrow="Simple Process"
          title="Four simple steps to create magic"
          description="No design skills needed. Pick a theme, add personal memories, and share in under 3 minutes."
        />

        {/* 6. Interactive Experience Live Preview */}
        <ExperiencePreview />

        {/* 7. Feature Highlights Grid */}
        <FeatureGridSection
          eyebrow="Magical Features"
          title="Everything you need to create unforgettable moments"
          description="Packed with interactive surprises, audio notes, countdowns, and guest RSVP tracking."
          features={homeFeatures}
          columns={3}
          variant="card"
          badgeTone="rose"
        />

        {/* 8. Key Community Stats */}
        <StatsSection
          eyebrow="Global Impact"
          title="Spreading joy across thousands of celebrations"
          description="Real-time statistics from creators sharing special moments across the world."
          variant="gradient"
        />

        {/* 9. Real Testimonials */}
        <TestimonialSection
          eyebrow="Real Reactions"
          title="Made for moments that matter"
          description="Short notes from people who chose to make their message unforgettable."
          testimonials={testimonials.map((item) => ({
            name: item.name,
            role: item.context,
            quote: item.quote,
            rating: 5,
            occasion: item.context,
          }))}
        />

        {/* 10. Simple Transparent Pricing */}
        <PricingSection
          eyebrow="Transparent Pricing"
          title="Start Free, Upgrade When You Need More"
          description="Create instant drafts for free. Unlock premium audio, unlimited galleries, and RSVP management whenever you're ready."
        />

        {/* 11. FAQ Section */}
        <FAQSection
          eyebrow="Got Questions?"
          title="Frequently Asked Questions"
          description="Everything you need to know about creating, customising, and sharing your digital memories."
          items={faqs}
        />

        {/* 12. Final High-Converting CTA */}
        <CTASection
          eyebrow="Ready to Surprise Someone?"
          title="Make your next wish truly unforgettable"
          description="Join 50,000+ happy creators. Pick a theme, add personal photos & music, and share in under 3 minutes."
        />
      </main>
    </PageWrapper>
  );
}
