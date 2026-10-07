import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedCreationBySlug } from "@/lib/db/creations-store";
import { CreationRenderer } from "@/components/renderers/CreationRenderer";
import type { WeddingInvitationData } from "@/lib/wedding-types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const creation = await getPublishedCreationBySlug(slug);

  if (!creation || creation.type !== "wedding" || creation.status !== "published") {
    return {
      title: "Wedding Invitation Not Found — Digital Moments",
    };
  }

  const data = creation.data as WeddingInvitationData;
  const brideName = data.brideName || "Bride";
  const groomName = data.groomName || "Groom";
  const title = `${brideName} & ${groomName} — Wedding Invitation`;
  const description = data.invitationMessage
    ? data.invitationMessage.slice(0, 160)
    : `Join us as we celebrate the wedding of ${brideName} and ${groomName}.`;
  const ogImage = data.couplePhoto || "/og-wedding-default.jpg";

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

export default async function PublicWeddingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const creation = await getPublishedCreationBySlug(slug);

  if (!creation || creation.type !== "wedding" || creation.status !== "published") {
    notFound();
  }

  return (
    <main className="min-h-screen w-full bg-[#0d090a]">
      <CreationRenderer
        creation={{
          type: "wedding",
          templateId: creation.templateId,
          data: creation.data as WeddingInvitationData,
        }}
        autoOpen
      />
    </main>
  );
}
