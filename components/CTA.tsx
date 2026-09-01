import { ArrowRight, FileSignature } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid border-y border-primary/18 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="bg-ink p-8 text-white sm:p-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-aqua">Application desk</p>
            <h2 className="mt-4 max-w-2xl font-heading text-4xl font-bold tracking-normal sm:text-5xl">
              Prepare a funding package with the right structure from the first field.
            </h2>
          </div>
          <div className="bg-background p-8 sm:p-10">
            <p className="inline-flex items-center gap-2 text-sm font-extrabold text-primary">
              <FileSignature size={18} aria-hidden /> Disclosure and signature included
            </p>
            <p className="mt-5 text-sm leading-6 text-slate">
              Submit company, owner, document, disclosure, and signature data through the dedicated Recolleta workflow.
            </p>
            <Link
              href="/apply"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-primary/18 transition hover:bg-ink"
            >
              Open Application <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
