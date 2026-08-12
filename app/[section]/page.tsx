import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const sections = {
  about: {
    title: "About SLOW",
    description: "A look at the person behind SLOW.DEV, the current direction, and what is being built next.",
    links: [["Projects", "/projects"], ["Now", "/now"], ["Uses", "/uses"]],
  },
  projects: {
    title: "Projects",
    description: "Software, automation, experiments, and open-source work built by SLOW.",
    links: [["Services", "/services"], ["Tools", "/tools"], ["GitHub", "https://github.com/SLOW429"]],
  },
  services: {
    title: "Services",
    description: "Web development, automation, AI integrations, performance, and custom software work.",
    links: [["Start a Project", "/contact"], ["Projects", "/projects"]],
  },
  tools: {
    title: "SLOW Tools",
    description: "A growing collection of fast, useful tools for developers, creators, and everyday web work.",
    links: [["Blog", "/blog"], ["Projects", "/projects"]],
  },
  blog: {
    title: "SLOW Blog",
    description: "Build logs, technical notes, experiments, tutorials, and lessons learned.",
    links: [["Projects", "/projects"], ["Tools", "/tools"], ["Now", "/now"]],
  },
  creator: {
    title: "Creator Hub",
    description: "Videos, streams, clips, community, and everything surrounding the SLOW creator journey.",
    links: [["Gaming", "/gaming"], ["Links", "/links"], ["Discord", "https://discord.gg/3pjA9tS8vF"]],
  },
  gaming: {
    title: "Gaming",
    description: "Gaming, streaming, clips, experiments, and future gaming utilities.",
    links: [["Creator", "/creator"], ["Links", "/links"]],
  },
  now: {
    title: "Now",
    description: "What SLOW is currently building, learning, playing, and creating.",
    links: [["Projects", "/projects"], ["Creator", "/creator"]],
  },
  uses: {
    title: "Uses",
    description: "Hardware, software, development tools, and streaming gear used in the SLOW setup.",
    links: [["Projects", "/projects"], ["Creator", "/creator"]],
  },
  links: {
    title: "Links",
    description: "One place for the SLOW social, community, work, and creator links.",
    links: [["YouTube", "https://www.youtube.com/"], ["GitHub", "https://github.com/SLOW429"], ["Discord", "https://discord.gg/3pjA9tS8vF"]],
  },
  contact: {
    title: "Start a Project",
    description: "Tell SLOW what you want to build, automate, improve, or launch.",
    links: [["Services", "/services"], ["Projects", "/projects"], ["Email", "mailto:contact@slows.dev"]],
  },
} as const;

type Section = keyof typeof sections;

export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const page = sections[section as Section];
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${section}` },
    openGraph: { title: `${page.title} | SLOW`, description: page.description, url: `https://slows.dev/${section}` },
  };
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const page = sections[section as Section];
  if (!page) notFound();

  return (
    <main className="flex min-h-[70vh] items-center px-5 py-16">
      <section className="mx-auto w-full max-w-5xl rounded-[2rem] border border-[var(--card-border-strong)] bg-[var(--card-bg)] p-8 shadow-[0_0_100px_rgba(126,196,255,0.08)] backdrop-blur-xl md:p-12">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">SLOW.DEV</p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-[var(--foreground)] md:text-6xl">{page.title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">{page.description}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {page.links.map(([label, href]) => {
            const external = href.startsWith("http") || href.startsWith("mailto:");
            return external ? (
              <a key={href} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-5 font-semibold text-[var(--foreground)] transition hover:-translate-y-1 hover:border-[var(--gold)]">
                {label}
              </a>
            ) : (
              <Link key={href} href={href} className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-5 font-semibold text-[var(--foreground)] transition hover:-translate-y-1 hover:border-[var(--gold)]">
                {label}
              </Link>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-dashed border-[var(--card-border-strong)] p-6 text-sm leading-6 text-[var(--muted)]">
          This section is now part of the SLOW.DEV platform foundation. Its full content will be expanded incrementally without replacing the current visual identity.
        </div>
      </section>
    </main>
  );
}
