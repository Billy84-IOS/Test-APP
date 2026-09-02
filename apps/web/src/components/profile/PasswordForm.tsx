"use client";

import { useRef, useState, type FormEvent } from "react";
import { AUTH_RULES } from "@cardtable/shared";
import { apiFetch } from "@/lib/api";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function PasswordForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const form = new FormData(event.currentTarget);
    const newPassword = String(form.get("newPassword") ?? "");

    if (newPassword !== String(form.get("confirmPassword") ?? "")) {
      setError("Les deux mots de passe ne correspondent pas");
      return;
    }

    setSubmitting(true);

    try {
      await apiFetch<void>("/profile/password", {
        method: "PATCH",
        body: JSON.stringify({
          currentPassword: String(form.get("currentPassword") ?? ""),
          newPassword,
        }),
      });
      // Le serveur invalide toutes les autres sessions et renouvelle celle
      // de cet appareil : rien à faire côté client si ce n'est vider le form.
      setSuccess("Mot de passe modifié. Tes autres appareils ont été déconnectés.");
      formRef.current?.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {error && <Alert tone="error">{error}</Alert>}
      {success && <Alert tone="success">{success}</Alert>}

      <Input
        label="Mot de passe actuel"
        name="currentPassword"
        type="password"
        autoComplete="current-password"
        required
      />

      <Input
        label="Nouveau mot de passe"
        name="newPassword"
        type="password"
        autoComplete="new-password"
        required
        minLength={AUTH_RULES.password.min}
        hint={`Au moins ${AUTH_RULES.password.min} caractères.`}
      />

      <Input
        label="Confirmer le nouveau mot de passe"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        required
        minLength={AUTH_RULES.password.min}
      />

      <div>
        <Button type="submit" variant="secondary" disabled={submitting}>
          {submitting ? "Modification…" : "Changer le mot de passe"}
        </Button>
      </div>
    </form>
  );
}
