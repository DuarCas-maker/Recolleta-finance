import { FundingCalculator } from "@/components/FundingCalculator";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata = {
  title: "Calculator"
};

export default function CalculatorPage() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Calculator"
          title="Analytics console for illustrative payment estimates"
          body="Enter amount, term, and cadence. The annual rate is supplied only by environment configuration."
        />
        <div className="mt-10">
          <FundingCalculator />
        </div>
      </div>
    </section>
  );
}
