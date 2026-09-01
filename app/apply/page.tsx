import { ApplicationForm } from "@/components/ApplicationForm";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata = {
  title: "Apply"
};

export default function ApplyPage() {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Application Workflow"
          title="Submit a Recolleta funding package"
          body="The full-screen wizard validates business, owner, ownership, document, disclosure, and signature data before sending the JSON v2 payload."
        />
        <div className="mt-10">
          <ApplicationForm />
        </div>
      </div>
    </section>
  );
}
