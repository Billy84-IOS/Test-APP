import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export function Input({ label, hint, id, className = "", ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-cream-300">
        {label}
      </label>
      <input
        {...props}
        id={inputId}
        className={`min-h-11 rounded-xl border border-ink-600 bg-ink-900 px-4 py-2.5 text-cream-100 placeholder:text-cream-500/60 focus:border-gold-500/60 focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-gold-500/30 ${className}`}
      />
      {hint && <p className="text-xs text-cream-500">{hint}</p>}
    </div>
  );
}
