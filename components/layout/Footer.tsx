import { brand } from "@/lib/brand";
import { Container } from "./Container";
import { Divider } from "@/components/ui/Divider";

export function Footer() {
  return (
    <footer className="bg-text text-white">
      <Container className="py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          {/* Brand Column */}
          <div className="max-w-md space-y-4">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-white font-display text-sm font-semibold text-text shadow-sm">
                {brand.logo}
              </span>
              <span className="font-display text-2xl tracking-tight">{brand.name}</span>
            </div>
            <p className="text-sm leading-relaxed text-white/75 font-serif italic">
              For the wishes, invitations and little moments that should feel personal.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-wrap gap-8 text-sm text-white/80">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-white">Navigation</p>
              <ul className="space-y-2.5">
                <li><a href="#occasions" className="transition hover:text-white">Create</a></li>
                <li><a href="#templates" className="transition hover:text-white">Designs</a></li>
                <li><a href="#how-it-works" className="transition hover:text-white">How It Works</a></li>
                <li><a href="#faq" className="transition hover:text-white">FAQ</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-white">Legal</p>
              <ul className="space-y-2.5">
                <li><a href="#" className="transition hover:text-white">Privacy</a></li>
                <li><a href="#" className="transition hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>

        <Divider className="my-8 border-white/15" />

        <div className="flex flex-col gap-3 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {brand.name}. All rights reserved.</p>
          <a href={`mailto:${brand.email}`} className="transition hover:text-white">
            {brand.email}
          </a>
        </div>
      </Container>
    </footer>
  );
}
