export function Alert({ tone, children }: { tone: "error" | "success"; children: React.ReactNode }) {
  const styles =
    tone === "error"
      ? "border-ruby-500/40 bg-ruby-600/15 text-ruby-400"
      : "border-felt-400/40 bg-felt-600/15 text-felt-300";

  return (
    <p role={tone === "error" ? "alert" : "status"} className={`rounded-xl border px-4 py-3 text-sm ${styles}`}>
      {children}
    </p>
  );
}
