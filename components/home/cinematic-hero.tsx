"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Mic2, Sparkles } from "lucide-react";
import { TerminalIntro } from "./terminal-intro";
import { useLocale } from "@/components/layout/locale-provider";

const particles = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 61) % 100}%`,
  delay: (index % 8) * 0.25,
  size: 2 + (index % 4),
}));

export function CinematicHero() {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden px-5 py-20 sm:px-8 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(126,196,255,.15),transparent_28%),radial-gradient(circle_at_82%_35%,rgba(167,139,250,.12),transparent_30%),linear-gradient(180deg,rgba(6,10,19,.82),rgba(6,10,19,.96))]" />
      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-[#d9edff]/70"
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
          initial={false}
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={reduceMotion ? { duration: 0, repeat: 0 } : { duration: 4 + particle.delay, repeat: Infinity, delay: particle.delay, ease: "easeInOut" }}
        />
      ))}

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.35 }} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/60 backdrop-blur-xl">
            <Sparkles size={13} className="text-[#7ec4ff]" />
            {t("home.badge")}
          </motion.div>

          <motion.h1 initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.08 }} className="mt-6 max-w-4xl font-display text-5xl font-black tracking-[-0.04em] text-white sm:text-6xl lg:text-8xl">
            {t("home.headlineStart")} <span className="bg-gradient-to-r from-[#d9edff] via-[#7ec4ff] to-[#a78bfa] bg-clip-text text-transparent">{t("home.headlineAccent")}</span>
            <br /> {t("home.headlineEnd")}
          </motion.h1>

          <motion.p initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.16 }} className="mt-7 max-w-2xl text-lg leading-8 text-white/55 sm:text-xl">
            {t("home.description")}
          </motion.p>

          <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.22 }} className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects" className={`group inline-flex items-center gap-2 rounded-2xl bg-[#d9edff] px-5 py-3.5 font-bold text-[#071018] transition hover:shadow-[0_20px_60px_rgba(126,196,255,.2)] ${reduceMotion ? "" : "hover:-translate-y-0.5"}`}>
              {t("home.exploreProjects")} <ArrowUpRight size={17} className={`transition ${reduceMotion ? "" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"}`} />
            </Link>
            <Link href="/contact" className={`inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 font-semibold text-white backdrop-blur-xl transition hover:border-white/20 ${reduceMotion ? "" : "hover:-translate-y-0.5"}`}>
              <Mic2 size={17} /> {t("home.workWithMe")}
            </Link>
          </motion.div>

          <div className="mt-9 flex flex-wrap gap-2 text-xs text-white/40">
            {[t("home.developer"), t("home.creator"), t("home.voice"), t("home.automation"), "AI", t("nav.gaming")].map((label) => (
              <span key={label} className="rounded-full border border-white/10 px-3 py-1.5">{label}</span>
            ))}
          </div>
        </div>

        <div className="flex justify-end lg:justify-center">
          <TerminalIntro />
        </div>
      </div>

      <motion.a href="#projects" initial={false} animate={{ y: [0, 8, 0] }} transition={reduceMotion ? { duration: 0, repeat: 0 } : { duration: 1.8, repeat: Infinity }} className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/30 hover:text-white/70" aria-label={t("home.scroll")}>
        <ArrowDown size={18} />
      </motion.a>
    </section>
  );
}
