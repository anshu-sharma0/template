import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { InvitationPreview, type InvitationPreviewVariant } from "@/components/invitation/InvitationPreview";

type TemplateCardProps = {
  id: string;
  category: string;
  name: string;
  description: string;
  cta: string;
  preview: InvitationPreviewVariant;
  onPreview: () => void;
};

export function TemplateCard({
  category,
  name,
  description,
  cta,
  preview,
  onPreview,
}: TemplateCardProps) {
  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      {/* Visual Preview Header */}
      <div className="relative h-84 overflow-hidden bg-surface-soft/80 p-4">
        <div className="absolute inset-0 scale-100 transition duration-500 group-hover:scale-[1.03]">
          <InvitationPreview variant={preview} compact />
        </div>
        <Badge
          tone={preview === "luxuryWedding" ? "champagne" : "rose"}
          className="absolute left-4 top-4 z-10 bg-surface/90 shadow-sm backdrop-blur"
        >
          {category}
        </Badge>
      </div>

      {/* Editorial Content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h3 className="font-display text-3xl font-normal text-text leading-tight">{name}</h3>
          <p className="mt-2 text-sm leading-6 text-text-muted">{description}</p>
        </div>

        <div className="mt-6">
          <Button
            onClick={onPreview}
            variant="outline"
            className="w-full group-hover:border-primary/60 group-hover:bg-primary-soft/40"
          >
            {cta}
          </Button>
        </div>
      </div>
    </article>
  );
}

