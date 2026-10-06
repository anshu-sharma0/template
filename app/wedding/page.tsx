import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PhonePreview } from "@/components/marketing/PhonePreview";
import { WeddingRenderer } from "@/components/wedding/WeddingRenderer";
import { DEFAULT_WEDDING_DATA } from "@/lib/wedding-data";
import { Floral } from "@/components/decorative/Floral";
import { Sparkle } from "@/components/decorative/Sparkle";

export default function WeddingLandingPage() {
  const luxuryData = { ...DEFAULT_WEDDING_DATA, template: "luxury" as const };

  return (
    <PageWrapper>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fffdf9_0%,#f5ead7_60%,#fffdf9_100%)] pb-16 pt-12 md:pb-24 md:pt-20">
          <Floral className="absolute left-[8%] top-16 opacity-70 pointer-events-none" />
          <Floral className="absolute right-[10%] top-24 opacity-60 pointer-events-none" />
          <Sparkle className="absolute left-[15%] bottom-16 text-accent text-xl opacity-75 pointer-events-none" />

          <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:px-8">
            <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
              <Badge tone="champagne" className="mx-auto lg:mx-0">
                Digital Wedding Invitation
              </Badge>

              <h1 className="mt-6 font-display text-5xl leading-[1.06] text-text md:text-7xl lg:text-8xl">
                Invite them to <br className="hidden sm:inline" />
                your <span className="text-primary italic font-serif">forever.</span>
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-text-muted md:text-xl md:leading-9 lg:mx-0">
                Create a beautiful digital wedding invitation filled with your story, your people and the moments that matter.
              </p>

              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:justify-center lg:justify-start">
                <Button href="/wedding/create" size="lg" className="shadow-lift">
                  Create Our Invitation
                </Button>
                <Button href="#wedding-templates" variant="secondary" size="lg">
                  Explore Designs
                </Button>
              </div>
            </div>

            {/* Hero Phone Preview */}
            <div className="relative mx-auto flex min-h-128 w-full max-w-lg items-center justify-center">
              <div className="absolute inset-4 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(198,161,91,0.18)_0%,transparent_70%)] blur-3xl pointer-events-none" />
              <PhonePreview size="lg" floating variant="wedding" className="relative z-10 shadow-phone" />
            </div>
          </div>
        </section>

        {/* Template Showcase Section */}
        <Section id="wedding-templates" background="surface" spacing="lg">
          <SectionHeading
            align="center"
            eyebrow="Two Distinct Designs"
            title="Designed for unforgettable celebrations."
            description="Choose a start point that matches the spirit of your wedding."
          />

          <div className="mt-12 grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            {/* Template 01 — Elegant Wedding */}
            <article className="overflow-hidden rounded-3xl border border-border bg-background shadow-lift text-center p-8 flex flex-col justify-between">
              <div>
                <Badge tone="champagne" className="mx-auto">
                  Template 01
                </Badge>

                <h3 className="mt-4 font-display text-4xl font-normal text-text">
                  Elegant Wedding
                </h3>

                <p className="mt-2 text-base text-text-muted leading-relaxed">
                  Timeless, graceful and beautifully understated.
                </p>

                <div className="my-8 flex justify-center bg-[linear-gradient(135deg,#fffdf9,#f3e8d8)] p-6 rounded-2xl border border-border/60">
                  <PhonePreview size="sm" className="shadow-soft">
                    <WeddingRenderer data={DEFAULT_WEDDING_DATA} autoOpen />
                  </PhonePreview>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button href="/wedding/create?template=elegant" size="lg" className="flex-1 shadow-soft">
                  Use Elegant
                </Button>
                <Button href="/wedding/preview?template=elegant" variant="outline" size="lg">
                  Preview Design
                </Button>
              </div>
            </article>

            {/* Template 02 — Luxury Wedding */}
            <article className="overflow-hidden rounded-3xl border border-border bg-[linear-gradient(180deg,#191514_0%,#3d282c_100%)] text-white shadow-lift text-center p-8 flex flex-col justify-between">
              <div>
                <Badge tone="champagne" className="mx-auto bg-white/10 text-accent border-accent/40">
                  Template 02
                </Badge>

                <h3 className="mt-4 font-display text-4xl font-normal text-white">
                  Luxury Wedding
                </h3>

                <p className="mt-2 text-base text-white/70 leading-relaxed">
                  Sophisticated, romantic and made for an unforgettable celebration.
                </p>

                <div className="my-8 flex justify-center bg-white/5 p-6 rounded-2xl border border-white/10">
                  <PhonePreview size="sm" className="shadow-soft">
                    <WeddingRenderer data={luxuryData} autoOpen />
                  </PhonePreview>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button href="/wedding/create?template=luxury" size="lg" className="flex-1 bg-[linear-gradient(135deg,#c6a15b,#8a6934)] text-white shadow-soft">
                  Use Luxury
                </Button>
                <Button href="/wedding/preview?template=luxury" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
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
