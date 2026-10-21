"use client";

import dynamic from "next/dynamic";
import { Radio, Users, Wifi } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useEffect, useState } from "react";
import { useLocale } from "@/components/layout/locale-provider";
import type { TranslationKey } from "@/lib/localization";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((module) => module.GitHubCalendar),
  {
    ssr: false,
    loading: () => <div aria-hidden="true" className="min-h-28" />,
  },
);

const DISCORD_ID = "680035752461205524";
const POLL_INTERVAL_MS = 60_000;

type DiscordStatus = "online" | "idle" | "dnd" | "offline";
type DiscordActivity = {
  type: number;
  name: string;
  details?: string;
  state?: string;
};
type DiscordData = {
  discord_status: DiscordStatus;
  activities: DiscordActivity[];
};
type GitHubUser = {
  public_repos: number;
  followers: number;
  following: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isDiscordStatus(value: unknown): value is DiscordStatus {
  return value === "online" || value === "idle" || value === "dnd" || value === "offline";
}

function parseDiscordActivity(value: unknown): DiscordActivity | null {
  if (!isRecord(value) || typeof value.type !== "number" || typeof value.name !== "string") {
    return null;
  }

  return {
    type: value.type,
    name: value.name,
    ...(typeof value.details === "string" && { details: value.details }),
    ...(typeof value.state === "string" && { state: value.state }),
  };
}

function parseDiscordData(value: unknown): DiscordData | null {
  if (!isRecord(value) || value.success !== true || !isRecord(value.data)) return null;
  const data = value.data;
  if (!isDiscordStatus(data.discord_status)) return null;

  const activities = Array.isArray(data.activities)
    ? data.activities.flatMap((activity) => {
        const parsed = parseDiscordActivity(activity);
        return parsed ? [parsed] : [];
      })
    : [];

  return { discord_status: data.discord_status, activities };
}

function parseGitHubUser(value: unknown): GitHubUser | null {
  if (!isRecord(value)) return null;
  const { public_repos, followers, following } = value;
  if (
    typeof public_repos !== "number" ||
    !Number.isFinite(public_repos) ||
    typeof followers !== "number" ||
    !Number.isFinite(followers) ||
    typeof following !== "number" ||
    !Number.isFinite(following)
  ) {
    return null;
  }

  return { public_repos, followers, following };
}

async function fetchJson(url: string, signal: AbortSignal): Promise<unknown> {
  const response = await fetch(url, { cache: "no-store", signal });
  if (!response.ok) throw new Error(`Live activity request failed (${response.status}).`);
  return response.json();
}

function StatusDot({ status }: { status: DiscordStatus }) {
  const color =
    status === "online"
      ? "bg-emerald-400"
      : status === "idle"
        ? "bg-amber-300"
        : status === "dnd"
          ? "bg-red-400"
          : "bg-white/30";

  return <span aria-hidden="true" className={`inline-block h-2.5 w-2.5 rounded-full ${color}`} />;
}

function Stat({ label, value }: { label: TranslationKey; value: number }) {
  const { t } = useLocale();
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-black/15 p-4">
      <p className="text-xs text-white/35">{t(label)}</p>
      <p className="mt-1 break-words text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

export function LiveActivity() {
  const { t } = useLocale();
  const [discord, setDiscord] = useState<DiscordData | null>(null);
  const [github, setGithub] = useState<GitHubUser | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    let controller: AbortController | null = null;

    const load = async () => {
      if (document.hidden) return;

      controller?.abort();
      const requestController = new AbortController();
      controller = requestController;

      const [discordResult, githubResult] = await Promise.allSettled([
        fetchJson(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`, requestController.signal),
        fetchJson("https://api.github.com/users/SLOW429", requestController.signal),
      ]);

      if (!active || requestController.signal.aborted || controller !== requestController) return;

      let hasError = false;
      if (discordResult.status === "fulfilled") {
        const data = parseDiscordData(discordResult.value);
        if (data) setDiscord(data);
        else hasError = true;
      } else if (!requestController.signal.aborted) {
        hasError = true;
      }

      if (githubResult.status === "fulfilled") {
        const data = parseGitHubUser(githubResult.value);
        if (data) setGithub(data);
        else hasError = true;
      } else if (!requestController.signal.aborted) {
        hasError = true;
      }

      setError(hasError);
    };

    void load();
    const interval = window.setInterval(() => void load(), POLL_INTERVAL_MS);
    const onVisibilityChange = () => {
      if (document.hidden) controller?.abort();
      else void load();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      active = false;
      controller?.abort();
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const activity = discord?.activities.find((item) => item.type === 0);
  const status = discord?.discord_status ?? "offline";
  const statusKey: Record<DiscordStatus, TranslationKey> = {
    online: "live.status.online",
    idle: "live.status.idle",
    dnd: "live.status.dnd",
    offline: "live.status.offline",
  };

  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#7ec4ff]">{t("live.eyebrow")}</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-5xl">
              {t("live.headline")}
            </h2>
          </div>
          <span className="hidden items-center gap-2 text-xs text-white/35 sm:flex">
            <Wifi size={13} /> {t("live.refreshed")}
          </span>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-[#7ec4ff]">
                  <SiGithub size={18} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/35">GitHub</p>
                  <h3 className="mt-1 font-semibold text-white">{t("live.contributions")}</h3>
                </div>
              </div>
              <a
                href="https://github.com/SLOW429"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-white/35 hover:text-white"
              >
                @SLOW429
              </a>
            </div>

            <div className="mt-8 min-h-28 overflow-x-auto pb-2">
              <GitHubCalendar
                username="SLOW429"
                colorScheme="dark"
                labels={{ totalCount: t("live.contributionCount") }}
              />
            </div>

            {github && (
              <div className="mt-7 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 sm:grid-cols-3">
                <Stat label="live.repos" value={github.public_repos} />
                <Stat label="live.followers" value={github.followers} />
                <Stat label="live.following" value={github.following} />
              </div>
            )}
          </div>

          <div className="grid gap-5">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-[#a78bfa]">
                  <Users size={18} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/35">Discord</p>
                  <h3 className="mt-1 font-semibold text-white">{t("live.presence")}</h3>
                </div>
              </div>
              <div className="mt-7 flex items-center gap-3">
                <StatusDot status={status} />
                <span className="capitalize text-white/75">{t(statusKey[status])}</span>
              </div>
              <p className="mt-4 text-xl font-semibold text-white">{activity?.name ?? t("live.quiet")}</p>
              <p className="mt-2 text-sm leading-6 text-white/45">
                {activity?.details ?? activity?.state ?? t("live.noActivity")}
              </p>
              <a
                href="https://discord.gg/MvVxreJXMq"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-white/75 hover:border-white/20 hover:text-white"
              >
                <Radio size={15} /> {t("live.joinCommunity")}
              </a>
            </div>

            <div className="rounded-[2rem] border border-[#7ec4ff]/10 bg-[linear-gradient(135deg,rgba(126,196,255,.08),rgba(167,139,250,.05))] p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-[#7ec4ff]">{t("live.systemNote")}</p>
              <p className="mt-3 text-sm leading-7 text-white/55">
                {t("live.systemDescription")}
              </p>
              {error && (
                <p role="status" className="mt-3 text-xs text-amber-200/70">
                  {t("live.unavailable")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
