interface GameShowcaseCardProps {
  suit: "♠" | "♥" | "♦" | "♣";
  accent: "felt" | "gold" | "ruby";
  name: string;
  tagline: string;
  players: string;
}

const ACCENT_STYLES: Record<GameShowcaseCardProps["accent"], { ring: string; glow: string; suit: string; badge: string }> = {
  felt: {
    ring: "group-hover:border-felt-400/60",
    glow: "group-hover:shadow-glow-felt",
    suit: "text-felt-400",
    badge: "bg-felt-500/15 text-felt-300 ring-1 ring-inset ring-felt-400/30",
  },
  gold: {
    ring: "group-hover:border-gold-400/60",
    glow: "group-hover:shadow-glow-gold",
    suit: "text-gold-400",
    badge: "bg-gold-500/15 text-gold-300 ring-1 ring-inset ring-gold-400/30",
  },
  ruby: {
    ring: "group-hover:border-ruby-400/60",
    glow: "group-hover:shadow-[0_0_0_1px_rgba(224,71,90,0.3),0_8px_30px_-8px_rgba(192,41,60,0.45)]",
    suit: "text-ruby-400",
    badge: "bg-ruby-500/15 text-ruby-300 ring-1 ring-inset ring-ruby-400/30",
  },
};

export function GameShowcaseCard({ suit, accent, name, tagline, players }: GameShowcaseCardProps) {
  const styles = ACCENT_STYLES[accent];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-ink-600 bg-ink-850/80 p-6 transition-all duration-300 ${styles.ring} ${styles.glow}`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute -right-4 -top-6 select-none font-display text-[9rem] leading-none opacity-[0.06] ${styles.suit}`}
      >
        {suit}
      </span>

      <div className="relative flex items-start justify-between gap-4">
        <span className={`text-3xl ${styles.suit}`} aria-hidden>
          {suit}
        </span>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${styles.badge}`}>
          {players}
        </span>
      </div>

      <h3 className="relative mt-4 font-display text-2xl font-semibold text-cream-100">{name}</h3>
      <p className="relative mt-1.5 text-sm leading-relaxed text-cream-500">{tagline}</p>
    </div>
  );
}
