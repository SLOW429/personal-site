import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Now",
  description: "What SLOW is building, learning, and creating right now.",
  alternates: { canonical: "/now" },
};

const columns = [
  ["Building", ["SLOW.DEV as a real developer and creator platform", "Local-first developer tools", "Project case studies and a useful content pipeline"]],
  ["Creating", ["Gaming content and live streams", "YouTube development and creator content", "Short clips from real builds and sessions"]],
  ["Improving", ["Technical SEO and search visibility", "Performance and mobile UX", "A cleaner system for multilingual content"]],
];

export default function NowPage() {
  return (
    <main className="min-h-screen px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">SLOW / NOW</p>
          <h1 className="mt-4 font-display text-5xl font-bold md:text-7xl">What is happening right now.</h1>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">A short, honest snapshot instead of a static bio. This page changes as the priorities change.</p>
        </header>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {columns.map(([title, items]) => (
            <section key={title as string} className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-7 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">{title as string}</p>
              <ul className="mt-5 space-y-4">{(items as string[]).map((item) => <li key={item} className="border-s border-[var(--gold)]/40 ps-4 text-sm leading-7 text-[var(--muted)]">{item}</li>)}</ul>
            </section>
          ))}
        </div>

        <section className="mt-10 rounded-[2rem] border border-[var(--card-border-strong)] bg-[var(--card-bg)] p-8 md:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--gold)]">next</p>
          <h2 className="mt-3 font-display text-3xl font-bold">Turn the work into something people can use.</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[var(--muted)]">The goal is not to publish more for the sake of publishing. Real projects should become useful tools, useful documentation, or useful content.</p>
          <div className="mt-7 flex flex-wrap gap-3"><Link href="/projects" className="rounded-xl bg-[var(--gold)] px-5 py-3 font-semibold text-[#071018]">Projects</Link><Link href="/blog" className="rounded-xl border border-[var(--card-border-strong)] px-5 py-3 font-semibold">Blog</Link><Link href="/tools" className="rounded-xl border border-[var(--card-border-strong)] px-5 py-3 font-semibold">Tools</Link></div>
        </section>
      </div>
    </main>
  );
}
