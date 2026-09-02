import express from "express";
import cors from "cors";
import type { Env } from "./env.js";
import { prisma } from "./prisma.js";

// App Express : uniquement les fondations pour l'instant (healthcheck).
// Les routes d'authentification arrivent en Phase 2, amis en Phase 3.
export function createApp(env: Env) {
  const app = express();

  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      credentials: true,
    }),
  );
  app.use(express.json());

  app.get("/health", async (_req, res) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      res.json({ status: "ok", db: "ok" });
    } catch (err) {
      res.status(503).json({ status: "error", db: "unreachable", error: String(err) });
    }
  });

  return app;
}
