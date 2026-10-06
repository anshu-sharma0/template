import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { InvitationPreview, type InvitationPreviewVariant } from "@/components/invitation/InvitationPreview";

type TemplateCardProps = {
  category: string;
  name: string;
  description: string;
  cta: string;
  href: string;
  preview: InvitationPreviewVariant;
};

export function TemplateCard({ category, name, description, cta, href, preview }: TemplateCardProps) {
  return (
    <article className="group overflow-hidden rounded-[var(--radius-medium)] border border-border bg-surface shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative h-80 overflow-hidden bg-surface-soft">
        <div className="absolute inset-0 scale-100 transition duration-500 group-hover:scale-[1.03]">
          <InvitationPreview variant={preview} compact />
        </div>
        <Badge tone={preview === "luxuryWedding" ? "champagne" : "rose"} className="absolute left-4 top-4 bg-surface/90 backdrop-blur">
          {category}
        </Badge>
      </div>
      <div className="p-5">
        <h3 className="font-display text-3xl leading-tight text-text">{name}</h3>
        <p className="mt-3 min-h-14 text-sm leading-6 text-text-muted">{description}</p>
        <Button href={href} variant="outline" className="mt-5 group-hover:border-primary/60 group-hover:bg-primary-soft/50" fullWidth>
          {cta}
        </Button>
      </div>
    </article>
  );
}
