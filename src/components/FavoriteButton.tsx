import { useProgress } from '../context/ProgressContext'

export function FavoriteButton({ kind, itemId }: { kind: 'vocab' | 'phrases' | 'conversations' | 'lessons'; itemId: string }) {
  const { isFavorite, toggleFavorite } = useProgress()
  const active = isFavorite(kind, itemId)
  return (
    <button
      type="button"
      onClick={() => toggleFavorite(kind, itemId)}
      aria-pressed={active}
      aria-label={active ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      className={`w-9 h-9 flex items-center justify-center rounded-full transition active:scale-95 ${active ? 'text-brand-500' : 'text-gray-300 hover:text-gray-400'}`}
    >
      {active ? '★' : '☆'}
    </button>
  )
}
