import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../app.js";
import { prisma } from "../prisma.js";
import { sessionCookie, testEnv } from "../test/helpers.js";

const app = () => createApp(testEnv);

const VALID = {
  username: "alex",
  email: "alex@example.com",
  password: "motdepasse123",
};

async function registerAndGetCookie() {
  const res = await request(app()).post("/auth/register").send(VALID);
  return sessionCookie(res)!;
}

describe("PATCH /profile", () => {
  it("refuse sans authentification", async () => {
    const res = await request(app()).patch("/profile").send({ displayName: "Alex" });
    expect(res.status).toBe(401);
  });

  it("met à jour le nom affiché et le persiste", async () => {
    const cookie = await registerAndGetCookie();

    const res = await request(app())
      .patch("/profile")
      .set("Cookie", cookie)
      .send({ displayName: "Alex le Président" });

    expect(res.status).toBe(200);
    expect(res.body.user.displayName).toBe("Alex le Président");

    const user = await prisma.user.findUniqueOrThrow({ where: { username: "alex" } });
    expect(user.displayName).toBe("Alex le Président");
  });

  it("refuse un nom affiché vide", async () => {
    const cookie = await registerAndGetCookie();
    const res = await request(app()).patch("/profile").set("Cookie", cookie).send({ displayName: "   " });

    expect(res.status).toBe(400);
  });
});

describe("PATCH /profile/password", () => {
  it("refuse sans authentification", async () => {
    const res = await request(app())
      .patch("/profile/password")
      .send({ currentPassword: "x", newPassword: "nouveaumotdepasse" });
    expect(res.status).toBe(401);
  });

  it("refuse si le mot de passe actuel est faux", async () => {
    const cookie = await registerAndGetCookie();
    const res = await request(app())
      .patch("/profile/password")
      .set("Cookie", cookie)
      .send({ currentPassword: "faux", newPassword: "nouveaumotdepasse" });

    expect(res.status).toBe(401);
  });

  it("change le mot de passe et invalide les autres sessions", async () => {
    const premiereSession = await registerAndGetCookie();
    // Une deuxième session (autre appareil)
    const autreAppareil = sessionCookie(
      await request(app()).post("/auth/login").send({ identifier: "alex", password: VALID.password }),
    )!;
    expect(await prisma.session.count()).toBe(2);

    const res = await request(app())
      .patch("/profile/password")
      .set("Cookie", premiereSession)
      .send({ currentPassword: VALID.password, newPassword: "nouveaumotdepasse" });

    expect(res.status).toBe(204);

    // L'autre appareil est déconnecté de force.
    const autre = await request(app()).get("/auth/me").set("Cookie", autreAppareil);
    expect(autre.status).toBe(401);

    // L'ancien mot de passe ne fonctionne plus, le nouveau oui.
    const ancien = await request(app())
      .post("/auth/login")
      .send({ identifier: "alex", password: VALID.password });
    expect(ancien.status).toBe(401);

    const nouveau = await request(app())
      .post("/auth/login")
      .send({ identifier: "alex", password: "nouveaumotdepasse" });
    expect(nouveau.status).toBe(200);
  });

  it("refuse un nouveau mot de passe trop court", async () => {
    const cookie = await registerAndGetCookie();
    const res = await request(app())
      .patch("/profile/password")
      .set("Cookie", cookie)
      .send({ currentPassword: VALID.password, newPassword: "court" });

    expect(res.status).toBe(400);
  });
});

describe("DELETE /profile", () => {
  it("refuse sans authentification", async () => {
    const res = await request(app()).delete("/profile").send({ password: VALID.password });
    expect(res.status).toBe(401);
  });

  it("refuse avec un mauvais mot de passe", async () => {
    const cookie = await registerAndGetCookie();
    const res = await request(app()).delete("/profile").set("Cookie", cookie).send({ password: "faux" });

    expect(res.status).toBe(401);
    expect(await prisma.user.count()).toBe(1);
  });

  it("supprime le compte et ses sessions en cascade", async () => {
    const cookie = await registerAndGetCookie();

    const res = await request(app()).delete("/profile").set("Cookie", cookie).send({ password: VALID.password });

    expect(res.status).toBe(204);
    expect(await prisma.user.count()).toBe(0);
    expect(await prisma.session.count()).toBe(0);

    const apres = await request(app()).get("/auth/me").set("Cookie", cookie);
    expect(apres.status).toBe(401);
  });
});
