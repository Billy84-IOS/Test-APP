import { useRouter } from 'expo-router'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { conversations } from '../data/conversations'
import { levels } from '../data/categories'

export function ConversationsScreen() {
  const router = useRouter()
  return (
    <ScrollView className="flex-1 bg-sand-50" contentContainerStyle={{ padding: 16 }}>
      <Text className="text-2xl font-bold mb-1">💬 Conversations</Text>
      <Text className="text-gray-500 mb-6">Des dialogues réalistes pour t'entraîner à de vraies situations.</Text>
      <View className="flex-row flex-wrap gap-3">
        {conversations.map((c) => {
          const lvl = levels.find((l) => l.level === c.level)
          return (
            <Pressable
              key={c.id}
              onPress={() => router.push(`/conversations/${c.id}`)}
              className="w-[47%] bg-white border border-sand-200 rounded-xl p-4"
            >
              <Text className="text-2xl mb-1">{c.icon}</Text>
              <Text className="font-medium">{c.title}</Text>
              <Text className="text-xs text-gray-400 mb-1" numberOfLines={2}>{c.situation}</Text>
              <Text className="text-xs text-brand-500">{lvl?.icon} Niveau {c.level}</Text>
            </Pressable>
          )
        })}
      </View>
    </ScrollView>
  )
}
