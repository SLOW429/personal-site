"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Moon, Sun, Bot, X } from "lucide-react";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

const DISCORD_ID = "680035752461205524";

const projects = [
  { title: "HR-BOT", desc: "Advanced Highrise music & automation bot with streaming systems.", tech: "Python • Docker • Coolify", link: "https://github.com/SLOW429/HR-BOT" },
  { title: "discord-bot", desc: "Modern Discord utility & management system.", tech: "JavaScript • Discord.js", link: "https://github.com/SLOW429/discord-bot" },
  { title: "chat-platform", desc: "Experimental real-time communication platform.", tech: "Node.js • WebSockets", link: "https://github.com/SLOW429/chat-platform" },
];

const socials = [
  { title: "GitHub", value: "@SLOW429", href: "https://github.com/SLOW429" },
  { title: "Instagram", value: "@abdellatif_shaheen", href: "https://www.instagram.com/abdellatif_shaheen/" },
  { title: "Spotify", value: "My Spotify", href: "https://open.spotify.com/user/31pmd7jyoxhubdtasmvo3heuqpje?si=6e9e2fbbb98b4af7" },
  { title: "PayPal", value: "Support Me", href: "https://www.paypal.com/paypalme/abdellatifeg" },
  { title: "Discord", value: "Join Server", href: "https://discord.gg/3pjA9tS8vF" },
];

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
    <section className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-24">
      <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-black/50 shadow-[0_0_120px_rgba(0,183,255,0.16)] backdrop-blur-xl">
        <div className="h-28 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300" />
        <div className="p-8">
          <div className="-mt-20 flex items-end gap-5">
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-black bg-zinc-900">
              <img src={data?.discord_user?.avatar ? `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${data.discord_user.avatar}.png?size=256` : "https://github.com/SLOW429.png"} className="h-full w-full object-cover" alt="Discord Avatar" />
              <span className={`absolute bottom-2 right-2 h-5 w-5 rounded-full border-4 border-black ${status === "online" ? "bg-green-500" : status === "idle" ? "bg-yellow-500" : status === "dnd" ? "bg-red-500" : "bg-zinc-500"}`} />
            </div>
            <div>
              <h1 className="text-4xl font-black">SLOW429</h1>
              <p className="text-zinc-400">Discord • {status}</p>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-black/30 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Current Activity</p>
            <p className="mt-4 text-2xl font-bold">{activity ? activity.name : "Not doing anything right now."}</p>
            {activity?.details && <p className="mt-2 text-zinc-400">{activity.details}</p>}
          </div>

          <a href="https://discord.gg/3pjA9tS8vF" target="_blank" className="mt-8 inline-flex rounded-2xl bg-cyan-300 px-7 py-4 font-bold text-black transition hover:scale-105">
            Join Discord
          </a>
        </div>
      </motion.div>
    </section>
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
    <main className={`min-h-screen overflow-hidden transition-colors duration-1000 ${light ? "bg-[#07111f] text-white" : "bg-[#030712] text-white"}`}>
      <AnimatePresence>
        {loading && (
          <motion.div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#030712]" exit={{ opacity: 0 }} transition={{ duration: 0.9 }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,183,255,0.24),transparent_35%)]" />
            <div className="text-center">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="mx-auto mb-8 h-28 w-28 rounded-full border border-cyan-300/20 border-t-cyan-300 shadow-[0_0_100px_rgba(0,183,255,0.35)]" />
              <p className="text-xs uppercase tracking-[0.8em] text-cyan-300">SLOW</p>
              <h1 className="mt-5 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-5xl font-black text-transparent">Initializing</h1>
              <div className="mt-10 h-3 w-[min(520px,90vw)] overflow-hidden rounded-full border border-white/10 bg-white/5">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-200" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 3.2, ease: "easeInOut" }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="pointer-events-none fixed z-[998] h-[180vmax] w-[180vmax] rounded-full bg-cyan-300" initial={false} animate={blast ? { scale: 1, opacity: 0.95 } : { scale: 0, opacity: 0 }} transition={{ duration: 0.9, ease: "easeInOut" }} style={{ left: mouse.x, top: mouse.y, translateX: "-50%", translateY: "-50%" }} />

      <motion.button onClick={toggleTheme} whileTap={{ scale: 0.85 }} className="fixed right-6 top-6 z-[999] flex h-16 w-16 items-center justify-center rounded-full border border-cyan-300/30 bg-black/40 text-cyan-300 shadow-[0_0_50px_rgba(0,183,255,0.35)] backdrop-blur-xl">
        <motion.div key={light ? "sun" : "moon"} initial={{ rotate: -180, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ duration: 0.5 }}>
          {light ? <Sun size={26} /> : <Moon size={26} />}
        </motion.div>
      </motion.button>

      <div className={`fixed inset-0 transition-opacity duration-1000 ${light ? "opacity-40" : "opacity-100"} bg-[radial-gradient(circle_at_top,rgba(0,183,255,0.18),transparent_35%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.16),transparent_30%)]`} />
      <div className="fixed inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="pointer-events-none fixed inset-0 z-0">
        {[...Array(38)].map((_, i) => (
          <motion.span key={i} className="absolute h-1 w-1 rounded-full bg-cyan-300/70" style={{ left: `${(i * 37) % 100}%`, top: `${(i * 19) % 100}%` }} animate={{ y: [0, -18, 0], opacity: [0.2, 1, 0.2] }} transition={{ duration: 2 + (i % 5), repeat: Infinity }} />
        ))}
      </div>

      <motion.div className="pointer-events-none fixed z-50 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" animate={{ x: mouse.x - 144, y: mouse.y - 144 }} transition={{ type: "spring", stiffness: 60, damping: 20 }} />

      <DiscordCard />

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-28">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-400">Projects</p>
        <h2 className="mt-3 text-4xl font-black">Featured Work</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {projects.map((project, index) => (
            <motion.a key={index} href={project.link} target="_blank" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="group rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-400/40 hover:bg-white/10">
              <div className="mb-5 flex items-center justify-between">
                <div className="text-lg font-bold">{project.title}</div>
                <div className="text-cyan-300">→</div>
              </div>
              <p className="text-sm leading-7 opacity-70">{project.desc}</p>
              <p className="mt-6 text-xs uppercase tracking-[0.3em] opacity-50">{project.tech}</p>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-28">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Activity</p>
          <h2 className="mt-2 text-3xl font-bold">GitHub Contributions</h2>
          <div className="mt-8 overflow-x-auto">
            <GitHubCalendar username="SLOW429" colorScheme="dark" fontSize={14} blockSize={14} blockMargin={5} />
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-28">
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6 font-mono text-sm text-cyan-200 shadow-[0_0_80px_rgba(0,183,255,0.12)] backdrop-blur-xl">
          <p className="text-zinc-500">$ whoami</p>
          <p className="mt-2">SLOW429 — Developer, Creator, Voiceover Artist</p>
          <p className="mt-4 text-zinc-500">$ status</p>
          <p className="mt-2">Building cinematic AI, automation, and digital systems...</p>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-28">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-400">Socials</p>
        <h2 className="mt-3 text-4xl font-black">Connect</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {socials.map((social, index) => (
            <a key={index} href={social.href} target="_blank" className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition hover:border-cyan-400/40 hover:bg-white/10">
              <p className="text-sm uppercase tracking-[0.3em] opacity-50">{social.title}</p>
              <h3 className="mt-4 text-2xl font-bold">{social.value}</h3>
            </a>
          ))}
        </div>
      </section>

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.5em] text-cyan-300">SLOW</p>
        <h1 className="text-6xl font-black leading-none tracking-tight md:text-8xl">
          Abdellatif
          <span className="block bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">Shaheen</span>
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
        className="fixed bottom-6 left-6 z-[999] rounded-full border border-cyan-300/30 bg-black/60 px-5 py-4 text-sm font-bold text-cyan-300 shadow-[0_0_50px_rgba(0,183,255,0.25)] backdrop-blur-xl"
      >
        {musicOn ? "Music ON" : "Music OFF"}
      </motion.button>

      <motion.button onClick={() => setAiOpen(true)} className="fixed bottom-6 right-6 z-[999] rounded-full bg-cyan-300 p-5 text-black shadow-[0_0_60px_rgba(0,183,255,0.45)]">
        <Bot />
      </motion.button>

      <AnimatePresence>
        {aiOpen && (
          <motion.div initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.95 }} className="fixed bottom-24 right-6 z-[999] w-[min(380px,90vw)] rounded-3xl border border-white/10 bg-black/80 p-6 text-white backdrop-blur-xl">
            <button onClick={() => setAiOpen(false)} className="absolute right-4 top-4 text-zinc-400"><X /></button>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">AI Assistant</p>
            <h3 className="mt-3 text-2xl font-black">SLOW Interface</h3>
            <p className="mt-4 text-zinc-400">This assistant section is ready to connect later with a real AI backend.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
