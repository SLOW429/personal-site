"use client";

import Link from "next/link";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  ChevronRight,
  Code2,
  Command,
  ExternalLink,
  FolderKanban,
  Globe2,
  Check,
  LoaderCircle,
  Mail,
  Maximize2,
  Minus,
  Monitor,
  Send,
  Sparkles,
  Terminal as TerminalIcon,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type FormEvent, type PointerEvent } from "react";
import { useLocale } from "@/components/layout/locale-provider";
import { AmbientCanvas } from "./ambient-canvas";
import { LiveActivity } from "./live-activity";
import { projects } from "@/lib/projects-content";
import type { TranslationKey } from "@/lib/localization";

type AppId = "projects" | "tools" | "about" | "contact" | "activity" | "terminal";
type AppItem = { id: AppId; label: TranslationKey | "Terminal"; icon: LucideIcon; tone: string };
type TerminalLine = { id: number; command: string; output: string; tone?: "accent" | "error" };

const apps: AppItem[] = [
  { id: "projects", label: "nav.projects", icon: FolderKanban, tone: "text-sky-200" },
  { id: "tools", label: "nav.tools", icon: Wrench, tone: "text-violet-200" },
  { id: "about", label: "nav.about", icon: Monitor, tone: "text-emerald-200" },
  { id: "activity", label: "live.eyebrow", icon: Activity, tone: "text-amber-200" },
  { id: "terminal", label: "Terminal", icon: TerminalIcon, tone: "text-cyan-200" },
  { id: "contact", label: "nav.contact", icon: Mail, tone: "text-rose-200" },
];

const featuredProject = projects.find((project) => project.featured) ?? projects[0];
const toolLinks = [
  ["JSON Formatter", "/tools/json-formatter", "Validate and format structured data"],
  ["JWT Decoder", "/tools/jwt-decoder", "Inspect token claims in your browser"],
  ["Image Compressor", "/tools/image-compressor", "Compress images without uploading"],
  ["QR Code Generator", "/tools/qr-generator", "Create a downloadable QR code"],
] as const;

const helpText =
  "help  show commands  ·  projects  open project desk  ·  tools  open tools  ·  skills  show stack  ·  contact  start a conversation  ·  matrix  toggle matrix mode  ·  clear  clear terminal";
const contactEmail = "abdellatifshaheen617@gmail.com";
const aboutCapabilities: { number: string; label: string; icon: LucideIcon }[] = [
  { number: "01", label: "Web experiences", icon: Globe2 },
  { number: "02", label: "Automation", icon: Bot },
  { number: "03", label: "Open source", icon: Code2 },
  { number: "04", label: "Creator tools", icon: Sparkles },
];

