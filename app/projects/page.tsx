"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { projectTags, projects } from "@/lib/projects-content";
import { useLocale } from "@/components/layout/locale-provider";
import { LocalizedCopy } from "@/components/layout/localized-text";

export default function ProjectsPage() {
  const { t } = useLocale();
  const [tag, setTag] = useState("All");
  const filtered = useMemo(
    () => tag === "All" ? projects : projects.filter((project) => project.techStack.includes(tag)),
    [tag]
  );
  const featured = projects.find((project) => project.featured) ?? projects[0];

  return (
    <main className="min-h-screen px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]"><LocalizedCopy source="SLOW / PROJECTS" /></p>
          <h1 className="mt-4 font-display text-5xl font-bold md:text-7xl"><LocalizedCopy source="Projects with context." /></h1>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]"><LocalizedCopy source="Selected builds, architecture decisions, and case studies behind the work." /></p>
        </header>

        <section className="mt-12 rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-7 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]"><LocalizedCopy source="Featured" /></p>
          <h2 className="mt-3 font-display text-3xl font-bold"><LocalizedCopy source={featured.title} /></h2>
          <p className="mt-3 max-w-3xl leading-7 text-[var(--muted)]"><LocalizedCopy source={featured.description} /></p>
          <div className="mt-5 flex flex-wrap gap-2">
            {featured.techStack.map((tech) => <span key={tech} className="rounded-full border border-[var(--card-border)] px-3 py-1 text-xs text-[var(--muted)]">{tech}</span>)}
          </div>
          <Link href={`/projects/${featured.slug}`} className="mt-6 inline-flex rounded-xl bg-[var(--gold)] px-5 py-3 font-semibold text-[#071018]">{t("projects.caseStudy")}</Link>
        </section>

        <div role="group" aria-label={t("projects.filters")} className="mt-10 flex flex-wrap gap-2">
          {['All', ...projectTags].map((item) => (
            <button key={item} type="button" aria-pressed={tag === item} onClick={() => setTag(item)} className={`rounded-full border px-4 py-2 text-sm transition ${tag === item ? "border-[var(--gold)] bg-[var(--gold)] text-[#071018]" : "border-[var(--card-border)] text-[var(--muted)] hover:border-[var(--card-border-strong)]"}`}>
              {item === "All" ? t("projects.all") : item}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <article key={project.slug} className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-7 backdrop-blur-xl transition hover:-translate-y-1 hover:border-[var(--gold)]">
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">{project.featured ? t("projects.featured") : t("projects.caseStudy")}</p>
              <h2 className="mt-4 font-display text-2xl font-bold"><LocalizedCopy source={project.title} /></h2>
              <p className="mt-3 leading-7 text-[var(--muted)]"><LocalizedCopy source={project.description} /></p>
              <div className="mt-5 flex flex-wrap gap-2">{project.techStack.map((tech) => <span key={tech} className="rounded-full bg-[var(--card-bg-soft)] px-2.5 py-1 text-xs text-[var(--muted)]">{tech}</span>)}</div>
              <div className="mt-7 flex gap-3">
                <Link href={`/projects/${project.slug}`} className="rounded-xl bg-[var(--gold)] px-4 py-2 text-sm font-semibold text-[#071018]">{t("projects.caseStudy")}</Link>
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-[var(--card-border)] px-4 py-2 text-sm font-semibold">GitHub</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
