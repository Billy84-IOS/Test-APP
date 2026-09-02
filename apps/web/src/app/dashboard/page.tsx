import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { GAME_TYPE_INFO, type GameType } from "@cardtable/shared";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/Card";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Tableau de bord — CardTable",
};

const GAME_SUITS: Record<GameType, string> = {
  PRESIDENT: "♠",
  KEMS: "♣",
  RAMI: "♦",
  HUIT_AMERICAIN: "♥",
};

function playerRange(gameType: GameType): string {
  const info = GAME_TYPE_INFO[gameType];
  return info.exactPlayers
    ? `${info.exactPlayers} joueurs`
    : `${info.minPlayers}–${info.maxPlayers} joueurs`;
}

export default async function DashboardPage() {
  // Protection de route : c'est le serveur qui décide, à partir du cookie.
  const session = await getSession();
  if (!session) redirect("/connexion");

  const { user, stats, totals } = session;

  return (
    <div className="felt-texture flex flex-1 flex-col">
      <AppHeader displayName={user.displayName} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        <h1 className="animate-rise font-display text-3xl font-semibold tracking-tight text-cream-100 sm:text-4xl">
          Salut <span className="text-gradient-gold">{user.displayName}</span>
        </h1>
        <p className="animate-rise mt-2 text-cream-500">
          @{user.username} · {user.xp} XP
        </p>

        {/* Totaux */}
        <section className="animate-rise mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Parties jouées", value: totals.played },
            { label: "Victoires", value: totals.wins },
            { label: "Défaites", value: totals.losses },
            { label: "Taux de victoire", value: `${Math.round(totals.winRate * 100)} %` },
          ].map((item) => (
            <Card key={item.label} className="p-5">
              <p className="text-sm text-cream-500">{item.label}</p>
              <p className="mt-1 font-display text-2xl font-semibold text-cream-100">{item.value}</p>
            </Card>
          ))}
        </section>

        {/* Statistiques par jeu */}
        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-cream-100">Tes statistiques par jeu</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {stats.map((stat) => (
              <Card key={stat.gameType} className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-display text-lg font-semibold text-cream-100">
                    <span className="mr-2 text-gold-400" aria-hidden>
                      {GAME_SUITS[stat.gameType]}
                    </span>
                    {GAME_TYPE_INFO[stat.gameType].label}
                  </p>
                  <p className="mt-1 text-sm text-cream-500">{playerRange(stat.gameType)}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-xl font-semibold text-cream-100">
                    {stat.wins}<span className="text-cream-500">/{stat.played}</span>
                  </p>
                  <p className="text-xs text-cream-500">victoires</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Ce qui n'existe pas encore est annoncé comme tel — jamais simulé. */}
        <section className="mt-10">
          <Card className="border-dashed">
            <h2 className="font-display text-xl font-semibold text-cream-100">Et maintenant ?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-cream-500">
              Ton compte est prêt. Les amis (Phase 3), le salon de création de
              partie (Phase 4) et les quatre jeux (Phases 6 à 9) arrivent
              ensuite. Rien n&apos;est simulé ici : les statistiques
              ci-dessus sont bien celles enregistrées par le serveur — elles
              resteront à zéro tant qu&apos;aucune partie n&apos;aura été jouée.
            </p>
          </Card>
        </section>
      </main>
    </div>
  );
}
