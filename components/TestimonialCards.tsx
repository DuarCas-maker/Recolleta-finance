import { Quote } from "lucide-react";
import { testimonials } from "@/data/site";
import { SectionHeader } from "./SectionHeader";

export function TestimonialCards() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr]">
          <SectionHeader
            eyebrow="Business Stories"
            title="Sample narratives for a controlled launch"
            body="These placeholders are marked Sample until real, approved testimonials replace them."
          />

          <div className="border-y border-primary/18">
            {testimonials.map((item, index) => (
              <article key={item.name} className="grid gap-5 border-b border-primary/18 py-7 last:border-b-0 md:grid-cols-[80px_minmax(0,1fr)]">
                <div className="flex items-start justify-between md:block">
                  <Quote size={26} className="text-primary" aria-hidden />
                  {item.sample ? (
                    <span className="mt-1 inline-flex bg-background px-3 py-1 text-xs font-extrabold uppercase tracking-[0.14em] text-primary md:mt-5">
                      Sample
                    </span>
                  ) : null}
                </div>
                <div>
                  <p className="text-xl leading-8 text-ink">"{item.quote}"</p>
                  <div className="mt-6 grid gap-2 border-l-4 border-primary pl-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                    <div>
                      <p className="font-heading text-lg font-bold text-ink">{item.name}</p>
                      <p className="text-sm text-slate">{item.company}</p>
                    </div>
                    <p className="text-sm font-extrabold text-primary">{item.metric}</p>
                  </div>
                </div>
                {index === testimonials.length - 1 ? null : <span className="hidden" aria-hidden />}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
