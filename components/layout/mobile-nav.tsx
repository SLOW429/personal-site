"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation } from "@/lib/site-config";
import { useLocale } from "./locale-provider";

export default function MobileNav() {
  const [openPath, setOpenPath] = useState<string | null>(null);
  const pathname = usePathname();
  const open = openPath !== null && openPath === pathname;
  const { t } = useLocale();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPath(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-label={open ? t("nav.close") : t("nav.open")}
        aria-controls="mobile-primary-navigation"
        aria-expanded={open}
        onClick={() => setOpenPath((current) => current === pathname ? null : pathname)}
        className="relative z-[60] rounded-xl border border-white/10 bg-white/[0.05] p-2 text-white/75 transition hover:border-white/20 hover:text-white"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      {open && (
        <div
          className="fixed inset-0 z-40 xl:hidden"
          style={{ paddingTop: "calc(4rem + env(safe-area-inset-top, 0px))" }}
        >
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => setOpenPath(null)}
            className="absolute inset-0 h-full w-full bg-black/55 backdrop-blur-sm"
          />
          <nav
            id="mobile-primary-navigation"
            aria-label={t("nav.mobile")}
            className="relative mx-auto max-h-[calc(100dvh_-_4rem)] max-w-7xl overflow-y-auto border-y border-white/[0.08] bg-[#080d17]/95 px-4 py-4 shadow-2xl backdrop-blur-2xl sm:px-6"
          >
            <div className="grid gap-1">
              {navigation.map(([key, href]) => {
                const current = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={current ? "page" : undefined}
                    onClick={() => setOpenPath(null)}
                    className={`rounded-xl border-s-2 px-4 py-3 text-sm font-medium transition ${
                      current
                        ? "border-[#8fd3ff] bg-[#8fd3ff]/[0.07] text-white"
                        : "border-transparent text-white/55 hover:bg-white/[0.045] hover:text-white"
                    }`}
                  >
                    {t(key)}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                aria-current={pathname === "/contact" ? "page" : undefined}
                onClick={() => setOpenPath(null)}
                className="mt-2 rounded-xl bg-[#d9edff] px-4 py-3 text-center text-sm font-bold text-[#071018] transition hover:bg-white"
              >
                {t("nav.startProject")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
