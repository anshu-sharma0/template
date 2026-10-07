import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedCreationBySlug } from "@/lib/db/creations-store";
import { CreationRenderer } from "@/components/renderers/CreationRenderer";
import type { BirthdayWishData } from "@/lib/birthday-types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
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
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const creation = await getPublishedCreationBySlug(slug);

  if (!creation || creation.type !== "birthday" || creation.status !== "published") {
    notFound();
  }

  return (
    <main className="min-h-screen w-full bg-[#110e14]">
      <CreationRenderer
        creation={{
          type: "birthday",
          templateId: creation.templateId,
          data: creation.data as BirthdayWishData,
        }}
        autoOpen
      />
    </main>
  );
}
