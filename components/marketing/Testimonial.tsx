type TestimonialProps = {
  quote: string;
  name: string;
  context: string;
};

export function Testimonial({ quote, name, context }: TestimonialProps) {
  return (
    <figure className="flex flex-col justify-between rounded-3xl border border-border bg-surface p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <blockquote className="font-display text-2xl font-normal leading-snug text-text">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <figcaption className="mt-8 flex items-center gap-3 border-t border-border/60 pt-5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-soft font-display text-base font-semibold text-primary">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-display text-lg font-normal text-text">{name}</p>
          <p className="text-xs text-text-muted">{context}</p>
        </div>
      </figcaption>
    </figure>
  );
}

