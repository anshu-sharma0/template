import { brand } from "@/lib/brand";
import { Container } from "./Container";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--love-border)] bg-gradient-to-b from-white via-[var(--love-surface-blush)] to-[#fff0f3] text-[var(--love-text-heading)]">
      <Container className="py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-gradient-to-tr from-[var(--love-crimson)] to-[var(--love-pink)] font-display text-base font-bold text-white shadow-md shadow-pink-500/20">
                {brand.logo}
              </span>
              <span className="font-display text-2xl font-bold tracking-tight text-[var(--love-text-heading)]">
                {brand.name}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--love-text-body)] font-serif italic max-w-sm">
              Handcrafted digital love surprises, birthday keepsakes, and timeless wedding invitations. Made to be felt, shared, and remembered.
            </p>

            {/* Romantic Guarantee Badges */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-[var(--love-crimson)]">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 border border-[var(--love-border)] shadow-2xs">
                <span>🔒</span>
                <span>Private &amp; Permanent Links</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 border border-[var(--love-border)] shadow-2xs">
                <span>📱</span>
                <span>Mobile-First Magic</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 border border-[var(--love-border)] shadow-2xs">
                <span>🎵</span>
                <span>Sensory Soundscapes</span>
              </span>
            </div>
          </div>

          {/* Experience Quick Links */}
          <div className="space-y-3.5">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--love-crimson)]">
              Digital Experiences
            </p>
            <ul className="space-y-2.5 text-sm text-[var(--love-text-body)]">
              <li>
                <Link href="/birthday" className="transition-colors hover:text-[var(--love-crimson)] flex items-center gap-1.5">
                  <span>🎂</span>
                  <span>Birthday Surprise</span>
                </Link>
              </li>
              <li>
                <Link href="/wedding" className="transition-colors hover:text-[var(--love-crimson)] flex items-center gap-1.5">
                  <span>💍</span>
                  <span>Wedding Invitations</span>
                </Link>
              </li>
              <li>
                <Link href="/templates" className="transition-colors hover:text-[var(--love-crimson)] flex items-center gap-1.5">
                  <span>✨</span>
                  <span>Explore All Templates</span>
                </Link>
              </li>
              <li>
                <Link href="/birthday/create" className="transition-colors hover:text-[var(--love-crimson)] flex items-center gap-1.5">
                  <span>💌</span>
                  <span>Create Birthday Keepsake</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Navigation */}
          <div className="space-y-3.5">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--love-crimson)]">
              Quick Navigation
            </p>
            <ul className="space-y-2.5 text-sm text-[var(--love-text-body)]">
              <li>
                <Link href="/" className="transition-colors hover:text-[var(--love-crimson)]">
                  Home Experience
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="transition-colors hover:text-[var(--love-crimson)]">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="transition-colors hover:text-[var(--love-crimson)]">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/birthday/demo" className="transition-colors hover:text-[var(--love-crimson)]">
                  Live Recipient Demo ✨
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[var(--love-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--love-text-muted)]">
          <p className="flex items-center gap-1 font-medium">
            <span>© 2026 {brand.name}. Handcrafted with love</span>
            <span className="text-[var(--love-crimson)] animate-heart-beat">♥</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[var(--love-text-muted)] font-medium">All moments encrypted &amp; private</span>
            <span>•</span>
            <a href={`mailto:${brand.email}`} className="text-[var(--love-crimson)] font-semibold hover:underline">
              {brand.email}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
