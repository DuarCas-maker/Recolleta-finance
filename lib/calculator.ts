export type PaymentFrequency = "monthly" | "weekly";

export function getDemoAnnualRate() {
  const raw = process.env.NEXT_PUBLIC_DEMO_ANNUAL_INTEREST_RATE;
  if (!raw) return null;

  const value = Number(raw);
  if (!Number.isFinite(value) || value < 0) return null;
  return value;
}

export function calculateAmortizedPayment(
  amount: number,
  termMonths: number,
  frequency: PaymentFrequency,
  annualRatePercent: number
) {
  const periodsPerYear = frequency === "monthly" ? 12 : 52;
  const periods = frequency === "monthly" ? termMonths : Math.max(1, Math.round((termMonths / 12) * 52));
  const periodicRate = annualRatePercent / 100 / periodsPerYear;

  if (amount <= 0 || termMonths <= 0 || periods <= 0) {
    return { payment: 0, totalPaid: 0, totalInterest: 0, periods };
  }

  const payment =
    periodicRate === 0 ? amount / periods : (amount * periodicRate) / (1 - Math.pow(1 + periodicRate, -periods));
  const totalPaid = payment * periods;

  return {
    payment,
    totalPaid,
    totalInterest: Math.max(0, totalPaid - amount),
    periods
  };
}

export function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value || 0);
}
