import { ArrowDownRight } from "lucide-react";
import { pipelineSteps } from "@/data/site";
import { SectionHeader } from "./SectionHeader";

export function Pipeline() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="How It Works"
              title="From intake signal to signed package"
              body="Recolleta Financial moves applicants through identity, ownership, documents, authorization, and direct webhook submission with a controlled sequence."
            />
            <div className="mt-8 border-l-4 border-primary bg-white p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">Process posture</p>
              <p className="mt-3 text-sm leading-6 text-slate">
                The flow is intentionally narrow: no sensitive persistent storage, explicit owner logic, required
                document checks, one disclosure checkbox, and owner 1 signature only.
              </p>
            </div>
          </div>

          <div className="border-y border-primary/18 bg-white">
            {pipelineSteps.map((step, index) => (
              <article key={step.label} className="grid gap-4 border-b border-primary/18 p-6 last:border-b-0 sm:grid-cols-[120px_minmax(0,1fr)]">
                <div className="flex items-center justify-between gap-3 sm:block">
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">{step.label}</p>
                  {index < pipelineSteps.length - 1 ? <ArrowDownRight className="text-primary/55 sm:mt-6" size={24} aria-hidden /> : null}
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-ink">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate">{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
