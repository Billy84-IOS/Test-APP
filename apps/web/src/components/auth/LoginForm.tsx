"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { MeResponse } from "@cardtable/shared";
import { apiFetch } from "@/lib/api";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = new FormData(event.currentTarget);

    try {
      await apiFetch<MeResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          identifier: String(form.get("identifier") ?? "").trim(),
          password: String(form.get("password") ?? ""),
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
        label="Pseudo ou e-mail"
        name="identifier"
        autoComplete="username"
        required
        placeholder="ton_pseudo"
      />

      <Input
        label="Mot de passe"
        name="password"
        type="password"
        autoComplete="current-password"
        required
      />

      <Button type="submit" fullWidth disabled={submitting}>
        {submitting ? "Connexion…" : "Se connecter"}
      </Button>
    </form>
  );
}
