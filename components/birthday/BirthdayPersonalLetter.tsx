"use client";

interface BirthdayPersonalLetterProps {
  message: string;
  senderName?: string;
  recipientName: string;
}

export function BirthdayPersonalLetter({
  message,
  senderName,
  recipientName,
}: BirthdayPersonalLetterProps) {
  const defaultLetter =
    "Happy birthday to the person who makes my world feel a little softer and brighter every single day.\n\nLooking back at our journey, I realize that every ordinary day becomes an adventure simply because you are in it. Thank you for your warmth, your unwavering patience, and for loving me so purely.\n\nI hope this year brings you as much unconditional happiness as you bring into my life every single moment.";

  const letterText = message || defaultLetter;

  return (
    <section className="relative my-8 px-4">
      <div className="mx-auto max-w-sm">
        {/* Section Pill */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-pink-200/90 bg-white px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#e11d48] shadow-2xs">
            <span>💌</span>
            <span>A Letter From My Heart</span>
          </div>
        </div>

        {/* Deckled-edge Paper Card */}
        <div className="relative overflow-hidden rounded-3xl border-2 border-pink-200/80 bg-linear-to-b from-white via-[#fffdf9] to-[#fff8fa] p-6 sm:p-7 shadow-xl shadow-pink-500/10">
          {/* Subtle Paper Watermark Heart */}
          <div className="pointer-events-none absolute right-4 top-4 text-pink-100 text-6xl font-serif select-none">
            ♥
          </div>

          {/* Letter Salutation */}
          <div className="border-b border-pink-100 pb-3 mb-4">
            <span className="font-serif italic text-lg sm:text-xl font-bold text-[#9d3d5e]">
              Dearest {recipientName},
            </span>
          </div>

          {/* Letter Body */}
          <div className="space-y-4">
            <p className="font-serif italic text-sm sm:text-base text-[#2c2224] leading-relaxed whitespace-pre-line font-medium">
              &ldquo;{letterText}&rdquo;
            </p>
          </div>

          {/* Signature Footer */}
          <div className="mt-6 pt-4 border-t border-pink-100 flex items-center justify-between">
            <div>
              <p className="font-serif italic text-xs text-[#8e7b7e]">
                With all my love, always
              </p>
              <p className="font-serif text-lg font-bold text-[#1f1a1c] mt-0.5">
                {senderName || "Yours Truly"}
              </p>
            </div>

            {/* Wax Seal Stamp */}
            <div className="size-11 rounded-full bg-linear-to-tr from-[#e11d48] to-[#ff3366] text-white flex items-center justify-center text-sm font-serif shadow-md border-2 border-white ring-2 ring-pink-100">
              ♥
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
