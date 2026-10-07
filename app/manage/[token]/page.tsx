import { Metadata } from "next";
import { getCreationByManageToken } from "@/lib/db/creations-store";
import { isCreationPaid } from "@/lib/services/orderService";
import { notFound } from "next/navigation";
import ManageClientShell from "@/components/management/ManageClientShell";

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
        <div className="max-w-md w-full text-center bg-white rounded-3xl p-8 border border-[#e8d5cf] shadow-xl">
          <div className="w-16 h-16 rounded-full bg-[#fceae6] text-[#b05765] flex items-center justify-center mx-auto mb-4 text-2xl">
            ⚠️
          </div>
          <h1 className="text-2xl font-serif text-[#b05765] mb-2 font-bold">
            Private Link Invalid
          </h1>
          <p className="text-[#6e5d60] text-sm leading-relaxed mb-6">
            This management link is invalid or no longer available. Please verify the URL or create a new experience.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#b05765] text-white font-medium hover:bg-[#964552] transition-colors"
          >
            Return Home
          </a>
        </div>
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
