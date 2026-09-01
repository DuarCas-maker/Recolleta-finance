import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="font-heading text-7xl font-extrabold text-primary">404</p>
        <h1 className="mt-4 font-heading text-4xl font-extrabold text-ink">Page not found</h1>
        <p className="mt-4 text-slate">The page you are looking for is not part of this Recolleta Financial site.</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-extrabold text-white hover:bg-ink"
        >
          Back Home
        </Link>
      </div>
    </section>
  );
}
