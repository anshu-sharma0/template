"use client";

import { useState } from "react";
import { templates } from "@/lib/home-data";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "./SectionHeading";
import { TemplateCard } from "./TemplateCard";
import { TemplatePreviewDialog } from "./TemplatePreviewDialog";

export function TemplateShowcase() {
  const [selectedTemplate, setSelectedTemplate] = useState<(typeof templates)[number] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenPreview = (template: (typeof templates)[number]) => {
    setSelectedTemplate(template);
    setDialogOpen(true);
  };

  const handleSelectTemplate = (templateId: string) => {
    setDialogOpen(false);
    window.location.href = `/create?template=${templateId}`;
  };

  return (
    <Section id="templates" background="default" spacing="lg">
      <SectionHeading
        align="center"
        eyebrow="Featured Templates"
        title="Designed for beautiful moments."
        description="Thoughtfully designed templates, ready to become yours."
      />

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            {...template}
            onPreview={() => handleOpenPreview(template)}
          />
        ))}
      </div>

      <TemplatePreviewDialog
        template={selectedTemplate}
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSelect={handleSelectTemplate}
      />
    </Section>
  );
}
