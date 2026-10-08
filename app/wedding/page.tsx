import { PageWrapper } from "@/components/layout/PageWrapper";
import {
  HeroSection,
  FeatureGridSection,
  ProcessStepsSection,
  FAQSection,
  CTASection,
  SectionHeader,
} from "@/components/sections";
import { DeviceFramePreview } from "@/components/interactive/DeviceFramePreview";
import { WeddingRenderer } from "@/components/wedding/WeddingRenderer";
import { DEFAULT_WEDDING_DATA } from "@/lib/wedding-data";
import { Button } from "@/components/ui/Button";

export default function WeddingLandingPage() {
  const luxuryData = { ...DEFAULT_WEDDING_DATA, template: "luxury" as const };

  const weddingFeatures = [
    {
      icon: "💌",
      title: "Interactive Guest RSVP",
      description: "Guests can respond with attendance, guest count, dietary preferences, and secret host wishes.",
      badge: "RSVP Ready",
    },
    {
      icon: "📍",
      title: "Google Maps Venue Directions",
      description: "Direct 1-tap navigation link for ceremony and reception venues so no guest gets lost.",
      badge: "Maps",
    },
    {
      icon: "⏳",
      title: "Live Event Countdown",
      description: "Real-time ticker counting down the days, hours, and minutes until the wedding ceremony.",
      badge: "Countdown",
    },
    {
      icon: "💍",
      title: "Couple Story Timeline",
      description: "Share how you met, the proposal story, and your favorite journey milestones.",
      badge: "Storybook",
    },
  ];

  const weddingFaqs = [
    {
      question: "How do guests submit RSVPs?",
      answer: "Guests fill out a clean form embedded directly in the digital invitation. All responses sync to your private management dashboard in real-time.",
    },
    {
      question: "Can we include multiple events (Haldi, Mehendi, Sangeet, Wedding)?",
      answer: "Yes! You can add custom dates, timings, venues, and descriptions for all wedding functions.",
    },
    {
      question: "Can we track how many guests opened the invitation?",
      answer: "Yes, your private management dashboard includes live view analytics and RSVP count summaries.",
    },
  ];

  return (
    <PageWrapper>
      <main>
        {/* 1. Wedding Hero Section */}
        <HeroSection
          eyebrow="Digital Wedding Invitation"
          title="Invite them to your"
          highlightText="forever."
          description="Create a beautiful digital wedding invitation filled with your story, your people and the moments that matter."
          primaryAction={{ label: "Create Our Invitation 💍", href: "/wedding/create" }}
          secondaryAction={{ label: "Explore Designs 👇", href: "#wedding-templates" }}
          metrics={[
            { value: "24,000+", label: "Weddings Celebrated" },
            { value: "99.8%", label: "RSVP Response Rate" },
            { value: "Free", label: "Instant Draft" },
          ]}
        />

        {/* 2. Template Showcase Section */}
        <section id="wedding-templates" className="py-16 sm:py-24 bg-[#fffaf5]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Two Distinct Themes"
              title="Designed for unforgettable celebrations"
              description="Choose a design style that matches the spirit of your special day."
              align="center"
              badgeTone="gold"
            />

            <div className="mt-8 grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
              {/* Template 01 — Elegant Wedding */}
              <article className="overflow-hidden rounded-3xl border border-[var(--love-border)] bg-white shadow-xl shadow-pink-500/5 text-center p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="inline-block rounded-full bg-[var(--love-surface-blush)] px-3.5 py-1 text-xs font-bold text-[var(--love-crimson)] border border-[var(--love-border)] uppercase">
                    Template 01 — Elegant
                  </span>

                  <h3 className="mt-4 font-serif text-3xl font-bold text-[var(--love-text-heading)]">
                    Elegant Botanical
                  </h3>

                  <p className="mt-2 text-xs text-[var(--love-text-body)] leading-relaxed">
                    Timeless, graceful, and beautifully understated design with soft champagne and rose accents.
                  </p>

                  <div className="my-6">
                    <DeviceFramePreview defaultDevice="mobile" showDeviceToggle={false}>
                      <WeddingRenderer data={DEFAULT_WEDDING_DATA} autoOpen />
                    </DeviceFramePreview>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4 border-t border-[var(--love-border)]">
                  <Button href="/wedding/create?template=elegant" size="lg" className="flex-1 bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] text-white shadow-md shadow-pink-500/20 hover:scale-[1.02] active:scale-95">
                    Use Elegant Theme ✨
                  </Button>
                </div>
              </article>

              {/* Template 02 — Luxury Wedding (Royal Champagne Light Luxury) */}
              <article className="overflow-hidden rounded-3xl border border-amber-200/90 bg-gradient-to-b from-white via-amber-50/40 to-[#faf4ea] text-[var(--love-text-heading)] shadow-xl shadow-amber-500/10 text-center p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="inline-block rounded-full bg-amber-100/80 px-3.5 py-1 text-xs font-bold text-amber-900 border border-amber-300/80 uppercase">
                    Template 02 — Royal Luxury
                  </span>

                  <h3 className="mt-4 font-serif text-3xl font-bold text-[var(--love-text-heading)]">
                    Royal Champagne &amp; Gold
                  </h3>

                  <p className="mt-2 text-xs text-[var(--love-text-body)] leading-relaxed">
                    Luminous, regal, ivory-gold aesthetic with warm champagne foil details &amp; sensory audio.
                  </p>

                  <div className="my-6">
                    <DeviceFramePreview defaultDevice="mobile" showDeviceToggle={false}>
                      <WeddingRenderer data={luxuryData} autoOpen />
                    </DeviceFramePreview>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4 border-t border-amber-200/60">
                  <Button href="/wedding/create?template=luxury" size="lg" className="flex-1 bg-gradient-to-r from-[#d97706] to-[#b45309] text-white hover:opacity-90 shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-95">
                    Use Royal Luxury Theme 👑
                  </Button>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 3. Wedding Feature Grid */}
        <FeatureGridSection
          eyebrow="Wedding Features"
          title="Everything you need for your wedding invitation"
          description="Integrated RSVP management, Google maps directions, couple story, and countdowns."
          features={weddingFeatures}
          columns={2}
          variant="card"
          badgeTone="gold"
        />

        {/* 4. Wedding Process Steps */}
        <ProcessStepsSection
          eyebrow="Simple Workflow"
          title="How to create your wedding invitation"
          description="Set up your couple details, wedding event schedule, photo gallery, and RSVP form."
          steps={[
            { number: "01", icon: "💍", title: "Couple Details & Story", description: "Add couple names, wedding date, & love story notes.", tag: "Details" },
            { number: "02", icon: "📍", title: "Events & Venue Maps", description: "Add schedule for Sangeet, Ceremony, & Reception venues.", tag: "Schedule" },
            { number: "03", icon: "💌", title: "Share & Collect RSVPs", description: "Send on WhatsApp. Guests RSVP directly into your dashboard.", tag: "Instant" },
          ]}
        />

        {/* 5. Wedding FAQ */}
        <FAQSection
          eyebrow="Wedding FAQs"
          title="Questions About Digital Wedding Invites"
          description="Everything you need to know about managing RSVPs and customizing wedding designs."
          items={weddingFaqs}
        />

        {/* 6. Final Wedding CTA */}
        <CTASection
          eyebrow="Start Planning Now"
          title="Create your dream digital wedding invite"
          description="Build your personalized invitation and collect guest RSVPs with ease."
          primaryAction={{ label: "Create Wedding Invite 💍", href: "/wedding/create" }}
        />
      </main>
    </PageWrapper>
  );
}
