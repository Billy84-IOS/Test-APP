"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await apiFetch<void>("/auth/logout", { method: "POST" });
    } catch {
      // Même si l'appel échoue, on renvoie l'utilisateur vers l'accueil :
      // c'est le serveur qui reste maître de la validité de la session.
    }
    startTransition(() => {
      router.replace("/");
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loggingOut || isPending}
      className="min-h-11 rounded-xl px-3 py-2 text-cream-500 transition-colors hover:text-ruby-400 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loggingOut || isPending ? "Déconnexion…" : "Déconnexion"}
    </button>
  );
}
