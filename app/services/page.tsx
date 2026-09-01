import { SolutionsGrid } from "@/components/SolutionsGrid";
import { CTA } from "@/components/CTA";

export const metadata = {
  title: "Services"
};

export default function ServicesPage() {
  return (
    <>
      <SolutionsGrid />
      <CTA />
    </>
  );
}
