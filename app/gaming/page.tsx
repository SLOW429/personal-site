import type { Metadata } from "next";
import Link from "next/link";
import { Gamepad2, Headphones, Radio, Users, type LucideIcon } from "lucide-react";
import { LocalizedText } from "@/components/layout/localized-text";
import { KickStreamPlayer } from "@/components/creator/kick-stream-player";
import { siteConfig } from "@/lib/site-config";
import type { TranslationKey } from "@/lib/localization";

export const metadata: Metadata = {
  title: "Gaming",
  description: "Gaming, live streams, highlights, community sessions, and creator utilities from SLOW.",
  alternates: { canonical: "/gaming" },
};

const cards: Array<{ icon: LucideIcon; title: TranslationKey; text: TranslationKey }> = [
  { icon: Radio, title: "gaming.live", text: "gaming.liveDescription" },
  { icon: Gamepad2, title: "gaming.games", text: "gaming.gamesDescription" },
  { icon: Users, title: "gaming.community", text: "gaming.communityDescription" },
  { icon: Headphones, title: "gaming.highlights", text: "gaming.highlightsDescription" },
];

export default function GamingPage() {
  return (
    <main className="min-h-screen px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]"><LocalizedText message="gaming.eyebrow" /></p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl"><LocalizedText message="gaming.title" /></h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]"><LocalizedText message="gaming.description" /></p>
        </header>

        <section className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-6 backdrop-blur-xl">
              <Icon size={23} className="text-[var(--gold)]" />
              <h2 className="mt-5 text-xl font-bold"><LocalizedText message={title} /></h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]"><LocalizedText message={text} /></p>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-[2rem] border border-[var(--card-border-strong)] bg-[var(--card-bg)] p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]"><LocalizedText message="gaming.watch" /></p>
          <h2 className="mt-3 font-display text-3xl font-bold"><LocalizedText message="gaming.watchTitle" /></h2>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={siteConfig.social.kick} target="_blank" rel="noreferrer" className="rounded-xl bg-[var(--gold)] px-5 py-3 font-semibold text-[#071018]"><LocalizedText message="gaming.openKick" /></a>
            <a href="https://www.youtube.com/@SLOW429" target="_blank" rel="noreferrer" className="rounded-xl border border-[var(--card-border-strong)] px-5 py-3 font-semibold"><LocalizedText message="gaming.openYouTube" /></a>
            <a href="https://discord.gg/MvVxreJXMq" target="_blank" rel="noreferrer" className="rounded-xl border border-[var(--card-border-strong)] px-5 py-3 font-semibold"><LocalizedText message="gaming.joinDiscord" /></a>
          </div>
          <KickStreamPlayer />
        </section>

        <div className="mt-8"><Link href="/creator" className="text-sm font-semibold text-[var(--gold-light)]"><LocalizedText message="gaming.openCreatorHub" /></Link></div>
      </div>
    </main>
  );
}
