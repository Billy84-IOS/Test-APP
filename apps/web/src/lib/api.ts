import type { ApiError } from "@cardtable/shared";

/** Erreur d'API portant le message renvoyé par le serveur. */
export class ApiRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

/**
 * Appel d'API côté navigateur. Passe par /api/* (même origine, relayé vers le
 * backend par Next) pour que le cookie de session soit transmis naturellement.
 */
export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (res.status === 204) {
    return undefined as T;
  }

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    const message = (body as ApiError | null)?.error ?? "Une erreur est survenue";
    throw new ApiRequestError(message, res.status);
  }

  return body as T;
}
