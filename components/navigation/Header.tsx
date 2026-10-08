"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreateDropdownOpen, setIsCreateDropdownOpen] = useState(false);

  // Hide header inside standalone recipient preview or management routes
  const isPreviewOrManagePage =
    pathname.includes("/preview") || pathname.includes("/manage/");

  if (isPreviewOrManagePage) {
    return null;
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/templates", label: "Templates" },
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/birthday", label: "Birthday" },
    { href: "/wedding", label: "Wedding" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e8d5cf]/70 bg-[#fffaf5]/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 relative z-50">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="grid size-9 place-items-center rounded-full bg-gradient-to-tr from-[#873d4d] to-[#b05765] text-white font-serif font-bold text-sm shadow-xs transition-transform group-hover:scale-105 border border-[#eedad5]">
            ♥
          </span>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold tracking-tight text-[#2c2224] leading-tight group-hover:text-[#873d4d] transition-colors">
              Digital Moments
            </span>
            <span className="text-[10px] text-[#8e7b7e] font-sans -mt-0.5">
              Made with love
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-[#fceae6] text-[#873d4d]"
                    : "text-[#6e5d60] hover:text-[#2c2224] hover:bg-[#fff0ed]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Dropdown */}
        <div className="hidden sm:flex items-center gap-3 relative">
          <div className="relative">
            <button
              onClick={() => setIsCreateDropdownOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full bg-[#873d4d] px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-[#873d4d]/20 transition hover:bg-[#6b1d2f] active:scale-95"
            >
              <span>Create Surprise ♥</span>
              <span className="text-[10px]">▼</span>
            </button>

            {/* Dropdown Menu */}
            {isCreateDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 border border-[#ecdcd5] shadow-xl z-50 animate-in fade-in slide-in-from-top-2"
                onMouseLeave={() => setIsCreateDropdownOpen(false)}
              >
                <Link
                  href="/birthday/create"
                  onClick={() => setIsCreateDropdownOpen(false)}
                  className="flex items-center gap-3 rounded-xl p-3 text-left transition hover:bg-[#fff7f4]"
                >
                  <span className="text-xl">🎂</span>
                  <div>
                    <div className="text-xs font-bold text-[#2c2224]">Birthday Surprise</div>
                    <div className="text-[10px] text-[#8e7b7e]">Candles, photo frame &amp; notes</div>
                  </div>
                </Link>

                <Link
                  href="/wedding/create"
                  onClick={() => setIsCreateDropdownOpen(false)}
                  className="flex items-center gap-3 rounded-xl p-3 text-left transition hover:bg-[#fff7f4]"
                >
                  <span className="text-xl">💍</span>
                  <div>
                    <div className="text-xs font-bold text-[#2c2224]">Wedding &amp; Vow Keepsake</div>
                    <div className="text-[10px] text-[#8e7b7e]">Schedule, venue maps &amp; RSVP</div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-xl text-[#2c2224] hover:bg-[#f8eeeb] transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Floating Backdrop Overlay (Does NOT push content down) */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 top-16 bg-black/40 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Absolute Floating Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 z-50 border-b border-[#e8d5cf] bg-[#fffaf5]/95 backdrop-blur-xl px-5 py-5 space-y-3 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive
                    ? "bg-[#fceae6] text-[#b05765]"
                    : "text-[#2c2224] hover:bg-[#f8eeeb]"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#eedad5] flex gap-2.5">
            <Link
              href="/birthday/create"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex-1 text-center py-3 rounded-xl bg-[#b05765] text-white text-xs font-semibold shadow-sm hover:bg-[#964552] transition-colors"
            >
              Create Birthday Wish
            </Link>
            <Link
              href="/wedding/create"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex-1 text-center py-3 rounded-xl bg-[#c6a15b] text-white text-xs font-semibold shadow-sm hover:bg-[#b08d48] transition-colors"
            >
              Create Wedding Invitation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
