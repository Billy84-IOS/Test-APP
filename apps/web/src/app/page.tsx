import { GameShowcaseCard } from "@/components/GameShowcaseCard";
import { StatusPill } from "@/components/StatusPill";

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

const GAMES = [
  {
    suit: "♠",
    accent: "felt",
    name: "Président",
    players: "3–6 joueurs",
    tagline:
      "Le classique des soirées : débarrasse-toi de tes cartes avant les autres, et évite la place de trou du cul.",
  },
  {
    suit: "♣",
    accent: "gold",
    name: "Kem's",
    players: "4 joueurs · 2 équipes",
    tagline:
      "En équipe de deux, ramasse une combinaison secrète et fais passer le mot à ton partenaire — sans te faire griller.",
  },
  {
    suit: "♦",
    accent: "ruby",
    name: "Rami",
    players: "2–4 joueurs",
    tagline: "Construis suites et brelans, pose tes combinaisons et sois le premier à vider ta main.",
  },
  {
    suit: "♥",
    accent: "felt",
    name: "8 américain",
    players: "2–6 joueurs",
    tagline: "Défausse-toi selon la couleur ou la valeur, joue tes cartes spéciales et prends l'avantage.",
  },
] as const;

const FEATURES = [
  { icon: "⚡", title: "Temps réel", desc: "Parties fluides, aucune latence perceptible entre joueurs." },
  { icon: "📱", title: "Mobile-first", desc: "Jouable au pouce, aussi confortable sur grand écran." },
  { icon: "🔒", title: "Serveur autoritaire", desc: "Toute la logique de jeu côté serveur — aucune triche possible." },
  { icon: "🏠", title: "Auto-hébergeable", desc: "Aucun service cloud propriétaire requis, ton VPS suffit." },
] as const;

export default async function Home() {
  const health = await getServerHealth();
  const status = health === null ? "down" : health.status === "ok" ? "ok" : "degraded";

  return (
    <div className="felt-texture flex-1">
      {/* Nav */}
      <header className="border-b border-ink-800/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden>
              🃏
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-cream-100">
              CardTable
            </span>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-cream-500 sm:flex">
            <span>Jeux</span>
            <span>Comment ça marche</span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-20 text-center sm:pt-28">
        <div className="animate-rise inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-500/10 px-4 py-1.5 text-xs font-medium text-gold-300">
          <span aria-hidden>🂡</span>
          Plateforme de jeux de cartes entre amis
        </div>

        <h1 className="animate-rise mt-7 text-balance font-display text-5xl font-semibold leading-[1.1] tracking-tight text-cream-100 sm:text-6xl">
          Ta table de jeu,{" "}
          <span className="text-gradient-gold italic">toujours ouverte.</span>
        </h1>

        <p className="animate-rise mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-cream-500">
          Président, Kem&apos;s, Rami, 8 américain — retrouve tes amis pour une
          partie rapide, où que vous soyez. Une dernière partie, ça ne fait
          jamais de mal.
        </p>

        <div className="animate-rise mt-9 flex items-center justify-center gap-3">
          <span className="cursor-not-allowed rounded-xl bg-gold-500/20 px-6 py-3 text-sm font-semibold text-gold-300 ring-1 ring-inset ring-gold-400/30">
            Créer un compte — bientôt disponible
          </span>
        </div>
      </section>

      {/* Games */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-0">
          <h2 className="font-display text-2xl font-semibold text-cream-100">Les jeux de la V1</h2>
          <span className="text-sm text-cream-500">4 classiques, zéro compromis</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {GAMES.map((game) => (
            <GameShowcaseCard key={game.name} {...game} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-ink-800/80 bg-ink-900/40">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title}>
              <span className="text-2xl" aria-hidden>
                {f.icon}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-cream-100">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-cream-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-cream-500">
          🃏 CardTable — <span className="text-cream-300">Phase 1</span> : fondations
        </p>
        <StatusPill status={status} />
      </footer>
    </div>
  );
}
