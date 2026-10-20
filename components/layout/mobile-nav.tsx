"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navigation } from "@/lib/site-config";
<<<<<<< HEAD
import { useLocale } from "./locale-provider";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const { t } = useLocale();

  return (
    <div className="xl:hidden">
      <button type="button" aria-label={open ? t("nav.close") : t("nav.open")} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="relative z-[60] rounded-xl border border-white/10 bg-white/[0.05] p-2 text-white/75 transition hover:border-white/20 hover:text-white">
=======

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="relative z-[60] rounded-xl border border-white/10 bg-white/[0.05] p-2 text-white/75 transition hover:border-white/20 hover:text-white">
>>>>>>> b9f0c72aee7db334f2a2f0fe520cea678ccfce84
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      {open && (
        <div className="absolute inset-x-0 top-16 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-white/[0.06] bg-[#060a13]/95 px-4 py-4 shadow-2xl backdrop-blur-2xl">
<<<<<<< HEAD
          <nav aria-label={t("nav.mobile")} className="mx-auto grid max-w-7xl gap-1">
            {navigation.map(([key, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium text-white/50 transition hover:bg-white/[0.04] hover:text-white">{t(key)}</Link>)}
            <Link href="/contact" onClick={() => setOpen(false)} className="mt-2 rounded-xl bg-white px-4 py-3 text-center text-sm font-bold text-[#071018]">{t("nav.startProject")}</Link>
=======
          <nav aria-label="Mobile" className="mx-auto grid max-w-7xl gap-1">
            {navigation.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium text-white/50 transition hover:bg-white/[0.04] hover:text-white">{label}</Link>)}
            <Link href="/contact" onClick={() => setOpen(false)} className="mt-2 rounded-xl bg-white px-4 py-3 text-center text-sm font-bold text-[#071018]">Start a project</Link>
>>>>>>> b9f0c72aee7db334f2a2f0fe520cea678ccfce84
          </nav>
        </div>
      )}
    </div>
  );
}
