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
    <section className="py-20 sm:py-28 bg-[#fffaf5] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#eedad5] bg-white px-4 py-1.5 shadow-2xs mb-4">
            <span className="text-xs text-[#873d4d]">♥</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#873d4d]">
              Real Love Stories
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2c2224] leading-tight">
            Cherished by lovers, soulmates &amp; families.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#6e5d60] leading-relaxed">
            Read notes from people who chose to make their special moment
            truly unforgettable.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {stories.map((item, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-between rounded-3xl bg-white p-7 sm:p-8 border border-[#ecdcd5] shadow-xs transition-all duration-300 hover:shadow-xl hover:border-[#b05765]/40 hover:-translate-y-1"
            >
              <div>
                {/* Header: Rating & Occasion */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 text-sm tracking-widest">
                    {"★".repeat(item.rating)}
                  </div>
                  <span className="rounded-full bg-[#fff0ec] px-3 py-1 text-[10px] font-bold text-[#873d4d] border border-[#eedad5]">
                    {item.occasion}
                  </span>
                </div>

                {/* Heartfelt Quote */}
                <p className="text-sm text-[#2c2224] leading-relaxed italic font-serif">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Footer */}
              <div className="mt-6 pt-4 border-t border-[#f4e4df] flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-full bg-gradient-to-tr from-[#873d4d] to-[#d87a8c] text-white font-bold text-sm shadow-xs">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-xs text-[#2c2224]">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-[#7c6b67]">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Impact / Metrics Velvet Ribbon (Fixed Contrast & Luxury Styling) */}
        <div className="rounded-[36px] bg-gradient-to-r from-[#3f1922] via-[#57222f] to-[#3a161f] p-8 sm:p-12 text-white shadow-2xl border border-[#642837] relative overflow-hidden">
          {/* Subtle ambient light inside ribbon */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -left-20 size-72 rounded-full bg-[#b05765]/30 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-20 size-72 rounded-full bg-[#c6a15b]/20 blur-3xl"
          />

          <div className="relative z-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-3 sm:px-6"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-2xl mb-4 border border-white/10 shadow-inner">
                  {stat.icon}
                </span>

                <div className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  {stat.value}
                </div>

                <div className="mt-1 text-xs sm:text-sm font-semibold text-[#fceae6]">
                  {stat.label}
                </div>

                <div className="mt-1 text-[11px] text-[#caaeb3]">
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
