import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { site } from "@/data/site";

export const metadata = {
  title: "Contact"
};

export default function ContactPage() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <SectionHeader
          eyebrow="Contact"
          title="Talk to Recolleta"
          body="Use the application for sensitive funding data. General contact channels are for non-sensitive questions."
        />
        <div className="grid gap-4">
          {[
            [Mail, "Email", site.email],
            [Phone, "Phone", site.phone],
            [MapPin, "Service Area", site.address]
          ].map(([Icon, label, value]) => (
            <div key={label as string} className="rounded-lg border border-primary/15 bg-background/50 p-5">
              <p className="inline-flex items-center gap-2 text-sm font-extrabold text-primary">
                <Icon size={18} aria-hidden /> {label as string}
              </p>
              <p className="mt-2 font-heading text-2xl font-bold text-ink">{value as string}</p>
            </div>
          ))}
          <Link
            href="/apply"
            className="inline-flex w-fit rounded-lg bg-ink px-5 py-3 text-sm font-extrabold text-white hover:bg-primary"
          >
            Open Application
          </Link>
        </div>
      </div>
    </section>
  );
}
