import { CTA } from "@/components/CTA";
import { FundingCalculator } from "@/components/FundingCalculator";
import { HomeHero } from "@/components/HomeHero";
import { MetricStrip } from "@/components/MetricStrip";
import { Pipeline } from "@/components/Pipeline";
import { SolutionsGrid } from "@/components/SolutionsGrid";
import { TestimonialCards } from "@/components/TestimonialCards";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FundingCalculator />
        </div>
      </section>
      <SolutionsGrid />
      <MetricStrip />
      <Pipeline />
      <TestimonialCards />
      <CTA />
    </>
  );
}
