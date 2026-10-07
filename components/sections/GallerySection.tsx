"use client";

import { useState, useMemo, type ReactNode } from "react";
import Link from "next/link";
import { SectionHeader } from "./SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  styleTag: string;
  description: string;
  badge?: string;
  thumbnailUrl?: string;
  isPopular?: boolean;
  createUrl: string;
  previewUrl?: string;
}

export interface GallerySectionProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  categories?: string[];
  items: GalleryItem[];
  showSearch?: boolean;
  badgeTone?: "champagne" | "rose" | "gold" | "sage" | "lavender" | "emerald";
  className?: string;
}

export function GallerySection({
  eyebrow = "Template Showcase",
  title = "Handcrafted Themes for Every Special Occasion",
  description = "Browse our collection of interactive, animated templates designed to bring joy.",
  categories = ["All", "Birthday", "Wedding", "Anniversary", "Baby Shower"],
  items,
  showSearch = true,
  badgeTone = "rose",
  className,
}: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.styleTag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  return (
    <section className={cn("py-16 sm:py-24 bg-[#fffaf5] relative overflow-hidden", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          badgeTone={badgeTone}
          align="center"
        />

        {/* Filter Controls */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "rounded-full px-5 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer",
                    active
                      ? "bg-[#b05765] text-white shadow-md shadow-[#b05765]/20 scale-105"
                      : "bg-white text-[#6e5d60] border border-[#e8d5cf] hover:border-[#b05765] hover:text-[#2c2224]"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          {showSearch && (
            <div className="relative w-full max-w-xs">
              <span className="absolute inset-y-0 left-3.5 flex items-center text-[#8e7b7e]">🔍</span>
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-[#e8d5cf] bg-white pl-10 pr-4 py-2 text-xs text-[#2c2224] focus:border-[#b05765] focus:outline-none shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-3.5 flex items-center text-xs text-[#8e7b7e] hover:text-[#2c2224]"
                >
                  ✕
                </button>
              )}
            </div>
          )}
        </div>

        {/* Gallery Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white border border-[#e8d5cf]/80 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#b05765]/40 hover:-translate-y-1"
              >
                {/* Visual Header / Mock Banner */}
                <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-[#fff0ea] to-[#fceae6] p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between z-10">
                    <span className="rounded-full bg-white/90 backdrop-blur-xs px-3 py-1 text-[10px] font-bold text-[#b05765] uppercase tracking-wider shadow-xs">
                      {item.category}
                    </span>
                    {item.isPopular && (
                      <Badge tone="gold" className="text-[10px] py-0.5 px-2.5 shadow-xs">
                        🔥 POPULAR
                      </Badge>
                    )}
                  </div>

                  <div className="relative z-10">
                    <span className="inline-block rounded-lg bg-white/80 px-2.5 py-1 text-[10px] font-semibold text-[#6e5d60] backdrop-blur-xs">
                      {item.styleTag}
                    </span>
                    <h3 className="mt-2 font-serif text-2xl font-bold text-[#2c2224]">
                      {item.title}
                    </h3>
                  </div>

                  {/* Decorative backdrop shapes */}
                  <div className="absolute -bottom-6 -right-6 size-32 rounded-full bg-[#b05765]/10 blur-xl group-hover:scale-150 transition-transform duration-500" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <p className="text-xs text-[#6e5d60] leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-6 flex items-center gap-3 pt-4 border-t border-[#eedad5]/60">
                    <Link
                      href={item.createUrl}
                      className="flex-1 text-center rounded-full bg-[#b05765] py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#964552] transition-colors"
                    >
                      Use Template ✨
                    </Link>
                    {item.previewUrl && (
                      <Link
                        href={item.previewUrl}
                        className="rounded-full border border-[#e8d5cf] px-4 py-2.5 text-xs font-semibold text-[#2c2224] hover:bg-[#fff9f6] transition-colors"
                      >
                        Preview
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="my-12 text-center rounded-3xl bg-white border border-[#e8d5cf] p-12 max-w-md mx-auto">
            <span className="text-4xl">🔍</span>
            <h3 className="mt-3 font-serif text-lg font-bold text-[#2c2224]">No templates found</h3>
            <p className="mt-1 text-xs text-[#6e5d60]">Try adjusting your search query or filter tags.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 rounded-full bg-[#b05765] px-5 py-2 text-xs font-semibold text-white shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
