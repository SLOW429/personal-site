"use client";

import Link from "next/link";
import { ArrowUpRight, Mic2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { CinematicHero } from "./cinematic-hero";
import { LiveActivity } from "./live-activity";
import { ProjectsShowcase } from "./projects-showcase";

const services = [
  ["Product-grade websites", "From portfolio sites to polished business experiences with strong performance foundations."],
  ["Automation & AI", "Bots, internal tools, integrations and workflows that remove repetitive work."],
  ["Performance & technical SEO", "A cleaner technical foundation for faster pages, better crawling and better discoverability."],
];

export function HomeExperience() {
  return (
    <main className="overflow-hidden bg-[#060a13] text-white">
      <CinematicHero />

      <section className="border-y border-white/[0.06] bg-white/[0.015] px-5 py-7 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-sm text-white/50"><Sparkles size={16} className="text-[#7ec4ff]" /> New builds, experiments and creator work live here.</div>
          <div className="flex flex-wrap gap-5 text-xs uppercase tracking-[0.2em] text-white/25"><span>Software</span><span>Automation</span><span>Content</span><span>Voice</span></div>
        </div>
      </section>

      <ProjectsShowcase />
      <LiveActivity />

      <section className="px-5 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_15%_15%,rgba(126,196,255,.1),transparent_28%),rgba(255,255,255,.025)] p-7 sm:p-10 lg:p-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl"><p className="text-xs uppercase tracking-[0.35em] text-[#7ec4ff]">Work with SLOW</p><h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Need something built, connected, or made clearer?</h2><p className="mt-5 text-lg leading-8 text-white/45">I take on focused builds across websites, automation, AI integrations, technical systems, and creator-facing experiences.</p></div>
            <Link href="/contact" className="inline-flex w-fit items-center gap-2 rounded-2xl bg-white px-5 py-3.5 font-bold text-[#071018] transition hover:-translate-y-0.5">Start a project <ArrowUpRight size={17} /></Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {services.map(([title, text], index) => <motion.article key={title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.08 }} className="rounded-2xl border border-white/10 bg-black/15 p-5"><p className="text-[11px] text-[#7ec4ff]">0{index + 1}</p><h3 className="mt-4 text-lg font-semibold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-white/45">{text}</p></motion.article>)}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/[0.02] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9"><div><p className="text-xs uppercase tracking-[0.3em] text-[#7ec4ff]">Beyond code</p><h2 className="mt-2 font-display text-2xl font-bold">Developer, creator, voiceover artist.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-white/45">Building software is one part of the work. Storytelling, voice, gaming and community are part of the same system.</p></div><Link href="/creator" className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-white/75 hover:border-white/20 hover:text-white"><Mic2 size={15} /> Creator Hub <ArrowUpRight size={15} /></Link></div></section>
    </main>
  );
}
