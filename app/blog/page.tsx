import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | SLOW",
  description: "Build logs, technical notes, tutorials, and experiments from SLOW.DEV.",
  alternates: { canonical: "/blog" },
};

const posts = [
  {
    slug: "building-slow-dev-into-a-personal-platform",
    title: "Building SLOW.DEV Into a Personal Platform",
    description: "Why a personal portfolio is becoming a home for tools, services, content, gaming, and community.",
    category: "Build Log",
    date: "2026-08-12",
  },
  {
    slug: "designing-local-first-developer-tools",
    title: "Why SLOW Tools Are Local-First",
    description: "A practical approach to browser tools that stay fast, private, and inexpensive to run.",
    category: "Engineering",
    date: "2026-08-12",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">SLOW / BLOG</p>
          <h1 className="mt-4 font-display text-5xl font-bold md:text-7xl">Build. Document. Share.</h1>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">Real build logs, technical notes, experiments, and lessons from the projects behind SLOW.DEV.</p>
        </header>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post.slug} className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-7 backdrop-blur-xl transition hover:-translate-y-1 hover:border-[var(--gold)]">
              <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
                <span>{post.category}</span><time dateTime={post.date}>{post.date}</time>
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold">{post.title}</h2>
              <p className="mt-3 leading-7 text-[var(--muted)]">{post.description}</p>
              <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex rounded-xl bg-[var(--gold)] px-4 py-2 font-semibold text-[#071018]">Read article</Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
