import Link from "next/link";
import { LogoutButton } from "@/components/auth/LogoutButton";

interface AppHeaderProps {
  /** Nom affiché de l'utilisateur connecté, ou null si visiteur. */
  displayName?: string | null;
}

/** En-tête commun aux pages internes (dashboard, profil). */
export function AppHeader({ displayName = null }: AppHeaderProps) {
  return (
    <header className="border-b border-ink-800/80">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <Link href={displayName ? "/dashboard" : "/"} className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden>
            🃏
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-cream-100">
            CardTable
          </span>
        </Link>

        {displayName ? (
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/dashboard"
              className="rounded-lg px-3 py-2 text-cream-500 transition-colors hover:text-cream-100"
            >
              Tableau de bord
            </Link>
            <Link
              href="/profil"
              className="rounded-lg px-3 py-2 text-cream-500 transition-colors hover:text-cream-100"
            >
              Profil
            </Link>
            <LogoutButton />
          </nav>
        ) : (
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/connexion"
              className="rounded-lg px-3 py-2 text-cream-500 transition-colors hover:text-cream-100"
            >
              Connexion
            </Link>
            <Link
              href="/inscription"
              className="rounded-xl bg-gold-500 px-4 py-2 font-semibold text-ink-950 transition-colors hover:bg-gold-400"
            >
              Créer un compte
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
