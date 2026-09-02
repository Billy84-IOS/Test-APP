"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AUTH_RULES, type MeResponse } from "@cardtable/shared";
import { apiFetch } from "@/lib/api";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function DisplayNameForm({ currentDisplayName }: { currentDisplayName: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);

    const form = new FormData(event.currentTarget);

    try {
      await apiFetch<MeResponse>("/profile", {
        method: "PATCH",
        body: JSON.stringify({ displayName: String(form.get("displayName") ?? "").trim() }),
      });
      setSuccess("Nom affiché mis à jour.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {error && <Alert tone="error">{error}</Alert>}
      {success && <Alert tone="success">{success}</Alert>}

      <Input
        label="Nom affiché"
        name="displayName"
        defaultValue={currentDisplayName}
        required
        minLength={AUTH_RULES.displayName.min}
        maxLength={AUTH_RULES.displayName.max}
        hint="Visible par les autres joueurs à la table."
      />

      <div>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Enregistrement…" : "Enregistrer"}
        </Button>
      </div>
    </form>
  );
}
