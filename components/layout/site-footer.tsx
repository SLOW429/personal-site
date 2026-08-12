import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--card-border)] bg-[var(--background)]/80 px-5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Link href="/" className="font-display text-2xl font-bold text-[var(--foreground)]">
            SLOW<span className="text-[var(--gold)]">.</span>
          </Link>
          <p className="mt-2 max-w-md text-sm text-[var(--muted)]">
            Developer, creator, and builder — software, experiments, useful tools, and content.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--muted)]">
          {[
            ["About", "/about"],
            ["Projects", "/projects"],
            ["Services", "/services"],
            ["Tools", "/tools"],
            ["Blog", "/blog"],
            ["Now", "/now"],
            ["Contact", "/contact"],
          ].map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-[var(--foreground)]">
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl border-t border-[var(--card-border)] pt-5 text-xs text-[var(--muted)]">
        © {new Date().getFullYear()} SLOW. Built with Next.js.
      </div>
    </footer>
  );
}
