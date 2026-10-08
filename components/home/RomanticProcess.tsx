"use client";

import Link from "next/link";

export function RomanticProcess() {
  const steps = [
    {
      number: "01",
      icon: "🎨",
      title: "Choose Your Canvas",
      description:
        "Select an aesthetic that captures your relationship — from soft blush love letters to glamorous midnight wedding suites.",
      tag: "Handcrafted Themes",
    },
    {
      number: "02",
      icon: "✍️",
      title: "Weave In Your Memories",
      description:
        "Write from the heart, upload cherished photos of your journey together, and choose a melody that gives them chills.",
      tag: "Music & Photo Vault",
    },
    {
      number: "03",
      icon: "💌",
      title: "Deliver the Spark",
      description:
        "Get your private link immediately. Send via WhatsApp or print as a lovely QR card, and watch their eyes light up with joy.",
      tag: "Instant 1-Tap Share",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#fff5ee]/50 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#eedad5] bg-white px-4 py-1.5 shadow-2xs mb-4">
            <span className="text-xs text-[#873d4d]">♥</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#873d4d]">
              Simple &amp; Seamless
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2c2224] leading-tight">
            How love comes to life in three gentle steps.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#6e5d60] leading-relaxed">
            No design or technical experience needed. If you know how to write a
            text, you can craft a breathtaking surprise in under 3 minutes.
          </p>
        </div>

        {/* Process Step Cards */}
        <div className="relative">
          {/* Subtle connecting line for desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-1/2 left-20 right-20 h-0.5 -translate-y-8 bg-gradient-to-r from-[#eedad5] via-[#873d4d]/30 to-[#eedad5] z-0"
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-3xl bg-white p-8 border border-[#ecdcd5] shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#b05765]/40 hover:-translate-y-1.5"
              >
                <div>
                  {/* Step Top Bar: Icon + Number */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="grid size-14 place-items-center rounded-2xl bg-[#fff0ec] text-2xl text-[#873d4d] border border-[#eedad5] shadow-2xs transition-transform duration-300 group-hover:scale-110">
                      {step.icon}
                    </span>
                    <span className="font-serif text-4xl font-bold text-[#873d4d]/20 group-hover:text-[#873d4d]/40 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  {/* Step Title & Details */}
                  <h3 className="font-serif text-xl font-bold text-[#2c2224] transition-colors group-hover:text-[#873d4d]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-[#6e5d60] leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>

                {/* Step Bottom Tag */}
                <div className="mt-6 pt-4 border-t border-[#f4e4df]">
                  <span className="inline-block rounded-full bg-[#fff2ec] px-3 py-1 text-[11px] font-bold text-[#873d4d] border border-[#eedad5]">
                    {step.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-14 text-center">
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 rounded-full bg-[#873d4d] px-8 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-[#873d4d]/20 transition-all hover:bg-[#6b1d2f] hover:shadow-lg active:scale-95"
          >
            <span>Start Creating in 3 Minutes</span>
            <span>✨</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
