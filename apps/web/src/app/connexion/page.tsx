import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Connexion — CardTable",
};

export default async function ConnexionPage() {
  if (await getSession()) redirect("/dashboard");

  return (
    <AuthShell
      title="Content de te revoir"
      subtitle="Connecte-toi pour rejoindre tes amis à la table."
      footer={{ text: "Pas encore de compte ?", linkLabel: "En créer un", href: "/inscription" }}
    >
      <LoginForm />
    </AuthShell>
  );
}
