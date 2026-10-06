import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { brand } from "@/lib/brand";
import { Heart } from "@/components/decorative/Heart";
import { Sparkle } from "@/components/decorative/Sparkle";

export function EmotionalStory() {
  return (
    <Section background="soft" spacing="lg" className="relative overflow-hidden">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        {/* Left Column: Large Editorial Statement */}
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Emotional Keepsakes
          </p>

          <h2 className="mt-4 font-display text-4xl font-normal leading-[1.12] text-text md:text-6xl">
            Some moments deserve <br className="hidden sm:inline" />
            more than a message.
          </h2>

          <div className="mt-6 space-y-3">
            <p className="font-display text-2xl text-text-muted italic">
              A text can be read and forgotten.
            </p>
            <p className="font-display text-2xl text-primary font-medium">
              A thoughtful experience can become a memory.
            </p>
          </div>

          <p className="mt-6 text-base leading-8 text-text-muted">
            When you send a digital wish or wedding invitation through our canvas, you are not just sharing information — you are creating an intimate moment filled with warmth, music, and your own memories.
          </p>

          <div className="mt-8 pt-4">
            <Button href={brand.links.create} size="lg">
              Create Something Special
            </Button>
          </div>
        </div>

        {/* Right Column: Stacked Editorial Keepsake Card Composition */}
        <div className="relative mx-auto w-full max-w-md py-6">
          {/* Subtle decorative glow */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(176,87,101,0.12),transparent_70%)] blur-2xl" />

          {/* Background Card 1 - Handwritten style message card */}
          <div className="absolute top-0 right-4 w-[17rem] rotate-6 rounded-2xl border border-border bg-surface p-5 shadow-soft">
            <p className="font-serif italic text-lg text-primary-strong">
              &ldquo;I wanted to send you something you could hold onto forever...&rdquo;
            </p>
            <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
              <span>Made with love</span>
              <Heart className="text-primary text-sm" />
            </div>
          </div>

          {/* Main Front Polaroid Photo Card */}
          <div className="relative z-10 mx-auto w-[18rem] -rotate-3 rounded-2xl border border-border bg-white p-4 shadow-lift transition-transform duration-500 hover:rotate-0">
            {/* Photo Placeholder */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[linear-gradient(135deg,#fce4ec,#f8bbd0)] flex flex-col items-center justify-center p-4 text-center">
              <Sparkle className="text-primary text-xl mb-2" />
              <p className="font-display text-2xl text-text">Unforgettable Memory</p>
              <p className="text-xs text-text-muted mt-1 font-sans">Captured & Saved</p>
            </div>

            {/* Handwritten style message below photo */}
            <div className="mt-4 text-center">
              <p className="font-serif italic text-xl text-text leading-snug">
                Happy Birthday, My Love ❤️
              </p>
              <p className="mt-1 font-sans text-xs font-medium text-text-muted uppercase tracking-wider">
                A personal surprise
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
