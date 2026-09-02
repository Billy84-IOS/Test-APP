import type { GameType } from "./gameTypes.js";

// Noms d'événements Socket.IO centralisés — jamais de chaîne en dur côté
// client ou serveur, toujours importer depuis ici.
export const SOCKET_EVENTS = {
  // Présence
  PLAYER_ONLINE: "player:online",
  PLAYER_OFFLINE: "player:offline",

  // Amis
  FRIEND_REQUEST: "friend:request",
  FRIEND_ACCEPTED: "friend:accepted",

  // Cycle de vie d'une partie / lobby
  GAME_CREATED: "game:created",
  GAME_JOINED: "game:joined",
  GAME_LEFT: "game:left",
  GAME_STARTED: "game:started",
  GAME_FINISHED: "game:finished",

  // Pendant la partie (voir architecture : toujours émis par socket
  // individuel côté serveur, jamais en broadcast brut, dès qu'il y a de
  // l'info privée dans le state)
  GAME_ACTION: "game:action",
  GAME_STATE: "game:state",
  GAME_ACTION_REJECTED: "game:action:rejected",

  // Chat
  CHAT_MESSAGE: "chat:message",
} as const;

export interface PlayerPresencePayload {
  userId: string;
  status: "online" | "offline" | "in_game";
}

export interface FriendRequestPayload {
  fromUserId: string;
  fromUsername: string;
}

export interface GameActionPayload<TAction = unknown> {
  sessionId: string;
  action: TAction;
}

export interface GameActionRejectedPayload {
  sessionId: string;
  reason: string;
}

export interface ChatMessagePayload {
  sessionId: string;
  userId: string | null; // null = message système
  content: string;
  createdAt: string;
}

// Le shape exact de "state" dépend du moteur de jeu concerné (Phase 5+) ;
// on garde un type générique ici et chaque moteur affine le sien dans
// packages/game-engine.
export interface GameStatePayload<TState = unknown> {
  sessionId: string;
  gameType: GameType;
  state: TState;
}
