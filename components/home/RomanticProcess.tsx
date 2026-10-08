"use client";

import Link from "next/link";

export function RomanticProcess() {
  const steps = [
    {
      number: "01",
      icon: "🎨",
      title: "Choose Your Canvas",
      description:
        "Select an aesthetic that captures your relationship — from soft blush love letters to glamorous golden wedding suites.",
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
    <section id="how-it-works" className="py-20 sm:py-28 bg-linear-to-b from-[#ffffff] via-[#fff5f7] to-[#ffffff] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-200/80 bg-white px-4 py-1.5 shadow-xs mb-4">
            <span className="text-xs text-[#ff3366] animate-heart-beat">♥</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#e11d48]">
              Simple &amp; Seamless
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1f1a1c] leading-tight">
            How love comes to life in{" "}
            <span className="bg-linear-to-r from-[#e11d48] via-[#ff3366] to-[#ff758f] bg-clip-text text-transparent italic">
              three gentle steps.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#524548] leading-relaxed">
            No design or technical experience needed. If you know how to write a
            text, you can craft a breathtaking surprise in under 2 minutes.
          </p>
        </div>

        {/* Process Step Cards */}
        <div className="relative">
          {/* Connecting line */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-1/2 left-20 right-20 h-0.5 -translate-y-8 bg-linear-to-r from-pink-200 via-pink-300 to-pink-200 z-0"
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col justify-between rounded-3xl bg-white p-8 border border-pink-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10 hover:border-pink-300 hover:-translate-y-1.5"
              >
                <div>
                  {/* Step Top Bar: Icon + Number */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="grid size-14 place-items-center rounded-2xl bg-linear-to-tr from-[#ffe4ea] to-[#fff0f3] text-2xl text-[#ff3366] border border-pink-200 shadow-xs transition-transform duration-300 group-hover:scale-110">
                      {step.icon}
                    </span>
                    <span className="font-serif text-4xl font-bold bg-linear-to-br from-pink-300 to-pink-100 bg-clip-text text-transparent group-hover:from-pink-400 group-hover:to-pink-200 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  {/* Step Title & Details */}
                  <h3 className="font-serif text-xl font-bold text-[#1f1a1c] transition-colors group-hover:text-[#ff3366]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-[#6b5e62] leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>

                {/* Step Bottom Tag */}
                <div className="mt-6 pt-4 border-t border-pink-100">
                  <span className="inline-block rounded-full bg-pink-50 px-3 py-1 text-[11px] font-bold text-[#e11d48] border border-pink-200">
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
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#ff3366] via-[#ff4d6d] to-[#ff758f] px-8 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-pink-500/25 transition-all hover:shadow-lg hover:shadow-pink-500/35 hover:scale-105 active:scale-95"
          >
            <span>Start Creating in 2 Minutes</span>
            <span>✨</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
