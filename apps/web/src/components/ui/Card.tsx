export function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`rounded-2xl border border-ink-700 bg-ink-850/70 p-6 ${className}`}>{children}</div>
  );
}
