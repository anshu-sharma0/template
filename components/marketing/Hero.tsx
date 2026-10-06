import { brand } from "@/lib/brand";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Heart } from "@/components/decorative/Heart";
import { Petal } from "@/components/decorative/Petal";
import { Sparkle } from "@/components/decorative/Sparkle";
import { PhonePreview } from "./PhonePreview";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fffaf5_0%,#fff5ed_50%,#fffdf9_100%)] pb-16 pt-12 md:pb-24 md:pt-20">
      {/* Decorative gradient top bar */}
      <div className="absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,rgba(244,207,210,0.45),rgba(255,250,245,0))]" />

      {/* Floating Petals & Sparkles */}
      <Petal className="absolute left-[6%] top-20 rotate-12 motion-safe:animate-petal-drift pointer-events-none opacity-80" />
      <Petal className="absolute right-[8%] top-28 -rotate-45 motion-safe:animate-petal-drift-delayed pointer-events-none opacity-70" />
      <Sparkle className="absolute left-[15%] bottom-20 text-xl text-accent opacity-70 motion-safe:animate-fade-in pointer-events-none" />
      <Sparkle className="absolute right-[18%] top-16 text-2xl text-primary opacity-65 motion-safe:animate-fade-in pointer-events-none" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:px-8">
        {/* Left Column: Text & CTAs */}
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
          <Badge tone="champagne" className="mx-auto lg:mx-0">
            Digital wishes & wedding invitations
          </Badge>

          <h1 className="mt-6 font-display text-5xl leading-[1.06] text-text md:text-7xl lg:text-8xl">
            Make their moment <br className="hidden sm:inline" />
            <span className="text-primary italic font-serif">unforgettable.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-text-muted md:text-xl md:leading-9 lg:mx-0">
            Create a beautiful digital birthday wish or wedding invitation, made with love and meant to be remembered.
          </p>

          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:justify-center lg:justify-start">
            <Button href={brand.links.create} size="lg" className="shadow-lift">
              Create Something Special
            </Button>
            <Button href={brand.links.templates} variant="secondary" size="lg">
              Explore Designs
            </Button>
          </div>

          {/* Micro value props */}
          <div className="mt-10 grid gap-3 text-xs font-medium text-text-muted sm:grid-cols-3">
            <div className="flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-surface/80 px-3.5 py-3 shadow-sm backdrop-blur lg:justify-start">
              <span className="size-2 rounded-full bg-success" />
              <span>Preview before purchase</span>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-surface/80 px-3.5 py-3 shadow-sm backdrop-blur lg:justify-start">
              <span className="size-2 rounded-full bg-accent" />
              <span>Designed mobile-first</span>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-surface/80 px-3.5 py-3 shadow-sm backdrop-blur lg:justify-start">
              <span className="size-2 rounded-full bg-primary" />
              <span>Shareable private link</span>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Device Composition */}
        <div className="relative mx-auto flex min-h-[34rem] w-full max-w-[34rem] items-center justify-center">
          {/* Subtle background glow */}
          <div className="absolute inset-x-4 top-12 bottom-12 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(176,87,101,0.18)_0%,rgba(198,161,91,0.12)_40%,transparent_70%)] blur-3xl pointer-events-none" />

          {/* Secondary rotated card behind main phone */}
          <div className="absolute left-2 top-8 w-[15.5rem] -rotate-6 rounded-[2rem] border border-border/90 bg-surface p-3 shadow-soft transition-transform duration-700 hover:rotate-0 hidden sm:block">
            <div className="rounded-xl border border-border/60 bg-surface-soft p-4 text-center">
              <p className="text-[10px] uppercase tracking-widest text-accent-strong font-medium">Luxury Wedding</p>
              <p className="mt-2 font-display text-2xl text-text">Rahul & Isha</p>
              <p className="mt-1 text-xs text-text-muted">12.12.2026</p>
              <Heart className="mx-auto mt-3 text-sm text-primary" />
            </div>
          </div>

          {/* Main phone in center */}
          <PhonePreview
            size="lg"
            variant="birthday"
            floating
            className="relative z-20 shadow-phone"
          />

          {/* Floating keepsake badge details */}
          <div className="absolute -right-2 bottom-12 hidden w-44 rounded-2xl border border-border bg-surface/95 p-3.5 shadow-lift backdrop-blur sm:block z-30">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary">
              <Sparkle className="text-accent text-sm" />
              <span>Digital Keepsake</span>
            </div>
            <p className="mt-1 font-display text-sm text-text leading-tight">
              Personal photos, music & custom note
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

