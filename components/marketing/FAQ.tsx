import { Accordion } from "@/components/ui/Accordion";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  items: FAQItem[];
};

export function FAQ({ items }: FAQProps) {
  return <Accordion items={items.map((item) => ({ question: item.question, answer: <p>{item.answer}</p> }))} />;
}
