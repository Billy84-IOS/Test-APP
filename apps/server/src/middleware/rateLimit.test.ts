import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../app.js";
import { testEnv } from "../test/helpers.js";

// Le rate limiting est désactivé dans les autres tests (ils envoient
// volontairement beaucoup de requêtes). Ici on l'active explicitement pour
// vérifier qu'il protège réellement les routes sensibles.
const limitedEnv = { ...testEnv, RATE_LIMIT_ENABLED: true, AUTH_RATE_LIMIT: 3 };

describe("rate limiting sur /auth", () => {
  it("bloque après le nombre de tentatives autorisé", async () => {
    const app = createApp(limitedEnv);
    const tentative = () =>
      request(app).post("/auth/login").send({ identifier: "inexistant", password: "mauvais" });

    // Les 3 premières passent (et échouent en 401, ce qui est normal).
    expect((await tentative()).status).toBe(401);
    expect((await tentative()).status).toBe(401);
    expect((await tentative()).status).toBe(401);

    // La 4e est bloquée par le limiteur.
    const bloquee = await tentative();
    expect(bloquee.status).toBe(429);
    expect(bloquee.body.error).toContain("Trop de tentatives");
  });

  it("laisse passer les routes non sensibles", async () => {
    const app = createApp(limitedEnv);
    for (let i = 0; i < 5; i++) {
      const res = await request(app).get("/health");
      expect([200, 503]).toContain(res.status);
    }
  });
});
