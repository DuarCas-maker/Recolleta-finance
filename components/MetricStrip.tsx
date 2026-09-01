import { fundingMetrics } from "@/data/site";
import { AnimatedNumber } from "./AnimatedNumber";

export function MetricStrip() {
  return (
    <section className="bg-primary py-6 text-white">
      <div className="mx-auto grid max-w-7xl gap-0 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        {fundingMetrics.map((metric) => (
          <div key={metric.label} className="border-b border-white/18 py-5 md:border-b-0 md:border-r md:px-6 last:md:border-r-0">
            <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-aqua">{metric.label}</p>
            <p className="mt-2 font-heading text-4xl font-bold">
              <AnimatedNumber value={metric.value} suffix={metric.suffix} />
            </p>
            <p className="mt-2 max-w-44 text-sm leading-5 text-white/68">{metric.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
