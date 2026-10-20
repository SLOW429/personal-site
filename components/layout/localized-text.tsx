"use client";

import { useLocale } from "./locale-provider";
import type { TranslationKey } from "@/lib/localization";

export function LocalizedText({ message }: { message: TranslationKey }) {
  const { t } = useLocale();
  return t(message);
}

export function LocalizedDate({ value }: { value: string }) {
  const { locale } = useLocale();
  const dateLocale = locale === "ar" ? "ar" : locale === "tr" ? "tr-TR" : "en-US";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat(dateLocale, { dateStyle: "medium" }).format(date);
}

export function LocalizedNumber({ value }: { value: number }) {
  const { locale } = useLocale();
  const numberLocale = locale === "ar" ? "ar" : locale === "tr" ? "tr-TR" : "en-US";
  return new Intl.NumberFormat(numberLocale).format(value);
}
