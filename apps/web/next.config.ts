import type { NextConfig } from "next";

const API_URL = process.env.API_URL ?? "http://localhost:4000";

const nextConfig: NextConfig = {
  // Le navigateur ne parle jamais directement au serveur d'API : tout passe
  // par /api/* sur la même origine, que Next relaie vers le backend.
  // Avantages : un seul port exposé publiquement (3000), pas de CORS ni de
  // subtilités de cookies cross-origin, et le reverse proxy de la Phase 11
  // n'aura qu'un seul service à router.
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${API_URL}/:path*` }];
  },
};

export default nextConfig;
