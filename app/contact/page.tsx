"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Copy,
  LoaderCircle,
  Mail,
  Send,
} from "lucide-react";
import { SiDiscord, SiGithub, SiYoutube } from "react-icons/si";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useLocale } from "@/components/layout/locale-provider";
import { siteConfig } from "@/lib/site-config";

const EMAIL_ADDRESS = "abdellatifshaheen617@gmail.com";
const EMPTY_FORM = {
  name: "",
  email: "",
  project: "",
  timeline: "",
  budget: "",
  message: "",
};

const inputClass =
  "mt-2 w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#8fd3ff]/60 focus:ring-2 focus:ring-[#8fd3ff]/10 disabled:opacity-60";

const quickLinks = [
  { label: "Email", value: EMAIL_ADDRESS, href: `mailto:${EMAIL_ADDRESS}`, Icon: Mail },
  { label: "GitHub", value: siteConfig.social.github, href: siteConfig.social.github, Icon: SiGithub },
  { label: "YouTube", value: siteConfig.social.youtube, href: siteConfig.social.youtube, Icon: SiYoutube },
  { label: "Discord", value: siteConfig.social.discord, href: siteConfig.social.discord, Icon: SiDiscord },
];

type Notice = { type: "success" | "error"; message: string };

export default function ContactPage() {
  const { t } = useLocale();
  const [form, setForm] = useState(EMPTY_FORM);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  const brief = useMemo(
    () => [
      `${t("contact.projectName")}: ${form.project || t("contact.notSpecified")}`,
      `${t("contact.name")}: ${form.name || t("contact.notSpecified")}`,
      `${t("contact.email")}: ${form.email || t("contact.notSpecified")}`,
      `${t("contact.timeline")}: ${form.timeline || t("contact.notSpecified")}`,
      `${t("contact.budget")}: ${form.budget || t("contact.notSpecified")}`,
      `${t("contact.details")}: ${form.message || t("contact.notSpecified")}`,
    ].join("\n"),
    [form, t],
  );

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(null), 5_000);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  useEffect(() => {
    if (!copiedValue) return;
    const timeout = window.setTimeout(() => setCopiedValue(null), 1_500);
    return () => window.clearTimeout(timeout);
  }, [copiedValue]);

  function updateField(field: keyof typeof EMPTY_FORM, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function copyValue(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValue(value);
      setNotice({ type: "success", message: t("contact.linkCopied") });
    } catch {
      setNotice({ type: "error", message: t("contact.clipboardError") });
    }
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    setSending(true);
    setNotice(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          project: form.project,
          timeline: form.timeline,
          budget: form.budget,
        }),
      });

      if (!response.ok) {
        const message = response.status === 429
          ? t("contact.rateLimited")
          : response.status === 503
            ? t("contact.deliveryUnavailable")
            : t("contact.sendError");
        setNotice({
          type: "error",
          message,
        });
        return;
      }

      setForm(EMPTY_FORM);
      setNotice({ type: "success", message: t("contact.sendSuccess") });
    } catch {
      setNotice({ type: "error", message: t("contact.sendError") });
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(143,211,255,.11),transparent_34rem),radial-gradient(ellipse_at_90%_15%,rgba(173,140,255,.09),transparent_30rem)]"
      />
      <div className="relative mx-auto max-w-7xl">
        <header className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8fd3ff]">
            {t("contact.eyebrow")}
          </p>
          <h1 className="mt-4 font-display text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            {t("contact.title")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
            {t("contact.description")}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-4 py-2 text-sm text-emerald-200">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            {t("contact.availability")}
          </div>
        </header>

        <div className="mt-12 grid items-start gap-6 lg:mt-16 lg:grid-cols-[minmax(0,1.25fr)_minmax(19rem,.75fr)]">
          <section
            aria-labelledby="contact-form-title"
            className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_24px_100px_rgba(0,0,0,.24)] backdrop-blur-xl transition-colors hover:border-white/[0.16] sm:p-8 lg:p-9"
          >
            <div className="mb-7">
              <h2 id="contact-form-title" className="font-display text-2xl font-bold text-white sm:text-3xl">
                {t("contact.formTitle")}
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/45">{t("contact.formDescription")}</p>
            </div>

            <form onSubmit={submitForm} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-medium text-white/75">
                  {t("contact.name")} <span className="text-[#8fd3ff]">*</span>
                  <input
                    className={inputClass}
                    name="name"
                    autoComplete="name"
                    maxLength={100}
                    required
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    placeholder={t("contact.namePlaceholder")}
                  />
                </label>
                <label className="block text-sm font-medium text-white/75">
                  {t("contact.email")} <span className="text-[#8fd3ff]">*</span>
                  <input
                    className={inputClass}
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    required
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    placeholder={t("contact.emailPlaceholder")}
                  />
                </label>
              </div>

              <label className="block text-sm font-medium text-white/75">
                {t("contact.projectName")} <span className="text-white/30">({t("contact.optional")})</span>
                <input
                  className={inputClass}
                  name="project"
                  maxLength={120}
                  value={form.project}
                  onChange={(event) => updateField("project", event.target.value)}
                  placeholder={t("contact.projectPlaceholder")}
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-medium text-white/75">
                  {t("contact.timeline")} <span className="text-white/30">({t("contact.optional")})</span>
                  <input
                    className={inputClass}
                    name="timeline"
                    maxLength={120}
                    value={form.timeline}
                    onChange={(event) => updateField("timeline", event.target.value)}
                    placeholder={t("contact.timelinePlaceholder")}
                  />
                </label>
                <label className="block text-sm font-medium text-white/75">
                  {t("contact.budget")} <span className="text-white/30">({t("contact.optional")})</span>
                  <input
                    className={inputClass}
                    name="budget"
                    maxLength={120}
                    value={form.budget}
                    onChange={(event) => updateField("budget", event.target.value)}
                    placeholder={t("contact.optional")}
                  />
                </label>
              </div>

              <label className="block text-sm font-medium text-white/75">
                {t("contact.details")} <span className="text-[#8fd3ff]">*</span>
                <textarea
                  className={`${inputClass} min-h-40 resize-y leading-7`}
                  name="message"
                  minLength={1}
                  maxLength={5_000}
                  required
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  placeholder={t("contact.detailsPlaceholder")}
                />
                <span className="mt-2 block text-end text-xs text-white/30">
                  {form.message.length}/5000
                </span>
              </label>

              <div className="flex flex-col gap-3 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-sm text-xs leading-5 text-white/35">{t("contact.privacyNote")}</p>
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#d9edff] px-5 py-3 text-sm font-bold text-[#071018] shadow-[0_8px_30px_rgba(126,196,255,.12)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(126,196,255,.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8fd3ff] disabled:cursor-wait disabled:opacity-70"
                >
                  {sending ? <LoaderCircle size={17} className="animate-spin" /> : <Send size={16} />}
                  {sending ? t("contact.sending") : t("contact.send")}
                  {!sending && <ArrowUpRight size={15} />}
                </button>
              </div>
            </form>
          </section>

          <aside className="space-y-6">
            <section className="rounded-[2rem] border border-[#8fd3ff]/15 bg-[radial-gradient(circle_at_100%_0%,rgba(143,211,255,.1),transparent_18rem),rgba(255,255,255,.025)] p-5 backdrop-blur-xl sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8fd3ff]">
                    {t("contact.brief")}
                  </p>
                  <p className="mt-2 text-sm text-white/40">{t("contact.briefDescription")}</p>
                </div>
                <span className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-[#8fd3ff]">
                  <Mail size={18} />
                </span>
              </div>
              <pre className="mt-5 max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-2xl border border-white/[0.07] bg-black/25 p-4 font-sans text-xs leading-6 text-white/55">
                {brief}
              </pre>
              <button
                type="button"
                onClick={() => void copyValue(brief)}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white/75 transition hover:border-[#8fd3ff]/35 hover:bg-[#8fd3ff]/[0.07] hover:text-white"
              >
                {copiedValue === brief ? <Check size={16} /> : <Copy size={16} />}
                {copiedValue === brief ? t("contact.copied") : t("contact.copy")}
              </button>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-5 sm:p-7">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-[#ad8cff]">
                  <ArrowUpRight size={18} />
                </span>
                <div>
                  <h2 className="font-semibold text-white">{t("contact.socialTitle")}</h2>
                  <p className="mt-1 text-xs text-white/40">{t("contact.socialDescription")}</p>
                </div>
              </div>
              <ul className="divide-y divide-white/[0.06]">
                {quickLinks.map(({ label, value, href, Icon }) => (
                  <li key={label} className="flex items-center gap-3 py-3 first:pt-1 last:pb-1">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-white/60">
                      <Icon size={16} />
                    </span>
                    <a
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                      className="min-w-0 flex-1 truncate text-sm font-medium text-white/70 transition hover:text-white"
                    >
                      {label}
                    </a>
                    <button
                      type="button"
                      onClick={() => void copyValue(value)}
                      aria-label={`${t("contact.copyLink")}: ${label}`}
                      className="rounded-lg border border-transparent p-2 text-white/35 transition hover:border-white/10 hover:text-[#8fd3ff]"
                    >
                      {copiedValue === value ? <Check size={15} /> : <Copy size={15} />}
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            <div className="flex flex-wrap gap-3 px-1">
              <Link href="/services" className="inline-flex items-center gap-1.5 text-sm text-white/45 transition hover:text-white">
                {t("contact.viewServices")} <ArrowUpRight size={14} />
              </Link>
              <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-white/45 transition hover:text-white">
                {t("contact.seeProjects")} <ArrowUpRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {notice && (
        <div
          role={notice.type === "error" ? "alert" : "status"}
          aria-live={notice.type === "error" ? "assertive" : "polite"}
          className={`fixed bottom-5 start-1/2 z-[1300] flex w-[calc(100%_-_2rem)] max-w-md -translate-x-1/2 items-center gap-3 rounded-2xl border px-4 py-3.5 text-sm shadow-2xl backdrop-blur-xl ${
            notice.type === "success"
              ? "border-emerald-400/25 bg-[#081610]/95 text-emerald-100"
              : "border-red-400/25 bg-[#1a0b0c]/95 text-red-100"
          }`}
        >
          {notice.type === "success" ? <Check size={17} /> : <Mail size={17} />}
          <span>{notice.message}</span>
        </div>
      )}
    </main>
  );
}
