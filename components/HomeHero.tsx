import { ArrowRight, BadgeCheck, FileStack, Landmark, LineChart, LockKeyhole, ScanLine, Workflow } from "lucide-react";
import Link from "next/link";
import { FundingMetricsConsole } from "@/components/FundingMetricsConsole";
import { site } from "@/data/site";

const checks = [
  { label: "Rate from env only", value: "Configured", icon: LineChart },
  { label: "No persistent form storage", value: "Memory only", icon: LockKeyhole },
  { label: "JSON v2 payload", value: "Webhook ready", icon: FileStack }
];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl px-4 py-8 sm:px-6 lg:grid-cols-[210px_minmax(0,1fr)] lg:px-8 lg:py-12">
        <aside className="hidden border-r border-primary/18 pr-6 lg:grid">
          <div className="flex min-h-[690px] flex-col justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-primary">Capital desk</p>
              <p className="mt-6 vertical-label font-heading text-6xl font-bold tracking-normal text-primary/12">
                RECOLLETA
              </p>
            </div>
            <div className="grid gap-4 text-xs font-bold uppercase tracking-[0.14em] text-slate">
              <span>RF-001</span>
              <span>JSON v2</span>
              <span>U.S. business funding</span>
            </div>
          </div>
        </aside>

        <div className="lg:pl-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <div className="ledger-lines min-h-[430px] border-y border-primary/15 py-8 sm:py-10">
              <div className="flex flex-wrap items-center gap-3">
                <p className="inline-flex w-fit items-center gap-2 border border-primary/20 bg-background px-3 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-primary">
                  <Landmark size={15} aria-hidden /> {site.name}
                </p>
                <p className="inline-flex w-fit items-center gap-2 bg-ink px-3 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-aqua">
                  <Workflow size={15} aria-hidden /> Funding workflow
                </p>
              </div>

              <h1 className="mt-9 max-w-4xl font-heading text-5xl font-bold tracking-normal text-ink sm:text-6xl lg:text-7xl">
                Credit-ready applications for serious business funding.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate">
                Recolleta Financial organizes estimates, ownership data, required documents, disclosures, and
                signatures into one production-minded funding package.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/apply"
                  className="inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-primary/18 transition hover:bg-ink"
                >
                  Start Application <ArrowRight size={18} aria-hidden />
                </Link>
                <Link
                  href="/calculator"
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-primary/25 bg-white px-5 py-3 text-sm font-extrabold text-ink transition hover:bg-background"
                >
                  Model Payments <LineChart size={18} aria-hidden />
                </Link>
              </div>
            </div>

            <div className="grid gap-3 border-l-4 border-primary bg-background p-5 shadow-ink/6">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Package controls</p>
              {checks.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="border-t border-primary/15 pt-4">
                    <div className="flex items-start gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center bg-white text-primary">
                        <Icon size={18} aria-hidden />
                      </span>
                      <div>
                        <p className="text-sm font-extrabold text-ink">{item.label}</p>
                        <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-slate">{item.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="mt-3 border-t border-primary/15 pt-4">
                <p className="inline-flex items-center gap-2 text-sm font-extrabold text-primary">
                  <BadgeCheck size={18} aria-hidden /> Draft legal pages marked for review
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <FundingMetricsConsole />
          </div>
        </div>
      </div>
    </section>
  );
}
