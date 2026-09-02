import type { Env } from "../env.js";

export const testEnv: Env = {
  NODE_ENV: "test",
  PORT: 4000,
  DATABASE_URL: "postgresql://cardtable:cardtable@localhost:5432/cardtable_test",
  CORS_ORIGIN: "http://localhost:3000",
  SESSION_COOKIE_NAME: "cardtable_session",
  RATE_LIMIT_ENABLED: false,
  AUTH_RATE_LIMIT: 20,
};

/** Extrait la valeur du cookie de session d'une réponse supertest. */
export function sessionCookie(res: { headers: Record<string, unknown> }): string | undefined {
  const raw = res.headers["set-cookie"];
  const cookies = Array.isArray(raw) ? raw : typeof raw === "string" ? [raw] : [];
  return cookies.find((c) => c.startsWith(`${testEnv.SESSION_COOKIE_NAME}=`));
}
