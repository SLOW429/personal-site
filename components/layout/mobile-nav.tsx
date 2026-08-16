"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navigation } from "@/lib/site-config";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="relative z-[60] rounded-xl border border-white/10 bg-white/[0.05] p-2 text-white/75 transition hover:border-white/20 hover:text-white">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      {open && (
        <div className="absolute inset-x-0 top-16 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-white/[0.06] bg-[#060a13]/95 px-4 py-4 shadow-2xl backdrop-blur-2xl">
          <nav aria-label="Mobile" className="mx-auto grid max-w-7xl gap-1">
            {navigation.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium text-white/50 transition hover:bg-white/[0.04] hover:text-white">{label}</Link>)}
            <Link href="/contact" onClick={() => setOpen(false)} className="mt-2 rounded-xl bg-white px-4 py-3 text-center text-sm font-bold text-[#071018]">Start a project</Link>
          </nav>
        </div>
      )}
    </div>
  );
}
