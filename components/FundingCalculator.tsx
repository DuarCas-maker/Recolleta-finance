"use client";

import { BarChart3, Calculator, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { calculateAmortizedPayment, currency, getDemoAnnualRate, type PaymentFrequency } from "@/lib/calculator";

export function FundingCalculator() {
  const rate = getDemoAnnualRate();
  const [amount, setAmount] = useState(75000);
  const [term, setTerm] = useState(18);
  const [frequency, setFrequency] = useState<PaymentFrequency>("monthly");

  const result = useMemo(() => {
    if (rate === null) return null;
    return calculateAmortizedPayment(amount, term, frequency, rate);
  }, [amount, frequency, rate, term]);

  const principalShare = result && result.totalPaid > 0 ? (amount / result.totalPaid) * 100 : 0;
  const interestShare = result && result.totalPaid > 0 ? (result.totalInterest / result.totalPaid) * 100 : 0;
  const periodBars = Array.from({ length: 14 }, (_, index) => {
    const decay = 1 - index / 20;
    return Math.max(16, Math.round(30 + decay * 56 + (frequency === "weekly" ? index % 3 : index % 2) * 4));
  });

  return (
    <section className="overflow-hidden rounded-lg border border-primary/15 bg-white shadow-2xl shadow-ink/8">
      <div className="grid lg:min-h-[620px] lg:grid-cols-[1fr_390px]">
        <div className="dark-panel data-grid rounded-none border-0 p-5 sm:p-8 lg:p-10">
          <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-aqua">
            <Calculator size={16} aria-hidden /> Payment Estimator
          </p>
          <h2 className="mt-3 max-w-2xl font-heading text-4xl font-extrabold text-white sm:text-5xl">
            Model a funding scenario against a configured annual rate.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/68">
            The annual interest rate is read only from{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-aqua">NEXT_PUBLIC_DEMO_ANNUAL_INTEREST_RATE</code>.
            No fallback financing rate is invented.
          </p>

          <div className="mt-8">
            {result ? (
              <>
                <div className="grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
                  <div className="rounded-lg border border-white/10 bg-ink/60 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">Estimated Payment</p>
                    <p className="mt-2 font-heading text-5xl font-extrabold leading-none text-white sm:text-7xl">
                      {currency(result.payment)}
                    </p>
                    <p className="mt-2 text-lg font-extrabold capitalize text-aqua">{frequency}</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    <div className="rounded-lg border border-white/10 bg-white/8 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">Periods</p>
                      <p className="mt-2 font-heading text-3xl font-bold text-white">{result.periods}</p>
                      <p className="mt-1 text-sm text-white/56">amortized</p>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/8 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">Configured APR</p>
                      <p className="mt-2 font-heading text-3xl font-bold text-white">{rate}%</p>
                      <p className="mt-1 text-sm text-white/56">demo only</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-lg border border-white/10 bg-ink/45 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="inline-flex items-center gap-2 text-sm font-extrabold text-white">
                      <BarChart3 size={18} className="text-aqua" aria-hidden /> Payment visualization
                    </p>
                    <p className="text-sm text-white/60">{currency(result.totalPaid)} total estimated payments</p>
                  </div>
                  <div className="mt-5 flex h-40 items-end gap-2" aria-hidden>
                    {periodBars.map((height, index) => (
                      <div
                        key={index}
                        className="min-w-0 flex-1 rounded-t bg-aqua/80"
                        style={{ height: `${height}%`, opacity: 0.42 + index / 28 }}
                      />
                    ))}
                  </div>
                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/12" aria-label="Principal and interest split">
                    <div className="h-full bg-aqua" style={{ width: `${principalShare}%` }} />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/68">
                    <span>Principal share: {Math.round(principalShare)}%</span>
                    <span>Interest share: {Math.round(interestShare)}%</span>
                    <span>Estimated interest: {currency(result.totalInterest)}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="grid min-h-80 place-items-center rounded-lg border border-dashed border-white/20 p-8 text-center">
                <div>
                  <p className="font-heading text-2xl font-bold text-white">Demo rate not configured</p>
                  <p className="mt-3 max-w-md text-sm leading-6 text-white/62">
                    Add NEXT_PUBLIC_DEMO_ANNUAL_INTEREST_RATE to the environment to enable estimates.
                  </p>
                </div>
              </div>
            )}
          </div>

          <p className="mt-5 text-xs leading-5 text-white/52">
            Illustrative estimate only. This calculator is not an offer, approval, commitment, or guarantee of financing.
            Actual costs, payment amounts, availability, and terms may differ after review.
          </p>
        </div>

        <aside className="border-t border-primary/15 bg-background/95 p-5 sm:p-6 lg:-ml-8 lg:my-10 lg:rounded-l-lg lg:border lg:border-primary/20 lg:bg-white/86 lg:shadow-2xl lg:shadow-ink/18 lg:backdrop-blur">
          <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
            <SlidersHorizontal size={16} aria-hidden /> Funding Workspace
          </p>
          <div className="mt-6 grid gap-7">
            <label>
              <span className="flex items-end justify-between gap-4">
                <span className="label">Funding Amount</span>
                <span className="font-heading text-3xl font-extrabold text-primary">{currency(amount)}</span>
              </span>
              <input
                className="range-input mt-3 h-4"
                type="range"
                min="5000"
                max="500000"
                step="5000"
                value={amount}
                onChange={(event) => setAmount(Number(event.target.value))}
              />
            </label>
            <label>
              <span className="flex items-end justify-between gap-4">
                <span className="label">Term</span>
                <span className="font-heading text-3xl font-extrabold text-primary">{term} months</span>
              </span>
              <input
                className="range-input mt-3 h-4"
                type="range"
                min="3"
                max="60"
                step="1"
                value={term}
                onChange={(event) => setTerm(Number(event.target.value))}
              />
            </label>
            <div>
              <span className="label">Monthly / Weekly</span>
              <div className="grid grid-cols-2 rounded-lg border border-primary/15 bg-white p-1">
                {(["monthly", "weekly"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`rounded-md px-4 py-3 text-sm font-extrabold capitalize transition ${
                      frequency === item ? "bg-primary text-white" : "text-ink hover:bg-background"
                    }`}
                    onClick={() => setFrequency(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
