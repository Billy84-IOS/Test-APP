import { beforeEach, afterAll } from "vitest";
import { prisma } from "../prisma.js";

// Table rase avant chaque test : les tests sont indépendants et
// reproductibles, quel que soit leur ordre d'exécution.
beforeEach(async () => {
  await prisma.$executeRawUnsafe(
    `TRUNCATE TABLE "Session", "GameTypeStats", "Friendship", "ChatMessage", "GameInvite", "GamePlayer", "GameSession", "User" RESTART IDENTITY CASCADE`,
  );
});

afterAll(async () => {
  await prisma.$disconnect();
});
