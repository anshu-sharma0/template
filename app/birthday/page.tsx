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
import { BirthdayWishRenderer } from "@/components/birthday/BirthdayWishRenderer";
import { DEFAULT_BIRTHDAY_DATA } from "@/lib/birthday-data";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Heart } from "@/components/decorative/Heart";

export default function BirthdayLandingPage() {
  const birthdayFeatures = [
    {
      icon: "🕯️",
      title: "Blow Candles Animation",
      description: "Recipients tap or blow on screen to blow virtual birthday cake candles with sound & sparkles.",
      badge: "Interactive",
    },
    {
      icon: "🎁",
      title: "Secret Scratch Reveal",
      description: "Add a scratch card layer for secret wishes, gift vouchers, or surprise photo reveals.",
      badge: "Surprise",
    },
    {
      icon: "🎵",
      title: "Personal Birthday Song",
      description: "Background music auto-plays as they open their digital wish card.",
      badge: "Custom Audio",
    },
    {
      icon: "📸",
      title: "Memory Photo Book",
      description: "Upload high-res photos capturing your favourite moments together.",
      badge: "Galleries",
    },
  ];

  const birthdayFaqs = [
    {
      question: "How does the recipient open their birthday surprise?",
      answer: "You get a private shareable link (e.g. digitalmoments.com/birthday/khushi). When they click it on WhatsApp or Instagram DM, it opens directly in their phone browser without installing any app.",
    },
    {
      question: "Can I edit the photos or message after sharing?",
      answer: "Yes! You can manage and update your creation anytime using your private management token.",
    },
    {
      question: "Is it mobile friendly?",
      answer: "100%! All our birthday templates are engineered specifically for mobile touchscreens with responsive animations.",
    },
  ];

  return (
    <PageWrapper>
      <main>
        {/* 1. Birthday Hero Section */}
        <HeroSection
          eyebrow="Digital Birthday Surprise"
          title="Make their birthday feel a little more"
          highlightText="special."
          description="Turn your words, photos and memories into a beautiful digital birthday surprise made just for them."
          primaryAction={{ label: "Create a Birthday Wish 🎂", href: "/birthday/create" }}
          secondaryAction={{ label: "See Live Example 👇", href: "#birthday-preview" }}
          metrics={[
            { value: "35,000+", label: "Birthday Wishes Sent" },
            { value: "4.9 ★", label: "Recipient Rating" },
            { value: "Free", label: "Instant Preview" },
          ]}
        />

        {/* 2. Interactive Device Frame Preview */}
        <section id="birthday-preview" className="py-16 sm:py-24 bg-[var(--love-canvas-ivory)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Recipient Experience"
              title="It opens like a digital gift box"
              description="From the first tap to the final note, every moment is crafted to feel personal and heartfelt."
              align="center"
              badgeTone="rose"
            />

            <div className="mt-8 max-w-5xl mx-auto grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center rounded-3xl border border-[var(--love-border)] bg-white p-6 sm:p-10 shadow-xl shadow-pink-500/5">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--love-border)] bg-[var(--love-surface-blush)] px-3.5 py-1.5 text-xs font-bold text-[var(--love-crimson)] shadow-2xs">
                  <Heart className="text-sm" />
                  <span>What They Experience</span>
                </div>

                <h3 className="font-serif text-3xl font-bold text-[var(--love-text-heading)] leading-tight">
                  &quot;Someone made something special for you ❤️&quot;
                </h3>

                <p className="text-sm text-[var(--love-text-body)] leading-relaxed">
                  When they tap the private link, an intimate cover invites them to reveal their birthday surprise.
                </p>

                <ul className="space-y-3 text-xs text-[var(--love-text-heading)]">
                  <li className="flex items-center gap-3">
                    <span className="flex size-5 items-center justify-center rounded-full bg-[var(--love-surface-blush)] text-[var(--love-crimson)] font-bold text-xs border border-[var(--love-border)]">✓</span>
                    <span>Personal birthday greeting &amp; portrait</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex size-5 items-center justify-center rounded-full bg-[var(--love-surface-blush)] text-[var(--love-crimson)] font-bold text-xs border border-[var(--love-border)]">✓</span>
                    <span>Heartfelt personal note from you</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex size-5 items-center justify-center rounded-full bg-[var(--love-surface-blush)] text-[var(--love-crimson)] font-bold text-xs border border-[var(--love-border)]">✓</span>
                    <span>Sweet photo memories gallery &amp; music</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Button href="/birthday/create" size="lg" className="bg-gradient-to-r from-[var(--love-crimson)] to-[var(--love-pink)] text-white shadow-md shadow-pink-500/20 hover:scale-[1.02] active:scale-95">
                    Create a Birthday Wish ✨
                  </Button>
                </div>
              </div>

              {/* Interactive Device Preview Component */}
              <div className="flex justify-center">
                <DeviceFramePreview defaultDevice="mobile" showDeviceToggle={false}>
                  <BirthdayWishRenderer data={DEFAULT_BIRTHDAY_DATA} autoOpen />
                </DeviceFramePreview>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Birthday Feature Grid */}
        <FeatureGridSection
          eyebrow="Interactive Elements"
          title="Designed for memorable surprises"
          description="Combine candles, audio, photos, and scratch cards to build an unforgettable birthday memory."
          features={birthdayFeatures}
          columns={2}
          variant="card"
          badgeTone="rose"
        />

        {/* 4. How It Works Steps */}
        <ProcessStepsSection
          eyebrow="3-Minute Creation"
          title="Simple steps to send a birthday wish"
          description="Create your surprise in 3 easy steps and share instantly via WhatsApp or link."
          steps={[
            { number: "01", icon: "👤", title: "Add Recipient Details", description: "Enter their name, birthday message, & portrait photo.", tag: "Personalise" },
            { number: "02", icon: "📸", title: "Upload Photos & Audio", description: "Add your favorite memories and background birthday music track.", tag: "Media" },
            { number: "03", icon: "🚀", title: "Share Private Link", description: "Get your instant link or QR code to send on WhatsApp.", tag: "Instant" },
          ]}
        />

        {/* 5. Birthday FAQ */}
        <FAQSection
          eyebrow="Birthday FAQs"
          title="Common Questions About Birthday Wishes"
          description="Everything you need to know about creating and sending digital birthday cards."
          items={birthdayFaqs}
        />

        {/* 6. Final Birthday CTA */}
        <CTASection
          eyebrow="Start Creating Now"
          title="Make their birthday extra memorable"
          description="Takes less than 3 minutes to create a personalized digital birthday wish."
          primaryAction={{ label: "Create Birthday Wish 🎂", href: "/birthday/create" }}
        />
      </main>
    </PageWrapper>
  );
}
