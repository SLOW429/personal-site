import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Status | SLOW.DEV",
  description: "SLOW.DEV service status and platform health.",
  alternates: { canonical: "https://slows.dev/status" },
};

const checks = [
  { name: "Website", state: "Operational", note: "Public site and routing" },
  { name: "Developer Tools", state: "Operational", note: "Browser-first utilities" },
  { name: "Creator Hub", state: "Operational", note: "YouTube / Kick integrations" },
  { name: "API", state: "Operational", note: "Public health endpoint" },
];

export default function StatusPage() {
  return (
    <main className="min-h-[70vh] px-5 py-16 md:py-24">
      <section className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">SLOW.DEV / STATUS</p>
        <h1 className="mt-4 font-display text-4xl font-bold md:text-6xl">System Status</h1>
        <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
          A simple public status page for the SLOW developer platform.
        </p>
        <div className="mt-10 rounded-3xl border border-emerald-400/20 bg-emerald-500/5 p-6">
          <p className="text-sm font-semibold text-emerald-300">All systems operational</p>
          <p className="mt-2 text-sm text-[var(--muted)]">Last checked: on request</p>
        </div>
        <div className="mt-6 grid gap-4">
          {checks.map((check) => (
            <article key={check.name} className="flex items-center justify-between gap-5 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
              <div>
                <h2 className="font-semibold">{check.name}</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">{check.note}</p>
              </div>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">{check.state}</span>
            </article>
          ))}
        </div>
        <a href="/api/health" className="mt-8 inline-flex rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] px-5 py-3 text-sm font-semibold hover:border-[var(--gold)]">View health JSON →</a>
      </section>
    </main>
  );
}
