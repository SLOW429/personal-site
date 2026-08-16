import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, Gauge, Globe2, Search, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: "Web development, automation, AI integrations, performance, and technical SEO from SLOW.",
  alternates: { canonical: "/services" },
};

const services = [
  { icon: Globe2, title: "Web Development", text: "Fast, responsive websites, landing pages, dashboards, and custom web applications built around a clear goal." },
  { icon: Bot, title: "Automation & AI", text: "Bots, AI integrations, workflow automation, and small internal systems that remove repetitive work." },
  { icon: Gauge, title: "Performance", text: "Frontend cleanup, Core Web Vitals work, media optimization, and practical speed improvements." },
  { icon: Search, title: "Technical SEO", text: "Metadata, canonicals, sitemap structure, indexing foundations, and technical fixes that make search engines understand the site." },
  { icon: Wrench, title: "Custom Tools", text: "Small developer or business utilities built to solve one workflow well instead of becoming another complicated platform." },
];

const process = ["Define the outcome", "Inspect the existing setup", "Build in small reviewable steps", "Ship and verify the result"];

export default function ServicesPage() {
  return (
    <main className="min-h-screen px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">SLOW / SERVICES</p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">Build the thing you actually need.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">Focused development and automation work for people and businesses that need something useful, maintainable, and ready to ship.</p>
        </header>

        <section className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-7 backdrop-blur-xl transition hover:-translate-y-1 hover:border-[var(--card-border-strong)]">
              <Icon size={24} className="text-[var(--gold)]" />
              <h2 className="mt-6 text-2xl font-bold">{title}</h2>
              <p className="mt-3 leading-7 text-[var(--muted)]">{text}</p>
            </article>
          ))}
        </section>

        <section className="mt-12 rounded-[2rem] border border-[var(--card-border-strong)] bg-[var(--card-bg)] p-8 backdrop-blur-xl md:p-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">How it works</p>
          <h2 className="mt-3 font-display text-3xl font-bold">A small, practical process.</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-4">
            {process.map((step, index) => (
              <div key={step} className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-5">
                <span className="font-mono text-xs text-[var(--gold)]">0{index + 1}</span>
                <p className="mt-3 font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-[var(--card-border-strong)] bg-[linear-gradient(135deg,var(--card-bg),var(--panel-bg-strong))] p-8 md:p-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Start here</p>
              <h2 className="mt-3 font-display text-3xl font-bold">Have a specific problem?</h2>
              <p className="mt-4 leading-7 text-[var(--muted)]">Send the outcome you want, what you already have, your target timeline, and anything that is already blocking you.</p>
            </div>
            <Link href="/contact" className="inline-flex w-fit items-center gap-2 rounded-xl bg-[var(--gold)] px-5 py-3 font-semibold text-[#071018]">Start a project <ArrowRight size={16} /></Link>
          </div>
        </section>
      </div>
    </main>
  );
}
