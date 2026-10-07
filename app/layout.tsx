import type { Metadata } from "next";
import "./globals.css";
import { brand } from "@/lib/brand";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";

export const metadata: Metadata = {
  title: `Create Beautiful Digital Birthday Wishes & Wedding Invitations | ${brand.name}`,
  description:
    "Create a beautiful digital birthday wish or wedding invitation made with love. Personalized with photos, custom notes, music, countdowns, venue maps and instant shareable links.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full scroll-smooth antialiased font-sans"
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-[#fffaf5] text-[#2c2224]">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
