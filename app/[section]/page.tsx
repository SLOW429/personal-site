import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const projectItems = [
  { title: "HR-BOT", text: "Highrise automation and music bot work built with Python, Docker, and Coolify.", href: "https://github.com/SLOW429/HR-BOT" },
  { title: "discord-bot", text: "Discord utility and management tooling built around Discord.js.", href: "https://github.com/SLOW429/discord-bot" },
  { title: "chat-platform", text: "An experimental real-time communication platform exploring Node.js and WebSockets.", href: "https://github.com/SLOW429/chat-platform" },
];

const sections = {
  about: {
    title: "About SLOW",
    description: "SLOW is a developer, builder, and creator building software, automation, experiments, and a useful personal platform around slows.dev.",
    intro: "The goal is simple: build useful things, document the process, and turn the work into resources other people can actually use.",
    groups: [
      { title: "Build", items: ["Web applications", "Automation and bots", "AI experiments", "Developer utilities"] },
      { title: "Create", items: ["Technical content", "Gaming and streams", "Project write-ups", "Experiments and tutorials"] },
      { title: "Connect", items: ["GitHub", "Discord community", "Social platforms", "Future products and services"] },
    ],
    links: [["Projects", "/projects"], ["Services", "/services"], ["Now", "/now"]],
  },
  projects: {
    title: "Projects",
    description: "A growing collection of software, automation, bots, real-time experiments, and open-source work.",
    intro: "These are real projects from the SLOW development journey. More detailed case studies will be added as each project is documented.",
    groups: [{ title: "Featured work", items: projectItems.map((item) => `${item.title} — ${item.text}`) }],
    links: [["GitHub", "https://github.com/SLOW429"], ["Services", "/services"], ["Tools", "/tools"]],
  },
  services: {
    title: "Services",
    description: "Practical development and automation help for people and businesses that need something built, improved, or connected.",
    intro: "The focus is on scoped projects with a clear outcome rather than vague consulting packages.",
    groups: [
      { title: "Web development", items: ["Personal and business websites", "Landing pages", "Custom web applications", "E-commerce and integrations"] },
      { title: "Automation & AI", items: ["Discord bots", "Workflow automation", "AI integrations", "Custom internal tools"] },
      { title: "Performance & SEO", items: ["Technical SEO audits", "Website performance improvements", "Core Web Vitals work", "Search indexing and metadata foundations"] },
    ],
    links: [["Start a Project", "/contact"], ["See Projects", "/projects"]],
  },
  tools: {
    title: "SLOW Tools",
    description: "Free, focused web utilities designed to solve small problems quickly without unnecessary friction.",
    intro: "The tools section is being built as a real utility platform. The first wave is intentionally small so every tool can be fast, accessible, and reliable.",
    groups: [
      { title: "Developer", items: ["JSON Formatter", "JSON Validator", "Base64 Encoder / Decoder", "UUID Generator"] },
      { title: "SEO", items: ["SEO Preview", "Meta Tag Generator", "Robots.txt Generator", "Canonical Checker"] },
      { title: "Images & Creator", items: ["Image Compressor", "Image Resizer", "QR Code Generator", "Creator utility experiments"] },
    ],
    links: [["Read the Blog", "/blog"], ["View Projects", "/projects"]],
  },
  blog: {
    title: "SLOW Blog",
    description: "Build logs, technical notes, tutorials, experiments, and lessons learned from the projects behind SLOW.DEV.",
    intro: "The blog will turn real work into searchable, useful documentation instead of generic filler content.",
    groups: [
      { title: "Topics", items: ["Next.js and TypeScript", "AI and automation", "Discord bots", "SEO and performance", "Building products", "Gaming and streaming experiments"] },
      { title: "Publishing workflow", items: ["Project → case study", "Experiment → tutorial", "Build → short-form content", "Useful idea → tool"] },
    ],
    links: [["Projects", "/projects"], ["Tools", "/tools"], ["Now", "/now"]],
  },
  creator: {
    title: "Creator Hub",
    description: "The creator side of SLOW: building an audience around development, gaming, experiments, and live content.",
    intro: "Streaming and content are part of the long-term SLOW ecosystem, with the website acting as the central hub for videos, streams, clips, and community.",
    groups: [
      { title: "Content", items: ["Gaming videos", "Live streams", "Short clips", "Behind-the-scenes development content"] },
      { title: "Platforms", items: ["YouTube", "Kick", "Discord community", "Social channels"] },
      { title: "Status", items: ["Creator setup is being expanded", "Live integrations will use real platform data", "No fake viewer or stream statistics"] },
    ],
    links: [["Gaming", "/gaming"], ["Links", "/links"], ["Discord", "https://discord.gg/3pjA9tS8vF"]],
  },
  gaming: {
    title: "Gaming",
    description: "A dedicated space for games, streams, clips, guides, and future gaming utilities built around the creator side of SLOW.",
    intro: "Gaming is not separate from the rest of the platform: it feeds the creator content, community, and future tools ecosystem.",
    groups: [
      { title: "Content", items: ["Game streams", "Clips and highlights", "Guides and experiments", "Community gaming content"] },
      { title: "Future utilities", items: ["Minecraft server utilities", "Gaming helpers", "Configuration resources", "Small creator tools"] },
    ],
    links: [["Creator Hub", "/creator"], ["Discord", "https://discord.gg/3pjA9tS8vF"], ["Links", "/links"]],
  },
  now: {
    title: "Now",
    description: "A snapshot of what SLOW is currently building, learning, creating, and preparing next.",
    intro: "This page is intentionally short and changes over time as priorities move.",
    groups: [
      { title: "Building", items: ["Expanding slows.dev into a real platform", "Launching the SLOW Tools ecosystem", "Improving SEO, performance, and architecture"] },
      { title: "Creating", items: ["Preparing gaming content", "Starting live streaming", "Turning real builds into useful content"] },
      { title: "Next", items: ["Services and project intake", "Blog and case studies", "Creator integrations and community features"] },
    ],
    links: [["Projects", "/projects"], ["Creator", "/creator"], ["Tools", "/tools"]],
  },
  uses: {
    title: "Uses",
    description: "A living list of the tools and technologies behind the SLOW workflow.",
    intro: "The setup will evolve over time. This page focuses on tools actually used for building and publishing the site and its projects.",
    groups: [
      { title: "Development", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Python"] },
      { title: "Projects & community", items: ["GitHub", "Discord", "Discord.js", "Docker", "Coolify"] },
      { title: "Design direction", items: ["Inter", "Geist Mono", "Framer Motion", "Dark-first UI", "Performance-conscious media"] },
    ],
    links: [["Projects", "/projects"], ["Now", "/now"]],
  },
  links: {
    title: "Links",
    description: "The main places to find SLOW online: development, community, creator channels, and support.",
    intro: "Use this page as the shareable hub for social bios, profiles, and future creator campaigns.",
    groups: [
      { title: "Developer", items: ["GitHub — @SLOW429", "LinkedIn — Abdellatif Gahen"] },
      { title: "Social", items: ["X — @SLOW_429", "Instagram — @m6.ydj", "Spotify — SLOW playlist/profile"] },
      { title: "Community & support", items: ["Discord community", "PayPal support"] },
    ],
    links: [["GitHub", "https://github.com/SLOW429"], ["Discord", "https://discord.gg/3pjA9tS8vF"], ["Instagram", "https://www.instagram.com/m6.ydj/"]],
  },
  contact: {
    title: "Start a Project",
    description: "Have something you want to build, automate, improve, or launch? Start with a clear description of the outcome you need.",
    intro: "For now, the fastest route is to reach out through the SLOW community. A dedicated project intake form can be connected later without changing this page structure.",
    groups: [
      { title: "Good fits", items: ["Website or web app", "Discord bot or automation", "AI integration", "SEO and performance work", "Custom developer tool"] },
      { title: "Include in your message", items: ["What you need", "What you already have", "Target timeline", "Budget range when known"] },
    ],
    links: [["Services", "/services"], ["Projects", "/projects"], ["Discord", "https://discord.gg/3pjA9tS8vF"]],
  },
} as const;

type Section = keyof typeof sections;

export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params;
  const page = sections[section as Section];
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${section}` },
    openGraph: {
      title: `${page.title} | SLOW`,
      description: page.description,
      url: `https://slows.dev/${section}`,
    },
  };
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const page = sections[section as Section];
  if (!page) notFound();

  return (
    <main className="min-h-[70vh] px-5 py-16 md:py-24">
      <section className="mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">SLOW.DEV / {section}</p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-[var(--foreground)] md:text-6xl">{page.title}</h1>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">{page.description}</p>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--foreground)]/80">{page.intro}</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {page.groups.map((group) => (
            <article key={group.title} className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-[0_0_60px_rgba(126,196,255,0.05)] backdrop-blur-xl">
              <h2 className="font-display text-xl font-bold text-[var(--foreground)]">{group.title}</h2>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="border-l border-[var(--gold)]/40 pl-4 text-sm leading-6 text-[var(--muted)]">{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {section === "projects" && (
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {projectItems.map((project) => (
              <a key={project.title} href={project.href} target="_blank" rel="noreferrer" className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-6 transition hover:-translate-y-1 hover:border-[var(--gold)]">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--gold)]">GitHub</p>
                <h2 className="mt-3 text-xl font-bold text-[var(--foreground)]">{project.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{project.text}</p>
              </a>
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          {page.links.map(([label, href]) => {
            const external = href.startsWith("http");
            return external ? (
              <a key={href} href={href} target="_blank" rel="noreferrer" className="rounded-2xl bg-gradient-to-r from-[var(--gold-light)] to-[var(--gold)] px-5 py-3 font-semibold text-[#071018] transition hover:-translate-y-0.5">
                {label}
              </a>
            ) : (
              <Link key={href} href={href} className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] px-5 py-3 font-semibold text-[var(--foreground)] transition hover:-translate-y-0.5 hover:border-[var(--gold)]">
                {label}
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
