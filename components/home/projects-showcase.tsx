"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Code2, X } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useMemo, useState } from "react";
import { projectTags, projects, type Project } from "@/lib/projects-content";

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <motion.article whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className="group rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#7ec4ff]">{project.featured ? "Featured system" : "Project"}</p>
          <h3 className="mt-2 font-display text-2xl font-bold text-white">{project.title}</h3>
        </div>
        <span className="rounded-xl border border-white/10 p-2 text-white/35"><Code2 size={18} /></span>
      </div>
      <p className="mt-4 text-sm leading-7 text-white/50">{project.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">{project.techStack.map((tech) => <span key={tech} className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/55">{tech}</span>)}</div>
      <div className="mt-7 flex flex-wrap gap-2">
        <button type="button" onClick={onOpen} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#071018] transition hover:-translate-y-0.5">Case Study <ArrowUpRight size={15} /></button>
        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-white/75 transition hover:border-white/20 hover:text-white"><SiGithub size={15} /> GitHub</a>
      </div>
    </motion.article>
  );
}

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md" onMouseDown={onClose}>
      <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.98 }} transition={{ duration: 0.25 }} className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#0a101b] p-6 shadow-2xl sm:p-8" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-6"><div><p className="text-[11px] uppercase tracking-[0.3em] text-[#7ec4ff]">Case Study</p><h2 className="mt-2 font-display text-3xl font-bold text-white">{project.title}</h2></div><button type="button" onClick={onClose} aria-label="Close case study" className="rounded-xl border border-white/10 p-2 text-white/50 hover:text-white"><X size={18} /></button></div>
        <div className="mt-8 grid gap-5 md:grid-cols-2"><section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"><p className="text-xs uppercase tracking-[0.25em] text-white/35">Problem</p><p className="mt-3 text-sm leading-7 text-white/65">{project.caseStudy.problem}</p></section><section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"><p className="text-xs uppercase tracking-[0.25em] text-white/35">Solution</p><p className="mt-3 text-sm leading-7 text-white/65">{project.caseStudy.solution}</p></section></div>
        <section className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5"><p className="text-xs uppercase tracking-[0.25em] text-white/35">Architecture</p><ul className="mt-4 grid gap-3 sm:grid-cols-2">{project.caseStudy.architecture.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-white/65"><CheckCircle2 size={16} className="mt-1 shrink-0 text-[#7ec4ff]" />{item}</li>)}</ul></section>
        <section className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5"><p className="text-xs uppercase tracking-[0.25em] text-white/35">Results / direction</p><ul className="mt-4 grid gap-3 sm:grid-cols-2">{project.caseStudy.results.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-white/65"><CheckCircle2 size={16} className="mt-1 shrink-0 text-[#a78bfa]" />{item}</li>)}</ul></section>
        <div className="mt-6 flex flex-wrap gap-2">{project.techStack.map((tech) => <span key={tech} className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/55">{tech}</span>)}</div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsShowcase() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const tags = useMemo(() => ["All", ...projectTags], []);
  const filtered = useMemo(() => filter === "All" ? projects : projects.filter((project) => project.techStack.includes(filter)), [filter]);
  const featured = projects.find((project) => project.featured) ?? projects[0];

  return (
    <section id="projects" className="px-5 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><div className="max-w-3xl"><p className="text-xs uppercase tracking-[0.35em] text-[#7ec4ff]">Selected systems</p><h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-6xl">Projects with a point of view.</h2><p className="mt-5 text-lg leading-8 text-white/45">A compact showcase of automation, community infrastructure, and real-time experiments. Open a case study for the thinking behind each build.</p></div><div className="flex flex-wrap gap-2">{tags.map((tag) => <button key={tag} type="button" onClick={() => setFilter(tag)} className={`rounded-full border px-3.5 py-2 text-xs transition ${filter === tag ? "border-[#7ec4ff]/50 bg-[#7ec4ff]/10 text-[#d9edff]" : "border-white/10 text-white/45 hover:border-white/20 hover:text-white"}`}>{tag}</button>)}</div></div>
        <motion.div layout className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_.85fr]"><div className="rounded-[2rem] border border-[#7ec4ff]/15 bg-[radial-gradient(circle_at_75%_20%,rgba(126,196,255,.12),transparent_32%),rgba(255,255,255,.025)] p-7 backdrop-blur-xl sm:p-9"><p className="text-xs uppercase tracking-[0.3em] text-[#7ec4ff]">Featured build</p><h3 className="mt-3 font-display text-4xl font-bold text-white">{featured.title}</h3><p className="mt-4 max-w-2xl text-base leading-7 text-white/55">{featured.description}</p><div className="mt-6 grid gap-3 sm:grid-cols-3">{featured.caseStudy.architecture.map((item, index) => <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4"><span className="text-xs text-white/30">0{index + 1}</span><p className="mt-3 text-sm text-white/65">{item}</p></div>)}</div><div className="mt-7 flex flex-wrap gap-2">{featured.techStack.map((tech) => <span key={tech} className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/55">{tech}</span>)}</div><button type="button" onClick={() => setSelected(featured)} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#071018]">Read case study <ArrowUpRight size={15} /></button></div><div className="grid gap-6">{filtered.filter((project) => project.slug !== featured.slug).map((project) => <ProjectCard key={project.slug} project={project} onOpen={() => setSelected(project)} />)}</div></motion.div>
      </div>
      <AnimatePresence>{selected && <CaseStudyModal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  );
}
