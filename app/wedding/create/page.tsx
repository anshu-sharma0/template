import { WeddingEditorShell } from "@/components/wedding/WeddingEditorShell";
import type { WeddingTemplateVariant } from "@/lib/wedding-types";

export const metadata = {
  title: "Create Our Wedding Invitation | Luma Vows",
  description: "Personalize a beautiful digital wedding invitation for your special day.",
};

type PageProps = {
  searchParams: Promise<{ template?: string }>;
};

export default async function WeddingCreatePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialTemplate: WeddingTemplateVariant =
    params.template === "luxury" ? "luxury" : "elegant";

  return <WeddingEditorShell initialTemplate={initialTemplate} />;
}
