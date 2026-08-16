import type { Metadata } from "next";
import { ArrowUpRight, Music2 } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { SiGithub, SiInstagram, SiYoutube } from "react-icons/si";

export const metadata: Metadata = {
  title: "Links",
  description: "Official SLOW developer, creator, community, and social links.",
  alternates: { canonical: "/links" },
};

const links = [
  [SiGithub, "GitHub", "@SLOW429", "https://github.com/SLOW429"],
  [SiYoutube, "YouTube", "@SLOW429", "https://www.youtube.com/@SLOW429"],
  [SiInstagram, "Instagram", "@m6.ydj", "https://www.instagram.com/m6.ydj/"],
  [FaLinkedin, "LinkedIn", "Abdellatif Gahen", "https://www.linkedin.com/in/abdellatif-gahen-1ba3b7389"],
  [Music2, "Spotify", "SLOW profile", "https://open.spotify.com/user/31pmd7jyoxhubdtasmvo3heuqpje?si=6e9e2fbbb98b4af7"],
] as const;

export default function LinksPage() {
  return (
    <main className="min-h-screen px-5 py-16 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">SLOW / LINKS</p>
        <h1 className="mt-4 font-display text-5xl font-bold md:text-7xl">Every official link. One place.</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">Use this page for profiles, creator bios, and community links. No link shortener or tracking layer in the middle.</p>
        <div className="mx-auto mt-10 max-w-2xl space-y-3 text-start">
          {links.map(([Icon, title, handle, href]) => (
            <a key={title} href={href} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-4 transition hover:-translate-y-0.5 hover:border-[var(--gold)]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--card-border)] bg-[var(--panel-bg)] text-[var(--gold)]"><Icon size={19} /></span>
              <span className="min-w-0 flex-1"><span className="block font-semibold">{title}</span><span className="mt-0.5 block truncate text-sm text-[var(--muted)]">{handle}</span></span>
              <ArrowUpRight size={17} className="text-[var(--muted)] transition group-hover:-translate-y-0.5 group-hover:text-[var(--gold)]" />
            </a>
          ))}
        </div>
        <div className="mt-8 rounded-3xl border border-[var(--card-border-strong)] bg-[var(--card-bg)] p-7">
          <p className="text-sm leading-7 text-[var(--muted)]">Community and live channels are available from the Creator Hub.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a href="https://kick.com/3azf-valo" target="_blank" rel="noreferrer" className="rounded-xl bg-[var(--gold)] px-5 py-3 font-semibold text-[#071018]">Kick</a>
            <a href="https://discord.gg/MvVxreJXMq" target="_blank" rel="noreferrer" className="rounded-xl border border-[var(--card-border-strong)] px-5 py-3 font-semibold">Discord</a>
          </div>
        </div>
      </div>
    </main>
  );
}
