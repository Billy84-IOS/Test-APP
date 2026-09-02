import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "./app.js";

const testEnv = {
  NODE_ENV: "test" as const,
  PORT: 4000,
  DATABASE_URL: "postgresql://invalid/for-app-construction-only",
  CORS_ORIGIN: "http://localhost:3000",
  SESSION_COOKIE_NAME: "cardtable_session",
};

describe("GET /health", () => {
  it("répond avec un statut, que la base soit joignable ou non", async () => {
    const app = createApp(testEnv);
    const res = await request(app).get("/health");
    expect([200, 503]).toContain(res.status);
    expect(res.body).toHaveProperty("status");
  });
});
