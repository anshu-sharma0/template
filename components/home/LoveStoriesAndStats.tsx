"use client";

export function LoveStoriesAndStats() {
  const stats = [
    {
      icon: "🎁",
      value: "65,000+",
      label: "Love Surprises Gifted",
      desc: "Across 40+ countries",
    },
    {
      icon: "💍",
      value: "28,000+",
      label: "Weddings & Vows Celebrated",
      desc: "Live RSVPs collected",
    },
    {
      icon: "💌",
      value: "1.8M+",
      label: "Memories Viewed",
      desc: "Zero ads, 100% private",
    },
    {
      icon: "⭐",
      value: "4.98 / 5",
      label: "Emotional Joy Score",
      desc: "From 14,000+ verified ratings",
    },
  ];

  const stories = [
    {
      quote:
        "My partner of four years cried happy tears when our song started playing softly in the background while she looked through our first date photos. This was infinitely better than any physical card.",
      name: "Aarav & Meera",
      role: "3rd Anniversary Surprise",
      occasion: "Anniversary ♥",
      rating: 5,
    },
    {
      quote:
        "Our wedding guests couldn't stop talking about how romantic and effortless the digital invitation was. One tap gave them Google Maps directions, schedule, and RSVP. Pure perfection.",
      name: "Rhea & Kabir",
      role: "Wedding in Udaipur",
      occasion: "Wedding 💍",
      rating: 5,
    },
    {
      quote:
        "We are in a long-distance relationship across different continents. Opening this surprise at midnight made the distance vanish. It felt like he was right beside me.",
      name: "Tanisha K.",
      role: "Surprise from New York",
      occasion: "Long Distance Love 💌",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-white via-[var(--love-surface-blush)] to-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--love-border)] bg-white px-4 py-1.5 shadow-2xs mb-4">
            <span className="text-xs text-[var(--love-crimson)] animate-heart-beat">♥</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--love-crimson)]">
              Real Love Stories
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--love-text-heading)] leading-tight">
            Cherished by lovers, soulmates &amp; families.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[var(--love-text-body)] leading-relaxed">
            Read notes from people who chose to make their special moment
            truly unforgettable.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {stories.map((item, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-between rounded-3xl bg-white p-7 sm:p-8 border border-[var(--love-border)] shadow-xs transition-all duration-300 hover:shadow-love-card hover:border-pink-300 hover:-translate-y-1"
            >
              <div>
                {/* Header: Rating & Occasion */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 text-sm tracking-widest">
                    {"★".repeat(item.rating)}
                  </div>
                  <span className="rounded-full bg-[var(--love-surface-blush)] px-3 py-1 text-[10px] font-bold text-[var(--love-crimson)] border border-[var(--love-border)]">
                    {item.occasion}
                  </span>
                </div>

                {/* Heartfelt Quote */}
                <p className="text-sm text-[var(--love-text-heading)] leading-relaxed italic font-serif">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Footer */}
              <div className="mt-6 pt-4 border-t border-[var(--love-border-subtle)] flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-full bg-gradient-to-tr from-[var(--love-crimson)] to-[var(--love-pink)] text-white font-bold text-sm shadow-xs">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-xs text-[var(--love-text-heading)]">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-[var(--love-text-muted)]">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Impact / Metrics Silk Ribbon (Luminous Rose & Ivory Styling) */}
        <div className="rounded-[36px] bg-gradient-to-r from-white via-[var(--love-surface-blush)] to-[var(--love-surface-rose)] p-8 sm:p-12 text-[var(--love-text-heading)] shadow-love-lift border border-[var(--love-border)] relative overflow-hidden">
          {/* Subtle ambient light inside ribbon */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -left-20 size-72 rounded-full bg-pink-200/40 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-20 size-72 rounded-full bg-amber-200/30 blur-3xl"
          />

          <div className="relative z-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-pink-200/60">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-3 sm:px-6"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-white text-2xl mb-4 border border-[var(--love-border)] shadow-xs">
                  {stat.icon}
                </span>

                <div className="font-serif text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-[var(--love-crimson)] via-[var(--love-rose)] to-[var(--love-pink)] bg-clip-text text-transparent">
                  {stat.value}
                </div>

                <div className="mt-1 text-xs sm:text-sm font-bold text-[var(--love-text-heading)]">
                  {stat.label}
                </div>

                <div className="mt-1 text-[11px] text-[var(--love-text-muted)]">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
