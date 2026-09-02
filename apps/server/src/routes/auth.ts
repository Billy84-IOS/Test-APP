import { Router } from "express";
import { Prisma } from "@prisma/client";
import { prisma } from "../prisma.js";
import type { Env } from "../env.js";
import { hashPassword, verifyPassword } from "../lib/password.js";
import {
  clearSessionCookie,
  createSession,
  destroySession,
  sessionCookieOptions,
} from "../lib/sessions.js";
import { firstErrorMessage, loginSchema, registerSchema } from "../lib/validation.js";
import { toMeResponse } from "../lib/serialize.js";
import { requireAuth } from "../middleware/auth.js";
import { createAuthLimiter } from "../middleware/rateLimit.js";

export function createAuthRouter(env: Env) {
  const router = Router();
  const authLimiter = createAuthLimiter(env);

  // --- Inscription -------------------------------------------------------
  router.post("/register", authLimiter, async (req, res) => {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: firstErrorMessage(parsed.error) });
      return;
    }

    const { username, email, password, displayName } = parsed.data;

    try {
      const user = await prisma.user.create({
        data: {
          username,
          email,
          passwordHash: await hashPassword(password),
          displayName: displayName ?? username,
        },
      });

      const session = await createSession(user.id);
      res.cookie(env.SESSION_COOKIE_NAME, session.id, sessionCookieOptions(env));
      res.status(201).json(toMeResponse(user, []));
    } catch (err) {
      // P2002 = violation de contrainte d'unicité (pseudo ou e-mail déjà pris)
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
        const target = (err.meta?.target as string[] | undefined)?.[0];
        res.status(409).json({
          error: target === "email" ? "Cette adresse e-mail est déjà utilisée" : "Ce pseudo est déjà pris",
        });
        return;
      }
      console.error("[auth] échec de l'inscription", err);
      res.status(500).json({ error: "Impossible de créer le compte" });
    }
  });

  // --- Connexion ---------------------------------------------------------
  router.post("/login", authLimiter, async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: firstErrorMessage(parsed.error) });
      return;
    }

    const { identifier, password } = parsed.data;
    const normalized = identifier.toLowerCase();

    const user = await prisma.user.findFirst({
      where: { OR: [{ username: identifier }, { email: normalized }] },
      include: { stats: true },
    });

    // Message identique que le compte existe ou non : on n'indique jamais
    // à un attaquant si un pseudo/e-mail est enregistré.
    const invalid = () => res.status(401).json({ error: "Identifiants incorrects" });

    if (!user) {
      // Coût de vérification factice pour ne pas révéler l'absence de compte
      // via le temps de réponse.
      await verifyPassword("$argon2id$v=19$m=19456,t=2,p=1$aaaaaaaaaaaaaaaa$aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", password);
      invalid();
      return;
    }

    if (!(await verifyPassword(user.passwordHash, password))) {
      invalid();
      return;
    }

    const session = await createSession(user.id);
    res.cookie(env.SESSION_COOKIE_NAME, session.id, sessionCookieOptions(env));
    res.json(toMeResponse(user, user.stats));
  });

  // --- Déconnexion -------------------------------------------------------
  router.post("/logout", async (req, res) => {
    if (req.sessionId) {
      await destroySession(req.sessionId);
    }
    clearSessionCookie(res, env);
    res.status(204).end();
  });

  // --- Session courante --------------------------------------------------
  router.get("/me", requireAuth, async (req, res) => {
    const stats = await prisma.gameTypeStats.findMany({ where: { userId: req.user!.id } });
    res.json(toMeResponse(req.user!, stats));
  });

  return router;
}
