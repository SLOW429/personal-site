"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { isLocale, translate, type Locale, type TranslationKey } from "@/lib/localization";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);
const STORAGE_KEY = "slow-locale";
const LOCALE_EVENT = "slow-locale-change";
let currentLocale: Locale = "en";
let storageWarningShown = false;

function readLocale(): Locale {
  try {
    const storedLocale = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(storedLocale)) currentLocale = storedLocale;
  } catch (error) {
    if (!storageWarningShown) {
      console.warn("Could not read the saved language preference.", error);
      storageWarningShown = true;
    }
  }
  return currentLocale;
}

function subscribeToLocaleChanges(onChange: () => void) {
  window.addEventListener(LOCALE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(LOCALE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function saveLocale(locale: Locale) {
  currentLocale = locale;
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch (error) {
    if (!storageWarningShown) {
      console.warn("Could not save the language preference for future visits.", error);
      storageWarningShown = true;
    }
  }
  window.dispatchEvent(new Event(LOCALE_EVENT));
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribeToLocaleChanges, readLocale, (): Locale => "en");

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale: saveLocale,
      t: (key) => translate(locale, key),
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within LocaleProvider");
  return context;
}