function useLocalClock() {
  const { locale } = useLocale();
  const [clock, setClock] = useState("");

  useEffect(() => {
    const updateClock = () => {
      setClock(
        new Intl.DateTimeFormat(locale === "ar" ? "ar" : locale === "tr" ? "tr-TR" : "en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );
    };

    const timeout = window.setTimeout(updateClock, 0);
    const interval = window.setInterval(updateClock, 30_000);
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [locale]);

  return clock;
}

function WindowTitleBar({
  app,
  onClose,
  onMinimize,
  onMaximize,
  maximized,
  onPointerDown,
}: {
  app: AppItem;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  maximized: boolean;
  onPointerDown: (event: PointerEvent<HTMLDivElement>) => void;
}) {
  const { t, text } = useLocale();

  return (
    <div
      onPointerDown={onPointerDown}
      className="flex h-12 shrink-0 touch-none items-center justify-between border-b border-white/[0.07] bg-white/[0.025] px-3 sm:px-4"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div role="group" aria-label={text("Window controls")} className="flex items-center gap-1.5">
          <button type="button" onClick={onClose} aria-label={text("Close window")} className="group flex h-7 w-7 items-center justify-center rounded-full bg-[#ff6259] shadow-inner shadow-black/20">
            <X size={11} className="opacity-0 transition group-hover:opacity-90 group-focus-visible:opacity-90" />
          </button>
          <button type="button" onClick={onMinimize} aria-label={text("Minimize window")} className="group flex h-7 w-7 items-center justify-center rounded-full bg-[#febc2e] shadow-inner shadow-black/20">
            <Minus size={11} className="opacity-0 transition group-hover:opacity-90 group-focus-visible:opacity-90" />
          </button>
          <button type="button" onClick={onMaximize} aria-label={text(maximized ? "Restore window" : "Maximize window")} className="group flex h-7 w-7 items-center justify-center rounded-full bg-[#28c840] shadow-inner shadow-black/20">
            <Maximize2 size={10} className="opacity-0 transition group-hover:opacity-90 group-focus-visible:opacity-90" />
          </button>
        </div>
        <div className="h-4 w-px bg-white/10" />
        <span className="truncate text-xs font-medium text-white/55">{app.label === "Terminal" ? text(app.label) : t(app.label)}</span>
      </div>
      <span className="hidden items-center gap-1.5 text-[10px] text-white/25 sm:flex">
        <Command size={11} /> SLOW OS
      </span>
    </div>
  );
}

function WindowContent({
  app,
  onRunCommand,
}: {
  app: AppId;
  onRunCommand: (command: string) => void;
}) {
  const { t, text } = useLocale();

  if (app === "projects") {
    return (
      <div className="p-5 sm:p-7">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-sky-200/75">{t("home.selectedSystems")}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">{t("home.projectsTitle")}</h2>
          </div>
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-xs text-white/45 transition hover:text-white">
            {text("All projects")} <ArrowUpRight size={13} />
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {projects.map((project, index) => (
            <article key={project.slug} className={`group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-sky-200/25 hover:bg-white/[0.045] ${project.featured ? "md:col-span-2" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.18em] text-sky-200/50">0{index + 1} / {project.featured ? t("projects.featured") : t("projects.project")}</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{project.title}</h3>
                </div>
                <Code2 size={17} className="mt-1 shrink-0 text-white/25" />
              </div>
              <p className="mt-3 text-sm leading-6 text-white/50">{text(project.description)}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span key={tech} className="rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 py-1 text-[10px] text-white/55 transition group-hover:border-sky-200/15">{tech}</span>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-100 transition hover:text-white">
                  {t("projects.caseStudy")} <ArrowUpRight size={12} />
                </Link>
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-white/45 transition hover:text-white">
                  GitHub <ExternalLink size={11} />
                </a>
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-white/45 transition hover:text-white">
                    {t("projects.liveDemo")} <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (app === "tools") {
    return (
      <div className="p-5 sm:p-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-violet-200/75">{text("Browser-native utilities")}</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">{text("Small tools. Real utility.")}</h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-white/45">{text("A focused toolkit for common developer and creator workflows. Your input stays in your browser whenever possible.")}</p>
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          {toolLinks.map(([title, href, description], index) => (
            <Link key={href} href={href} className="group flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 transition hover:border-violet-200/25 hover:bg-white/[0.05]">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-200/10 bg-violet-200/[0.06] font-mono text-xs text-violet-100/70">0{index + 1}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-white">{text(title)}</span>
                <span className="mt-1 block text-xs leading-5 text-white/40">{text(description)}</span>
              </span>
              <ChevronRight size={15} className="shrink-0 text-white/25 transition group-hover:translate-x-0.5 group-hover:text-violet-100" />
            </Link>
          ))}
        </div>
        <Link href="/tools" className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-violet-100/75 transition hover:text-white">
          {text("Open the full toolkit")} <ArrowUpRight size={12} />
        </Link>
      </div>
    );
  }

  if (app === "about") {
    return (
      <div className="grid gap-6 p-5 sm:grid-cols-[1.05fr_.95fr] sm:p-7">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald-200/75">{t("home.badge")}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white">{t("home.identity")}</h2>
          <p className="mt-4 text-sm leading-7 text-white/50">{t("home.description")}</p>
          <p className="mt-4 text-sm leading-7 text-white/45">{t("home.beyondDescription")}</p>
          <Link href="/about" className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white/75 transition hover:border-emerald-200/25 hover:text-white">
            {text("More about me")} <ArrowUpRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {aboutCapabilities.map(({ number, label, icon: CardIcon }) => {
            return (
              <div key={number} className="flex min-h-32 flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
                <CardIcon size={17} className="text-emerald-200/70" />
                <div>
                  <p className="font-mono text-[10px] text-white/25">{number}</p>
                  <p className="mt-1 text-xs font-medium text-white/70">{text(label)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (app === "contact") {
    return (
      <div className="grid h-full gap-6 p-5 sm:grid-cols-[1.1fr_.9fr] sm:p-7">
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-rose-200/75">{t("contact.eyebrow")}</p>
            <h2 className="mt-3 max-w-lg text-3xl font-semibold leading-tight tracking-tight text-white">{t("contact.title")}</h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/50">{t("contact.description")}</p>
          </div>
          <Link href="/contact" className="mt-6 inline-flex w-fit items-center gap-2 text-xs font-medium text-white/45 transition hover:text-white">
            {text("More contact options")} <ArrowUpRight size={13} />
          </Link>
        </div>
        <div className="flex flex-col justify-center gap-3 rounded-2xl border border-white/[0.08] bg-black/20 p-5">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.05] px-3 py-1.5 text-xs text-emerald-100/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            {t("contact.availability")}
          </span>
          <a href={`mailto:${contactEmail}`} className="group mt-2 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3.5 text-sm text-white/70 transition hover:border-rose-200/20 hover:text-white">
            <Mail size={16} className="text-rose-100/70" />
            <span dir="ltr" className="min-w-0 flex-1 truncate">abdellatifshaheen617@gmail.com</span>
            <ArrowUpRight size={14} className="text-white/30 transition group-hover:text-white/80" />
          </a>
          <Link href="/services" className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3.5 text-sm text-white/60 transition hover:border-white/15 hover:text-white">
            <BriefcaseBusiness size={16} className="text-white/45" />
            <span className="flex-1">{t("nav.services")}</span>
            <ArrowUpRight size={14} className="text-white/30 transition group-hover:text-white/80" />
          </Link>
          <p className="mt-2 text-xs leading-5 text-white/30">{t("contact.privacyNote")}</p>
          <div className="mt-2 border-t border-white/[0.07] pt-4">
            <ContactWindowForm />
          </div>
        </div>
      </div>
    );
  }

  if (app === "activity") {
    return <div className="slowos-activity-window"><LiveActivity /></div>;
  }

  return <TerminalPanel onRunCommand={onRunCommand} />;
}

function ContactWindowForm() {
  const { t, text } = useLocale();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    setSending(true);
    setNotice(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const message = response.status === 429
          ? t("contact.rateLimited")
          : response.status === 503
            ? t("contact.deliveryUnavailable")
            : t("contact.sendError");
        setNotice({ type: "error", message });
        return;
      }

      setForm({ name: "", email: "", message: "" });
      setNotice({ type: "success", message: t("contact.sendSuccess") });
    } catch {
      setNotice({ type: "error", message: t("contact.sendError") });
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <label className="block text-xs font-medium text-white/60">
        {t("contact.name")}
        <input
          required
          name="name"
          autoComplete="name"
          maxLength={100}
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-rose-200/35"
        />
      </label>
      <label className="block text-xs font-medium text-white/60">
        {t("contact.email")}
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          maxLength={254}
          value={form.email}
          onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-rose-200/35"
        />
      </label>
      <label className="block text-xs font-medium text-white/60">
        {t("contact.details")}
        <textarea
          required
          name="message"
          minLength={1}
          maxLength={5_000}
          rows={4}
          value={form.message}
          onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
          className="mt-1.5 w-full resize-y rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2.5 text-sm leading-6 text-white outline-none transition placeholder:text-white/25 focus:border-rose-200/35"
        />
      </label>
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <p role={notice?.type === "error" ? "alert" : "status"} aria-live={notice?.type === "error" ? "assertive" : "polite"} className="min-w-0 flex-1 text-xs leading-5 text-white/50">
          {notice?.message ?? text("Your message goes directly to my inbox.")}
        </p>
        <button
          type="submit"
          disabled={sending}
          className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#d9edff] px-4 py-2 text-xs font-bold text-[#071018] transition hover:bg-white disabled:cursor-wait disabled:opacity-70"
        >
          {sending ? <LoaderCircle size={14} className="animate-spin" /> : notice?.type === "success" ? <Check size={14} /> : <Send size={14} />}
          {sending ? t("contact.sending") : t("contact.send")}
        </button>
      </div>
    </form>
  );
}

function TerminalPanel({ onRunCommand }: { onRunCommand: (command: string) => void }) {
  const { text } = useLocale();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [matrix, setMatrix] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const nextId = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [lines]);

  function run(command: string) {
    const normalized = command.trim().toLowerCase().replace(/\s+/g, " ");
    if (!normalized) return;
    if (normalized === "clear") {
      setLines([]);
      setValue("");
      return;
    }

    const append = (output: string, tone?: TerminalLine["tone"]) => {
      setLines((current) => [...current, { id: nextId.current++, command, output, tone }].slice(-30));
    };
    const commands: Record<string, string> = {
      help: text(helpText),
      skills: "TypeScript · React · Next.js · Node.js · Python · Docker · WebSockets · Automation",
      whoami: "SLOW429 — developer, creator, voice artist.",
      projects: "Opening project desk…",
      tools: "Opening local-first tools…",
      about: "Opening the SLOW profile…",
      contact: "Opening a direct line…",
      matrix: "Matrix mode toggled. No agents were harmed.",
      "sudo hire": "Permission granted. Starting a conversation is one command away.",
    };

    if (normalized === "matrix") {
      setMatrix((current) => !current);
      append(matrix ? "Matrix mode disabled." : commands.matrix, "accent");
    } else if (normalized === "projects" || normalized === "tools" || normalized === "about" || normalized === "contact" || normalized === "sudo hire") {
      append(commands[normalized] ?? "");
      onRunCommand(normalized);
    } else if (normalized in commands) {
      append(commands[normalized] ?? "");
    } else {
      append(`command not found: ${normalized}. Type "help" for the command list.`, "error");
    }

    setValue("");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    run(value);
  }

  return (
    <div
      className="relative flex h-full min-h-0 flex-col overflow-hidden bg-[#050910] font-mono text-xs"
      onClick={() => inputRef.current?.focus()}
    >
      {matrix && (
        <div aria-hidden="true" className="slowos-matrix absolute inset-0 overflow-hidden opacity-20">
          {Array.from({ length: 20 }, (_, index) => (
            <span key={index} style={{ animationDelay: `${(index % 7) * -0.8}s` }}>0101 1001 0110 0011</span>
          ))}
        </div>
      )}
      <div ref={scrollRef} className="relative z-10 min-h-0 flex-1 space-y-4 overflow-y-auto p-5 sm:p-7" aria-live="polite">
        <p className="text-emerald-200/65">{text("SLOW OS shell · type help to explore.")}</p>
        {lines.map((line) => (
          <div key={line.id} className="space-y-1.5">
            <p className="break-all text-white/60"><span className="text-sky-200/75">visitor@slowos</span><span className="text-white/25">:$</span> {line.command}</p>
            <p className={`whitespace-pre-wrap break-words leading-6 ${line.tone === "error" ? "text-rose-200/75" : line.tone === "accent" ? "text-emerald-100/75" : "text-white/40"}`}>{line.output}</p>
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="relative z-10 flex shrink-0 items-center gap-2 border-t border-white/[0.08] bg-black/40 px-4 py-3.5">
        <span className="shrink-0 text-emerald-200/65">visitor@slowos:$</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          aria-label={text("Terminal command")}
          autoComplete="off"
          spellCheck={false}
          maxLength={120}
          className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/20"
          placeholder={text("Type a command…")}
        />
        <button type="submit" className="rounded-lg border border-white/10 p-1.5 text-white/40 transition hover:border-emerald-200/25 hover:text-emerald-100" aria-label={text("Run command")}>
          <ArrowUpRight size={14} />
        </button>
      </form>
    </div>
  );
}

function SlowWindow({
  app,
  zIndex,
  minimized,
  maximized,
  offset,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onRunCommand,
}: {
  app: AppItem;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  offset: { x: number; y: number };
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onMove: (x: number, y: number) => void;
  onRunCommand: (command: string) => void;
}) {
  const { t, text } = useLocale();
  const drag = useRef<{ pointerX: number; pointerY: number; x: number; y: number } | null>(null);
  const windowRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (minimized) return;
    const frame = window.requestAnimationFrame(() => {
      windowRef.current?.querySelector<HTMLElement>(
        "button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
      )?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [minimized]);

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" || maximized || (event.target instanceof Element && event.target.closest("button"))) return;
    drag.current = { pointerX: event.clientX, pointerY: event.clientY, x: offset.x, y: offset.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    const bounds = event.currentTarget.closest(".slowos-window")?.getBoundingClientRect();
    const maxX = Math.max(0, (window.innerWidth - (bounds?.width ?? 360)) / 2);
    const maxY = Math.max(0, (window.innerHeight - (bounds?.height ?? 240)) / 2);
    onMove(
      Math.max(-maxX, Math.min(maxX, drag.current.x + event.clientX - drag.current.pointerX)),
      Math.max(-maxY, Math.min(maxY, drag.current.y + event.clientY - drag.current.pointerY)),
    );
  }

  return (
    <section
      ref={windowRef}
      role="dialog"
      aria-modal="false"
      aria-hidden={minimized}
      inert={minimized}
      aria-label={app.label === "Terminal" ? text(app.label) : t(app.label)}
      onPointerDown={onFocus}
      onPointerMove={moveDrag}
      onPointerUp={() => { drag.current = null; }}
      onPointerCancel={() => { drag.current = null; }}
      style={{
        zIndex,
        "--window-x": `${offset.x}px`,
        "--window-y": `${offset.y}px`,
      } as CSSProperties}
      className={`slowos-window fixed flex min-h-0 flex-col overflow-hidden rounded-[1.4rem] border border-white/[0.12] bg-[#090e18]/95 shadow-[0_36px_120px_rgba(0,0,0,.68)] backdrop-blur-2xl transition-[opacity,transform,border-color] duration-200 ${
        minimized ? "pointer-events-none scale-[0.98] opacity-0" : "opacity-100"
      } ${
        maximized
          ? "slowos-window-maximized inset-x-3 top-[5.25rem] bottom-24 md:inset-[3.5rem_1rem_5.5rem]"
          : "slowos-window-positioned inset-x-3 top-[5.25rem] bottom-24 md:inset-auto md:left-1/2 md:top-1/2 md:h-[min(44rem,calc(100dvh-10rem))] md:w-[min(58rem,calc(100vw-4rem))]"
      }`}
    >
      <WindowTitleBar
        app={app}
        maximized={maximized}
        onClose={onClose}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onPointerDown={startDrag}
      />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <WindowContent app={app.id} onRunCommand={onRunCommand} />
      </div>
    </section>
  );
}

function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let targetX = -100;
    let targetY = -100;
    let currentX = targetX;
    let currentY = targetY;
    let visible = false;
    let interactive = false;

    const animate = () => {
      frame = 0;
      currentX += (targetX - currentX) * 0.32;
      currentY += (targetY - currentY) * 0.32;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      cursor.classList.toggle("slowos-cursor-visible", visible);
      cursor.classList.toggle("slowos-cursor-interactive", interactive);
      if (Math.abs(targetX - currentX) > 0.25 || Math.abs(targetY - currentY) > 0.25) {
        frame = window.requestAnimationFrame(animate);
      }
    };

    const requestFrame = () => {
      if (!frame) frame = window.requestAnimationFrame(animate);
    };
    const onPointerMove = (event: globalThis.PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      const target = event.target;
      const inWorkspace = target instanceof Element && Boolean(target.closest(".slowos-home"));
      const textInput = target instanceof Element && Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
      visible = inWorkspace && !textInput;
      interactive = target instanceof Element && Boolean(target.closest("a, button, [role='button']"));
      requestFrame();
    };
    const onPointerLeave = () => {
      visible = false;
      requestFrame();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={cursorRef} aria-hidden="true" className="slowos-cursor pointer-events-none fixed left-0 top-0 z-[200] block">
      <span className="slowos-cursor-ring" />
      <span className="slowos-cursor-dot" />
    </div>
  );
}

function focusDockApp(app: AppId) {
  window.requestAnimationFrame(() => {
    document.querySelector<HTMLButtonElement>(`[data-slowos-dock-app="${app}"]`)?.focus();
  });
}

export function SlowOS() {
  const { t, text } = useLocale();
  const clock = useLocalClock();
  const [opened, setOpened] = useState<AppId[]>([]);
  const [minimized, setMinimized] = useState<AppId[]>([]);
  const [maximized, setMaximized] = useState<AppId | null>(null);
  const [active, setActive] = useState<AppId | null>(null);
  const [offsets, setOffsets] = useState<Partial<Record<AppId, { x: number; y: number }>>>({});

  const openApp = useCallback((app: AppId) => {
    setOpened((current) => current.includes(app) ? current : [...current, app]);
    setMinimized((current) => current.filter((item) => item !== app));
    setActive(app);
  }, []);

  const closeApp = useCallback((app: AppId) => {
    setOpened((current) => current.filter((item) => item !== app));
    setMinimized((current) => current.filter((item) => item !== app));
    setMaximized((current) => current === app ? null : current);
    setActive((current) => current === app
      ? [...opened].reverse().find((item) => item !== app && !minimized.includes(item)) ?? null
      : current);
    focusDockApp(app);
  }, [minimized, opened]);

  const minimizeApp = useCallback((app: AppId) => {
    setMinimized((current) => current.includes(app) ? current : [...current, app]);
    setActive((current) => current === app
      ? [...opened].reverse().find((item) => item !== app && !minimized.includes(item)) ?? null
      : current);
    focusDockApp(app);
  }, [minimized, opened]);

  const runCommand = useCallback((command: string) => {
    const app: Record<string, AppId> = {
      projects: "projects",
      tools: "tools",
      about: "about",
      contact: "contact",
      "sudo hire": "contact",
    };
    const target = app[command];
    if (target) openApp(target);
  }, [openApp]);

  useEffect(() => {
    const onOpenApp = (event: Event) => {
      const app = (event as CustomEvent<unknown>).detail;
      if (typeof app === "string" && apps.some((item) => item.id === app)) openApp(app as AppId);
    };
    window.addEventListener("slowos:open-app", onOpenApp);
    return () => window.removeEventListener("slowos:open-app", onOpenApp);
  }, [openApp]);

  const appTitle = (app: AppItem) => app.label === "Terminal" ? text(app.label) : t(app.label);
  const visibleProject = featuredProject;

  return (
    <main className="slowos-home home-page relative isolate min-h-[calc(100svh_-_4rem)] overflow-hidden bg-[#050810] px-4 pb-28 pt-8 text-white sm:px-6 sm:pt-10 lg:px-10">
      <AmbientCanvas />
      <div aria-hidden="true" className="slowos-grid absolute inset-0 opacity-40" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(48,91,140,.19),transparent_52%),linear-gradient(180deg,rgba(5,8,16,.08),#050810_90%)]" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px]">
        <header className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.035] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,.8)]" />
              SLOW.DEV / {text("Digital workspace")}
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              {text("A little less portfolio.")}
              <span className="block bg-gradient-to-r from-sky-100 via-sky-300 to-violet-200 bg-clip-text text-transparent">{text("A lot more operating system.")}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">{t("home.description")}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3 self-start rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 sm:self-auto">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-sky-200/10 bg-sky-200/[0.06] text-sky-100/80"><Monitor size={17} /></div>
            <div>
              <p className="font-mono text-xs font-medium text-white/75">{clock || "--:--"}</p>
              <p className="mt-1 text-[10px] text-white/35">{text("Local time")} · {text("Available to build")}</p>
            </div>
          </div>
        </header>

        <section aria-label={text("SlowOS desktop")} className="mt-8 grid gap-3 lg:grid-cols-12 lg:grid-rows-[minmax(178px,1.05fr)_minmax(150px,.95fr)]">
          <button
            type="button"
            onClick={() => openApp("projects")}
            data-spotlight
            className="group relative min-h-48 overflow-hidden rounded-[1.6rem] border border-sky-200/[0.13] bg-[radial-gradient(ellipse_at_90%_15%,rgba(56,130,190,.18),transparent_55%),linear-gradient(135deg,rgba(255,255,255,.055),rgba(255,255,255,.018))] p-5 text-start transition hover:border-sky-100/25 hover:shadow-[0_16px_60px_rgba(32,116,194,.08)] sm:p-6 lg:col-span-7 lg:row-span-2 lg:p-8"
          >
            <div aria-hidden="true" className="absolute -end-10 -top-20 h-56 w-56 rounded-full border border-sky-100/[0.07] transition duration-700 group-hover:scale-110" />
            <div aria-hidden="true" className="absolute -end-1 top-5 h-44 w-44 rounded-full border border-sky-100/[0.06] transition duration-700 group-hover:scale-110" />
            <div className="relative flex h-full min-h-[248px] flex-col justify-between lg:min-h-[380px]">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-sky-100/10 bg-black/15 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-sky-100/75">
                  <Sparkles size={12} /> {t("home.featuredBuild")}
                </span>
                <span className="font-mono text-[10px] text-white/25">01 / {t("nav.projects")}</span>
              </div>
              <div className="max-w-2xl">
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/35">{text("Featured system")} — {visibleProject?.techStack.join(" · ")}</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">{visibleProject?.title ?? "HR-BOT"}</h2>
                <p className="mt-3 max-w-lg text-sm leading-6 text-white/50">{visibleProject ? text(visibleProject.description) : t("home.projectsDescription")}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {(visibleProject?.techStack ?? []).map((tech) => (
                    <span key={tech} className="rounded-full border border-white/[0.09] bg-black/15 px-3 py-1.5 text-[10px] text-white/60 transition group-hover:border-sky-100/20">{tech}</span>
                  ))}
                </div>
                <span className="mt-7 inline-flex items-center gap-2 text-xs font-semibold text-sky-100 transition group-hover:text-white">
                  {t("projects.caseStudy")} <ArrowUpRight size={13} />
                </span>
              </div>
              <span className="absolute bottom-1 end-1 hidden items-center gap-1.5 font-mono text-[9px] text-white/25 sm:inline-flex">
                <span className="h-1 w-1 rounded-full bg-emerald-300" /> {text("SYSTEM READY")}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => openApp("terminal")}
            data-spotlight
            className="group min-h-44 overflow-hidden rounded-[1.6rem] border border-white/[0.09] bg-[#080d16]/85 p-5 text-start backdrop-blur-xl transition hover:border-emerald-200/20 sm:p-6 lg:col-span-5"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-xs font-medium text-white/70"><TerminalIcon size={15} className="text-emerald-200/80" /> {text("Interactive shell")}</span>
              <span className="flex gap-1"><i className="h-1.5 w-1.5 rounded-full bg-[#ff6259]" /><i className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" /><i className="h-1.5 w-1.5 rounded-full bg-[#28c840]" /></span>
            </div>
            <div className="mt-5 space-y-2 font-mono text-[11px]">
              <p><span className="text-emerald-200/65">visitor@slowos</span><span className="text-white/25">:$</span> <span className="text-white/65">help</span></p>
              <p className="line-clamp-2 text-white/35">{text(helpText)}</p>
              <p className="text-emerald-100/60"><span className="animate-pulse">▍</span> {text("Click to launch terminal")}</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => openApp("activity")}
            data-spotlight
            className="group min-h-36 overflow-hidden rounded-[1.6rem] border border-white/[0.09] bg-[linear-gradient(145deg,rgba(126,196,255,.075),rgba(255,255,255,.02))] p-5 text-start backdrop-blur-xl transition hover:border-sky-100/20 sm:p-6 lg:col-span-3"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-medium text-white/70"><Activity size={15} className="text-sky-100/75" /> {t("live.eyebrow")}</span>
              <ArrowUpRight size={14} className="text-white/25 transition group-hover:text-white" />
            </div>
            <div className="mt-5 flex h-7 items-end gap-1.5" aria-hidden="true">
              {[25, 45, 34, 72, 48, 88, 59, 78, 42, 66, 94, 55, 75, 38, 63, 84].map((height, index) => (
                <span key={index} style={{ height: `${height}%` }} className="flex-1 rounded-t-sm bg-gradient-to-t from-sky-300/15 to-sky-100/65 transition group-hover:from-sky-300/30 group-hover:to-sky-100" />
              ))}
            </div>
            <p className="mt-3 text-[10px] text-white/35">{t("live.systemDescription")}</p>
          </button>

          <button
            type="button"
            onClick={() => openApp("contact")}
            data-spotlight
            className="group min-h-36 rounded-[1.6rem] border border-white/[0.09] bg-[linear-gradient(145deg,rgba(167,139,250,.075),rgba(255,255,255,.02))] p-5 text-start backdrop-blur-xl transition hover:border-violet-200/20 sm:p-6 lg:col-span-2"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-medium text-white/70"><Mail size={15} className="text-violet-100/75" /> {t("nav.contact")}</span>
              <ArrowUpRight size={14} className="text-white/25 transition group-hover:text-white" />
            </div>
            <p className="mt-5 text-sm font-medium text-white/80">{t("contact.availability")}</p>
            <p className="mt-1 text-[10px] text-white/35">{text("Open the contact app")} →</p>
          </button>

          <button
            type="button"
            onClick={() => openApp("tools")}
            data-spotlight
            className="group min-h-28 rounded-[1.6rem] border border-white/[0.09] bg-white/[0.025] p-5 text-start backdrop-blur-xl transition hover:border-violet-200/20 lg:col-span-3"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-medium text-white/70"><Wrench size={15} className="text-violet-100/75" /> {t("nav.tools")}</span>
              <span className="rounded-full border border-white/[0.08] px-2 py-1 font-mono text-[9px] text-white/35">{text("LOCAL-FIRST")}</span>
            </div>
            <p className="mt-4 text-xs leading-5 text-white/40">{text("A toolkit built for quick, private workflows.")}</p>
          </button>
        </section>

        <footer className="mt-5 flex flex-wrap items-center justify-between gap-3 text-[10px] text-white/30">
          <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300/80" /> {text("Everything is connected. Pick an app to explore.")}</span>
          <Link href="/projects" className="inline-flex items-center gap-1 transition hover:text-white/70">{t("home.exploreProjects")} <ArrowDownRight size={12} /></Link>
        </footer>
      </div>

      {opened.map((id, index) => {
        const app = apps.find((item) => item.id === id);
        if (!app) return null;
        const isMinimized = minimized.includes(id);
        return (
          <SlowWindow
            key={id}
            app={app}
            zIndex={active === id ? 80 : 70 + index}
            minimized={isMinimized}
            maximized={maximized === id}
            offset={offsets[id] ?? { x: 0, y: 0 }}
            onClose={() => closeApp(id)}
            onMinimize={() => minimizeApp(id)}
            onMaximize={() => setMaximized((current) => current === id ? null : id)}
            onFocus={() => setActive(id)}
            onMove={(x, y) => setOffsets((current) => ({ ...current, [id]: { x, y } }))}
            onRunCommand={runCommand}
          />
        );
      })}

      <nav aria-label={text("SlowOS app dock")} className="slowos-dock fixed inset-x-0 bottom-3 z-[90] mx-auto flex w-fit max-w-[calc(100vw_-_1rem)] items-end gap-1 overflow-x-auto rounded-[1.35rem] border border-white/[0.12] bg-[#0b111c]/75 p-2 shadow-[0_14px_60px_rgba(0,0,0,.5)] backdrop-blur-2xl sm:bottom-5 sm:gap-1.5 sm:px-3">
        {apps.map((app) => {
          const Icon = app.icon;
          const isOpen = opened.includes(app.id);
          const isMinimized = minimized.includes(app.id);
          const isActive = active === app.id && !isMinimized;
          return (
            <button
              key={app.id}
              type="button"
              data-slowos-dock-app={app.id}
              onClick={() => isOpen && isMinimized ? openApp(app.id) : isOpen && isActive ? minimizeApp(app.id) : openApp(app.id)}
              aria-label={appTitle(app)}
              aria-pressed={isActive}
              title={appTitle(app)}
              className={`group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition duration-200 hover:-translate-y-1.5 hover:scale-105 sm:h-12 sm:w-12 ${
                isActive
                  ? "border-white/[0.15] bg-white/[0.09] shadow-[0_0_22px_rgba(143,211,255,.1)]"
                  : "border-transparent bg-white/[0.025] hover:border-white/[0.1] hover:bg-white/[0.07]"
              }`}
            >
              <Icon size={19} className={`transition group-hover:scale-110 ${isActive ? app.tone : "text-white/65 group-hover:text-white"}`} />
              {isOpen && <span aria-hidden="true" className={`absolute -bottom-1 h-1 w-1 rounded-full ${isActive ? "bg-sky-100 shadow-[0_0_7px_rgba(186,230,253,.8)]" : "bg-white/35"}`} />}
              {isMinimized && <span aria-hidden="true" className="absolute -end-0.5 -top-0.5 h-2 w-2 rounded-full border border-[#0b111c] bg-amber-200" />}
              <span className="pointer-events-none absolute -top-9 hidden whitespace-nowrap rounded-lg border border-white/10 bg-[#0b111c]/95 px-2.5 py-1.5 text-[10px] text-white/75 opacity-0 shadow-xl transition group-hover:opacity-100 sm:block">{appTitle(app)}</span>
            </button>
          );
        })}
      </nav>

      <MagneticCursor />

      <div className="sr-only" aria-live="polite">{active ? `${appTitle(apps.find((app) => app.id === active) ?? apps[0])} ${text("app open")}` : ""}</div>
    </main>
  );
}
