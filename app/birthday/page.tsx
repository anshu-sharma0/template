import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PhonePreview } from "@/components/marketing/PhonePreview";
import { BirthdayWishRenderer } from "@/components/birthday/BirthdayWishRenderer";
import { DEFAULT_BIRTHDAY_DATA } from "@/lib/birthday-data";
import { Heart } from "@/components/decorative/Heart";
import { Petal } from "@/components/decorative/Petal";
import { Sparkle } from "@/components/decorative/Sparkle";

export default function BirthdayLandingPage() {
  return (
    <PageWrapper>
      <Header />

      <main>
        {/* Birthday Hero Section */}
        <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fffaf5_0%,#fff0ec_55%,#fffdf9_100%)] pb-16 pt-12 md:pb-24 md:pt-20">
          <Petal className="absolute left-[8%] top-16 rotate-12 opacity-80 pointer-events-none motion-safe:animate-petal-drift" />
          <Petal className="absolute right-[10%] top-24 -rotate-45 opacity-70 pointer-events-none motion-safe:animate-petal-drift-delayed" />
          <Sparkle className="absolute left-[18%] bottom-16 text-accent text-xl opacity-75 pointer-events-none" />

          <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:px-8">
            <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
              <Badge tone="rose" className="mx-auto lg:mx-0">
                Digital Birthday Surprise
              </Badge>

              <h1 className="mt-6 font-display text-5xl leading-[1.06] text-text md:text-7xl lg:text-8xl">
                Make their birthday feel <br className="hidden sm:inline" />
                a little more <span className="text-primary italic font-serif">special.</span>
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-text-muted md:text-xl md:leading-9 lg:mx-0">
                Turn your words, photos and memories into a beautiful digital birthday surprise made just for them.
              </p>

              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:justify-center lg:justify-start">
                <Button href="/birthday/create" size="lg" className="shadow-lift">
                  Create a Birthday Wish
                </Button>
                <Button href="#birthday-preview" variant="secondary" size="lg">
                  See an Example
                </Button>
              </div>
            </div>

            {/* Hero Phone Preview */}
            <div className="relative mx-auto flex min-h-128 w-full max-w-lg items-center justify-center">
              <div className="absolute inset-4 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(176,87,101,0.18)_0%,transparent_70%)] blur-3xl pointer-events-none" />
              <PhonePreview size="lg" floating variant="birthday" className="relative z-10 shadow-phone" />
            </div>
          </div>
        </section>

        {/* Birthday Experience Preview Section */}
        <Section id="birthday-preview" background="default" spacing="lg">
          <SectionHeading
            align="center"
            eyebrow="Recipient Experience"
            title="It opens like a digital gift."
            description="From the first tap to the final note, every moment is crafted to feel personal."
          />

          <div className="mt-12 max-w-4xl mx-auto grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center rounded-3xl border border-border bg-surface p-6 sm:p-10 shadow-lift">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/40 px-3.5 py-1.5 text-xs font-semibold text-primary">
                <Heart className="text-sm" />
                <span>What they see</span>
              </div>

              <h3 className="font-display text-4xl text-text font-normal leading-tight">
                “Someone made something special for you ❤️”
              </h3>

              <p className="text-base text-text-muted leading-relaxed">
                When they tap the private link, an intimate cover invites them to reveal their birthday surprise.
              </p>

              <ul className="space-y-3 text-sm text-text-muted">
                <li className="flex items-center gap-3">
                  <span className="flex size-5 items-center justify-center rounded-full bg-primary-soft text-primary font-bold text-xs">✓</span>
                  <span>Personal birthday greeting & portrait</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex size-5 items-center justify-center rounded-full bg-primary-soft text-primary font-bold text-xs">✓</span>
                  <span>Heartfelt personal note from you</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex size-5 items-center justify-center rounded-full bg-primary-soft text-primary font-bold text-xs">✓</span>
                  <span>Sweet photo memories gallery & music</span>
                </li>
              </ul>

              <div className="pt-2">
                <Button href="/birthday/create" size="lg">
                  Create a Birthday Wish
                </Button>
              </div>
            </div>

            <div className="flex justify-center bg-[linear-gradient(135deg,#fff8f3,#f6dce0)] p-6 rounded-2xl border border-border/70">
              <PhonePreview size="md" className="shadow-phone">
                <BirthdayWishRenderer data={DEFAULT_BIRTHDAY_DATA} autoOpen />
              </PhonePreview>
            </div>
          </div>
        </Section>

        {/* Single Design Selection Section */}
        <Section background="surface" spacing="lg">
          <SectionHeading
            align="center"
            eyebrow="Template Design"
            title="Designed for beautiful moments."
            description="Our curated design for birthday surprises, warm and ready to personalize."
          />

          <div className="mt-12 max-w-xl mx-auto">
            <article className="overflow-hidden rounded-3xl border border-border bg-background shadow-lift text-center p-8">
              <Badge tone="rose" className="mx-auto">
                Birthday Wish
              </Badge>

              <h3 className="mt-4 font-display text-4xl font-normal text-text">
                Romantic Birthday
              </h3>

              <p className="mt-2 text-base text-text-muted leading-relaxed">
                A warm, emotional and beautifully personal birthday experience.
              </p>

              <div className="my-8 flex justify-center bg-[linear-gradient(135deg,#fff8f3,#f6dce0)] p-6 rounded-2xl border border-border/60">
                <PhonePreview size="sm" className="shadow-soft">
                  <BirthdayWishRenderer data={DEFAULT_BIRTHDAY_DATA} autoOpen />
                </PhonePreview>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button href="/birthday/create" size="lg" className="flex-1 shadow-soft">
                  Use This Design
                </Button>
                <Button href="/birthday/preview" variant="outline" size="lg">
                  Preview Design
                </Button>
              </div>
            </article>
          </div>
        </Section>
      </main>

      <Footer />
    </PageWrapper>
  );
}
