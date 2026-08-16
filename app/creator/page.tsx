import type { Metadata } from "next";
import Link from "next/link";
import { getLatestYouTubeVideos } from "@/lib/youtube";
import { getKickLiveStatus } from "@/lib/kick";

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
    href: "https://www.youtube.com/@SLOW429",
    label: "Open YouTube",
  },
  {
    title: "Kick",
    description: "Live gaming and creator streams.",
    href: "https://kick.com/3azf-valo",
    label: "Open Kick",
  },
  {
    title: "Discord",
    description: "The community hub for updates, projects, gaming, and future events.",
    href: "https://discord.gg/MvVxreJXMq",
    label: "Join Discord",
  },
];

const roadmap = [
  "Live status and creator activity",
  "Latest videos and streams",
  "Clips and highlights",
  "Creator announcements and schedules",
];

export default async function CreatorPage() {
  const [latestVideos, kick] = await Promise.all([
    getLatestYouTubeVideos(6),
    getKickLiveStatus(),
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "SLOW Creator Hub",
    url: "https://slows.dev/creator",
    mainEntity: {
      "@type": "Person",
      name: "SLOW",
      url: "https://slows.dev",
      sameAs: [
        "https://www.youtube.com/@SLOW429",
        "https://kick.com/3azf-valo",
        "https://discord.gg/MvVxreJXMq",
        "https://github.com/SLOW429",
      ],
    },
  };

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
            <a key={channel.title} href={channel.href} target="_blank" rel="noreferrer" className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-7 backdrop-blur-xl transition hover:-translate-y-1 hover:border-[var(--card-border-strong)]">
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--gold)]">Channel</p>
              <h2 className="mt-4 text-2xl font-bold">{channel.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{channel.description}</p>
              <span className="mt-6 inline-flex rounded-xl bg-[var(--gold)] px-4 py-2 text-sm font-semibold text-[#071018]">{channel.label}</span>
            </a>
          ))}
        </section>

        <section className="mt-10 rounded-[2rem] border border-[var(--card-border-strong)] bg-[var(--card-bg)] p-8 backdrop-blur-xl md:p-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Kick</p>
              <h2 className="mt-3 text-3xl font-bold">{kick.isLive ? "🔴 Live now" : "⚫ Offline"}</h2>
              <p className="mt-3 max-w-2xl leading-7 text-[var(--muted)]">
                {kick.isLive
                  ? `${kick.title ?? "Live stream"}${kick.category ? ` • ${kick.category}` : ""}${typeof kick.viewerCount === "number" ? ` • ${kick.viewerCount.toLocaleString()} viewers` : ""}`
                  : "Live status will appear here whenever a stream is active."}
              </p>
            </div>
            <a href={kick.url} target="_blank" rel="noreferrer" className="inline-flex w-fit rounded-xl bg-[var(--gold)] px-5 py-3 font-semibold text-[#071018] transition hover:-translate-y-0.5">Watch on Kick</a>
          </div>
        </section>

        <section className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">YouTube</p>
              <h2 className="mt-3 font-display text-3xl font-bold">Latest videos</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">Recent public videos from the SLOW channel.</p>
            </div>
            <a href="https://www.youtube.com/@SLOW429" target="_blank" rel="noreferrer" className="rounded-xl border border-[var(--card-border-strong)] px-5 py-3 text-sm font-semibold transition hover:border-[var(--gold)]">Open channel</a>
          </div>

          {latestVideos.length > 0 ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latestVideos.map((video) => (
                <a key={video.id} href={video.url} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] transition hover:-translate-y-1 hover:border-[var(--card-border-strong)]">
                  <img src={video.thumbnail} alt={video.title} loading="lazy" className="aspect-video w-full object-cover" />
                  <div className="p-5">
                    <h3 className="line-clamp-2 font-semibold leading-6 text-[var(--foreground)]">{video.title}</h3>
                    <p className="mt-3 text-xs text-[var(--muted)]">{new Date(video.publishedAt).toLocaleDateString()}</p>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-3xl border border-dashed border-[var(--card-border-strong)] bg-[var(--card-bg-soft)] p-7 text-sm leading-7 text-[var(--muted)]">No recent public videos are available right now.</div>
          )}
        </section>

        <section className="mt-10">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Creator roadmap</p>
              <h2 className="mt-3 font-display text-3xl font-bold">What gets connected next</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {roadmap.map((item) => <div key={item} className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-5 text-sm text-[var(--muted)]">{item}</div>)}
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </main>
  );
}
