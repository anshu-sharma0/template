import { Metadata } from "next";
import Link from "next/link";
import { getCreationByManageToken } from "@/lib/db/creations-store";
import { isCreationPaid } from "@/lib/services/orderService";
import { notFound } from "next/navigation";
import ManageClientShell from "@/components/management/ManageClientShell";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "Manage Experience — Digital Moments",
  description: "Private management page for your digital creation.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ManagePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  if (!token) {
    notFound();
  }

  const creation = await getCreationByManageToken(token);
  if (!creation) {
    return (
      <div className="min-h-screen bg-[#fffaf5] text-[#2c2224] flex items-center justify-center p-6">
        <EmptyState
          icon="⚠️"
          title="Private Link Invalid"
          description="This management link is invalid or no longer available. Please verify the URL or create a new experience."
          action={
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#b05765] text-white text-xs font-bold hover:bg-[#964552] transition-colors shadow-sm"
            >
              Return Home ✨
            </Link>
          }
        />
      </div>
    );
  }

  const initialIsPaid = await isCreationPaid(creation.id);

  return (
    <ManageClientShell
      rawToken={token}
      initialCreation={creation}
      initialIsPaid={initialIsPaid}
    />
  );
}
