import { Accordion } from "@/components/ui/Accordion";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "./SectionHeading";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  items: FAQItem[];
};

export function FAQ({ items }: FAQProps) {
  return (
    <Section id="faq" background="surface" spacing="lg">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="FAQ"
          title="A few things you might be wondering."
          description="Clear answers about creating, sharing and previewing your digital wish or invitation."
        />
        <Accordion
          items={items.map((item) => ({
            question: item.question,
            answer: <p>{item.answer}</p>,
          }))}
        />
      </div>
    </Section>
  );
}

