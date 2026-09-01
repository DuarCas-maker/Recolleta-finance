import { Activity, BarChart3, FileCheck2 } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="About Recolleta"
          title="Corporate funding with structure, clarity, and momentum"
          body="Recolleta Financial helps U.S. businesses organize funding requests through a polished, focused intake experience."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {[
            [Activity, "Command center workflow", "The site uses strong progress states, funding signals, and clear movement from estimate to application."],
            [FileCheck2, "Structured intake", "Business, owner, document, disclosure, and signature data follow a consistent application contract."],
            [BarChart3, "Scenario visibility", "Calculator views help applicants compare inputs without inventing terms or approvals."]
          ].map(([Icon, title, body]) => (
            <article key={title as string} className="rounded-lg border border-primary/15 bg-background/50 p-6">
              <Icon className="text-primary" size={26} aria-hidden />
              <h2 className="mt-5 font-heading text-2xl font-bold text-ink">{title as string}</h2>
              <p className="mt-3 text-sm leading-6 text-slate">{body as string}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
