"use client";

import { useMemo, useState } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Check, Copy, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Start a Project",
  description: "Prepare a clear project brief for SLOW: what you need, timeline, current setup, and budget.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const [name, setName] = useState("");
  const [project, setProject] = useState("");
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [details, setDetails] = useState("");
  const [copied, setCopied] = useState(false);

  const brief = useMemo(() => {
    return [`Project: ${project || "Not specified"}`, `Name: ${name || "Not specified"}`, `Timeline: ${timeline || "Not specified"}`, `Budget: ${budget || "Not specified"}`, `Details: ${details || "Not specified"}`].join("\n");
  }, [budget, details, name, project, timeline]);

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="min-h-screen px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">SLOW / START A PROJECT</p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">Bring the problem. Leave with a clear brief.</h1>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">Fill out the essentials locally in your browser, then copy the brief and send it through the SLOW Discord community. No form submission or tracking is required.</p>
        </header>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <section className="rounded-[2rem] border border-[var(--card-border-strong)] bg-[var(--card-bg)] p-6 backdrop-blur-xl md:p-8">
            <div className="grid gap-5">
              <label className="text-sm font-semibold">Project name<input value={project} onChange={(event) => setProject(event.target.value)} className="mt-2 w-full rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] px-4 py-3 font-normal outline-none focus:border-[var(--gold)]" placeholder="e.g. Business website, Discord bot, SEO cleanup" /></label>
              <label className="text-sm font-semibold">Your name<input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] px-4 py-3 font-normal outline-none focus:border-[var(--gold)]" placeholder="Optional" /></label>
              <label className="text-sm font-semibold">Timeline<input value={timeline} onChange={(event) => setTimeline(event.target.value)} className="mt-2 w-full rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] px-4 py-3 font-normal outline-none focus:border-[var(--gold)]" placeholder="e.g. 2–3 weeks" /></label>
              <label className="text-sm font-semibold">Budget range<input value={budget} onChange={(event) => setBudget(event.target.value)} className="mt-2 w-full rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] px-4 py-3 font-normal outline-none focus:border-[var(--gold)]" placeholder="Optional" /></label>
              <label className="text-sm font-semibold">What are you trying to build?<textarea value={details} onChange={(event) => setDetails(event.target.value)} className="mt-2 min-h-48 w-full resize-y rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 font-normal leading-7 outline-none focus:border-[var(--gold)]" placeholder="Describe the current situation, desired result, existing tools, and anything that is blocking you." /></label>
            </div>
          </section>

          <aside className="space-y-5">
            <section className="rounded-[2rem] border border-[var(--card-border-strong)] bg-[var(--card-bg)] p-6 backdrop-blur-xl md:p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Your brief</p>
              <pre className="mt-5 max-h-80 overflow-auto whitespace-pre-wrap break-words rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 text-sm leading-6 text-[var(--muted)]">{brief}</pre>
              <button type="button" onClick={copyBrief} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--gold)] px-5 py-3 font-semibold text-[#071018]">{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? "Copied" : "Copy project brief"}</button>
            </section>

            <section className="rounded-[2rem] border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-6">
              <MessageCircle size={22} className="text-[var(--gold)]" />
              <h2 className="mt-4 text-xl font-bold">Send it through Discord</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">Paste the copied brief into the SLOW community and include any screenshots or links that help explain the project.</p>
              <a href="https://discord.gg/MvVxreJXMq" target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-xl border border-[var(--card-border-strong)] px-4 py-3 font-semibold transition hover:border-[var(--gold)]">Open Discord</a>
            </section>
          </aside>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/services" className="rounded-xl border border-[var(--card-border-strong)] px-5 py-3 font-semibold">View services</Link>
          <Link href="/projects" className="rounded-xl border border-[var(--card-border-strong)] px-5 py-3 font-semibold">See projects</Link>
        </div>
      </div>
    </main>
  );
}
