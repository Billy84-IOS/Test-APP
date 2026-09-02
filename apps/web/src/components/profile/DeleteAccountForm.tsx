"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function DeleteAccountForm() {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = new FormData(event.currentTarget);

    try {
      await apiFetch<void>("/profile", {
        method: "DELETE",
        body: JSON.stringify({ password: String(form.get("password") ?? "") }),
      });
      router.replace("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setSubmitting(false);
    }
  }

  if (!confirming) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm leading-relaxed text-cream-500">
          La suppression est définitive : compte, statistiques, amis et
          historique de parties sont effacés et ne peuvent pas être récupérés.
        </p>
        <div>
          <Button type="button" variant="danger" onClick={() => setConfirming(true)}>
            Supprimer mon compte
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {error && <Alert tone="error">{error}</Alert>}

      <p className="text-sm leading-relaxed text-cream-300">
        Confirme avec ton mot de passe pour supprimer définitivement ton compte.
      </p>

      <Input
        label="Mot de passe"
        name="password"
        type="password"
        autoComplete="current-password"
        required
      />

      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="danger" disabled={submitting}>
          {submitting ? "Suppression…" : "Confirmer la suppression"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => setConfirming(false)} disabled={submitting}>
          Annuler
        </Button>
      </div>
    </form>
  );
}
