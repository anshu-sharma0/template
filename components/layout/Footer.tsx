import { brand } from "@/lib/brand";
import { navItems } from "@/lib/home-data";
import { Container } from "./Container";
import { Divider } from "@/components/ui/Divider";

export function Footer() {
  return (
    <footer className="bg-text text-white">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-[var(--radius-pill)] bg-white font-display text-sm text-text">
                {brand.logo}
              </span>
              <span className="font-display text-2xl">{brand.name}</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/70">{brand.tagline}</p>
            <p className="mt-6 max-w-sm font-display text-3xl leading-tight">
              For the wishes, invitations and little moments that should feel personal.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-white">Explore</p>
            <div className="mt-4 grid gap-3">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="text-sm text-white/70 transition hover:text-white">
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-white">Products</p>
            <div className="mt-4 grid gap-3 text-sm text-white/70">
              <a href="#birthday-wish" className="transition hover:text-white">
                Digital Birthday Wish
              </a>
              <a href="#wedding-invitation" className="transition hover:text-white">
                Digital Wedding Invitation
              </a>
              <a href="#templates" className="transition hover:text-white">
                Three premium templates
              </a>
            </div>
          </div>
        </div>

        <Divider className="my-8 border-white/15" />
        <div className="flex flex-col gap-3 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {brand.name}. Frontend foundation preview.</p>
          <a href={`mailto:${brand.email}`} className="transition hover:text-white">
            {brand.email}
          </a>
        </div>
      </Container>
    </footer>
  );
}
