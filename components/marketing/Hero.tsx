import { brand } from "@/lib/brand";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Heart } from "@/components/decorative/Heart";
import { Petal } from "@/components/decorative/Petal";
import { Sparkle } from "@/components/decorative/Sparkle";
import { PhonePreview } from "./PhonePreview";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fffaf5,#fff7ef_64%,#fffdf9)] pb-14 pt-14 md:pb-20 md:pt-20">
      <div className="absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,rgba(244,207,210,0.54),rgba(255,250,245,0))]" />
      <Petal className="absolute left-[7%] top-24 rotate-12 motion-safe:animate-petal-drift" />
      <Petal className="absolute right-[12%] top-32 -rotate-45 opacity-70 motion-safe:animate-petal-drift-delayed" />
      <Sparkle className="absolute right-[21%] top-20 text-xl opacity-70 motion-safe:animate-fade-in" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
          <Badge tone="champagne" className="mx-auto lg:mx-0">
            Digital wishes and wedding invitations
          </Badge>
          <h1 className="mt-6 font-display text-5xl leading-none text-text md:text-7xl lg:text-8xl">
            Make their moment unforgettable.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text-muted md:text-xl md:leading-9 lg:mx-0">
            Create beautiful digital birthday wishes and wedding invitations made with love.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button href={brand.links.create} size="lg">
              Create Something Special
            </Button>
            <Button href={brand.links.templates} variant="secondary" size="lg">
              Explore Designs
            </Button>
          </div>
          <div className="mt-8 grid gap-3 text-sm text-text-muted sm:grid-cols-3">
            <p className="rounded-[var(--radius-medium)] border border-border bg-surface/75 px-4 py-3">
              Preview before purchase
            </p>
            <p className="rounded-[var(--radius-medium)] border border-border bg-surface/75 px-4 py-3">
              Made for mobile
            </p>
            <p className="rounded-[var(--radius-medium)] border border-border bg-surface/75 px-4 py-3">
              Share as a link
            </p>
          </div>
        </div>

        <div className="relative mx-auto flex min-h-[32rem] w-full max-w-[34rem] items-center justify-center">
          <div className="absolute -left-20 top-16 hidden w-40 rounded-[var(--radius-medium)] border border-border bg-surface/80 p-4 shadow-soft backdrop-blur xl:block">
            <p className="text-xs text-text-muted">Recipient opens</p>
            <p className="mt-2 font-display text-3xl leading-tight text-text">Made only for you</p>
            <Heart className="mt-3 text-lg" />
          </div>
          <div className="absolute -right-24 bottom-16 hidden w-48 rounded-[var(--radius-medium)] border border-border bg-text p-4 text-white shadow-lift xl:block">
            <p className="text-xs text-white/60">Wedding preview</p>
            <p className="mt-2 font-display text-3xl leading-tight">Rahul & Isha</p>
            <p className="mt-3 text-sm text-white/70">12.12.2026</p>
          </div>
          <div className="absolute inset-x-10 bottom-4 h-12 bg-[linear-gradient(90deg,transparent,rgba(176,87,101,0.2),transparent)] blur-2xl" />
          <PhonePreview size="lg" floating variant="birthday" className="relative z-10" />
        </div>
      </div>
    </section>
  );
}
