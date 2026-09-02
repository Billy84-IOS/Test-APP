"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AUTH_RULES, type MeResponse } from "@cardtable/shared";
import { apiFetch } from "@/lib/api";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = new FormData(event.currentTarget);
    const displayName = String(form.get("displayName") ?? "").trim();

    try {
      // Le serveur revalide tout et crée la session (cookie httpOnly).
      await apiFetch<MeResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: String(form.get("username") ?? "").trim(),
          email: String(form.get("email") ?? "").trim(),
          password: String(form.get("password") ?? ""),
          ...(displayName ? { displayName } : {}),
        }),
      });
      router.replace("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {error && <Alert tone="error">{error}</Alert>}

      <Input
        label="Pseudo"
        name="username"
        autoComplete="username"
        required
        minLength={AUTH_RULES.username.min}
        maxLength={AUTH_RULES.username.max}
        placeholder="ton_pseudo"
        hint={`${AUTH_RULES.username.min} à ${AUTH_RULES.username.max} caractères — lettres, chiffres, tirets et underscores.`}
      />

      <Input
        label="Adresse e-mail"
        name="email"
        type="email"
        autoComplete="email"
        required
        placeholder="toi@exemple.fr"
      />

      <Input
        label="Nom affiché"
        name="displayName"
        autoComplete="nickname"
        maxLength={AUTH_RULES.displayName.max}
        placeholder="Optionnel"
        hint="Le nom que verront les autres joueurs. Par défaut, ton pseudo."
      />

      <Input
        label="Mot de passe"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        minLength={AUTH_RULES.password.min}
        hint={`Au moins ${AUTH_RULES.password.min} caractères.`}
      />

      <Button type="submit" fullWidth disabled={submitting}>
        {submitting ? "Création du compte…" : "Créer mon compte"}
      </Button>
    </form>
  );
}
