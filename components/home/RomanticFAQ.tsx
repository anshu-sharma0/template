"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export function RomanticFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "How does my recipient open their surprise?",
      answer:
        "They receive a private, lovely link via WhatsApp, iMessage, Email, or an elegant printed QR code. When they tap it, the surprise opens immediately in their mobile browser with ambient music, smooth animations, and no app download or sign-up needed.",
    },
    {
      question: "Can I add our own couple photos and romantic song?",
      answer:
        "Absolutely. You can upload your favorite memories, organize them into a storybook or flip cards, and choose from our curated library of romantic acoustic piano tracks or upload your own song/voice message.",
    },
    {
      question: "Is our surprise completely private and secure?",
      answer:
        "Yes, 100%. Your memories are not indexed on Google search engines, nor are they publicly discoverable. Only people who possess the secret unique URL can view the keepsake.",
    },
    {
      question: "How do the interactive candles and scratch cards work?",
      answer:
        "On birthday themes, the recipient can blow into their microphone or tap the screen to blow out the virtual candles, triggering celebration sounds and golden confetti! On scratch cards, they swipe their finger across the foil to reveal your hidden surprise note.",
    },
    {
      question: "Can I preview everything before sharing?",
      answer:
        "Yes! You can customize names, write your love letter, upload photos, and see a full live interactive device preview on your screen for free before finalizing.",
    },
    {
      question: "How long does the keepsake link stay active?",
      answer:
        "Your digital keepsakes come with permanent link access! Couples regularly save the private link to their phone home screens and reopen it on every anniversary to re-read their memories.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 sm:py-28 bg-linear-to-b from-[#ffffff] via-[#fff8fa] to-[#ffffff] relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-200/80 bg-white px-4 py-1.5 shadow-xs mb-4">
            <span className="text-xs text-[#ff3366] animate-heart-beat">♥</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#e11d48]">
              Questions &amp; Reassurance
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1f1a1c] leading-tight">
            Frequently{" "}
            <span className="bg-linear-to-r from-[#e11d48] via-[#ff3366] to-[#ff758f] bg-clip-text text-transparent italic">
              asked questions.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#524548] leading-relaxed">
            Everything you need to know about crafting and sharing your digital
            love keepsakes.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-pink-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search questions (e.g. photos, privacy, music)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-pink-200 bg-white pl-11 pr-5 py-3 text-xs sm:text-sm text-[#1f1a1c] placeholder-[#8e7b7e] focus:border-[#ff3366] focus:ring-3 focus:ring-pink-100 focus:outline-none shadow-xs transition-all"
              />
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={cn(
                  "overflow-hidden rounded-2xl border transition-all duration-200",
                  isOpen
                    ? "bg-linear-to-r from-white to-[#fff8fa] border-pink-200 shadow-md shadow-pink-500/5"
                    : "bg-white border-pink-100 hover:border-pink-200 shadow-xs"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left text-sm sm:text-base font-semibold text-[#1f1a1c] hover:text-[#ff3366] transition-colors"
                >
                  <span className="font-serif font-bold text-base sm:text-lg">
                    {faq.question}
                  </span>
                  <span
                    className={cn(
                      "grid size-7 place-items-center rounded-full text-xs font-bold transition-transform duration-200 shrink-0 ml-4 border",
                      isOpen
                        ? "rotate-180 bg-linear-to-r from-[#ff3366] to-[#ff758f] text-white border-transparent"
                        : "bg-pink-50 text-[#e11d48] border-pink-200"
                    )}
                  >
                    ▼
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-[#524548] leading-relaxed border-t border-pink-100 pt-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Need Personal Help Card */}
        <div className="mt-12 text-center rounded-3xl bg-linear-to-br from-[#ffffff] via-[#fff5f7] to-[#ffeef2] p-6 sm:p-8 border-2 border-pink-200/90 max-w-lg mx-auto shadow-sm">
          <p className="font-serif text-base sm:text-lg font-bold text-[#1f1a1c]">
            Have a custom idea or special request?
          </p>
          <p className="mt-1.5 text-xs text-[#6b5e62] leading-relaxed">
            Our team is here to help you make your proposal, birthday, or anniversary surprise unforgettable.
          </p>
          <a
            href="mailto:hello@lumavows.test"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#ff3366] to-[#ff758f] px-6 py-2.5 text-xs font-bold text-white shadow-sm shadow-pink-500/25 hover:shadow-md hover:scale-105 transition-all"
          >
            <span>Message Us</span>
            <span>💌</span>
          </a>
        </div>
      </div>
    </section>
  );
}
