"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { siteConfig } from "@/lib/site-config";
import { useLocale } from "@/components/layout/locale-provider";

const kickSlug = new URL(siteConfig.social.kick).pathname.slice(1);
const embedUrl = new URL(`https://player.kick.com/${encodeURIComponent(kickSlug)}`);
embedUrl.searchParams.set("autoplay", "false");
embedUrl.searchParams.set("muted", "false");
for (const parent of ["slows.dev", "www.slows.dev", "localhost", "127.0.0.1"]) {
  embedUrl.searchParams.append("parent", parent);
}

function subscribeToConnection(onChange: () => void) {
  window.addEventListener("online", onChange);
  window.addEventListener("offline", onChange);
  return () => {
    window.removeEventListener("online", onChange);
    window.removeEventListener("offline", onChange);
  };
}

function getConnectionStatus() {
  return window.navigator.onLine;
}

export function KickStreamPlayer() {
  const { t } = useLocale();
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const online = useSyncExternalStore(subscribeToConnection, getConnectionStatus, () => true);

  useEffect(() => {
    const reconnectPlayer = () => {
      setFailed(false);
      setLoading(true);
      setAttempt((value) => value + 1);
    };

    window.addEventListener("online", reconnectPlayer);
    return () => {
      window.removeEventListener("online", reconnectPlayer);
    };
  }, []);

  useEffect(() => {
    if (!online || !loading) return;
    const timeout = window.setTimeout(() => setFailed(true), 25_000);
    return () => window.clearTimeout(timeout);
  }, [attempt, loading, online]);

  return (
    <div className="relative mt-7 overflow-hidden rounded-2xl border border-[var(--card-border)] bg-black">
      <div className="aspect-video w-full">
        <iframe
          key={attempt}
          src={embedUrl.toString()}
          title={t("creator.streamTitle")}
          allow="autoplay; picture-in-picture"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setFailed(true);
          }}
          className="h-full w-full border-0"
        />
      </div>
      {online && loading && !failed && (
        <p role="status" className="absolute start-3 top-3 rounded-lg bg-black/70 px-3 py-2 text-xs text-white/75">
          {t("creator.streamLoading")}
        </p>
      )}
      {(!online || failed) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/85 p-5 text-center">
          <p className="max-w-md text-sm leading-6 text-white/75">
            {!online ? t("creator.streamOffline") : t("creator.streamError")}
          </p>
          <button
            type="button"
            disabled={!online}
            onClick={() => {
              setFailed(false);
              setLoading(true);
              setAttempt((value) => value + 1);
            }}
            className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#071018] transition hover:bg-white/85 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t("creator.retry")}
          </button>
        </div>
      )}
      <a
        href={siteConfig.social.kick}
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-3 end-3 rounded-lg bg-black/70 px-3 py-2 text-xs font-semibold text-white/80 transition hover:bg-black"
      >
        {t("creator.watchKick")}
      </a>
    </div>
  );
}
