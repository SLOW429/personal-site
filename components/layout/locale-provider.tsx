"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { isLocale, translate, type Locale, type TranslationKey } from "@/lib/localization";
import { translateContent } from "@/lib/content-localization";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
  text: (source: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
const STORAGE_KEY = "slow-locale";
let storageWarningShown = false;

function readSavedLocale(): Locale {
  try {
    const storedLocale = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(storedLocale)) return storedLocale;
  } catch (error) {
    if (!storageWarningShown) {
      console.warn("Could not read the saved language preference.", error);
      storageWarningShown = true;
    }
  }
  return "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const timeout = window.setTimeout(() => setLocaleState(readSavedLocale()), 100);

    function syncLocale(event: StorageEvent) {
      if (event.key === STORAGE_KEY || event.key === null) {
        setLocaleState(readSavedLocale());
      }
    }

    window.addEventListener("storage", syncLocale);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("storage", syncLocale);
    };
  }, []);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextLocale);
    } catch (error) {
      if (!storageWarningShown) {
        console.warn("Could not save the language preference for future visits.", error);
        storageWarningShown = true;
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key) => translate(locale, key),
      text: (source) => translateContent(locale, source),
    }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within LocaleProvider");
  return context;
}
