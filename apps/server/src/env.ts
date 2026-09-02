import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1, "DATABASE_URL est requis"),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  SESSION_COOKIE_NAME: z.string().default("cardtable_session"),
  // Le rate limiting est actif par défaut. Il n'est désactivé que dans les
  // tests, qui envoient volontairement beaucoup de requêtes d'affilée ; un
  // test dédié (rateLimit.test.ts) vérifie qu'il bloque bien quand il est actif.
  RATE_LIMIT_ENABLED: z
    .string()
    .optional()
    .transform((v) => v !== "false"),
  AUTH_RATE_LIMIT: z.coerce.number().default(20),
});

export type Env = z.infer<typeof envSchema>;

export function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error("Variables d'environnement invalides :", parsed.error.flatten().fieldErrors);
    process.exit(1);
  }
  return parsed.data;
}
