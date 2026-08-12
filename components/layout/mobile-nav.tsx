"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  ["About", "/about"],
  ["Projects", "/projects"],
  ["Services", "/services"],
  ["Tools", "/tools"],
  ["Blog", "/blog"],
  ["Creator", "/creator"],
  ["Gaming", "/gaming"],
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="rounded-xl border border-[var(--card-border-strong)] bg-[var(--card-bg-soft)] p-2 text-[var(--foreground)]"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-16 border-b border-[var(--card-border)] bg-[var(--background)]/95 px-5 py-4 shadow-2xl backdrop-blur-xl">
          <nav aria-label="Mobile" className="mx-auto grid max-w-6xl gap-1">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--card-bg-soft)] hover:text-[var(--foreground)]"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-[var(--gold)] px-4 py-3 text-center text-sm font-semibold text-[#071018]"
            >
              Start a Project
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
