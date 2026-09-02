import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { DeleteAccountForm } from "@/components/profile/DeleteAccountForm";
import { DisplayNameForm } from "@/components/profile/DisplayNameForm";
import { PasswordForm } from "@/components/profile/PasswordForm";
import { Card } from "@/components/ui/Card";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Profil — CardTable",
};

export default async function ProfilPage() {
  const session = await getSession();
  if (!session) redirect("/connexion");

  const { user } = session;

  return (
    <div className="felt-texture flex flex-1 flex-col">
      <AppHeader displayName={user.displayName} />

      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
        <h1 className="animate-rise font-display text-3xl font-semibold tracking-tight text-cream-100">
          Profil
        </h1>
        <p className="animate-rise mt-2 text-cream-500">
          Compte créé le{" "}
          {new Date(user.createdAt).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <div className="mt-8 flex flex-col gap-5">
          <Card>
            <h2 className="font-display text-lg font-semibold text-cream-100">Identité</h2>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-cream-500">Pseudo</dt>
                <dd className="mt-0.5 text-cream-100">@{user.username}</dd>
              </div>
              <div>
                <dt className="text-cream-500">Adresse e-mail</dt>
                <dd className="mt-0.5 break-all text-cream-100">{user.email}</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-cream-500">
              Le pseudo et l&apos;e-mail ne sont pas modifiables pour l&apos;instant.
            </p>
            <div className="mt-6 border-t border-ink-700 pt-6">
              <DisplayNameForm currentDisplayName={user.displayName} />
            </div>
          </Card>

          <Card>
            <h2 className="font-display text-lg font-semibold text-cream-100">Mot de passe</h2>
            <p className="mt-1.5 text-sm text-cream-500">
              Changer ton mot de passe déconnecte tous tes autres appareils.
            </p>
            <div className="mt-5">
              <PasswordForm />
            </div>
          </Card>

          <Card className="border-ruby-600/40">
            <h2 className="font-display text-lg font-semibold text-ruby-400">Zone dangereuse</h2>
            <div className="mt-4">
              <DeleteAccountForm />
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
