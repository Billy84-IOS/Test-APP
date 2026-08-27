import { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { lessons, wordsForIds } from '../data/lessons'
import { phrases } from '../data/phrases'
import { grammarPoints } from '../data/grammar'
import { verbs } from '../data/verbs'
import type { Verb } from '../types'
import { conversations } from '../data/conversations'
import { AudioButton } from '../components/AudioButton'
import { FavoriteButton } from '../components/FavoriteButton'
import { QuizRunner } from '../components/QuizRunner'
import { useProgress } from '../context/ProgressContext'

const PERSONS = ['ana', 'nta', 'nti', 'huwa', 'hiya', 'hna', 'ntuma', 'huma'] as const

function VerbCard({ verb }: { verb: Verb }) {
  const [open, setOpen] = useState(false)
  return (
    <View className="bg-white border border-sand-200 rounded-xl p-4">
      <Pressable onPress={() => setOpen((o) => !o)} className="flex-row justify-between items-center">
        <Text className="font-semibold">{verb.translit} <Text className="text-gray-400 font-normal">— {verb.fr}</Text></Text>
        <Text className="text-gray-400">{open ? '▲' : '▼'}</Text>
      </Pressable>
      {open && (
        <View className="mt-3">
          <View className="flex-row border-b border-sand-100 pb-1 mb-1">
            <Text className="flex-1 text-xs text-gray-400">Pers.</Text>
            <Text className="flex-1 text-xs text-gray-400">Présent</Text>
            <Text className="flex-1 text-xs text-gray-400">Passé</Text>
            <Text className="flex-1 text-xs text-gray-400">Futur</Text>
          </View>
          {PERSONS.map((p) => (
            <View key={p} className="flex-row border-t border-sand-100 py-1">
              <Text className="flex-1 text-xs text-gray-400">{p}</Text>
              <Text className="flex-1 text-xs">{verb.presentTranslit[p]}</Text>
              <Text className="flex-1 text-xs">{verb.pastTranslit[p]}</Text>
              <Text className="flex-1 text-xs">{verb.futureTranslit[p]}</Text>
            </View>
          ))}
          <Text className="text-xs text-gray-400 mt-2">Négation : {verb.negativePattern}</Text>
          {verb.examples.map((ex, i) => (
            <Text key={i} className="text-sm mt-2">{ex.translit} — <Text className="text-gray-500">{ex.fr}</Text></Text>
          ))}
        </View>
      )}
    </View>
  )
}

export function LessonDetailScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>()
  const router = useRouter()
  const { completeLesson, progress } = useProgress()
  const [showQuiz, setShowQuiz] = useState(false)
  const lesson = lessons.find((l) => l.id === lessonId)

  if (!lesson) {
    return (
      <View className="flex-1 items-center justify-center bg-sand-50 p-6">
        <Text className="text-gray-500">Leçon introuvable.</Text>
      </View>
    )
  }

  const words = wordsForIds(lesson.vocabIds)
  const lessonPhrases = phrases.filter((p) => lesson.phraseIds.includes(p.id))
  const lessonGrammar = grammarPoints.filter((g) => lesson.grammarIds.includes(g.id))
  const lessonVerbs = verbs.filter((v) => lesson.verbIds.includes(v.id))
  const conversation = conversations.find((c) => c.id === lesson.conversationId)
  const done = progress.completedLessonIds.includes(lesson.id)
  const isEmpty = words.length === 0 && lessonPhrases.length === 0 && lessonGrammar.length === 0 && lessonVerbs.length === 0 && !conversation

  const finishLesson = () => {
    completeLesson(lesson.id)
    router.back()
  }

  return (
    <ScrollView className="flex-1 bg-sand-50" contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <Text className="text-2xl font-bold">{lesson.icon} {lesson.title}</Text>
      <Text className="text-gray-500 mb-6">{lesson.description}</Text>

      {isEmpty && (
        <View className="bg-sand-100 rounded-2xl p-5 mb-6">
          <Text className="text-gray-500 text-sm">
            Cette leçon est une introduction théorique — lis bien l'explication, aucune donnée supplémentaire n'est nécessaire ici.
          </Text>
        </View>
      )}

      {words.length > 0 && (
        <View className="mb-8">
          <Text className="font-semibold mb-3">🗂️ Vocabulaire</Text>
          <View className="gap-2">
            {words.map((w) => (
              <View key={w.id} className="bg-white border border-sand-200 rounded-xl p-3 flex-row items-center justify-between">
                <View className="flex-1 pr-2">
                  <Text className="text-lg">{w.darija}</Text>
                  <Text className="text-xs text-gray-400">{w.translit}</Text>
                  <Text className="text-sm font-medium">{w.fr}</Text>
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

      {lessonPhrases.length > 0 && (
        <View className="mb-8">
          <Text className="font-semibold mb-3">💬 Phrases</Text>
          <View className="gap-2">
            {lessonPhrases.map((p) => (
              <View key={p.id} className="bg-white border border-sand-200 rounded-xl p-3">
                <View className="flex-row items-start justify-between">
                  <View className="flex-1 pr-2">
                    <Text className="text-lg">{p.darija}</Text>
                    <Text className="text-xs text-gray-400">{p.translit}</Text>
                    <Text className="text-sm font-medium text-brand-600">{p.fr}</Text>
                    {p.explanation && <Text className="text-xs text-gray-400 mt-1">{p.explanation}</Text>}
                  </View>
                  <View className="flex-row items-center gap-1">
                    <AudioButton text={p.darija} size="sm" />
                    <FavoriteButton kind="phrases" itemId={p.id} />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {lessonGrammar.length > 0 && (
        <View className="mb-8">
          <Text className="font-semibold mb-3">📖 Grammaire</Text>
          <View className="gap-4">
            {lessonGrammar.map((g) => (
              <View key={g.id} className="bg-white border border-sand-200 rounded-xl p-4">
                <Text className="font-semibold mb-2">{g.title}</Text>
                <Text className="text-sm text-gray-600 mb-3">{g.explanation}</Text>
                {g.table && (
                  <View className="mb-3">
                    <View className="flex-row border-b border-sand-200 pb-1 mb-1">
                      {g.table.headers.map((h) => (
                        <Text key={h} className="flex-1 text-xs text-gray-400 font-medium">{h}</Text>
                      ))}
                    </View>
                    {g.table.rows.map((row, i) => (
                      <View key={i} className="flex-row border-t border-sand-100 py-1">
                        {row.map((cell, j) => (
                          <Text key={j} className="flex-1 text-sm">{cell}</Text>
                        ))}
                      </View>
                    ))}
                  </View>
                )}
                <View className="gap-1.5">
                  {g.examples.map((ex, i) => (
                    <Text key={i} className="text-sm">
                      {ex.darija} <Text className="text-gray-400">({ex.translit})</Text> — <Text className="text-gray-600">{ex.fr}</Text>
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {lessonVerbs.length > 0 && (
        <View className="mb-8">
          <Text className="font-semibold mb-3">🏃 Verbes</Text>
          <View className="gap-3">
            {lessonVerbs.map((v) => <VerbCard key={v.id} verb={v} />)}
          </View>
        </View>
      )}

      {conversation && (
        <View className="mb-8">
          <Text className="font-semibold mb-3">🎭 Conversation liée</Text>
          <Pressable
            onPress={() => router.push(`/conversations/${conversation.id}`)}
            className="flex-row items-center gap-3 bg-white border border-sand-200 rounded-xl p-4"
          >
            <Text className="text-2xl">{conversation.icon}</Text>
            <View className="flex-1">
              <Text className="font-medium">{conversation.title}</Text>
              <Text className="text-xs text-gray-400">{conversation.situation}</Text>
            </View>
          </Pressable>
        </View>
      )}

      {lesson.quiz.length > 0 && !showQuiz && (
        <Pressable onPress={() => setShowQuiz(true)} className="py-3 rounded-xl bg-sand-100 items-center mb-4">
          <Text className="font-semibold">✏️ Faire le mini-quiz ({lesson.quiz.length} questions)</Text>
        </Pressable>
      )}
      {showQuiz && <QuizRunner questions={lesson.quiz} />}

      <Pressable onPress={finishLesson} className="py-3.5 rounded-xl bg-brand-500 items-center mt-4">
        <Text className="text-white font-semibold">{done ? '✓ Leçon déjà terminée — revoir quand même' : 'Terminer la leçon'}</Text>
      </Pressable>
    </ScrollView>
  )
}
