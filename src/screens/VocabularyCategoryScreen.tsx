import { useLocalSearchParams } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'
import { categories } from '../data/categories'
import { vocabulary } from '../data/vocabulary'
import { AudioButton } from '../components/AudioButton'
import { FavoriteButton } from '../components/FavoriteButton'

export function VocabularyCategoryScreen() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>()
  const category = categories.find((c) => c.id === categoryId)
  const words = vocabulary.filter((v) => v.categoryId === categoryId)

  return (
    <ScrollView className="flex-1 bg-sand-50" contentContainerStyle={{ padding: 16 }}>
      <Text className="text-2xl font-bold mb-6">{category?.icon} {category?.name}</Text>
      {words.length === 0 ? (
        <Text className="text-gray-400">Aucun mot dans cette catégorie pour le moment.</Text>
      ) : (
        <View className="gap-2">
          {words.map((w) => (
            <View key={w.id} className="bg-white border border-sand-200 rounded-xl p-4 flex-row items-center justify-between">
              <View className="flex-1 pr-2">
                <Text className="text-xl">{w.darija}</Text>
                <Text className="text-xs text-gray-400">{w.translit}</Text>
                <Text className="font-medium">{w.fr}</Text>
                {w.example && <Text className="text-xs text-gray-400 mt-1">{w.example.translit} — {w.example.fr}</Text>}
              </View>
              <View className="flex-row items-center gap-1">
                <AudioButton text={w.darija} />
                <FavoriteButton kind="vocab" itemId={w.id} />
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  )
}
