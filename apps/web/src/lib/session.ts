import { cookies } from "next/headers";
import type { MeResponse } from "@cardtable/shared";

const API_URL = process.env.API_URL ?? "http://localhost:4000";

/**
 * Récupère la session courante depuis un Server Component.
 * Le cookie reçu du navigateur est transmis tel quel au backend — c'est le
 * serveur qui décide si la session est valide, jamais le client.
 */
export async function getSession(): Promise<MeResponse | null> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { cookie: cookieHeader },
      cache: "no-store",
    });

    if (!res.ok) return null;
    return (await res.json()) as MeResponse;
  } catch {
    return null;
  }
}
