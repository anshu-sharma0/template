import { brand } from "@/lib/brand";
import { Button } from "@/components/ui/Button";
import { Heart } from "@/components/decorative/Heart";
import { Petal } from "@/components/decorative/Petal";
import { Sparkle } from "@/components/decorative/Sparkle";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#fff2ef_0%,#fffaf5_50%,#f7eddc_100%)] py-20 md:py-28">
      {/* Decorative Glow */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 bg-[radial-gradient(ellipse_at_center,rgba(176,87,101,0.15)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      {/* Floating Petals, Sparkles & Hearts */}
      <Petal className="absolute left-[10%] top-12 rotate-12 opacity-80 pointer-events-none motion-safe:animate-petal-drift" />
      <Petal className="absolute right-[12%] bottom-16 -rotate-45 opacity-70 pointer-events-none motion-safe:animate-petal-drift-delayed" />
      <Sparkle className="absolute left-[18%] bottom-12 text-2xl text-accent opacity-75 pointer-events-none" />
      <Heart className="absolute right-[20%] top-16 text-3xl text-primary opacity-60 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-6">
        <h2 className="font-display text-5xl leading-[1.08] text-text md:text-7xl">
          Make something <br className="hidden sm:inline" />
          <span className="text-primary italic font-serif">they&apos;ll remember.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-text-muted md:text-xl">
          It only takes a few minutes to turn a message into a moment.
        </p>

        <div className="mt-10">
          <Button href={brand.links.create} size="lg" className="shadow-lift">
            Create Something Special
          </Button>
        </div>
      </div>
    </section>
  );
}
