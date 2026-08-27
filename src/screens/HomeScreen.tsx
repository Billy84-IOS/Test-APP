import { Link, useRouter } from 'expo-router'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { useProgress } from '../context/ProgressContext'
import { lessons } from '../data/lessons'
import { levels } from '../data/categories'
import { ProgressBar } from '../components/ProgressBar'

const QUICK_ACCESS = [
  { href: '/au-maroc?cat=transports', label: 'Taxi', icon: '🚕' },
  { href: '/au-maroc?cat=restaurant', label: 'Restaurant', icon: '🍽️' },
  { href: '/au-maroc?cat=shopping', label: 'Shopping', icon: '🛍️' },
  { href: '/au-maroc?cat=hotel', label: 'Hôtel', icon: '🏨' },
  { href: '/au-maroc?cat=ville', label: 'Directions', icon: '🗺️' },
  { href: '/au-maroc?cat=argent', label: 'Prix', icon: '💰' },
] as const

export function HomeScreen() {
  const { progress } = useProgress()
  const router = useRouter()

  const nextLesson = lessons.find((l) => !progress.completedLessonIds.includes(l.id))
  const currentLevelInfo = levels.find((l) => l.level === (nextLesson?.level ?? 0))
  const completedCount = progress.completedLessonIds.length

  return (
    <ScrollView className="flex-1 bg-sand-50" contentContainerStyle={{ padding: 16, gap: 20 }}>
      <View>
        <Text className="text-2xl font-bold mb-1">🇲🇦 Apprends la Darija</Text>
        <Text className="text-gray-500">Commence à parler marocain, gratuitement.</Text>
      </View>

      <View className="bg-white rounded-2xl border border-sand-200 p-5">
        <View className="flex-row justify-between mb-2">
          <Text className="text-sm font-medium text-gray-500">Ta progression</Text>
          <Text className="text-sm font-semibold text-brand-600">{completedCount} / {lessons.length} leçons</Text>
        </View>
        <ProgressBar value={completedCount} max={lessons.length} />
      </View>

      {nextLesson && (
        <Pressable
          onPress={() => router.push(`/apprendre/${nextLesson.id}`)}
          className="bg-brand-500 rounded-2xl p-5"
        >
          <Text className="text-xs uppercase tracking-wide text-brand-100 mb-1">
            {currentLevelInfo?.icon} Niveau {nextLesson.level} · {currentLevelInfo?.title}
          </Text>
          <Text className="text-lg font-bold text-white">{nextLesson.icon} Leçon du jour : {nextLesson.title}</Text>
          <Text className="text-brand-100 text-sm mt-1">{nextLesson.description}</Text>
        </Pressable>
      )}

      <View className="flex-row gap-3">
        <Link href="/parler" asChild>
          <Pressable className="flex-1 bg-teal-500 rounded-2xl p-4">
            <Text className="text-2xl mb-1">🗣️</Text>
            <Text className="font-semibold text-white">Je veux parler</Text>
            <Text className="text-xs text-teal-50">Phrases et répétition</Text>
          </Pressable>
        </Link>
        <Link href="/comprendre" asChild>
          <Pressable className="flex-1 bg-gold-400 rounded-2xl p-4">
            <Text className="text-2xl mb-1">👂</Text>
            <Text className="font-semibold text-white">Je veux comprendre</Text>
            <Text className="text-xs text-white/80">Écoute et dialogues</Text>
          </Pressable>
        </Link>
      </View>

      <Link href="/traduire" asChild>
        <Pressable className="bg-white border-2 border-brand-400 rounded-2xl p-4 flex-row items-center gap-3">
          <Text className="text-3xl">⚡</Text>
          <View className="flex-1">
            <Text className="font-bold text-brand-600">Traduction en direct</Text>
            <Text className="text-xs text-gray-500">Écris une phrase en français, vois sa traduction en Darija instantanément</Text>
          </View>
        </Pressable>
      </Link>

      <View className="flex-row flex-wrap gap-3">
        <Link href="/revisions" asChild>
          <Pressable className="flex-1 min-w-[45%] bg-white border border-sand-200 rounded-2xl p-4">
            <Text className="text-xl mb-1">🔁</Text>
            <Text className="font-medium text-sm">Réviser mes mots</Text>
          </Pressable>
        </Link>
        <Link href="/conversations" asChild>
          <Pressable className="flex-1 min-w-[45%] bg-white border border-sand-200 rounded-2xl p-4">
            <Text className="text-xl mb-1">💬</Text>
            <Text className="font-medium text-sm">Pratiquer une conversation</Text>
          </Pressable>
        </Link>
        <Link href="/vocabulaire" asChild>
          <Pressable className="flex-1 min-w-[45%] bg-white border border-sand-200 rounded-2xl p-4">
            <Text className="text-xl mb-1">🗂️</Text>
            <Text className="font-medium text-sm">Explorer le vocabulaire</Text>
          </Pressable>
        </Link>
        <Link href="/dictionnaire" asChild>
          <Pressable className="flex-1 min-w-[45%] bg-white border border-sand-200 rounded-2xl p-4">
            <Text className="text-xl mb-1">📕</Text>
            <Text className="font-medium text-sm">Dictionnaire</Text>
          </Pressable>
        </Link>
      </View>

      <View>
        <Text className="font-semibold mb-3">🇲🇦 Je suis au Maroc — accès rapide</Text>
        <View className="flex-row flex-wrap gap-2">
          {QUICK_ACCESS.map((q) => (
            <Link key={q.label} href={q.href as never} asChild>
              <Pressable className="w-[30%] bg-white border border-sand-200 rounded-xl p-3 items-center">
                <Text className="text-xl">{q.icon}</Text>
                <Text className="text-xs font-medium mt-1">{q.label}</Text>
              </Pressable>
            </Link>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}
