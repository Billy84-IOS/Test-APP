import type { User } from "@prisma/client";

// Étend le type Request d'Express pour transporter l'utilisateur authentifié.
// On passe par le namespace global `Express` (et non par une augmentation de
// module) : c'est stable quelle que soit la version de @types/express
// résolue par pnpm.
declare global {
  namespace Express {
    interface Request {
      user?: User;
      sessionId?: string;
    }
  }
}

export {};
