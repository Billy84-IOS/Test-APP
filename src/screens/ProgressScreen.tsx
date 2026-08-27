import { useRouter } from 'expo-router'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { useProgress } from '../context/ProgressContext'
import { lessons } from '../data/lessons'
import { difficultyLabel } from '../lib/srs'
import { ProgressBar } from '../components/ProgressBar'

function xpLevel(xp: number) {
  return Math.floor(xp / 150) + 1
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View className="w-[23%] bg-white border border-sand-200 rounded-xl p-3 items-center mb-2">
      <Text className="text-lg font-bold text-brand-600">{value}</Text>
      <Text className="text-xs text-gray-400 text-center">{label}</Text>
    </View>
  )
}

export function ProgressScreen() {
  const { progress } = useProgress()
  const router = useRouter()
  const srsEntries = Object.values(progress.srs)
  const wordsLearned = srsEntries.filter((e) => e.itemType === 'vocab' && e.timesReviewed > 0).length
  const phrasesLearned = srsEntries.filter((e) => e.itemType === 'phrase' && e.timesReviewed > 0).length
  const mastered = srsEntries.filter((e) => difficultyLabel(e) === 'maîtrisé').length
  const level = xpLevel(progress.xp)
  const xpIntoLevel = progress.xp % 150
  const successRate = progress.stats.totalAnswers > 0 ? Math.round((progress.stats.correctAnswers / progress.stats.totalAnswers) * 100) : 0
  const nextLesson = lessons.find((l) => !progress.completedLessonIds.includes(l.id))

  return (
    <ScrollView className="flex-1 bg-sand-50" contentContainerStyle={{ padding: 16 }}>
      <Text className="text-2xl font-bold mb-1">📈 Progrès</Text>
      <Text className="text-gray-500 mb-6">Toute ta progression, sauvegardée sur cet appareil.</Text>

      <View className="bg-white border border-sand-200 rounded-2xl p-5 mb-4">
        <View className="flex-row justify-between mb-2">
          <Text className="font-semibold">Niveau {level}</Text>
          <Text className="text-sm text-gray-400">{xpIntoLevel} / 150 XP</Text>
        </View>
        <ProgressBar value={xpIntoLevel} max={150} />
      </View>

      <View className="flex-row flex-wrap justify-between mb-6">
        <Stat label="Série de jours" value={`${progress.streakDays} 🔥`} />
        <Stat label="Leçons terminées" value={`${progress.completedLessonIds.length}/${lessons.length}`} />
        <Stat label="Mots appris" value={String(wordsLearned)} />
        <Stat label="Phrases apprises" value={String(phrasesLearned)} />
        <Stat label="Mots maîtrisés" value={String(mastered)} />
        <Stat label="Quiz effectués" value={String(progress.stats.quizzesTaken)} />
        <Stat label="Taux de réussite" value={`${successRate}%`} />
        <Stat label="Temps (min)" value={String(progress.stats.timeSpentMinutes)} />
      </View>

      {nextLesson && (
        <View className="bg-brand-50 border border-brand-100 rounded-2xl p-4">
          <Text className="text-sm font-medium text-brand-600 mb-2">Prochaine recommandation</Text>
          <Pressable onPress={() => router.push(`/apprendre/${nextLesson.id}`)} className="flex-row items-center gap-3">
            <Text className="text-2xl">{nextLesson.icon}</Text>
            <Text className="font-medium">{nextLesson.title}</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  )
}
