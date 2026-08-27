import { useRouter } from 'expo-router'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { useProgress } from '../context/ProgressContext'
import { vocabulary } from '../data/vocabulary'
import { phrases } from '../data/phrases'
import { conversations } from '../data/conversations'
import { lessons } from '../data/lessons'
import { AudioButton } from '../components/AudioButton'
import { FavoriteButton } from '../components/FavoriteButton'

export function FavoritesScreen() {
  const { progress } = useProgress()
  const router = useRouter()
  const favWords = vocabulary.filter((v) => progress.favorites.vocab.includes(v.id))
  const favPhrases = phrases.filter((p) => progress.favorites.phrases.includes(p.id))
  const favConversations = conversations.filter((c) => progress.favorites.conversations.includes(c.id))
  const favLessons = lessons.filter((l) => progress.favorites.lessons.includes(l.id))
  const empty = favWords.length === 0 && favPhrases.length === 0 && favConversations.length === 0 && favLessons.length === 0

  return (
    <ScrollView className="flex-1 bg-sand-50" contentContainerStyle={{ padding: 16 }}>
      <Text className="text-gray-500 mb-6">Tout ce que tu as marqué d'une étoile.</Text>

      {empty && <Text className="text-gray-400 text-sm">Rien pour l'instant. Touche l'étoile ☆ sur un mot, une phrase ou une conversation pour l'ajouter ici.</Text>}

      {favWords.length > 0 && (
        <View className="mb-6">
          <Text className="font-semibold mb-2">Vocabulaire</Text>
          <View className="gap-2">
            {favWords.map((w) => (
              <View key={w.id} className="bg-white border border-sand-200 rounded-xl p-3 flex-row items-center justify-between">
                <View>
                  <Text>{w.darija}</Text>
                  <Text className="text-xs text-gray-400">{w.translit} — {w.fr}</Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <AudioButton text={w.darija} size="sm" />
                  <FavoriteButton kind="vocab" itemId={w.id} />
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {favPhrases.length > 0 && (
        <View className="mb-6">
          <Text className="font-semibold mb-2">Phrases</Text>
          <View className="gap-2">
            {favPhrases.map((p) => (
              <View key={p.id} className="bg-white border border-sand-200 rounded-xl p-3 flex-row items-center justify-between">
                <View>
                  <Text>{p.darija}</Text>
                  <Text className="text-xs text-gray-400">{p.translit} — {p.fr}</Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <AudioButton text={p.darija} size="sm" />
                  <FavoriteButton kind="phrases" itemId={p.id} />
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {favConversations.length > 0 && (
        <View className="mb-6">
          <Text className="font-semibold mb-2">Conversations</Text>
          <View className="gap-2">
            {favConversations.map((c) => (
              <Pressable key={c.id} onPress={() => router.push(`/conversations/${c.id}`)} className="flex-row items-center gap-2 bg-white border border-sand-200 rounded-xl p-3">
                <Text className="text-xl">{c.icon}</Text>
                <Text className="font-medium text-sm">{c.title}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {favLessons.length > 0 && (
        <View>
          <Text className="font-semibold mb-2">Leçons</Text>
          <View className="gap-2">
            {favLessons.map((l) => (
              <Pressable key={l.id} onPress={() => router.push(`/apprendre/${l.id}`)} className="flex-row items-center gap-2 bg-white border border-sand-200 rounded-xl p-3">
                <Text className="text-xl">{l.icon}</Text>
                <Text className="font-medium text-sm">{l.title}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  )
}
