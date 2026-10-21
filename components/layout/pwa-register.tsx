"use client";

import { Download } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";

type InstallPromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: "accepted" | "dismissed" }> };

function subscribeToNothing() {
  return () => {};
}

function shouldShowIosInstallHint() {
  const isIos = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || ("standalone" in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
  return isIos && !isStandalone;
}

export default function PwaRegister() {
  const [installEvent, setInstallEvent] = useState<InstallPromptEvent | null>(null);
  const [iosHintDismissed, setIosHintDismissed] = useState(false);
  const [installError, setInstallError] = useState("");
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const showIosHint = useSyncExternalStore(subscribeToNothing, shouldShowIosInstallHint, () => false);

  useEffect(() => {
    const syncLocale = () => setLocale(document.documentElement.lang === "ar" ? "ar" : "en");
    const observer = new MutationObserver(syncLocale);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((error: unknown) => {
        console.error("Service worker registration failed:", error);
      });
    }

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as InstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);

    return () => {
      observer.disconnect();
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
    };
  }, []);

  async function install() {
    if (!installEvent) return;
    setInstallError("");
    try {
      await installEvent.prompt();
      await installEvent.userChoice;
      setInstallEvent(null);
    } catch {
      setInstallError(ar ? "تعذر تثبيت التطبيق. حاول مرة أخرى." : "The app could not be installed. Please try again.");
    }
  }

  if (!installEvent && (!showIosHint || iosHintDismissed)) return null;
  const ar = locale === "ar";

  return (
    <div dir={ar ? "rtl" : "ltr"} className="fixed bottom-20 start-4 z-[1200] max-w-[calc(100vw-2rem)] sm:bottom-5 sm:start-5">
      {installEvent && (
        <div>
          <button type="button" onClick={install} className="inline-flex items-center gap-2 rounded-2xl border border-[var(--card-border-strong)] bg-[var(--panel-bg-heavy)] px-4 py-3 text-sm font-semibold shadow-2xl backdrop-blur-xl hover:border-[var(--gold)]">
            <Download size={17} />
            {ar ? "تثبيت SLOW.DEV" : "Install SLOW.DEV"}
          </button>
          {installError && <p role="alert" className="mt-2 max-w-xs text-xs text-red-300">{installError}</p>}
        </div>
      )}
      {showIosHint && !iosHintDismissed && !installEvent && (
        <div className="max-w-xs rounded-2xl border border-[var(--card-border-strong)] bg-[var(--panel-bg-heavy)] p-4 text-sm leading-6 shadow-2xl backdrop-blur-xl">
          <strong>{ar ? "أضف SLOW.DEV إلى الشاشة الرئيسية" : "Add SLOW.DEV to your Home Screen"}</strong>
          <p className="mt-1 text-[var(--muted)]">{ar ? "من Safari اضغط مشاركة، ثم «إضافة إلى الشاشة الرئيسية»." : "In Safari, tap Share, then “Add to Home Screen”."}</p>
          <button type="button" onClick={() => setIosHintDismissed(true)} className="mt-3 text-xs font-semibold text-[var(--gold-light)]">{ar ? "إخفاء" : "Dismiss"}</button>
        </div>
      )}
    </div>
  );
}
