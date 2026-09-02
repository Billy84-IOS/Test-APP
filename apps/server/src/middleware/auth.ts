import type { NextFunction, Request, Response } from "express";
import { getUserFromSession } from "../lib/sessions.js";
import type { Env } from "../env.js";

/**
 * Attache l'utilisateur à la requête si une session valide existe.
 * Ne bloque pas la requête — utile pour les routes semi-publiques.
 */
export function attachUser(env: Env) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const sessionId = req.cookies?.[env.SESSION_COOKIE_NAME] as string | undefined;
    const user = await getUserFromSession(sessionId);
    if (user && sessionId) {
      req.user = user;
      req.sessionId = sessionId;
    }
    next();
  };
}

/** Refuse la requête si aucune session valide n'est présente. */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    res.status(401).json({ error: "Non authentifié" });
    return;
  }
  next();
}
