"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Moon, Sun, Bot, X, Eye, Send, Loader2 } from "lucide-react";
import { SiGithub, SiX, SiInstagram, SiSpotify, SiPaypal, SiDiscord } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

const DISCORD_ID = "680035752461205524";
const COUNTER_KEY = "slows-dev-abdellatif-shaheen-visits";

const calendarTheme = {
  light: ["#e3eefb", "#a9d0f5", "#5fa3e0", "#2f7cc4", "#163f66"],
  dark: ["#0d1420", "#1c3550", "#3a6a99", "#7ec4ff", "#d9edff"],
};

const projects = [
  { title: "HR-BOT", desc: "Advanced Highrise music & automation bot with streaming systems.", tech: "Python • Docker • Coolify", link: "https://github.com/SLOW429/HR-BOT" },
  { title: "discord-bot", desc: "Modern Discord utility & management system.", tech: "JavaScript • Discord.js", link: "https://github.com/SLOW429/discord-bot" },
  { title: "chat-platform", desc: "Experimental real-time communication platform.", tech: "Node.js • WebSockets", link: "https://github.com/SLOW429/chat-platform" },
];

const socials = [
  { title: "GitHub", value: "@SLOW429", href: "https://github.com/SLOW429", icon: SiGithub },
  { title: "LinkedIn", value: "Abdellatif Gahen", href: "https://www.linkedin.com/in/abdellatif-gahen-1ba3b7389", icon: FaLinkedin },
  { title: "X", value: "@SLOW_429", href: "https://x.com/SLOW_429", icon: SiX },
  { title: "Instagram", value: "@m6.ydj", href: "https://www.instagram.com/m6.ydj/", icon: SiInstagram },
  { title: "Spotify", value: "My Spotify", href: "https://open.spotify.com/user/31pmd7jyoxhubdtasmvo3heuqpje?si=6e9e2fbbb98b4af7", icon: SiSpotify },
  { title: "PayPal", value: "Support Me", href: "https://www.paypal.com/paypalme/abdellatifeg", icon: SiPaypal },
  { title: "Discord", value: "Join Server", href: "https://discord.gg/MvVxreJXMq", icon: SiDiscord },
];

function VisitorBadge() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://countapi.mileshilliard.com/api/v1/hit/${COUNTER_KEY}`)
      .then((res) => res.json())
      .then((json) => setCount(json?.value ?? null))
      .catch(() => setCount(null));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border border-[var(--card-border-strong)] bg-[var(--card-bg)] px-5 py-2 text-sm text-[var(--gold-light)] shadow-[0_0_30px_rgba(126, 196, 255,0.15)] backdrop-blur-xl"
    >
      <Eye size={16} className="text-[var(--gold)]" />
      <span className="font-mono tabular-nums">{count !== null ? count.toLocaleString() : "···"}</span>
      <span className="text-[var(--muted)]">visitors</span>
    </motion.div>
  );
}

function DiscordCard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
      .then((res) => res.json())
      .then((json) => setData(json.data))
      .catch(() => setData(null));
  }, []);

  const status = data?.discord_status || "offline";
  const activity = data?.activities?.find((a: any) => a.type === 0);

  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-24">
      <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[var(--card-border-strong)] bg-[var(--card-bg)] shadow-[0_0_120px_rgba(126, 196, 255,0.14)] backdrop-blur-xl">
        <div className="relative h-36 md:h-44 overflow-hidden">
          <video
            src="/banner.mp4"
            poster="/banner-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        </div>
        <div className="p-8">
          <div className="-mt-24 flex items-end gap-5">
            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-[var(--ring-offset)] shadow-[0_0_40px_rgba(126, 196, 255,0.35)]">
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,var(--gold-light),var(--ember),var(--gold),var(--gold-light))] animate-[spin_6s_linear_infinite]" style={{ padding: "3px" }} />
              <div className="absolute inset-[3px] overflow-hidden rounded-full bg-zinc-900">
                <video src="/avatar.mp4" poster="/avatar-poster.jpg" autoPlay muted loop playsInline className="h-full w-full object-cover" />
              </div>
              <span className={`absolute bottom-1 right-1 z-10 h-5 w-5 rounded-full border-4 border-[var(--ring-offset)] ${status === "online" ? "bg-emerald-500" : status === "idle" ? "bg-amber-400" : status === "dnd" ? "bg-red-500" : "bg-zinc-500"}`} />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-display text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold-light)] via-[var(--gold)] to-[var(--ember)]">SLOW429</h1>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/badges.png" alt="Discord profile badges" className="h-5 w-auto opacity-90" />
              </div>
              <p className="text-[var(--muted)]">Discord • {status}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                title={social.title}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--card-bg-soft)] text-[var(--gold)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-[var(--card-border-strong)] hover:bg-[var(--card-bg-hover)] hover:text-[var(--gold-light)]"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg)] p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--gold)]">Current Activity</p>
            <p className="mt-4 text-2xl font-bold">{activity ? activity.name : "Not doing anything right now."}</p>
            {activity?.details && <p className="mt-2 text-[var(--muted)]">{activity.details}</p>}
          </div>

          <a href="https://discord.gg/MvVxreJXMq" target="_blank" className="mt-8 inline-flex rounded-2xl bg-gradient-to-r from-[var(--gold-light)] to-[var(--gold)] px-7 py-4 font-bold text-[#071018] transition hover:scale-105 hover:shadow-[0_0_40px_rgba(126, 196, 255,0.4)]">
            Join Discord
          </a>
        </div>
      </motion.div>

      <VisitorBadge />
    </section>
  );
}

