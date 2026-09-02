import { PrismaClient } from "@prisma/client";

// Singleton — évite de multiplier les connexions en dev (tsx watch recharge
// le module à chaque changement de fichier).
declare global {
  var __prisma: PrismaClient | undefined;
}

export const prisma = globalThis.__prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma;
}
