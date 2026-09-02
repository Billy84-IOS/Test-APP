import { Router } from "express";
import { prisma } from "../prisma.js";
import type { Env } from "../env.js";
import { hashPassword, verifyPassword } from "../lib/password.js";
import { clearSessionCookie, createSession, destroyAllSessionsForUser, sessionCookieOptions } from "../lib/sessions.js";
import {
  changePasswordSchema,
  deleteAccountSchema,
  firstErrorMessage,
  updateProfileSchema,
} from "../lib/validation.js";
import { toMeResponse } from "../lib/serialize.js";
import { requireAuth } from "../middleware/auth.js";
import { createSensitiveActionLimiter } from "../middleware/rateLimit.js";

export function createProfileRouter(env: Env) {
  const router = Router();
  const sensitiveActionLimiter = createSensitiveActionLimiter(env);

  // Toutes les routes de profil exigent une session valide.
  router.use(requireAuth);

  // --- Modifier le nom affiché ------------------------------------------
  router.patch("/", async (req, res) => {
    const parsed = updateProfileSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: firstErrorMessage(parsed.error) });
      return;
    }

    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: { displayName: parsed.data.displayName },
      include: { stats: true },
    });

    res.json(toMeResponse(user, user.stats));
  });

  // --- Changer le mot de passe ------------------------------------------
  router.patch("/password", sensitiveActionLimiter, async (req, res) => {
    const parsed = changePasswordSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: firstErrorMessage(parsed.error) });
      return;
    }

    const { currentPassword, newPassword } = parsed.data;

    if (!(await verifyPassword(req.user!.passwordHash, currentPassword))) {
      res.status(401).json({ error: "Mot de passe actuel incorrect" });
      return;
    }

    await prisma.user.update({
      where: { id: req.user!.id },
      data: { passwordHash: await hashPassword(newPassword) },
    });

    // Sécurité : un changement de mot de passe invalide toutes les sessions
    // existantes (y compris d'éventuels appareils compromis), puis on
    // réouvre une session pour l'appareil courant.
    await destroyAllSessionsForUser(req.user!.id);
    const session = await createSession(req.user!.id);
    res.cookie(env.SESSION_COOKIE_NAME, session.id, sessionCookieOptions(env));

    res.status(204).end();
  });

  // --- Supprimer le compte ----------------------------------------------
  router.delete("/", sensitiveActionLimiter, async (req, res) => {
    const parsed = deleteAccountSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: firstErrorMessage(parsed.error) });
      return;
    }

    if (!(await verifyPassword(req.user!.passwordHash, parsed.data.password))) {
      res.status(401).json({ error: "Mot de passe incorrect" });
      return;
    }

    // Les sessions, stats, amitiés... sont supprimées en cascade (schéma Prisma).
    await prisma.user.delete({ where: { id: req.user!.id } });
    clearSessionCookie(res, env);
    res.status(204).end();
  });

  return router;
}
