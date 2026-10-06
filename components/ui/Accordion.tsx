import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type AccordionItem = {
  question: string;
  answer: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
};

export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={cn("divide-y divide-border rounded-[var(--radius-medium)] border border-border bg-surface", className)}>
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 text-left text-base font-medium text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-primary md:px-6">
            <span>{item.question}</span>
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-pill)] bg-surface-soft text-lg text-primary transition group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="px-5 pb-5 text-base leading-7 text-text-muted md:px-6">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
