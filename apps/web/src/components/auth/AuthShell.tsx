import Link from "next/link";

interface AuthShellProps {
  title: string;
  subtitle: string;
  footer: { text: string; linkLabel: string; href: string };
  children: React.ReactNode;
}

/** Mise en page commune aux écrans d'inscription et de connexion. */
export function AuthShell({ title, subtitle, footer, children }: AuthShellProps) {
  return (
    <div className="felt-texture flex flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-12">
        <Link href="/" className="animate-rise mb-8 flex items-center justify-center gap-2">
          <span className="text-3xl" aria-hidden>
            🃏
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-cream-100">
            CardTable
          </span>
        </Link>

        <div className="animate-rise rounded-2xl border border-ink-700 bg-ink-900/80 p-7 shadow-glow-felt">
          <h1 className="font-display text-2xl font-semibold text-cream-100">{title}</h1>
          <p className="mt-1.5 text-sm leading-relaxed text-cream-500">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>

        <p className="animate-rise mt-6 text-center text-sm text-cream-500">
          {footer.text}{" "}
          <Link href={footer.href} className="font-semibold text-gold-400 hover:text-gold-300">
            {footer.linkLabel}
          </Link>
        </p>
      </div>
    </div>
  );
}
