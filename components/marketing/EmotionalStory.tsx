import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { brand } from "@/lib/brand";
import { PhonePreview } from "./PhonePreview";

export function EmotionalStory() {
  return (
    <Section background="soft" spacing="lg">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.82fr] lg:items-center">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-primary">Why it exists</p>
          <h2 className="mt-5 font-display text-5xl leading-tight text-text md:text-6xl">
            Some moments deserve more than a message.
          </h2>
          <p className="mt-6 text-lg leading-8 text-text-muted">
            A normal WhatsApp message disappears into the chat. A beautiful digital experience becomes a memory.
          </p>
          <div className="mt-8 grid gap-4 text-base leading-7 text-text-muted sm:grid-cols-2">
            <p className="border-l border-primary/35 pl-4">
              Birthday wishes can feel like a small gift, not another line of text.
            </p>
            <p className="border-l border-accent/45 pl-4">
              Wedding invitations can feel ceremonial before guests even arrive.
            </p>
          </div>
          <Button href={brand.links.create} className="mt-9" size="lg">
            Create Something Special
          </Button>
        </div>

        <div className="relative mx-auto grid w-full max-w-md place-items-center">
          <div className="absolute inset-x-10 top-10 h-72 bg-[linear-gradient(180deg,rgba(198,161,91,0.18),rgba(176,87,101,0))] blur-3xl" />
          <PhonePreview variant="luxuryWedding" size="lg" className="relative z-10" />
        </div>
      </div>
    </Section>
  );
}