type ChatMessage = { role: "user" | "assistant"; content: string };

function AiAssistant({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hey! I'm SLOW's assistant. Ask me anything about his work, projects, or how to get in touch." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.text || data.error || "Something went wrong." }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Couldn't reach the assistant right now. Try again in a bit." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          className="fixed bottom-24 right-6 z-[999] flex h-[min(520px,70vh)] w-[min(380px,90vw)] flex-col rounded-3xl border border-[var(--card-border-strong)] bg-[var(--panel-bg-heavy)] text-[var(--foreground)] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between border-b border-[var(--card-border)] p-5">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">AI Assistant</p>
              <h3 className="font-display text-xl font-bold">SLOW Interface</h3>
            </div>
            <button onClick={onClose} className="text-[var(--muted)] hover:text-[var(--foreground)]"><X size={20} /></button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-5">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-6 ${m.role === "user" ? "ml-auto bg-gradient-to-r from-[var(--gold-light)] to-[var(--gold)] text-[#071018]" : "bg-[var(--card-bg)] border border-[var(--card-border)]"}`}>
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="flex w-fit items-center gap-2 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-2.5 text-sm text-[var(--muted)]">
                <Loader2 size={14} className="animate-spin" /> thinking...
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 border-t border-[var(--card-border)] p-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask something..."
              className="flex-1 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] px-4 py-2.5 text-sm outline-none placeholder:text-[var(--muted)] focus-visible:border-[var(--gold)]"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-[var(--gold-light)] to-[var(--gold)] text-[#071018] disabled:opacity-40"
            >
              <Send size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [light, setLight] = useState(false);
  const [blast, setBlast] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [aiOpen, setAiOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const toggleTheme = () => {
    setBlast(true);
    setTimeout(() => setLight((v) => !v), 260);
    setTimeout(() => setBlast(false), 950);
  };

  return (
    <main className={`min-h-screen overflow-hidden font-sans transition-colors duration-1000 bg-[var(--background)] text-[var(--foreground)] ${light ? "light" : ""}`}>
      <AnimatePresence>
        {loading && (
          <motion.div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#060a13]" exit={{ opacity: 0 }} transition={{ duration: 0.9 }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(126, 196, 255,0.18),transparent_35%)]" />
            <div className="text-center">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="mx-auto mb-8 h-28 w-28 rounded-full border border-[#7ec4ff]/20 border-t-[#7ec4ff] shadow-[0_0_100px_rgba(126, 196, 255,0.3)]" />
              <p className="text-xs uppercase tracking-[0.8em] text-[#7ec4ff]">SLOW</p>
              <h1 className="mt-5 font-display bg-gradient-to-r from-[#d9edff] via-[#7ec4ff] to-[#a78bfa] bg-clip-text text-5xl font-black text-transparent">Initializing</h1>
              <div className="mt-10 h-3 w-[min(520px,90vw)] overflow-hidden rounded-full border border-[#7ec4ff]/15 bg-white/5">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-[#d9edff] via-[#7ec4ff] to-[#a78bfa]" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 3.2, ease: "easeInOut" }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="pointer-events-none fixed z-[998] h-[180vmax] w-[180vmax] rounded-full bg-[var(--gold)]" initial={false} animate={blast ? { scale: 1, opacity: 0.9 } : { scale: 0, opacity: 0 }} transition={{ duration: 0.9, ease: "easeInOut" }} style={{ left: mouse.x, top: mouse.y, translateX: "-50%", translateY: "-50%" }} />

      <motion.button onClick={toggleTheme} whileTap={{ scale: 0.85 }} className="fixed right-6 top-6 z-[999] flex h-16 w-16 items-center justify-center rounded-full border border-[var(--card-border-strong)] bg-[var(--card-bg)] text-[var(--gold)] shadow-[0_0_50px_rgba(126, 196, 255,0.3)] backdrop-blur-xl">
        <motion.div key={light ? "sun" : "moon"} initial={{ rotate: -180, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ duration: 0.5 }}>
          {light ? <Sun size={26} /> : <Moon size={26} />}
        </motion.div>
      </motion.button>

      <div className="fixed inset-0 transition-opacity duration-1000 bg-[radial-gradient(circle_at_top,rgba(126, 196, 255,0.14),transparent_35%),radial-gradient(circle_at_bottom,rgba(255,138,92,0.10),transparent_30%)]" />
      <div className="fixed inset-0 opacity-100 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="pointer-events-none fixed inset-0 z-0">
        {[...Array(38)].map((_, i) => (
          <motion.span key={i} className="absolute h-1 w-1 rounded-full bg-[var(--gold)]/60" style={{ left: `${(i * 37) % 100}%`, top: `${(i * 19) % 100}%` }} animate={{ y: [0, -18, 0], opacity: [0.15, 0.9, 0.15] }} transition={{ duration: 2 + (i % 5), repeat: Infinity }} />
        ))}
      </div>

      <motion.div className="pointer-events-none fixed z-50 h-72 w-72 rounded-full bg-[var(--gold)]/10 blur-3xl" animate={{ x: mouse.x - 144, y: mouse.y - 144 }} transition={{ type: "spring", stiffness: 60, damping: 20 }} />

      <DiscordCard />

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-28">
        <p className="text-sm uppercase tracking-[0.4em] text-[var(--gold)]">Projects</p>
        <h2 className="mt-3 font-display text-4xl font-bold">Featured Work</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {projects.map((project, index) => (
            <motion.a key={index} href={project.link} target="_blank" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="group rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-7 backdrop-blur-xl transition hover:-translate-y-2 hover:border-[var(--card-border-strong)] hover:bg-[var(--card-bg-hover)]">
              <div className="mb-5 flex items-center justify-between">
                <div className="text-lg font-bold">{project.title}</div>
                <div className="text-[var(--gold)]">→</div>
              </div>
              <p className="text-sm leading-7 opacity-70">{project.desc}</p>
              <p className="mt-6 text-xs uppercase tracking-[0.3em] opacity-50">{project.tech}</p>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-28">
        <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-8 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--gold)]">Activity</p>
          <h2 className="mt-2 font-display text-3xl font-bold">GitHub Contributions</h2>
          <div className="mt-8 overflow-x-auto">
            <GitHubCalendar username="SLOW429" colorScheme={light ? "light" : "dark"} theme={calendarTheme} fontSize={14} blockSize={14} blockMargin={5} />
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-28">
        <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--panel-bg-strong)] p-6 font-mono text-sm text-[var(--gold-light)] shadow-[0_0_80px_rgba(126, 196, 255,0.1)] backdrop-blur-xl">
          <p className="text-[var(--muted)]">$ whoami</p>
          <p className="mt-2">SLOW429 — Developer, Creator, Voiceover Artist</p>
          <p className="mt-4 text-[var(--muted)]">$ status</p>
          <p className="mt-2">Building cinematic AI, automation, and digital systems...</p>
          <p className="mt-4 text-[var(--muted)]">$ whereami</p>
          <p className="mt-2">Q-SMART TECHNOLOGY — Qatar</p>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-28">
        <p className="text-sm uppercase tracking-[0.4em] text-[var(--gold)]">Socials</p>
        <h2 className="mt-3 font-display text-4xl font-bold">Connect</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {socials.map((social, index) => (
            <a key={index} href={social.href} target="_blank" className="flex items-center gap-5 rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-7 backdrop-blur-xl transition hover:border-[var(--card-border-strong)] hover:bg-[var(--card-bg-hover)]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg)] text-[var(--gold)]">
                <social.icon size={22} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] opacity-50">{social.title}</p>
                <h3 className="mt-1 text-2xl font-bold">{social.value}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.5em] text-[var(--gold)]">SLOW</p>
        <h1 className="font-display text-6xl font-black leading-none tracking-tight md:text-8xl">
          Abdellatif
          <span className="block bg-gradient-to-r from-[var(--gold-light)] via-[var(--gold)] to-[var(--ember)] bg-clip-text text-transparent">Shaheen</span>
        </h1>
        <p className="mx-auto mt-8 max-w-3xl text-lg opacity-70 md:text-2xl">Developer • Creator • Voiceover Artist</p>
      </section>

      <audio
        id="bg-music"
        src="/clima-lindo.mp3"
        loop
      />

      <motion.button
        onClick={() => {
          const audio = document.getElementById("bg-music") as HTMLAudioElement;
          if (!audio) return;

          if (musicOn) {
            audio.pause();
            setMusicOn(false);
          } else {
            audio.volume = 0.25;
            audio.play();
            setMusicOn(true);
          }
        }}
        className="fixed bottom-6 left-6 z-[999] rounded-full border border-[var(--card-border-strong)] bg-[var(--card-bg)] px-5 py-4 text-sm font-bold text-[var(--gold)] shadow-[0_0_50px_rgba(126, 196, 255,0.2)] backdrop-blur-xl"
      >
        {musicOn ? "Music ON" : "Music OFF"}
      </motion.button>

      <motion.button onClick={() => setAiOpen(true)} className="fixed bottom-6 right-6 z-[999] rounded-full bg-gradient-to-r from-[var(--gold-light)] to-[var(--gold)] p-5 text-[#071018] shadow-[0_0_60px_rgba(126, 196, 255,0.4)]">
        <Bot />
      </motion.button>

      <AiAssistant open={aiOpen} onClose={() => setAiOpen(false)} />
    </main>
  );
}
