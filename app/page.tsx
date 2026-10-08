import { PageWrapper } from "@/components/layout/PageWrapper";
import { RomanticHero } from "@/components/home/RomanticHero";
import { RomanticCollections } from "@/components/home/RomanticCollections";
import { LoveStoryEditorial } from "@/components/home/LoveStoryEditorial";
import { InteractiveLoveSimulator } from "@/components/home/InteractiveLoveSimulator";
import { RomanticProcess } from "@/components/home/RomanticProcess";
import { LoveStoriesAndStats } from "@/components/home/LoveStoriesAndStats";
import { RomanticFAQ } from "@/components/home/RomanticFAQ";
import { RomanticCTA } from "@/components/home/RomanticCTA";

export default function Home() {
  return (
    <PageWrapper>
      <main className="relative selection:bg-[#f6dce0] selection:text-[#571424]">
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
        {/* <LoveStoriesAndStats /> */}

        {/* 7. Romantic FAQ & Reassurance */}
        <RomanticFAQ />

        {/* 8. Grand Romantic Closing CTA */}
        <RomanticCTA />
      </main>
    </PageWrapper>
  );
}
