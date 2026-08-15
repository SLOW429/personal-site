import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const projects = {
  "hr-bot": {
    title: "HR-BOT",
    description: "Highrise automation and music bot project built with Python, Docker, and Coolify.",
    stack: ["Python", "Docker", "Coolify"],
    github: "https://github.com/SLOW429/HR-BOT",
    sections: [
      ["Overview", "HR-BOT is an automation-focused project combining music and community functionality in a bot-oriented workflow."],
      ["What this project demonstrates", "The project is a practical example of building a service that needs repeatable deployment, environment configuration, and automation around an external platform."],
      ["Technology", "Python provides the application layer, Docker packages the service consistently, and Coolify is used as a deployment-oriented environment."],
    ],
  },
  "discord-bot": {
    title: "discord-bot",
    description: "Discord utility and management tooling built around Discord.js.",
    stack: ["JavaScript", "Discord.js"],
    github: "https://github.com/SLOW429/discord-bot",
    sections: [
      ["Overview", "A Discord-focused project for utilities, management, and community automation."],
      ["Why it exists", "Bots are a useful bridge between software and community. They automate repetitive actions and provide a natural interface for server workflows."],
      ["Next direction", "The project can evolve through modular commands, better configuration, persistence, and more reusable automation patterns."],
    ],
  },
  "chat-platform": {
    title: "chat-platform",
    description: "An experimental real-time communication platform exploring Node.js and WebSockets.",
    stack: ["Node.js", "WebSockets"],
    github: "https://github.com/SLOW429/chat-platform",
    sections: [
      ["Overview", "An experimental real-time communication project focused on persistent client connections and message delivery."],
      ["Technical focus", "Node.js provides the runtime while WebSockets enable low-latency bidirectional communication between clients and the server."],
      ["Learning value", "Projects like this are useful for understanding connection lifecycle, event-driven systems, message handling, and the trade-offs of real-time architectures."],
    ],
  },
} as const;

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects[slug as keyof typeof projects];
  if (!project) return {};
  return {
    title: `${project.title} | Projects | SLOW`,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: { title: `${project.title} | SLOW`, description: project.description, url: `https://slows.dev/projects/${slug}`, type: "article" },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects[slug as keyof typeof projects];
  if (!project) notFound();
  const url = `https://slows.dev/projects/${slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url,
    codeRepository: project.github,
    creator: { "@type": "Person", name: "SLOW", url: "https://slows.dev" },
    keywords: project.stack.join(", "),
  };

  return (
    <main className="min-h-screen px-5 py-16 md:py-24">
      <article className="mx-auto max-w-4xl">
        <Link href="/projects" className="text-sm text-[var(--gold-light)]">← Back to Projects</Link>
        <p className="mt-10 text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Case Study</p>
        <h1 className="mt-4 font-display text-5xl font-bold md:text-7xl">{project.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">{project.description}</p>
        <div className="mt-7 flex flex-wrap gap-2">{project.stack.map((tech) => <span key={tech} className="rounded-full border border-[var(--card-border)] px-3 py-1 text-xs text-[var(--muted)]">{tech}</span>)}</div>
        <a href={project.github} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-xl bg-[var(--gold)] px-5 py-3 font-semibold text-[#071018]">Open GitHub</a>
        <div className="mt-14 space-y-10">
          {project.sections.map(([heading, body]) => <section key={heading}><h2 className="font-display text-2xl font-bold">{heading}</h2><p className="mt-3 max-w-3xl leading-8 text-[var(--foreground)]/80">{body}</p></section>)}
        </div>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </main>
  );
}
