type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "left" | "center";
};

export function SectionHeader({ eyebrow, title, body, align = "left" }: SectionHeaderProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 font-heading text-3xl font-bold tracking-normal text-ink sm:text-4xl">{title}</h2>
      {body ? <p className="mt-4 text-base leading-7 text-slate">{body}</p> : null}
    </div>
  );
}
