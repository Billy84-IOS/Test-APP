import { useRouter } from 'expo-router'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { categories } from '../data/categories'
import { vocabulary } from '../data/vocabulary'

export function VocabularyScreen() {
  const router = useRouter()
  return (
    <ScrollView className="flex-1 bg-sand-50" contentContainerStyle={{ padding: 16 }}>
      <Text className="text-2xl font-bold mb-1">🗂️ Vocabulaire</Text>
      <Text className="text-gray-500 mb-6">{vocabulary.length} mots organisés par catégorie.</Text>
      <View className="flex-row flex-wrap gap-3">
        {categories.map((cat) => {
          const count = vocabulary.filter((v) => v.categoryId === cat.id).length
          if (count === 0) return null
          return (
            <Pressable
              key={cat.id}
              onPress={() => router.push(`/vocabulaire/${cat.id}`)}
              className="w-[31%] bg-white border border-sand-200 rounded-xl p-4"
            >
              <Text className="text-2xl mb-1">{cat.icon}</Text>
              <Text className="font-medium text-sm">{cat.name}</Text>
              <Text className="text-xs text-gray-400">{count} mots</Text>
            </Pressable>
          )
        })}
      </View>
    </ScrollView>
  )
}
