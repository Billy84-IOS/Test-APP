import { useRouter } from 'expo-router'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { lessons } from '../data/lessons'
import { levels } from '../data/categories'
import { useProgress } from '../context/ProgressContext'

export function LearnScreen() {
  const { progress } = useProgress()
  const router = useRouter()

  return (
    <ScrollView className="flex-1 bg-sand-50" contentContainerStyle={{ padding: 16 }}>
      <Text className="text-2xl font-bold mb-1">📚 Apprendre</Text>
      <Text className="text-gray-500 mb-6">Ton parcours, du niveau débutant à conversationnel.</Text>

      <View className="gap-8">
        {levels.map((lvl) => {
          const levelLessons = lessons.filter((l) => l.level === lvl.level).sort((a, b) => a.order - b.order)
          if (levelLessons.length === 0) return null
          return (
            <View key={lvl.level}>
              <View className="flex-row items-center gap-2 mb-3">
                <Text className="text-2xl">{lvl.icon}</Text>
                <View>
                  <Text className="font-bold">Niveau {lvl.level} · {lvl.title}</Text>
                  <Text className="text-xs text-gray-400">{lvl.description}</Text>
                </View>
              </View>
              <View className="gap-2">
                {levelLessons.map((lesson) => {
                  const done = progress.completedLessonIds.includes(lesson.id)
                  return (
                    <Pressable
                      key={lesson.id}
                      onPress={() => router.push(`/apprendre/${lesson.id}`)}
                      className={`flex-row items-center gap-3 p-3 rounded-xl border ${done ? 'border-teal-300 bg-teal-50' : 'border-sand-200 bg-white'}`}
                    >
                      <Text className="text-2xl">{lesson.icon}</Text>
                      <View className="flex-1">
                        <Text className="font-medium text-sm">{lesson.title}</Text>
                        <Text className="text-xs text-gray-400" numberOfLines={1}>{lesson.description}</Text>
                      </View>
                      {done && <Text className="text-teal-500">✓</Text>}
                    </Pressable>
                  )
                })}
              </View>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}
