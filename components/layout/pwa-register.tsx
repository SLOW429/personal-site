"use client";

import { Download } from "lucide-react";
import { useEffect, useState } from "react";

type InstallPromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: "accepted" | "dismissed" }> };

export default function PwaRegister() {
  const [installEvent, setInstallEvent] = useState<InstallPromptEvent | null>(null);
  const [showIosHint, setShowIosHint] = useState(false);
  const [locale, setLocale] = useState<"en" | "ar">("en");

  useEffect(() => {
    const syncLocale = () => setLocale(document.documentElement.lang === "ar" ? "ar" : "en");
    syncLocale();
    const observer = new MutationObserver(syncLocale);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => undefined);

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as InstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);

    const isIos = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || ("standalone" in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
    if (isIos && !isStandalone) setShowIosHint(true);

    return () => {
      observer.disconnect();
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
    };
  }, []);

  async function install() {
    if (!installEvent) return;
    await installEvent.prompt();
    await installEvent.userChoice;
    setInstallEvent(null);
  }

  if (!installEvent && !showIosHint) return null;
  const ar = locale === "ar";

  return (
    <div dir={ar ? "rtl" : "ltr"} className="fixed bottom-20 start-4 z-[1200] max-w-[calc(100vw-2rem)] sm:bottom-5 sm:start-5">
      {installEvent && (
        <button type="button" onClick={install} className="inline-flex items-center gap-2 rounded-2xl border border-[var(--card-border-strong)] bg-[var(--panel-bg-heavy)] px-4 py-3 text-sm font-semibold shadow-2xl backdrop-blur-xl hover:border-[var(--gold)]">
          <Download size={17} />
          {ar ? "تثبيت SLOW.DEV" : "Install SLOW.DEV"}
        </button>
      )}
      {showIosHint && !installEvent && (
        <div className="max-w-xs rounded-2xl border border-[var(--card-border-strong)] bg-[var(--panel-bg-heavy)] p-4 text-sm leading-6 shadow-2xl backdrop-blur-xl">
          <strong>{ar ? "أضف SLOW.DEV إلى الشاشة الرئيسية" : "Add SLOW.DEV to your Home Screen"}</strong>
          <p className="mt-1 text-[var(--muted)]">{ar ? "من Safari اضغط مشاركة، ثم «إضافة إلى الشاشة الرئيسية»." : "In Safari, tap Share, then “Add to Home Screen”."}</p>
          <button type="button" onClick={() => setShowIosHint(false)} className="mt-3 text-xs font-semibold text-[var(--gold-light)]">{ar ? "إخفاء" : "Dismiss"}</button>
        </div>
      )}
    </div>
  );
}
