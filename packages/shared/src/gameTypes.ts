// Les 4 jeux de la V1. Ne pas en ajouter d'autres sans mise à jour du schéma
// Prisma (enum GameType) et de la config du lobby.
export const GAME_TYPES = ["PRESIDENT", "KEMS", "RAMI", "HUIT_AMERICAIN"] as const;
export type GameType = (typeof GAME_TYPES)[number];

export interface GameTypeInfo {
  id: GameType;
  label: string;
  minPlayers: number;
  maxPlayers: number;
  exactPlayers?: number; // Kem's : exactement 4
}

export const GAME_TYPE_INFO: Record<GameType, GameTypeInfo> = {
  PRESIDENT: { id: "PRESIDENT", label: "Président / Trou du cul", minPlayers: 3, maxPlayers: 6 },
  KEMS: { id: "KEMS", label: "Kem's", minPlayers: 4, maxPlayers: 4, exactPlayers: 4 },
  RAMI: { id: "RAMI", label: "Rami", minPlayers: 2, maxPlayers: 4 },
  HUIT_AMERICAIN: { id: "HUIT_AMERICAIN", label: "8 américain", minPlayers: 2, maxPlayers: 6 },
};
