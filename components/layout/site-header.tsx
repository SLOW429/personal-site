import Link from "next/link";
import MobileNav from "./mobile-nav";

const links = [
  ["About", "/about"],
  ["Projects", "/projects"],
  ["Services", "/services"],
  ["Tools", "/tools"],
  ["Blog", "/blog"],
  ["Creator", "/creator"],
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--card-border)] bg-[var(--background)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/" className="font-display text-xl font-bold tracking-tight text-[var(--foreground)]">
          SLOW<span className="text-[var(--gold)]">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden rounded-xl border border-[var(--card-border-strong)] bg-[var(--card-bg-soft)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--gold)] hover:text-[var(--gold-light)] md:inline-flex"
          >
            Contact
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
