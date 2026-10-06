import { brand } from "@/lib/brand";
import { Button } from "@/components/ui/Button";
import { Heart } from "@/components/decorative/Heart";
import { Sparkle } from "@/components/decorative/Sparkle";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#fff2ef,#fffaf5_48%,#f7eddc)] py-18 md:py-24">
      <Sparkle className="absolute left-[13%] top-12 text-2xl opacity-70" />
      <Heart className="absolute bottom-10 right-[14%] text-3xl opacity-50" />
      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-6">
        <h2 className="font-display text-5xl leading-tight text-text md:text-7xl">
          Make someone feel special today. <Heart className="inline text-primary" />
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text-muted">
          It only takes a few minutes to create something they&apos;ll remember.
        </p>
        <Button href={brand.links.create} size="lg" className="mt-8">
          Create Something Special
        </Button>
      </div>
    </section>
  );
}
