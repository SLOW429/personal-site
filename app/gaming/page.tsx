import type { Metadata } from "next";
import Link from "next/link";
import { Gamepad2, Headphones, Radio, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Gaming",
  description: "Gaming, live streams, highlights, community sessions, and creator utilities from SLOW.",
  alternates: { canonical: "/gaming" },
};

export default function GamingPage() {
  return (
    <main className="min-h-screen px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">SLOW / GAMING</p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">Code, games, and live sessions.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">The gaming side of SLOW is built around real streams, clips, experiments, and a community that can follow what is happening without hunting across platforms.</p>
        </header>

        <section className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            [Radio, "Live", "Watch the live channel on Kick."],
            [Gamepad2, "Games", "FPS, experiments, co-op sessions, and whatever is worth playing."],
            [Users, "Community", "Join Discord for stream announcements and sessions."],
            [Headphones, "Highlights", "Turn strong moments into clips and future videos."],
          ].map(([Icon, title, text]) => (
            <article key={title as string} className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-6 backdrop-blur-xl">
              <Icon size={23} className="text-[var(--gold)]" />
              <h2 className="mt-5 text-xl font-bold">{title as string}</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{text as string}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-[2rem] border border-[var(--card-border-strong)] bg-[var(--card-bg)] p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Watch</p>
          <h2 className="mt-3 font-display text-3xl font-bold">Everything live starts here.</h2>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="https://kick.com/3azf-valo" target="_blank" rel="noreferrer" className="rounded-xl bg-[var(--gold)] px-5 py-3 font-semibold text-[#071018]">Open Kick</a>
            <a href="https://www.youtube.com/@SLOW429" target="_blank" rel="noreferrer" className="rounded-xl border border-[var(--card-border-strong)] px-5 py-3 font-semibold">Open YouTube</a>
            <a href="https://discord.gg/MvVxreJXMq" target="_blank" rel="noreferrer" className="rounded-xl border border-[var(--card-border-strong)] px-5 py-3 font-semibold">Join Discord</a>
          </div>
        </section>

        <div className="mt-8"><Link href="/creator" className="text-sm font-semibold text-[var(--gold-light)]">Open Creator Hub →</Link></div>
      </div>
    </main>
  );
}
