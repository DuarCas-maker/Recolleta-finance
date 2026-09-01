import { legalDraftNotice, legalPages } from "@/data/site";

type LegalPageProps = {
  page: keyof typeof legalPages;
};

export function LegalPage({ page }: LegalPageProps) {
  const content = legalPages[page];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="rounded-lg border border-primary/20 bg-background p-4 text-sm font-extrabold text-ink">
          {legalDraftNotice}
        </p>
        <h1 className="mt-8 font-heading text-4xl font-bold text-ink sm:text-5xl">{content.title}</h1>
        <p className="mt-3 text-sm font-bold text-slate">Last updated: {content.updated}</p>
        <div className="mt-10 grid gap-7">
          {content.sections.map((section) => (
            <article key={section.heading} className="border-t border-primary/15 pt-6">
              <h2 className="font-heading text-2xl font-bold text-ink">{section.heading}</h2>
              <p className="mt-3 text-base leading-8 text-slate">{section.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
