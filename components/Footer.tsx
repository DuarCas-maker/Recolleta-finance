import Link from "next/link";
import { navItems, site } from "@/data/site";

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
  { label: "Data Security", href: "/data-security" },
  { label: "Disclosures", href: "/disclosures" }
];

export function Footer() {
  return (
    <footer className="border-t border-primary/15 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-heading text-2xl font-bold">{site.name}</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/72">
            Business funding intake, analytics-style readiness workflows, and document routing for U.S. companies.
          </p>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-aqua">Bold business funding interface</p>
        </div>
        <div>
          <p className="mb-3 text-sm font-extrabold text-aqua">Site</p>
          <div className="grid gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-white/72 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm font-extrabold text-aqua">Legal</p>
          <div className="grid gap-2">
            {legalLinks.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-white/72 hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
          <p className="mt-6 text-xs leading-5 text-white/55">
            Estimates, sample metrics, and sample testimonials are illustrative. This website does not provide a
            financing approval or commitment.
          </p>
        </div>
      </div>
    </footer>
  );
}
