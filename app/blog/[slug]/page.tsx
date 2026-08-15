import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getReadingTime, blogPosts } from "@/lib/blog-content";

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${post.title} | SLOW`,
      description: post.description,
      url: `https://slows.dev/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const url = `https://slows.dev/blog/${slug}`;
  const readingTime = getReadingTime(post);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    articleSection: post.category,
    keywords: post.tags.join(", "),
    timeRequired: `PT${readingTime}M`,
    author: { "@type": "Person", name: "SLOW", url: "https://slows.dev" },
    publisher: { "@type": "Person", name: "SLOW", url: "https://slows.dev" },
  };

  return (
    <main className="min-h-screen px-5 py-16 md:py-24">
      <article className="mx-auto max-w-3xl">
        <Link href="/blog" className="text-sm text-[var(--gold-light)]">← Back to Blog</Link>
        <p className="mt-10 text-xs uppercase tracking-[0.3em] text-[var(--gold)]">{post.category} · {post.date} · {readingTime} min read</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">{post.title}</h1>
        <p className="mt-6 text-lg leading-8 text-[var(--muted)]">{post.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => <span key={tag} className="rounded-full border border-[var(--card-border)] px-3 py-1 text-xs text-[var(--muted)]">#{tag}</span>)}
        </div>
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
