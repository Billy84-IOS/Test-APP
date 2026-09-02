import type { Server as HttpServer } from "node:http";
import { Server as SocketIOServer } from "socket.io";
import type { Env } from "./env.js";

// Fondations Socket.IO uniquement : connexion/déconnexion loggées.
// - L'authentification au handshake (cookie de session partagé avec le
//   REST) arrive en Phase 2.
// - Les événements de présence/amis arrivent en Phase 3.
// - Les événements de lobby/partie arrivent en Phase 4+.
// Rappel d'architecture (voir proposition validée) : dès qu'un state contient
// de l'info privée, ne jamais faire io.to(room).emit(...) — toujours calculer
// une vue par joueur et émettre socket par socket individuellement.
export function createSocketServer(httpServer: HttpServer, env: Env) {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: env.CORS_ORIGIN,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`[socket] connecté : ${socket.id}`);

    socket.on("disconnect", (reason) => {
      console.log(`[socket] déconnecté : ${socket.id} (${reason})`);
    });
  });

  return io;
}
