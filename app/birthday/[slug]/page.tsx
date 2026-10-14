import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedCreationBySlug } from "@/lib/db/creations-store";
import { CreationRenderer } from "@/components/renderers/CreationRenderer";
import type { BirthdayWishData } from "@/lib/birthday-types";

import { DEFAULT_BIRTHDAY_DATA } from "@/lib/birthday-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (slug === "demo" || slug === "sample") {
    return {
      title: "Happy Birthday, Khushi ❤️ — A Special Keepsake",
      description: "A beautiful interactive digital birthday keepsake created with love.",
    };
  }

  const creation = await getPublishedCreationBySlug(slug);

  if (!creation || creation.type !== "birthday" || creation.status !== "published") {
    return {
      title: "Experience Not Found — Digital Moments",
    };
  }

  const data = creation.data as BirthdayWishData;
  const recipientName = data.recipientName || "Someone Special";
  const title = `Happy Birthday, ${recipientName} ❤️`;
  const description = data.message
    ? data.message.slice(0, 160)
    : `A special birthday wish created with love for ${recipientName}.`;
  const ogImage = data.mainPhoto || "/og-birthday-default.jpg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, alt: title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function PublicBirthdayPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ open?: string }>;
}) {
  const { slug } = await params;
  const sp = searchParams ? await searchParams : {};
  const autoOpen = sp?.open === "1";

  if (slug === "demo" || slug === "sample") {
    return (
      <main className="min-h-screen w-full bg-[#130b24] flex justify-center">
        <div className="w-full min-h-screen">
          <CreationRenderer
            creation={{
              type: "birthday",
              templateId: "birthday-wish",
              data: DEFAULT_BIRTHDAY_DATA,
            }}
            autoOpen={autoOpen}
          />
        </div>
      </main>
    );
  }

  const creation = await getPublishedCreationBySlug(slug);

  if (!creation || creation.type !== "birthday" || creation.status !== "published") {
    notFound();
  }

  return (
    <main className="min-h-screen w-full bg-[#130b24] flex justify-center">
      <div className="w-full min-h-screen">
        <CreationRenderer
          creation={{
            type: "birthday",
            templateId: creation.templateId,
            data: creation.data as BirthdayWishData,
          }}
          autoOpen={autoOpen}
        />
      </div>
    </main>
  );
}
