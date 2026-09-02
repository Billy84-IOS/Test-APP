import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-gold-500 text-ink-950 hover:bg-gold-400 focus-visible:outline-gold-400 disabled:bg-gold-600/40 disabled:text-ink-950/50",
  secondary:
    "bg-felt-600 text-cream-100 hover:bg-felt-500 focus-visible:outline-felt-400 disabled:bg-felt-700/50 disabled:text-cream-500",
  ghost:
    "bg-transparent text-cream-300 ring-1 ring-inset ring-ink-600 hover:bg-ink-800 hover:text-cream-100 focus-visible:outline-cream-500",
  danger:
    "bg-ruby-600 text-cream-100 hover:bg-ruby-500 focus-visible:outline-ruby-400 disabled:bg-ruby-600/40",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      // min-h-11 : cible tactile confortable sur mobile
      className={`inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed ${VARIANTS[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
    />
  );
}
