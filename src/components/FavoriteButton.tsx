import { Pressable, Text } from 'react-native'
import { useProgress } from '../context/ProgressContext'

export function FavoriteButton({ kind, itemId }: { kind: 'vocab' | 'phrases' | 'conversations' | 'lessons'; itemId: string }) {
  const { isFavorite, toggleFavorite } = useProgress()
  const active = isFavorite(kind, itemId)
  return (
    <Pressable
      onPress={() => toggleFavorite(kind, itemId)}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={active ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      className="w-9 h-9 items-center justify-center active:opacity-60"
    >
      <Text className={`text-xl ${active ? 'text-brand-500' : 'text-gray-300'}`}>{active ? '★' : '☆'}</Text>
    </Pressable>
  )
}
