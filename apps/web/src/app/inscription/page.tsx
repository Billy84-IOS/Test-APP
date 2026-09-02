import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Créer un compte — CardTable",
};

export default async function InscriptionPage() {
  // Déjà connecté : inutile de rester sur l'écran d'inscription.
  if (await getSession()) redirect("/dashboard");

  return (
    <AuthShell
      title="Créer un compte"
      subtitle="Quelques secondes, et ta table est prête."
      footer={{ text: "Tu as déjà un compte ?", linkLabel: "Se connecter", href: "/connexion" }}
    >
      <RegisterForm />
    </AuthShell>
  );
}
