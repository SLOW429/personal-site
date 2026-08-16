import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses",
  description: "The tools, frameworks, platforms, and workflow behind SLOW.DEV.",
  alternates: { canonical: "/uses" },
};

const groups = [
  ["Core stack", ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"]],
  ["Building & shipping", ["GitHub", "Vercel", "Docker", "Coolify", "VS Code"]],
  ["Automation & community", ["Python", "Discord.js", "Discord", "AI APIs", "Browser-first utilities"]],
  ["Design direction", ["Dark-first UI", "Inter", "Playfair Display", "Motion with restraint", "Performance-conscious media"]],
];

export default function UsesPage() {
  return (
    <main className="min-h-screen px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">SLOW / USES</p>
          <h1 className="mt-4 font-display text-5xl font-bold md:text-7xl">The stack behind the work.</h1>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">A practical list of technologies and services that are part of the current workflow. It changes as the work changes.</p>
        </header>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {groups.map(([title, items]) => (
            <section key={title as string} className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-7 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">{title as string}</p>
              <div className="mt-5 flex flex-wrap gap-2">{(items as string[]).map((item) => <span key={item} className="rounded-full border border-[var(--card-border)] bg-[var(--panel-bg)] px-3 py-1.5 text-sm text-[var(--muted)]">{item}</span>)}</div>
            </section>
          ))}
        </div>

        <section className="mt-10 rounded-[2rem] border border-[var(--card-border-strong)] bg-[var(--card-bg)] p-8 md:p-10">
          <h2 className="font-display text-3xl font-bold">Why this setup?</h2>
          <p className="mt-4 max-w-3xl leading-7 text-[var(--muted)]">The goal is not to collect tools. It is to keep the path from idea → build → deployment → content as simple as possible while keeping everyday utilities fast and local when they do not need a server.</p>
        </section>
      </div>
    </main>
  );
}
