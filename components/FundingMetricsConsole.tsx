"use client";

import { Activity, Database, FileCheck2, Gauge, RadioTower } from "lucide-react";
import { useMemo, useState } from "react";
import { fundingMetrics } from "@/data/site";
import { AnimatedNumber } from "./AnimatedNumber";

const signals = [
  { label: "Bank statement package", score: 86 },
  { label: "Tax return package", score: 78 },
  { label: "Owner validation", score: 91 },
  { label: "Disclosure status", score: 100 }
];

const scenarios = [
  { key: "growth", label: "Growth" },
  { key: "stability", label: "Stability" },
  { key: "speed", label: "Speed" }
] as const;

export function FundingMetricsConsole() {
  const [scenario, setScenario] = useState<(typeof scenarios)[number]["key"]>("growth");
  const multiplier = scenario === "growth" ? 1 : scenario === "stability" ? 0.84 : 1.12;
  const readiness = useMemo(
    () => Math.min(99, Math.round(signals.reduce((sum, item) => sum + item.score, 0) / signals.length) * multiplier),
    [multiplier]
  );

  return (
    <div className="overflow-hidden border border-primary/18 bg-background shadow-ink/8">
      <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
        <div className="bg-primary p-6 text-white sm:p-7">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-aqua">Funding Command Center</p>
          <h3 className="mt-4 max-w-sm font-heading text-3xl font-bold tracking-normal">
            Underwriting signals before submission.
          </h3>
          <p className="mt-4 text-sm leading-6 text-white/74">
            A live workspace for package readiness, document strength, ownership validation, and JSON v2 routing.
          </p>

          <div className="mt-8 inline-flex border border-white/20 bg-white/10 p-1" aria-label="Scenario selector">
            {scenarios.map((item) => (
              <button
                key={item.key}
                type="button"
                className={`px-3 py-2 text-xs font-extrabold uppercase tracking-[0.12em] transition ${
                  scenario === item.key ? "bg-white text-primary" : "text-white/72 hover:text-white"
                }`}
                onClick={() => setScenario(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-8 border-t border-white/18 pt-6">
            <span className="inline-flex items-center gap-2 text-sm font-extrabold text-aqua">
              <Gauge size={18} aria-hidden /> Readiness signal
            </span>
            <div className="mt-4 flex items-end gap-4">
              <p className="font-heading text-7xl font-bold leading-none">{readiness}%</p>
              <p className="pb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-white/62">Active model</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="grid border-b border-primary/15 md:grid-cols-4">
            {fundingMetrics.map((metric) => (
              <div key={metric.label} className="border-b border-primary/15 p-5 md:border-b-0 md:border-r last:md:border-r-0">
                <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-slate">{metric.label}</p>
                <p className="mt-3 font-heading text-3xl font-bold text-ink">
                  <AnimatedNumber value={metric.value} suffix={metric.suffix} />
                </p>
                <p className="mt-2 text-sm leading-5 text-slate">{metric.detail}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-6 sm:p-7">
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate">
                <span className="inline-flex items-center gap-2">
                  <RadioTower size={16} className="text-primary" aria-hidden /> Intake stream
                </span>
                <span className="inline-flex items-center gap-2">
                  <Database size={16} className="text-primary" aria-hidden /> JSON v2
                </span>
                <span className="inline-flex items-center gap-2">
                  <FileCheck2 size={16} className="text-primary" aria-hidden /> Documents
                </span>
              </div>
              <div className="mt-6 grid gap-5">
                {signals.map((item) => (
                  <div key={item.label} className="grid gap-3 sm:grid-cols-[190px_minmax(0,1fr)_48px] sm:items-center">
                    <span className="text-sm font-extrabold text-ink">{item.label}</span>
                    <div className="h-2 bg-background">
                      <div className="h-full bg-primary" style={{ width: `${item.score}%` }} />
                    </div>
                    <span className="text-right text-sm font-extrabold text-primary">{item.score}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-primary/15 bg-background p-6 sm:p-7 lg:border-l lg:border-t-0">
              <p className="inline-flex items-center gap-2 text-sm font-extrabold text-primary">
                <Activity size={17} aria-hidden /> Scenario note
              </p>
              <p className="mt-4 text-sm leading-6 text-slate">
                The scenario selector updates this visual readiness model only. Submitted application data remains
                governed by the form validation and webhook payload.
              </p>
              <div className="mt-6 grid grid-cols-3 border border-primary/15 bg-white text-center">
                {["Business", "Owner", "Sign"].map((item) => (
                  <p key={item} className="border-r border-primary/15 px-3 py-4 text-xs font-extrabold uppercase tracking-[0.12em] text-ink last:border-r-0">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
