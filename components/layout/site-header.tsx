"use client";

import Link from "next/link";
import MobileNav from "./mobile-nav";
import { SiteSearch } from "./site-search";
import { navigation, navigationLabels } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 z-50 border-b border-[var(--card-border)] bg-[var(--background)]/80 backdrop-blur-xl" style={{ top: "env(safe-area-inset-top, 0px)" }}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-5">
        <Link href="/" className="shrink-0 font-display text-xl font-bold tracking-tight text-[var(--foreground)]">
          SLOW<span className="text-[var(--gold)]">.</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex">
          {navigation.map(([key, href]) => (
            <Link key={href} href={href} className="text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]">
              {navigationLabels[key]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <SiteSearch />
          <Link href="/contact" className="hidden rounded-xl border border-[var(--card-border-strong)] bg-[var(--card-bg-soft)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--gold)] hover:text-[var(--gold-light)] lg:inline-flex">
            {navigationLabels.Contact}
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
