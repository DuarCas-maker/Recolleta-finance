"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { navItems, site } from "@/data/site";

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-primary/15 bg-background/92 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
            <Image src="/logo.svg" alt={site.name} width={220} height={72} priority className="h-11 w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-bold text-slate transition hover:bg-white hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

          <Link
            href="/apply"
            className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-extrabold text-white shadow-lg shadow-ink/15 transition hover:bg-ink lg:inline-flex"
          >
            Start Application
          </Link>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-primary/20 bg-white text-ink lg:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
        </button>
        </div>

        {open ? (
          <nav className="border-t border-primary/15 bg-white px-4 py-4 lg:hidden" aria-label="Mobile navigation">
            <div className="mx-auto grid max-w-7xl gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-sm font-bold text-ink hover:bg-background"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        ) : null}
      </header>
      <Link
        href="/apply"
        className="fixed inset-x-3 bottom-3 z-50 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-extrabold text-white shadow-2xl shadow-primary/30 transition hover:bg-ink lg:hidden"
      >
        Start Application <ArrowRight size={18} aria-hidden />
      </Link>
    </>
  );
}
