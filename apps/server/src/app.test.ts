import { describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "./app.js";
import { testEnv } from "./test/helpers.js";

describe("GET /health", () => {
  it("confirme que le serveur et la base répondent", async () => {
    const res = await request(createApp(testEnv)).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok", db: "ok" });
  });
});
