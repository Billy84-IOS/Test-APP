import { useMemo, useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { vocabulary } from '../data/vocabulary'
import { phrases } from '../data/phrases'
import { conversations } from '../data/conversations'
import { QuizRunner } from '../components/QuizRunner'
import type { QuizQuestion } from '../types'

type Difficulty = 'facile' | 'moyen' | 'avance'

function buildPool(difficulty: Difficulty): { darija: string; fr: string }[] {
  if (difficulty === 'facile') return vocabulary.map((v) => ({ darija: v.darija, fr: v.fr }))
  if (difficulty === 'moyen') return phrases.map((p) => ({ darija: p.darija, fr: p.fr }))
  return conversations.flatMap((c) => c.lines.map((l) => ({ darija: l.darija, fr: l.fr })))
}

function buildQuiz(difficulty: Difficulty, count: number): QuizQuestion[] {
  const pool = buildPool(difficulty)
  const shuffled = [...pool].sort((a, b) => a.fr.length - b.fr.length)
  const picked = shuffled.slice(0, count)
  return picked.map((item, i) => {
    const distractors = shuffled.filter((p) => p.fr !== item.fr).slice(i * 2, i * 2 + 2).map((p) => p.fr)
    const choices = [item.fr, ...distractors].sort(() => (item.fr.length % 2 ? 1 : -1))
    return {
      id: `listen-${difficulty}-${i}`,
      type: 'listen-then-answer',
      prompt: 'Écoute et choisis la bonne traduction',
      promptAudio: { tts: item.darija },
      choices,
      correctAnswer: item.fr,
    }
  })
}

const LEVELS: { value: Difficulty; label: string; icon: string; desc: string }[] = [
  { value: 'facile', label: 'Facile', icon: '🌱', desc: 'Mots de vocabulaire isolés' },
  { value: 'moyen', label: 'Moyen', icon: '🗣️', desc: 'Phrases complètes' },
  { value: 'avance', label: 'Avancé', icon: '🔥', desc: 'Répliques de conversations réelles' },
]

export function ListenScreen() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null)
  const quiz = useMemo(() => (difficulty ? buildQuiz(difficulty, 10) : []), [difficulty])

  return (
    <ScrollView className="flex-1 bg-sand-50" contentContainerStyle={{ padding: 16 }}>
      <Text className="text-2xl font-bold mb-1">👂 Mode écoute</Text>
      <Text className="text-gray-500 mb-6">Entraîne ta compréhension orale : écoute, puis choisis la bonne traduction.</Text>

      {!difficulty ? (
        <View className="gap-3">
          {LEVELS.map((l) => (
            <Pressable key={l.value} onPress={() => setDifficulty(l.value)} className="bg-white border border-sand-200 rounded-xl p-4 flex-row items-center gap-3">
              <Text className="text-2xl">{l.icon}</Text>
              <View className="flex-1">
                <Text className="font-semibold">{l.label}</Text>
                <Text className="text-xs text-gray-400">{l.desc}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      ) : (
        <View>
          <Pressable onPress={() => setDifficulty(null)} className="mb-2">
            <Text className="text-sm text-gray-400">← Changer de niveau</Text>
          </Pressable>
          <QuizRunner questions={quiz} />
        </View>
      )}
    </ScrollView>
  )
}
