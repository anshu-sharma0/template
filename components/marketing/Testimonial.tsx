type TestimonialProps = {
  quote: string;
  name: string;
  occasion: string;
  city?: string;
};

export function Testimonial({ quote, name, occasion, city }: TestimonialProps) {
  return (
    <figure className="rounded-[var(--radius-medium)] border border-border bg-surface p-6 shadow-soft">
      <blockquote className="font-display text-3xl leading-tight text-text">“{quote}”</blockquote>
      <figcaption className="mt-6 text-sm text-text-muted">
        <span className="font-medium text-text">{name}</span>
        <span> · {occasion}</span>
        {city ? <span> · {city}</span> : null}
      </figcaption>
    </figure>
  );
}
