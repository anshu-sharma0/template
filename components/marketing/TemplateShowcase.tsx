"use client";

import { useState } from "react";
import { getAllTemplates } from "@/lib/template-registry";
import type { TemplateConfig } from "@/lib/creation-types";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "./SectionHeading";
import { TemplateCard } from "./TemplateCard";
import { TemplatePreviewDialog } from "./TemplatePreviewDialog";

export function TemplateShowcase() {
  const allTemplates = getAllTemplates();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateConfig | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenPreview = (template: TemplateConfig) => {
    setSelectedTemplate(template);
    setDialogOpen(true);
  };

  const handleSelectTemplate = (templateId: string) => {
    setDialogOpen(false);
    const target = templateId === "birthday-wish" ? "/birthday/create" : `/wedding/create?template=${templateId === "luxury-wedding" ? "luxury" : "elegant"}`;
    window.location.href = target;
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
        {allTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
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

