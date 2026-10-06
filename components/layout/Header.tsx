import { brand } from "@/lib/brand";
import { navItems } from "@/lib/home-data";
import { Button } from "@/components/ui/Button";
import { Container } from "./Container";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <Container className="flex h-18 items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
          <span className="grid size-10 place-items-center rounded-[var(--radius-pill)] bg-text font-display text-sm text-white">
            {brand.logo}
          </span>
          <span className="grid leading-tight">
            <span className="font-display text-xl text-text">{brand.name}</span>
            <span className="hidden text-xs text-text-muted sm:block">{brand.tagline}</span>
          </span>
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-text-muted transition hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href={brand.links.create} size="sm">
            Create Something Special
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button href={brand.links.create} size="sm" className="hidden xs:inline-flex">
            Create
          </Button>
          <details className="group relative">
            <summary className="flex min-h-11 cursor-pointer list-none items-center rounded-[var(--radius-pill)] border border-border bg-surface px-4 text-sm font-medium text-text shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              Menu
            </summary>
            <div className="absolute right-0 top-14 w-[min(84vw,20rem)] rounded-[var(--radius-medium)] border border-border bg-surface p-3 shadow-lift">
              <nav aria-label="Mobile navigation" className="grid gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-[var(--radius-small)] px-3 py-3 text-sm font-medium text-text-muted hover:bg-surface-soft hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    {item.label}
                  </a>
                ))}
                <Button href={brand.links.create} className="mt-2" fullWidth>
                  Create Something Special
                </Button>
              </nav>
            </div>
          </details>
        </div>
      </Container>
    </header>
  );
}
