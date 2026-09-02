import rateLimit from "express-rate-limit";
import type { Env } from "../env.js";

// Limite les tentatives sur les routes sensibles (bruteforce de mots de passe,
// création de comptes en masse). Volontairement permissif pour ne pas gêner
// un usage normal entre amis.

export function createAuthLimiter(env: Env) {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: env.AUTH_RATE_LIMIT,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    skip: () => !env.RATE_LIMIT_ENABLED,
    message: { error: "Trop de tentatives, réessaie dans quelques minutes." },
  });
}

export function createSensitiveActionLimiter(env: Env) {
  return rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: Math.max(1, Math.floor(env.AUTH_RATE_LIMIT / 2)),
    standardHeaders: "draft-7",
    legacyHeaders: false,
    skip: () => !env.RATE_LIMIT_ENABLED,
    message: { error: "Trop de tentatives, réessaie plus tard." },
  });
}
