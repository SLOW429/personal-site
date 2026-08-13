"use client";

import { useState } from "react";
import { Wrench, X } from "lucide-react";

export function DevelopmentNotice() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[10000] px-3 pt-3 md:px-6 md:pt-4" role="status" aria-live="polite">
      <div className="mx-auto flex max-w-5xl items-start gap-3 rounded-2xl border border-[var(--card-border-strong)] bg-[var(--panel-bg-heavy)]/95 px-4 py-3 text-[var(--foreground)] shadow-[0_0_50px_rgba(126,196,255,0.16)] backdrop-blur-xl md:items-center md:px-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--gold)] text-[#071018]">
          <Wrench size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold">SLOW.DEV تحت التطوير 🚧</p>
          <p className="mt-0.5 text-xs leading-5 text-[var(--muted)] md:text-sm">
            الموقع بيتطور حاليًا، وبعض الصفحات والخصائص ممكن تتغير أو تكون غير مكتملة. شكرًا لصبرك ❤️
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="إغلاق رسالة التطوير"
          className="rounded-xl p-2 text-[var(--muted)] transition hover:bg-[var(--card-bg-hover)] hover:text-[var(--foreground)]"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
