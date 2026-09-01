import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { fundingSolutions } from "@/data/site";
import { SectionHeader } from "./SectionHeader";

export function SolutionsGrid() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.76fr_1.24fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              eyebrow="Funding Solutions"
              title="A capital matrix built like a review memo"
              body="Each request type is framed by use of funds, supporting context, and document expectations before an application moves forward."
            />
          </div>

          <div className="border-y border-primary/18">
            {fundingSolutions.map((solution, index) => (
              <article
                key={solution.title}
                className={`grid gap-5 border-b border-primary/18 py-7 last:border-b-0 md:grid-cols-[110px_minmax(0,1fr)] ${
                  index % 2 === 0 ? "bg-background/55 md:px-6" : "md:px-6"
                }`}
              >
                <div>
                  <p className="font-heading text-4xl font-bold text-primary/35">{String(index + 1).padStart(2, "0")}</p>
                  <ArrowUpRight className="mt-4 text-primary" size={22} aria-hidden />
                </div>
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_250px]">
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-ink">{solution.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate">{solution.summary}</p>
                  </div>
                  <div className="grid content-start gap-2">
                    {solution.metrics.map((metric) => (
                      <p key={metric} className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
                        <CheckCircle2 size={16} className="text-primary" aria-hidden /> {metric}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
