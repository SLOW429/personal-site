import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Developer Docs | SLOW.DEV",
  description: "Documentation for SLOW.DEV tools, APIs, and developer-facing features.",
  alternates: { canonical: "https://slows.dev/docs" },
};

const sections = [
  {
    title: "SLOW Tools",
    text: "Privacy-first browser utilities for developers, creators, and SEO work.",
    links: [
      ["JSON Formatter", "/tools/json-formatter"],
      ["Base64", "/tools/base64"],
      ["SEO Preview", "/tools/seo-preview"],
      ["Image Compressor", "/tools/image-compressor"],
    ],
  },
  {
    title: "Public API",
    text: "Small, intentionally simple endpoints for monitoring and integrations.",
    links: [["Health endpoint", "/api/health"]],
  },
  {
    title: "Project & Creator",
    text: "Follow the real development work, open-source projects, and creator channels.",
    links: [
      ["Projects", "/projects"],
      ["Creator Hub", "/creator"],
      ["GitHub", "https://github.com/SLOW429"],
    ],
  },
];

export default function DocsPage() {
  return (
    <main className="min-h-[70vh] px-5 py-16 md:py-24">
      <section className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">SLOW.DEV / DOCS</p>
        <h1 className="mt-4 font-display text-4xl font-bold md:text-6xl">Developer Documentation</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">
          One place for the tools, APIs, projects, and technical capabilities behind SLOW.DEV.
        </p>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {sections.map((section) => (
            <article key={section.title} className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{section.text}</p>
              <div className="mt-6 grid gap-2">
                {section.links.map(([label, href]) =>
                  href.startsWith("http") ? (
                    <a key={href} href={href} target="_blank" rel="noreferrer" className="rounded-xl border border-[var(--card-border)] px-4 py-3 text-sm hover:border-[var(--gold)]">{label} →</a>
                  ) : (
                    <Link key={href} href={href} className="rounded-xl border border-[var(--card-border)] px-4 py-3 text-sm hover:border-[var(--gold)]">{label} →</Link>
                  )
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
