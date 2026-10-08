"use client";

import { useState, useEffect } from "react";
import { brand } from "@/lib/brand";
import { navItems } from "@/lib/home-data";
import { Button } from "@/components/ui/Button";
import { Container } from "./Container";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-[var(--love-border)] bg-white/90 py-3 shadow-[var(--love-shadow-card)] backdrop-blur-md"
          : "border-b border-transparent bg-white/60 py-4 backdrop-blur-sm",
      )}
    >
      <Container className="flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <a
          href="/"
          className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--love-crimson)]"
        >
          <span className="grid size-9 place-items-center rounded-full bg-gradient-to-tr from-[var(--love-crimson)] to-[var(--love-pink)] font-display text-sm font-bold text-white shadow-md shadow-pink-500/20">
            {brand.logo}
          </span>
          <span className="font-display text-xl tracking-tight text-[var(--love-text-heading)]">
            {brand.name}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 lg:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-text-muted transition duration-200 hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button href={brand.links.create} size="sm">
            Create Something Special
          </Button>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <Button href={brand.links.create} size="sm" className="xs:inline-flex hidden">
            Create Something Special
          </Button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="flex min-h-[2.5rem] items-center justify-center rounded-full border border-border bg-surface px-4 text-xs font-semibold tracking-wider text-text uppercase shadow-soft transition hover:bg-surface-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            {mobileMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute inset-x-0 top-full border-b border-border/80 bg-surface/98 p-5 shadow-lift backdrop-blur-xl lg:hidden">
          <Container className="grid gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-medium text-text-muted transition hover:bg-surface-soft hover:text-text"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 pt-2 border-t border-border/60">
              <Button href={brand.links.create} fullWidth onClick={() => setMobileMenuOpen(false)}>
                Create Something Special
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
