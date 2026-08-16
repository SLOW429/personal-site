export default function Loading() {
  return (
    <main
      className="grid min-h-[60vh] place-items-center px-5 py-20"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="grid place-items-center gap-4 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-accent" />
        <p className="text-sm text-muted">Loading…</p>
      </div>
    </main>
  );
}
