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
    <header className="sticky top-0 z-40 w-full border-b border-[#e8d5cf]/70 bg-[#fffaf5]/85 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="grid size-9 place-items-center rounded-full bg-[#b05765] text-white font-serif font-bold text-sm shadow-sm transition-transform group-hover:scale-105">
            ✨
          </span>
          <span className="font-serif text-xl font-bold tracking-tight text-[#2c2224]">
            Digital Moments
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-colors ${isActive
                    ? "bg-[#fceae6] text-[#b05765]"
                    : "text-[#6e5d60] hover:text-[#2c2224] hover:bg-[#f8eeeb]"
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
              className="inline-flex items-center gap-2 rounded-full bg-[#b05765] px-5 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-[#964552] active:scale-95"
            >
              <span>Create Experience</span>
              <span className="text-[10px]">▼</span>
            </button>

            {/* Dropdown Menu */}
            {isCreateDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 border border-[#e8d5cf] shadow-xl z-50 animate-in fade-in slide-in-from-top-2"
                onMouseLeave={() => setIsCreateDropdownOpen(false)}
              >
                <Link
                  href="/birthday/create"
                  onClick={() => setIsCreateDropdownOpen(false)}
                  className="flex items-center gap-3 rounded-xl p-3 text-left transition hover:bg-[#fff9f6]"
                >
                  <span className="text-xl">🎂</span>
                  <div>
                    <div className="text-xs font-bold text-[#2c2224]">Birthday Surprise</div>
                    <div className="text-[10px] text-[#8e7b7e]">Photo frame & notes</div>
                  </div>
                </Link>

                <Link
                  href="/wedding/create"
                  onClick={() => setIsCreateDropdownOpen(false)}
                  className="flex items-center gap-3 rounded-xl p-3 text-left transition hover:bg-[#fff9f6]"
                >
                  <span className="text-xl">💍</span>
                  <div>
                    <div className="text-xs font-bold text-[#2c2224]">Wedding Invitation</div>
                    <div className="text-[10px] text-[#8e7b7e]">Schedule, venue & RSVP</div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-xl text-[#2c2224] hover:bg-[#f8eeeb]"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#e8d5cf] bg-[#fffaf5] px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${pathname === link.href
                  ? "bg-[#fceae6] text-[#b05765] font-bold"
                  : "text-[#2c2224] hover:bg-[#f8eeeb]"
                }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-[#eedad5] flex flex-col gap-2">
            <Link
              href="/birthday/create"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-[#b05765] text-white text-xs font-semibold"
            >
              🎂 Create Birthday Wish
            </Link>
            <Link
              href="/wedding/create"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-[#c6a15b] text-white text-xs font-semibold"
            >
              💍 Create Wedding Invitation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
