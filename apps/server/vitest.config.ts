import { defineConfig } from "vitest/config";

// Base de test dédiée, surchargeable pour la CI ou un PostgreSQL distant.
const TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL ?? "postgresql://cardtable:cardtable@localhost:5432/cardtable_test";

export default defineConfig({
  test: {
    // Base de test dédiée : les tests écrivent en base pour de vrai
    // (pas de mock de Prisma) mais ne touchent jamais aux données de dev.
    env: {
      NODE_ENV: "test",
      DATABASE_URL: TEST_DATABASE_URL,
      SESSION_COOKIE_NAME: "cardtable_session",
      CORS_ORIGIN: "http://localhost:3000",
    },
    setupFiles: ["./src/test/setup.ts"],
    // Les tests partagent une base : on les exécute en série pour éviter
    // que le nettoyage d'un fichier n'écrase les données d'un autre.
    fileParallelism: false,
  },
});
