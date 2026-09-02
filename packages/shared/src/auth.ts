import type { GameTypeStatsDto, PublicUser } from "./dto.js";

// Contraintes de validation partagées entre le client (retour immédiat dans
// les formulaires) et le serveur (validation faisant autorité). Le serveur
// revalide TOUJOURS : le client ne fait qu'améliorer l'expérience.
export const AUTH_RULES = {
  username: { min: 3, max: 20, pattern: /^[a-zA-Z0-9_-]+$/ },
  displayName: { min: 1, max: 30 },
  password: { min: 8, max: 200 },
} as const;

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
  displayName?: string;
}

export interface LoginInput {
  identifier: string; // pseudo ou email
  password: string;
}

export interface UpdateProfileInput {
  displayName: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface DeleteAccountInput {
  password: string;
}

/** Profil complet renvoyé au propriétaire du compte. */
export interface MeResponse {
  user: PublicUser & { email: string };
  stats: GameTypeStatsDto[];
  totals: {
    played: number;
    wins: number;
    losses: number;
    winRate: number;
  };
}
