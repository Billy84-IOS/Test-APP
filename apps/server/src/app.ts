import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import type { Env } from "./env.js";
import { prisma } from "./prisma.js";
import { attachUser } from "./middleware/auth.js";
import { createAuthRouter } from "./routes/auth.js";
import { createProfileRouter } from "./routes/profile.js";

export function createApp(env: Env) {
  const app = express();

  // Derrière un reverse proxy (Phase 11), express doit faire confiance au
  // X-Forwarded-For pour que le rate limiting compte les bonnes IP.
  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      credentials: true, // nécessaire pour que le cookie de session circule
    }),
  );
  app.use(express.json({ limit: "100kb" }));
  app.use(cookieParser());
  app.use(attachUser(env));

  app.get("/health", async (_req, res) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      res.json({ status: "ok", db: "ok" });
    } catch (err) {
      res.status(503).json({ status: "error", db: "unreachable", error: String(err) });
    }
  });

  app.use("/auth", createAuthRouter(env));
  app.use("/profile", createProfileRouter(env));

  return app;
}
