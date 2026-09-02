import type { GameType } from "./gameTypes.js";

// DTOs échangés via l'API REST. Le détail (routes, validation) arrive en
// Phase 2 (comptes) et Phase 3 (amis) — on pose seulement les formes de
// données ici pour que web et server partagent les mêmes types dès le début.

export interface PublicUser {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  xp: number;
  createdAt: string;
}

export interface GameTypeStatsDto {
  gameType: GameType;
  played: number;
  wins: number;
  losses: number;
  winRate: number; // dérivé, calculé côté serveur
}

export interface FriendDto {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  status: "online" | "offline" | "in_game";
}

export type ApiError = { error: string; details?: unknown };
