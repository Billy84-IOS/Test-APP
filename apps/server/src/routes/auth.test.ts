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

describe("POST /auth/register", () => {
  it("crée un compte, ouvre une session et ne renvoie jamais le hash", async () => {
    const res = await request(app()).post("/auth/register").send(VALID);

    expect(res.status).toBe(201);
    expect(res.body.user.username).toBe("alex");
    expect(res.body.user.email).toBe("alex@example.com");
    expect(res.body.user.displayName).toBe("alex");
    expect(JSON.stringify(res.body)).not.toContain("passwordHash");
    expect(JSON.stringify(res.body)).not.toContain(VALID.password);
    expect(sessionCookie(res)).toBeDefined();
  });

  it("stocke le mot de passe haché, jamais en clair", async () => {
    await request(app()).post("/auth/register").send(VALID);

    const user = await prisma.user.findUniqueOrThrow({ where: { username: "alex" } });
    expect(user.passwordHash).not.toBe(VALID.password);
    expect(user.passwordHash.startsWith("$argon2id$")).toBe(true);
  });

  it("pose un cookie de session httpOnly", async () => {
    const res = await request(app()).post("/auth/register").send(VALID);
    expect(sessionCookie(res)).toContain("HttpOnly");
  });

  it("refuse un pseudo déjà pris", async () => {
    await request(app()).post("/auth/register").send(VALID);
    const res = await request(app())
      .post("/auth/register")
      .send({ ...VALID, email: "autre@example.com" });

    expect(res.status).toBe(409);
    expect(res.body.error).toContain("pseudo");
  });

  it("refuse un e-mail déjà utilisé", async () => {
    await request(app()).post("/auth/register").send(VALID);
    const res = await request(app())
      .post("/auth/register")
      .send({ ...VALID, username: "autrepseudo" });

    expect(res.status).toBe(409);
    expect(res.body.error).toContain("e-mail");
  });

  it("refuse un mot de passe trop court", async () => {
    const res = await request(app())
      .post("/auth/register")
      .send({ ...VALID, password: "court" });

    expect(res.status).toBe(400);
    expect(await prisma.user.count()).toBe(0);
  });

  it("refuse un pseudo avec des caractères interdits", async () => {
    const res = await request(app())
      .post("/auth/register")
      .send({ ...VALID, username: "alex bidule!" });

    expect(res.status).toBe(400);
    expect(await prisma.user.count()).toBe(0);
  });

  it("refuse un e-mail invalide", async () => {
    const res = await request(app())
      .post("/auth/register")
      .send({ ...VALID, email: "pas-un-email" });

    expect(res.status).toBe(400);
  });
});

describe("POST /auth/login", () => {
  it("connecte avec le pseudo", async () => {
    await request(app()).post("/auth/register").send(VALID);
    const res = await request(app())
      .post("/auth/login")
      .send({ identifier: "alex", password: VALID.password });

    expect(res.status).toBe(200);
    expect(res.body.user.username).toBe("alex");
    expect(sessionCookie(res)).toBeDefined();
  });

  it("connecte avec l'e-mail", async () => {
    await request(app()).post("/auth/register").send(VALID);
    const res = await request(app())
      .post("/auth/login")
      .send({ identifier: "alex@example.com", password: VALID.password });

    expect(res.status).toBe(200);
  });

  it("refuse un mauvais mot de passe", async () => {
    await request(app()).post("/auth/register").send(VALID);
    const res = await request(app())
      .post("/auth/login")
      .send({ identifier: "alex", password: "mauvaismotdepasse" });

    expect(res.status).toBe(401);
    expect(sessionCookie(res)).toBeUndefined();
  });

  it("donne le même message qu'un compte existe ou non (pas d'énumération)", async () => {
    await request(app()).post("/auth/register").send(VALID);

    const mauvaisMdp = await request(app())
      .post("/auth/login")
      .send({ identifier: "alex", password: "mauvais" });
    const compteInexistant = await request(app())
      .post("/auth/login")
      .send({ identifier: "personne", password: "mauvais" });

    expect(mauvaisMdp.status).toBe(401);
    expect(compteInexistant.status).toBe(401);
    expect(mauvaisMdp.body.error).toBe(compteInexistant.body.error);
  });
});

describe("GET /auth/me", () => {
  it("refuse sans session", async () => {
    const res = await request(app()).get("/auth/me");
    expect(res.status).toBe(401);
  });

  it("refuse avec un cookie de session bidon", async () => {
    const res = await request(app())
      .get("/auth/me")
      .set("Cookie", `${testEnv.SESSION_COOKIE_NAME}=session-inventee`);

    expect(res.status).toBe(401);
  });

  it("renvoie le profil et des statistiques à zéro pour les 4 jeux", async () => {
    const registered = await request(app()).post("/auth/register").send(VALID);
    const cookie = sessionCookie(registered)!;

    const res = await request(app()).get("/auth/me").set("Cookie", cookie);

    expect(res.status).toBe(200);
    expect(res.body.user.username).toBe("alex");
    expect(res.body.stats).toHaveLength(4);
    expect(res.body.stats.map((s: { gameType: string }) => s.gameType).sort()).toEqual([
      "HUIT_AMERICAIN",
      "KEMS",
      "PRESIDENT",
      "RAMI",
    ]);
    expect(res.body.totals).toEqual({ played: 0, wins: 0, losses: 0, winRate: 0 });
  });
});

describe("POST /auth/logout", () => {
  it("détruit la session côté serveur", async () => {
    const registered = await request(app()).post("/auth/register").send(VALID);
    const cookie = sessionCookie(registered)!;

    expect(await prisma.session.count()).toBe(1);

    const res = await request(app()).post("/auth/logout").set("Cookie", cookie);
    expect(res.status).toBe(204);
    expect(await prisma.session.count()).toBe(0);

    const apres = await request(app()).get("/auth/me").set("Cookie", cookie);
    expect(apres.status).toBe(401);
  });
});
