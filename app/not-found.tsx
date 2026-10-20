import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center px-5 py-20">
      <section className="mx-auto w-full max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--gold)]">404</p>
        <h1 className="mt-5 font-display text-5xl font-bold tracking-tight md:text-7xl">This page went off the map.</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
          The page does not exist or the link is no longer valid. Head back to SLOW.DEV and keep exploring.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-xl bg-[var(--gold)] px-5 py-3 font-semibold text-[#071018]">Back home</Link>
          <Link href="/tools" className="rounded-xl border border-[var(--card-border-strong)] px-5 py-3 font-semibold">Explore tools</Link>
        </div>
      </section>
    </main>
  );
}
