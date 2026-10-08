import { PageWrapper } from "@/components/layout/PageWrapper";
import { RomanticHero } from "@/components/home/RomanticHero";
import { RomanticCollections } from "@/components/home/RomanticCollections";
import { LoveStoryEditorial } from "@/components/home/LoveStoryEditorial";
import { InteractiveLoveSimulator } from "@/components/home/InteractiveLoveSimulator";
import { RomanticProcess } from "@/components/home/RomanticProcess";
import { LoveStoriesAndStats } from "@/components/home/LoveStoriesAndStats";
import { RomanticFAQ } from "@/components/home/RomanticFAQ";
import { RomanticCTA } from "@/components/home/RomanticCTA";
import { FloatingLoveSpark } from "@/components/interactive/FloatingLoveSpark";

export default function Home() {
  return (
    <PageWrapper>
      <main className="relative selection:bg-[#ffe4ea] selection:text-[#e11d48]">
        {/* 1. Romantic Hero Section with Interactive Envelope Showcase */}
        <RomanticHero />

        {/* 2. Unified Romantic Collections & Template Suite */}
        <RomanticCollections />

        {/* 3. The Poetry of Gifting - Emotional Editorial Contrast */}
        <LoveStoryEditorial />

        {/* 4. Live Interactive Surprise Simulator */}
        <InteractiveLoveSimulator />

        {/* 5. Simple 3-Step Creation Process */}
        <RomanticProcess />

        {/* 6. Real Love Stories & Verified Metrics Ribbon */}
        <LoveStoriesAndStats />

        {/* 7. Romantic FAQ & Reassurance */}
        <RomanticFAQ />

        {/* 8. Grand Romantic Closing CTA */}
        <RomanticCTA />

        {/* 9. Floating Love Spark Interactivity */}
        <FloatingLoveSpark />
      </main>
    </PageWrapper>
  );
}
