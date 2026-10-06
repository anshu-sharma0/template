import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { InvitationPreview } from "@/components/invitation/InvitationPreview";
import type { TemplateConfig } from "@/lib/creation-types";

type TemplateCardProps = {
  template: TemplateConfig;
  onPreview: () => void;
};

export function TemplateCard({ template, onPreview }: TemplateCardProps) {
  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      {/* Visual Preview Header */}
      <div className="relative h-84 overflow-hidden bg-surface-soft/80 p-4">
        <div className="absolute inset-0 scale-100 transition duration-500 group-hover:scale-[1.03]">
          <InvitationPreview variant={template.previewVariant} compact />
        </div>
        <Badge
          tone={template.previewVariant === "luxuryWedding" ? "champagne" : "rose"}
          className="absolute left-4 top-4 z-10 bg-surface/90 shadow-sm backdrop-blur"
        >
          {template.category}
        </Badge>
      </div>

      {/* Editorial Content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h3 className="font-display text-3xl font-normal text-text leading-tight">{template.name}</h3>
          <p className="mt-2 text-sm leading-6 text-text-muted">{template.description}</p>
        </div>

        <div className="mt-6">
          <Button
            onClick={onPreview}
            variant="outline"
            className="w-full group-hover:border-primary/60 group-hover:bg-primary-soft/40"
          >
            Preview Design
          </Button>
        </div>
      </div>
    </article>
  );
}


