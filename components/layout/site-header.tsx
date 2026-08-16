"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import MobileNav from "./mobile-nav";
import { SiteSearch } from "./site-search";
import { navigation } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#060a13]/70 backdrop-blur-2xl supports-[backdrop-filter]:bg-[#060a13]/55" style={{ top: "env(safe-area-inset-top, 0px)" }}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 font-display text-xl font-black tracking-tight text-white">SLOW<span className="text-[#7ec4ff]">.</span></Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navigation.map(([label, href]) => <Link key={href} href={href} className="rounded-xl px-3 py-2 text-sm text-white/45 transition hover:bg-white/[0.04] hover:text-white">{label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <SiteSearch />
          <Link href="/contact" className="hidden rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/75 transition hover:-translate-y-0.5 hover:border-white/20 hover:text-white md:inline-flex">Start a project</Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
