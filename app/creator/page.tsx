import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Creator Hub",
  description: "SLOW's creator hub for gaming, live streams, videos, clips, and community.",
  alternates: { canonical: "/creator" },
  openGraph: {
    title: "Creator Hub | SLOW",
    description: "Gaming, live streams, videos, clips, and community from SLOW.",
    url: "https://slows.dev/creator",
    type: "website",
  },
};

const channels = [
  {
    title: "YouTube",
    description: "Long-form videos, experiments, gaming content, and future development content.",
    href: "https://www.youtube.com/",
    label: "Open YouTube",
  },
  {
    title: "Kick",
    description: "Live gaming and creator streams. Live status will be connected to real platform data later.",
    href: "https://kick.com/",
    label: "Open Kick",
  },
  {
    title: "Discord",
    description: "The community hub for updates, projects, gaming, and future events.",
    href: "https://discord.gg/3pjA9tS8vF",
    label: "Join Discord",
  },
];

const roadmap = [
  "Live status from real platform APIs",
  "Latest videos and streams",
  "Clips and highlights",
  "Creator announcements and schedules",
];

export default function CreatorPage() {
  return (
    <main className="min-h-screen px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <section className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">SLOW / CREATOR</p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">Build it. Play it. Share it.</h1>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
            The creator side of SLOW connects development, gaming, live streams, videos, clips, and community in one place.
          </p>
        </section>

        <section className="mt-12 grid gap-5 md:grid-cols-3">
          {channels.map((channel) => (
            <a
              key={channel.title}
              href={channel.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-7 backdrop-blur-xl transition hover:-translate-y-1 hover:border-[var(--card-border-strong)]"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--gold)]">Channel</p>
              <h2 className="mt-4 text-2xl font-bold">{channel.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{channel.description}</p>
              <span className="mt-6 inline-flex rounded-xl bg-[var(--gold)] px-4 py-2 text-sm font-semibold text-[#071018]">{channel.label}</span>
            </a>
          ))}
        </section>

        <section className="mt-10 rounded-[2rem] border border-[var(--card-border-strong)] bg-[var(--card-bg)] p-8 backdrop-blur-xl md:p-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Live status</p>
              <h2 className="mt-3 text-3xl font-bold">No fake status, no fake numbers.</h2>
              <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
                Until the official creator accounts are connected, SLOW.DEV intentionally avoids claiming that a stream is live or showing made-up viewer counts.
              </p>
            </div>
            <Link href="/links" className="inline-flex w-fit rounded-xl border border-[var(--card-border-strong)] px-5 py-3 font-semibold transition hover:border-[var(--gold)]">
              All links
            </Link>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Creator roadmap</p>
              <h2 className="mt-3 font-display text-3xl font-bold">What gets connected next</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {roadmap.map((item) => (
              <div key={item} className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-5 text-sm text-[var(--muted)]">{item}</div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] border border-[var(--card-border-strong)] bg-[linear-gradient(135deg,var(--card-bg),var(--panel-bg-strong))] p-8 text-center md:p-12">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">Create with the community</p>
          <h2 className="mt-4 font-display text-4xl font-bold">From streams to builds.</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-[var(--muted)]">Gaming, coding, tools, and experiments all live under the same SLOW identity.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/gaming" className="rounded-xl bg-[var(--gold)] px-5 py-3 font-semibold text-[#071018]">Explore Gaming</Link>
            <Link href="/tools" className="rounded-xl border border-[var(--card-border-strong)] px-5 py-3 font-semibold">Explore Tools</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
