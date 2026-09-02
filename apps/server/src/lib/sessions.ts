import type { CookieOptions, Response } from "express";
import { prisma } from "../prisma.js";
import type { Env } from "../env.js";

const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 jours

export function sessionCookieOptions(env: Env): CookieOptions {
  return {
    httpOnly: true, // inaccessible au JavaScript du navigateur
    sameSite: "lax", // protège des envois cross-site (CSRF de base)
    secure: env.NODE_ENV === "production", // HTTPS uniquement en production
    path: "/",
    maxAge: SESSION_DURATION_MS,
  };
}

export async function createSession(userId: string) {
  return prisma.session.create({
    data: {
      userId,
      expiresAt: new Date(Date.now() + SESSION_DURATION_MS),
    },
  });
}

/** Renvoie l'utilisateur si la session existe et n'est pas expirée. */
export async function getUserFromSession(sessionId: string | undefined) {
  if (!sessionId) return null;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session) return null;

  if (session.expiresAt.getTime() < Date.now()) {
    // Session expirée : on la supprime au passage plutôt que de la laisser traîner.
    await prisma.session.delete({ where: { id: session.id } }).catch(() => undefined);
    return null;
  }

  return session.user;
}

export async function destroySession(sessionId: string) {
  await prisma.session.delete({ where: { id: sessionId } }).catch(() => undefined);
}

/** Invalide toutes les sessions d'un utilisateur (changement de mot de passe). */
export async function destroyAllSessionsForUser(userId: string) {
  await prisma.session.deleteMany({ where: { userId } });
}

export function clearSessionCookie(res: Response, env: Env) {
  res.clearCookie(env.SESSION_COOKIE_NAME, { ...sessionCookieOptions(env), maxAge: undefined });
}
