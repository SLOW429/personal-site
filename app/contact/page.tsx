"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Copy, MessageCircle } from "lucide-react";
import { useLocale } from "@/components/layout/locale-provider";

export default function ContactPage() {
  const { t } = useLocale();
  const [name, setName] = useState("");
  const [project, setProject] = useState("");
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [details, setDetails] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const brief = useMemo(
    () => [
      `${t("contact.projectName")}: ${project || t("contact.notSpecified")}`,
      `${t("contact.name")}: ${name || t("contact.notSpecified")}`,
      `${t("contact.timeline")}: ${timeline || t("contact.notSpecified")}`,
      `${t("contact.budget")}: ${budget || t("contact.notSpecified")}`,
      `${t("contact.details")}: ${details || t("contact.notSpecified")}`,
    ].join("\n"),
    [budget, details, name, project, t, timeline],
  );

  async function copyBrief() {
    setCopyError(false);
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }

  return (
    <main className="min-h-screen px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">{t("contact.eyebrow")}</p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">{t("contact.title")}</h1>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">{t("contact.description")}</p>
        </header>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <section className="rounded-[2rem] border border-[var(--card-border-strong)] bg-[var(--card-bg)] p-6 backdrop-blur-xl md:p-8">
            <div className="grid gap-5">
              <label className="text-sm font-semibold">{t("contact.projectName")}<input value={project} onChange={(event) => setProject(event.target.value)} className="mt-2 w-full rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] px-4 py-3 font-normal outline-none focus:border-[var(--gold)]" placeholder={t("contact.projectPlaceholder")} /></label>
              <label className="text-sm font-semibold">{t("contact.name")}<input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] px-4 py-3 font-normal outline-none focus:border-[var(--gold)]" placeholder={t("contact.optional")} /></label>
              <label className="text-sm font-semibold">{t("contact.timeline")}<input value={timeline} onChange={(event) => setTimeline(event.target.value)} className="mt-2 w-full rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] px-4 py-3 font-normal outline-none focus:border-[var(--gold)]" placeholder={t("contact.timelinePlaceholder")} /></label>
              <label className="text-sm font-semibold">{t("contact.budget")}<input value={budget} onChange={(event) => setBudget(event.target.value)} className="mt-2 w-full rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] px-4 py-3 font-normal outline-none focus:border-[var(--gold)]" placeholder={t("contact.optional")} /></label>
              <label className="text-sm font-semibold">{t("contact.details")}<textarea value={details} onChange={(event) => setDetails(event.target.value)} className="mt-2 min-h-48 w-full resize-y rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 font-normal leading-7 outline-none focus:border-[var(--gold)]" placeholder={t("contact.detailsPlaceholder")} /></label>
            </div>
          </section>

          <aside className="space-y-5">
            <section className="rounded-[2rem] border border-[var(--card-border-strong)] bg-[var(--card-bg)] p-6 backdrop-blur-xl md:p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">{t("contact.brief")}</p>
              <pre className="mt-5 max-h-80 overflow-auto whitespace-pre-wrap break-words rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 text-sm leading-6 text-[var(--muted)]">{brief}</pre>
              <button type="button" onClick={copyBrief} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--gold)] px-5 py-3 font-semibold text-[#071018]">{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? t("contact.copied") : t("contact.copy")}</button>
              {copyError && <p role="alert" className="mt-3 text-sm text-red-300">{t("contact.clipboardError")}</p>}
            </section>

            <section className="rounded-[2rem] border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-6">
              <MessageCircle size={22} className="text-[var(--gold)]" />
              <h2 className="mt-4 text-xl font-bold">{t("contact.discordTitle")}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{t("contact.discordDescription")}</p>
              <a href="https://discord.gg/MvVxreJXMq" target="_blank" rel="noreferrer" className="mt-5 inline-flex rounded-xl border border-[var(--card-border-strong)] px-4 py-3 font-semibold transition hover:border-[var(--gold)]">{t("contact.openDiscord")}</a>
            </section>
          </aside>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/services" className="rounded-xl border border-[var(--card-border-strong)] px-5 py-3 font-semibold">{t("contact.viewServices")}</Link>
          <Link href="/projects" className="rounded-xl border border-[var(--card-border-strong)] px-5 py-3 font-semibold">{t("contact.seeProjects")}</Link>
        </div>
      </div>
    </main>
  );
}
