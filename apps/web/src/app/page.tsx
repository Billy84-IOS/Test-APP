interface HealthStatus {
  status: "ok" | "error";
  db?: "ok" | "unreachable";
  error?: string;
}

async function getServerHealth(): Promise<HealthStatus | null> {
  const apiUrl = process.env.API_URL ?? "http://localhost:4000";
  try {
    const res = await fetch(`${apiUrl}/health`, { cache: "no-store" });
    return (await res.json()) as HealthStatus;
  } catch {
    return null;
  }
}

export default async function Home() {
  const health = await getServerHealth();

  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">🃏 CardTable</h1>
        <p className="mt-2 text-neutral-400">
          Fondations du projet — Phase 1. Le dashboard, les jeux et les amis
          arrivent dans les phases suivantes.
        </p>
      </div>

      <div className="rounded-xl border border-neutral-800 bg-neutral-900 px-6 py-4 text-sm">
        <p className="font-medium mb-1">État de connexion au serveur</p>
        {health === null && (
          <p className="text-red-400">
            ✗ Impossible de joindre le serveur (vérifie qu&apos;il tourne sur{" "}
            {process.env.API_URL ?? "http://localhost:4000"})
          </p>
        )}
        {health && health.status === "ok" && (
          <p className="text-green-400">✓ Serveur et base de données opérationnels</p>
        )}
        {health && health.status === "error" && (
          <p className="text-amber-400">⚠ Serveur joignable, base de données indisponible</p>
        )}
      </div>
    </main>
  );
}
