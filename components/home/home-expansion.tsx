"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, BriefcaseBusiness, Code2, Gamepad2, Wrench } from "lucide-react";

const tools = [
  { title: "JSON Formatter", text: "Validate and pretty-print JSON locally.", href: "/tools/json-formatter" },
  { title: "SEO Preview", text: "Preview titles, descriptions and social cards.", href: "/tools/seo-preview" },
  { title: "Image Compressor", text: "Compress images to WebP in your browser.", href: "/tools/image-compressor" },
  { title: "Base64", text: "Encode and decode text without an API.", href: "/tools/base64" },
];

const services = [
  { title: "Web Development", text: "Fast websites, landing pages, dashboards and custom web experiences." },
  { title: "AI & Automation", text: "AI integrations, bots, workflows and practical automation." },
  { title: "SEO & Performance", text: "Technical SEO, performance improvements and better search visibility." },
];

export default function HomeExpansion() {
  const pathname = usePathname();

  if (pathname !== "/") return null;

  return (
    <div className="relative z-10 overflow-hidden bg-[var(--background)] px-6 pb-32 text-[var(--foreground)]">
      <section className="mx-auto max-w-6xl py-24">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">Build • Create • Share</p>
            <h2 className="mt-4 font-display text-4xl font-bold md:text-6xl">More than a portfolio.</h2>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
              SLOW.DEV is becoming a personal hub for software, useful tools, services, gaming, streaming and the things being built along the way.
            </p>
          </div>
          <Link href="/about" className="inline-flex w-fit items-center gap-2 rounded-xl border border-[var(--card-border-strong)] px-5 py-3 font-semibold transition hover:-translate-y-0.5 hover:border-[var(--gold)]">
            About SLOW <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl pb-24">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 text-[var(--gold)]"><Wrench size={20} /><p className="text-xs uppercase tracking-[0.3em]">SLOW Tools</p></div>
            <h2 className="mt-3 font-display text-4xl font-bold">Free tools that do useful things.</h2>
          </div>
          <Link href="/tools" className="hidden items-center gap-2 text-sm font-semibold text-[var(--gold-light)] md:flex">View all <ArrowRight size={16} /></Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="group rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-[var(--card-border-strong)] hover:bg-[var(--card-bg-hover)]">
              <Code2 size={22} className="text-[var(--gold)]" />
              <h3 className="mt-6 text-xl font-bold">{tool.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{tool.text}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--gold-light)]">Open tool <ArrowRight size={15} className="transition group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
        <Link href="/tools" className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[var(--card-border)] px-4 py-3 text-sm font-semibold md:hidden">View all tools <ArrowRight size={15} /></Link>
      </section>

      <section className="mx-auto max-w-6xl pb-24">
        <div className="rounded-[2rem] border border-[var(--card-border-strong)] bg-[var(--card-bg)] p-8 backdrop-blur-xl md:p-10">
          <div className="flex items-center gap-3 text-[var(--gold)]"><BriefcaseBusiness size={20} /><p className="text-xs uppercase tracking-[0.3em]">Services</p></div>
          <div className="mt-4 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <h2 className="font-display text-4xl font-bold">Need something built?</h2>
              <p className="mt-4 leading-7 text-[var(--muted)]">From a polished website to automation and technical SEO, the goal is simple: build something useful, fast and maintainable.</p>
            </div>
            <Link href="/contact" className="inline-flex w-fit items-center gap-2 rounded-xl bg-[var(--gold)] px-5 py-3 font-semibold text-[#071018] transition hover:scale-[1.02]">Start a project <ArrowRight size={16} /></Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-5">
                <h3 className="text-lg font-bold">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl pb-24">
        <div className="grid gap-5 md:grid-cols-2">
          <Link href="/creator" className="group rounded-[2rem] border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-8 backdrop-blur-xl transition hover:border-[var(--card-border-strong)]">
            <Gamepad2 size={24} className="text-[var(--gold)]" />
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Creator Hub</p>
            <h2 className="mt-3 font-display text-3xl font-bold">Streams, videos, clips and community.</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">Gaming and content are becoming part of the same ecosystem instead of living in separate places.</p>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-[var(--gold-light)]">Explore creator hub <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
          </Link>
          <Link href="/projects" className="group rounded-[2rem] border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-8 backdrop-blur-xl transition hover:border-[var(--card-border-strong)]">
            <Code2 size={24} className="text-[var(--gold)]" />
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Projects</p>
            <h2 className="mt-3 font-display text-3xl font-bold">Real projects, experiments and things being built.</h2>
            <p className="mt-4 leading-7 text-[var(--muted)]">Browse the work behind the brand and follow the things that are still evolving.</p>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-[var(--gold-light)]">View projects <ArrowRight size={16} className="transition group-hover:translate-x-1" /></span>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-[var(--card-border-strong)] bg-[linear-gradient(135deg,var(--card-bg),var(--panel-bg-strong))] p-8 text-center shadow-[0_0_100px_rgba(126,196,255,0.08)] backdrop-blur-xl md:p-12">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--gold)]">SLOW.DEV</p>
          <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">Build something worth sharing.</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-[var(--muted)]">Use a tool, explore a project, watch a stream, or start a project. The site is built to grow with what SLOW creates.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/tools" className="rounded-xl bg-[var(--gold)] px-5 py-3 font-semibold text-[#071018]">Explore Tools</Link>
            <Link href="/contact" className="rounded-xl border border-[var(--card-border-strong)] px-5 py-3 font-semibold">Work Together</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
