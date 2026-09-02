type Status = "ok" | "degraded" | "down";

const STATUS_CONFIG: Record<Status, { dot: string; text: string; label: string }> = {
  ok: { dot: "bg-felt-400", text: "text-felt-300", label: "Serveur et base de données opérationnels" },
  degraded: { dot: "bg-gold-400", text: "text-gold-300", label: "Serveur joignable, base de données indisponible" },
  down: { dot: "bg-ruby-400", text: "text-ruby-400", label: "Serveur injoignable" },
};

export function StatusPill({ status }: { status: Status }) {
  const config = STATUS_CONFIG[status];

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-ink-600 bg-ink-900/80 px-3.5 py-1.5 text-xs">
      <span className="relative flex h-2 w-2">
        {status === "ok" && (
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full ${config.dot} opacity-60 motion-reduce:hidden`}
          />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${config.dot}`} />
      </span>
      <span className={config.text}>{config.label}</span>
    </div>
  );
}
