"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RSVPFormSectionProps {
  title?: string;
  subtitle?: string;
  onSubmit?: (data: { name: string; status: string; guests: number; note: string }) => void;
  className?: string;
}

export function RSVPFormSection({
  title = "Will You Join Us?",
  subtitle = "Please RSVP by confirming your attendance below.",
  onSubmit,
  className,
}: RSVPFormSectionProps) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"attending" | "declined">("attending");
  const [guests, setGuests] = useState(1);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitted(true);
    if (onSubmit) {
      onSubmit({ name, status, guests, note });
    }
  };

  return (
    <div className={cn("mx-auto max-w-lg rounded-3xl bg-white p-6 sm:p-8 border border-[#e8d5cf] shadow-xl", className)}>
      <div className="text-center">
        <span className="text-3xl">💌</span>
        <h3 className="mt-2 font-serif text-2xl font-bold text-[#2c2224]">{title}</h3>
        <p className="mt-1 text-xs text-[#6e5d60]">{subtitle}</p>
      </div>

      {submitted ? (
        <div className="my-8 rounded-2xl bg-[#fceae6] p-6 text-center animate-in fade-in duration-300">
          <span className="text-4xl">✨</span>
          <h4 className="mt-2 font-serif text-lg font-bold text-[#b05765]">RSVP Received!</h4>
          <p className="mt-1 text-xs text-[#6e5d60]">
            Thank you, <strong className="text-[#2c2224]">{name}</strong>! We&apos;ve saved your response.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 rounded-full bg-[#b05765] px-4 py-2 text-xs font-semibold text-white"
          >
            Submit Another Response
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#2c2224] mb-1">Your Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-[#e8d5cf] bg-[#fffaf5] px-4 py-2.5 text-xs text-[#2c2224] focus:border-[#b05765] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2c2224] mb-1">Attendance Status</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setStatus("attending")}
                className={cn(
                  "rounded-xl py-2.5 text-xs font-bold transition-all border cursor-pointer",
                  status === "attending"
                    ? "bg-[#b05765] text-white border-[#b05765] shadow-xs"
                    : "bg-[#fffaf5] text-[#6e5d60] border-[#e8d5cf]"
                )}
              >
                🎉 Joyfully Attend
              </button>
              <button
                type="button"
                onClick={() => setStatus("declined")}
                className={cn(
                  "rounded-xl py-2.5 text-xs font-bold transition-all border cursor-pointer",
                  status === "declined"
                    ? "bg-[#2c2224] text-white border-[#2c2224] shadow-xs"
                    : "bg-[#fffaf5] text-[#6e5d60] border-[#e8d5cf]"
                )}
              >
                😔 Regretfully Decline
              </button>
            </div>
          </div>

          {status === "attending" && (
            <div>
              <label className="block text-xs font-bold text-[#2c2224] mb-1">Number of Guests</label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full rounded-xl border border-[#e8d5cf] bg-[#fffaf5] px-4 py-2.5 text-xs text-[#2c2224] focus:border-[#b05765] focus:outline-none"
              >
                <option value={1}>1 Guest (Just Me)</option>
                <option value={2}>2 Guests (+1 Partner)</option>
                <option value={3}>3 Guests (Family)</option>
                <option value={4}>4+ Guests</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#2c2224] mb-1">Personal Wish / Note</label>
            <textarea
              rows={3}
              placeholder="Write a message for the hosts..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full rounded-xl border border-[#e8d5cf] bg-[#fffaf5] px-4 py-2.5 text-xs text-[#2c2224] focus:border-[#b05765] focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-[#b05765] py-3 text-xs font-bold text-white shadow-md hover:bg-[#964552] transition-colors"
          >
            Send RSVP Confirmation ✨
          </button>
        </form>
      )}
    </div>
  );
}
