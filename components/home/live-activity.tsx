"use client";

import dynamic from "next/dynamic";
import { Radio, Users, Wifi } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useEffect, useState } from "react";

const GitHubCalendar = dynamic(() => import("react-github-calendar").then((mod) => mod.GitHubCalendar), { ssr: false });
const DISCORD_ID = "680035752461205524";

type DiscordData = { discord_status: "online" | "idle" | "dnd" | "offline"; activities?: Array<{ type: number; name: string; details?: string; state?: string }> };
type GitHubUser = { public_repos: number; followers: number; following: number };

function StatusDot({ status }: { status: DiscordData["discord_status"] }) {
  const color = status === "online" ? "bg-emerald-400" : status === "idle" ? "bg-amber-300" : status === "dnd" ? "bg-red-400" : "bg-white/30";
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${color}`} />;
}

export function LiveActivity() {
  const [discord, setDiscord] = useState<DiscordData | null>(null);
  const [github, setGithub] = useState<GitHubUser | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const [discordResponse, githubResponse] = await Promise.all([
          fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`, { cache: "no-store" }),
          fetch("https://api.github.com/users/SLOW429", { cache: "no-store" }),
        ]);
        const [discordJson, githubJson] = await Promise.all([discordResponse.json(), githubResponse.json()]);
        if (!active) return;
        setDiscord(discordJson?.success ? discordJson.data : null);
        setGithub(githubJson?.public_repos !== undefined ? githubJson : null);
      } catch {
        if (active) setError(true);
      }
    };
    load();
    const interval = window.setInterval(load, 60_000);
    return () => { active = false; window.clearInterval(interval); };
  }, []);

  const activity = discord?.activities?.find((item) => item.type === 0);
  const status = discord?.discord_status ?? "offline";

  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6"><div><p className="text-xs uppercase tracking-[0.35em] text-[#7ec4ff]">Live signals</p><h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-5xl">What’s happening behind the site.</h2></div><span className="hidden items-center gap-2 text-xs text-white/35 sm:flex"><Wifi size={13} /> refreshed every minute</span></div>
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4"><div className="flex items-center gap-3"><span className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-[#7ec4ff]"><SiGithub size={18} /></span><div><p className="text-xs uppercase tracking-[0.25em] text-white/35">GitHub</p><h3 className="mt-1 font-semibold text-white">Contribution activity</h3></div></div><a href="https://github.com/SLOW429" target="_blank" rel="noreferrer" className="text-xs text-white/35 hover:text-white">@SLOW429</a></div>
            <div className="mt-8 overflow-x-auto pb-2"><GitHubCalendar username="SLOW429" colorScheme="dark" labels={{ totalCount: "{{count}} contributions in the last year" }} /></div>
            {github && <div className="mt-7 grid grid-cols-3 gap-3"><div className="rounded-2xl border border-white/10 bg-black/15 p-4"><p className="text-xs text-white/35">Repos</p><p className="mt-1 text-2xl font-bold text-white">{github.public_repos}</p></div><div className="rounded-2xl border border-white/10 bg-black/15 p-4"><p className="text-xs text-white/35">Followers</p><p className="mt-1 text-2xl font-bold text-white">{github.followers}</p></div><div className="rounded-2xl border border-white/10 bg-black/15 p-4"><p className="text-xs text-white/35">Following</p><p className="mt-1 text-2xl font-bold text-white">{github.following}</p></div></div>}
          </div>
          <div className="grid gap-5">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <div className="flex items-center gap-3"><span className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-[#a78bfa]"><Users size={18} /></span><div><p className="text-xs uppercase tracking-[0.25em] text-white/35">Discord</p><h3 className="mt-1 font-semibold text-white">Live presence</h3></div></div>
              <div className="mt-7 flex items-center gap-3"><StatusDot status={status} /><span className="capitalize text-white/75">{status}</span></div>
              <p className="mt-4 text-xl font-semibold text-white">{activity?.name ?? "Quiet mode."}</p>
              <p className="mt-2 text-sm leading-6 text-white/45">{activity?.details ?? activity?.state ?? "No current activity is being shared."}</p>
              <a href="https://discord.gg/MvVxreJXMq" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-white/75 hover:border-white/20 hover:text-white"><Radio size={15} /> Join the community</a>
            </div>
            <div className="rounded-[2rem] border border-[#7ec4ff]/10 bg-[linear-gradient(135deg,rgba(126,196,255,.08),rgba(167,139,250,.05))] p-6 sm:p-8"><p className="text-xs uppercase tracking-[0.25em] text-[#7ec4ff]">System note</p><p className="mt-3 text-sm leading-7 text-white/55">Live integrations are progressive enhancements. When an external service is unavailable, the site keeps rendering cleanly instead of blocking the page.</p>{error && <p className="mt-3 text-xs text-amber-200/70">Some live services are temporarily unavailable.</p>}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
