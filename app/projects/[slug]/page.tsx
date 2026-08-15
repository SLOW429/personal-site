import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects-content";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} | Projects | SLOW`,
    description: project.description,
    keywords: project.techStack,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${project.title} | SLOW`,
      description: project.description,
      url: `https://slows.dev/projects/${slug}`,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const url = `https://slows.dev/projects/${slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url,
    codeRepository: project.githubUrl,
    creator: { "@type": "Person", name: "SLOW", url: "https://slows.dev" },
    keywords: project.techStack.join(", "),
  };

  return (
    <main className="min-h-screen px-5 py-16 md:py-24">
      <article className="mx-auto max-w-4xl">
        <Link href="/projects" className="text-sm text-[var(--gold-light)]">← Back to Projects</Link>
        <p className="mt-10 text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Case Study</p>
        <h1 className="mt-4 font-display text-5xl font-bold md:text-7xl">{project.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">{project.description}</p>

        <div className="mt-7 flex flex-wrap gap-2">
          {project.techStack.map((tech) => <span key={tech} className="rounded-full border border-[var(--card-border)] px-3 py-1 text-xs text-[var(--muted)]">{tech}</span>)}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex rounded-xl bg-[var(--gold)] px-5 py-3 font-semibold text-[#071018]">Open GitHub</a>
          {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer" className="inline-flex rounded-xl border border-[var(--card-border)] px-5 py-3 font-semibold">Live Demo</a>}
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {([
            ["Problem", project.caseStudy.problem],
            ["Solution", project.caseStudy.solution],
          ] as const).map(([heading, body]) => (
            <section key={heading} className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-7 backdrop-blur-xl">
              <h2 className="font-display text-2xl font-bold">{heading}</h2>
              <p className="mt-3 leading-8 text-[var(--foreground)]/80">{body}</p>
            </section>
          ))}
        </div>

        <section className="mt-6 rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-7 backdrop-blur-xl">
          <h2 className="font-display text-2xl font-bold">Architecture</h2>
          <ul className="mt-4 space-y-3 text-[var(--foreground)]/80">
            {project.caseStudy.architecture.map((item) => <li key={item} className="border-l-2 border-[var(--gold)] pl-4">{item}</li>)}
          </ul>
        </section>

        <section className="mt-6 rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-7 backdrop-blur-xl">
          <h2 className="font-display text-2xl font-bold">Results</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2 text-[var(--foreground)]/80">
            {project.caseStudy.results.map((item) => <li key={item} className="rounded-2xl bg-[var(--card-bg-soft)] p-4">{item}</li>)}
          </ul>
        </section>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </main>
  );
}
