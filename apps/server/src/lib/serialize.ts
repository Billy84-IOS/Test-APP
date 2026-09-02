import type { GameTypeStats, User } from "@prisma/client";
import { GAME_TYPES, type GameTypeStatsDto, type MeResponse, type PublicUser } from "@cardtable/shared";

/** Ne sort JAMAIS le hash de mot de passe hors du serveur. */
export function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    xp: user.xp,
    createdAt: user.createdAt.toISOString(),
  };
}

function winRate(wins: number, played: number): number {
  return played === 0 ? 0 : Math.round((wins / played) * 100);
}

/** Complète avec des lignes à zéro pour les jeux jamais joués. */
export function toStatsDtos(stats: GameTypeStats[]): GameTypeStatsDto[] {
  return GAME_TYPES.map((gameType) => {
    const row = stats.find((s) => s.gameType === gameType);
    const played = row?.played ?? 0;
    const wins = row?.wins ?? 0;
    return {
      gameType,
      played,
      wins,
      losses: row?.losses ?? 0,
      winRate: winRate(wins, played),
    };
  });
}

export function toMeResponse(user: User, stats: GameTypeStats[]): MeResponse {
  const statDtos = toStatsDtos(stats);
  const played = statDtos.reduce((sum, s) => sum + s.played, 0);
  const wins = statDtos.reduce((sum, s) => sum + s.wins, 0);
  const losses = statDtos.reduce((sum, s) => sum + s.losses, 0);

  return {
    user: { ...toPublicUser(user), email: user.email },
    stats: statDtos,
    totals: { played, wins, losses, winRate: winRate(wins, played) },
  };
}
