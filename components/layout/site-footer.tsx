import Link from "next/link";
import { ArrowUpRight, Github, Mic2 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const links = [
  ["About", "/about"],
  ["Projects", "/projects"],
  ["Services", "/services"],
  ["Tools", "/tools"],
  ["Blog", "/blog"],
  ["Creator", "/creator"],
  ["Contact", "/contact"],
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#050912] px-5 py-14 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_.7fr_.7fr]">
          <div>
            <Link href="/" className="font-display text-3xl font-black tracking-tight">SLOW<span className="text-[#7ec4ff]">.</span></Link>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">Developer, creator, and voiceover artist building software, tools, automation, community systems, and digital experiences.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={siteConfig.social.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3.5 py-2.5 text-sm text-white/60 hover:border-white/20 hover:text-white"><Github size={15} /> GitHub</a>
              <Link href="/creator" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3.5 py-2.5 text-sm text-white/60 hover:border-white/20 hover:text-white"><Mic2 size={15} /> Creator Hub</Link>
            </div>
          </div>
          <div><p className="text-xs uppercase tracking-[0.3em] text-white/25">Navigate</p><nav className="mt-4 grid gap-3 text-sm">{links.map(([label, href]) => <Link key={href} href={href} className="w-fit text-white/50 transition hover:text-white">{label}</Link>)}</nav></div>
          <div><p className="text-xs uppercase tracking-[0.3em] text-white/25">Elsewhere</p><nav className="mt-4 grid gap-3 text-sm"><a href={siteConfig.social.youtube} target="_blank" rel="noreferrer" className="w-fit text-white/50 hover:text-white">YouTube</a><a href={siteConfig.social.kick} target="_blank" rel="noreferrer" className="w-fit text-white/50 hover:text-white">Kick</a><a href={siteConfig.social.discord} target="_blank" rel="noreferrer" className="w-fit text-white/50 hover:text-white">Discord</a></nav></div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-5 text-xs text-white/25 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} SLOW429. Built with intent.</span><Link href="/contact" className="inline-flex items-center gap-1.5 hover:text-white/60">Start a project <ArrowUpRight size={13} /></Link></div>
      </div>
    </footer>
  );
}
