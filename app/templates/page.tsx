import { Metadata } from "next";
import { getAllTemplates } from "@/lib/template-registry";
import { PageHeader } from "@/components/sections";
import TemplateGalleryClient from "@/app/templates/TemplateGalleryClient";

export const metadata: Metadata = {
  title: "Explore Template Gallery — Digital Moments",
  description:
    "Explore our collection of handcrafted digital templates for romantic birthday wishes and elegant wedding invitations.",
};

export default function TemplatesPage() {
  const templates = getAllTemplates();

  return (
    <main className="min-h-screen pb-20">
      {/* Reusable Page Header with Breadcrumbs */}
      <PageHeader
        eyebrow="Handcrafted Designs"
        title="Explore Our Experience Collection"
        description="Choose from curated aesthetic themes designed for emotional impact, ambient soundscapes, mobile-first reveals, and seamless recipient experiences."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Templates" },
        ]}
        bgVariant="gradient"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Interactive Gallery Client with Filters & Previews */}
        <TemplateGalleryClient initialTemplates={templates} />
      </div>
    </main>
  );
}
