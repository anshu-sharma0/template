import { Metadata } from "next";
import Link from "next/link";
import { getAllTemplates } from "@/lib/template-registry";
import TemplateGalleryClient from "./TemplateGalleryClient";

export const metadata: Metadata = {
  title: "Explore Template Gallery — Digital Moments",
  description:
    "Explore our collection of handcrafted digital templates for romantic birthday wishes and elegant wedding invitations.",
};

export default function TemplatesPage() {
  const templates = getAllTemplates();

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fceae6] text-[#b05765] text-xs font-semibold uppercase tracking-widest border border-[#eedad5]">
          ✨ Handcrafted Designs
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2c2224] tracking-tight">
          Explore Our Experience Collection
        </h1>
        <p className="text-sm sm:text-base text-[#6e5d60] leading-relaxed">
          Choose from curated aesthetic themes designed for emotional impact, ambient soundscapes, mobile-first reveals, and seamless recipient experiences.
        </p>
      </div>

      {/* Interactive Gallery Client with Filters & Previews */}
      <TemplateGalleryClient initialTemplates={templates} />
    </main>
  );
}
