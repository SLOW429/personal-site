import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const posts = {
  "building-slow-dev-into-a-personal-platform": {
    title: "Building SLOW.DEV Into a Personal Platform",
    description: "Why a personal portfolio is becoming a home for tools, services, content, gaming, and community.",
    date: "2026-08-12",
    category: "Build Log",
    sections: [
      ["The problem with a static portfolio", "A portfolio is useful for showing finished work, but it is not a great home for everything that happens between projects. SLOW.DEV is being expanded so projects, tools, services, content, and community can all point back to one place."],
      ["The new model", "The platform is organized around Build, Create, and Connect. Build covers projects, services, and tools. Create covers the blog, gaming, videos, and streams. Connect covers Discord, GitHub, and social channels."],
      ["Why tools matter", "Useful tools create a reason to return. The first SLOW Tools are deliberately small and local-first so they can be fast for visitors and inexpensive to operate."],
      ["What comes next", "The next stages are better case studies, creator integrations, more tools, and a stronger content pipeline that turns real work into useful articles rather than filler."],
    ],
  },
  "designing-local-first-developer-tools": {
    title: "Why SLOW Tools Are Local-First",
    description: "A practical approach to browser tools that stay fast, private, and inexpensive to run.",
    date: "2026-08-12",
    category: "Engineering",
    sections: [
      ["Start with the smallest useful architecture", "Many developer utilities do not need a backend. JSON formatting, Base64 conversion, UUID generation, URL encoding, and image conversion can often happen directly in the browser."],
      ["Privacy is a product feature", "When input can stay on the device, the tool does not need to upload it just to produce a result. That reduces infrastructure and makes the privacy story much easier to understand."],
      ["Performance and cost", "Removing unnecessary API requests improves perceived speed and reduces recurring infrastructure work. The backend can then be reserved for features that genuinely need server-side processing."],
      ["A scalable path", "Local-first does not mean backend-free forever. SLOW Tools can later add APIs, accounts, or premium capabilities without changing the basic experience of the simple tools."],
    ],
  },
} as const;

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug as keyof typeof posts];
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { title: `${post.title} | SLOW`, description: post.description, url: `https://slows.dev/blog/${slug}`, type: "article" },
  };
}

export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug as keyof typeof posts];
  if (!post) notFound();
  const url = `https://slows.dev/blog/${slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: url,
    url,
    author: { "@type": "Person", name: "SLOW", url: "https://slows.dev" },
    publisher: { "@type": "Person", name: "SLOW", url: "https://slows.dev" },
  };

  return (
    <main className="min-h-screen px-5 py-16 md:py-24">
      <article className="mx-auto max-w-3xl">
        <Link href="/blog" className="text-sm text-[var(--gold-light)]">← Back to Blog</Link>
        <p className="mt-10 text-xs uppercase tracking-[0.3em] text-[var(--gold)]">{post.category} · {post.date}</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">{post.title}</h1>
        <p className="mt-6 text-lg leading-8 text-[var(--muted)]">{post.description}</p>
        <div className="mt-12 space-y-10">
          {post.sections.map(([heading, body]) => (
            <section key={heading}>
              <h2 className="font-display text-2xl font-bold">{heading}</h2>
              <p className="mt-3 leading-8 text-[var(--foreground)]/80">{body}</p>
            </section>
          ))}
        </div>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </main>
  );
}
