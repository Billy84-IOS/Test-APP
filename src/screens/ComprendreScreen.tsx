import { useState } from 'react'
import { useRouter } from 'expo-router'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { conversations } from '../data/conversations'
import { AudioButton } from '../components/AudioButton'
import { QuizRunner } from '../components/QuizRunner'

function randomConversation() {
  return conversations[Math.floor(Math.random() * conversations.length)]
}

export function ComprendreScreen() {
  const router = useRouter()
  const [conversation, setConversation] = useState(randomConversation)
  const [revealed, setRevealed] = useState<number[]>([])
  const [showQuiz, setShowQuiz] = useState(false)

  const reset = () => {
    setConversation(randomConversation())
    setRevealed([])
    setShowQuiz(false)
  }

  return (
    <ScrollView className="flex-1 bg-sand-50" contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
      <Text className="text-gray-500 mb-6">Écoute chaque réplique, essaie de comprendre avant de révéler.</Text>

      <View className="flex-row items-center justify-between mb-4">
        <Text className="font-semibold">{conversation.icon} {conversation.title}</Text>
        <Pressable onPress={reset}>
          <Text className="text-sm text-brand-600 font-medium">🔀 Autre dialogue</Text>
        </Pressable>
      </View>

      <View className="gap-3">
        {conversation.lines.map((line, i) => {
          const isRevealed = revealed.includes(i)
          return (
            <View key={i} className="bg-white border border-sand-200 rounded-xl p-3">
              <Text className="text-xs text-gray-400 mb-1">{line.speaker}</Text>
              <View className="flex-row items-center justify-between">
                <AudioButton text={line.darija} size="sm" />
                {!isRevealed ? (
                  <Pressable onPress={() => setRevealed((r) => [...r, i])}>
                    <Text className="text-sm text-teal-600 font-medium">Révéler</Text>
                  </Pressable>
                ) : (
                  <Text className="text-xs text-gray-300">révélé</Text>
                )}
              </View>
              {isRevealed && (
                <View className="mt-2">
                  <Text>{line.darija}</Text>
                  <Text className="text-xs text-gray-400">{line.translit}</Text>
                  <Text className="text-sm text-brand-600">{line.fr}</Text>
                </View>
              )}
            </View>
          )
        })}
      </View>

      <View className="mt-6">
        {revealed.length === conversation.lines.length && conversation.quiz.length > 0 && !showQuiz && (
          <Pressable onPress={() => setShowQuiz(true)} className="py-3 rounded-xl bg-brand-500 items-center">
            <Text className="text-white font-semibold">Vérifier ma compréhension</Text>
          </Pressable>
        )}
        {showQuiz && <QuizRunner questions={conversation.quiz} />}
      </View>

      <Pressable onPress={() => router.push('/ecouter')} className="mt-6">
        <Text className="text-center text-sm text-gray-400">Passer au mode écoute par niveau →</Text>
      </Pressable>
    </ScrollView>
  )
}
