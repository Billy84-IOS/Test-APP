import { useMemo, useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { QuizRunner } from '../components/QuizRunner'
import {
  generateVocabQcm,
  generateFrToDarijaQcm,
  generatePhraseQuiz,
  generateReorderQuiz,
  generateVerbQuiz,
} from '../lib/quizGen'
import type { QuizQuestion } from '../types'

type ExerciseKind = 'vocab-fr' | 'vocab-darija' | 'phrases' | 'reorder' | 'verbs'

const EXERCISES: { kind: ExerciseKind; label: string; icon: string; desc: string; generate: () => QuizQuestion[] }[] = [
  { kind: 'vocab-fr', label: 'Darija → Français', icon: '🇲🇦', desc: 'Traduis le mot Darija', generate: () => generateVocabQcm(10) },
  { kind: 'vocab-darija', label: 'Français → Darija', icon: '🇫🇷', desc: 'Trouve la traduction en Darija', generate: () => generateFrToDarijaQcm(10) },
  { kind: 'phrases', label: 'Phrases', icon: '💬', desc: 'QCM sur les phrases essentielles', generate: () => generatePhraseQuiz(10) },
  { kind: 'reorder', label: 'Remettre en ordre', icon: '🔀', desc: 'Reconstitue la phrase Darija', generate: () => generateReorderQuiz(6) },
  { kind: 'verbs', label: 'Conjugaison', icon: '🏃', desc: 'Teste tes conjugaisons de verbes', generate: () => generateVerbQuiz(8) },
]

export function ExercisesScreen() {
  const [active, setActive] = useState<ExerciseKind | null>(null)
  const exercise = EXERCISES.find((e) => e.kind === active)
  const quiz = useMemo(() => exercise?.generate() ?? [], [exercise])

  return (
    <ScrollView className="flex-1 bg-sand-50" contentContainerStyle={{ padding: 16 }}>
      <Text className="text-2xl font-bold mb-1">✏️ Exercices</Text>
      <Text className="text-gray-500 mb-6">Choisis un type d'exercice pour t'entraîner.</Text>

      {!active ? (
        <View className="gap-3">
          {EXERCISES.map((e) => (
            <Pressable
              key={e.kind}
              onPress={() => setActive(e.kind)}
              className="bg-white border border-sand-200 rounded-xl p-4 flex-row items-center gap-3"
            >
              <Text className="text-2xl">{e.icon}</Text>
              <View className="flex-1">
                <Text className="font-semibold text-sm">{e.label}</Text>
                <Text className="text-xs text-gray-400">{e.desc}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      ) : (
        <View>
          <Pressable onPress={() => setActive(null)} className="mb-2">
            <Text className="text-sm text-gray-400">← Choisir un autre exercice</Text>
          </Pressable>
          <QuizRunner questions={quiz} />
        </View>
      )}
    </ScrollView>
  )
}
