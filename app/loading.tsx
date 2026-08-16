export default function Loading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-5 py-20" aria-busy="true" aria-label="Loading">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--card-border)] border-t-[var(--gold)]" />
        <p className="text-sm text-[var(--muted)]">Loading…</p>
      </div>
    </main>
  );
}
