import { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { conversations } from '../data/conversations'
import { AudioButton } from '../components/AudioButton'
import { FavoriteButton } from '../components/FavoriteButton'
import { QuizRunner } from '../components/QuizRunner'
import { useProgress } from '../context/ProgressContext'

export function ConversationDetailScreen() {
  const { conversationId } = useLocalSearchParams<{ conversationId: string }>()
  const { addXp } = useProgress()
  const [hideTranslation, setHideTranslation] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const conversation = conversations.find((c) => c.id === conversationId)

  if (!conversation) {
    return (
      <View className="flex-1 items-center justify-center bg-sand-50 p-6">
        <Text className="text-gray-500">Conversation introuvable.</Text>
      </View>
    )
  }

  return (
    <ScrollView className="flex-1 bg-sand-50" contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
      <View className="flex-row items-start justify-between mb-1">
        <Text className="text-2xl font-bold flex-1">{conversation.icon} {conversation.title}</Text>
        <FavoriteButton kind="conversations" itemId={conversation.id} />
      </View>
      <Text className="text-gray-500 mb-4">{conversation.situation}</Text>

      <Pressable onPress={() => setHideTranslation((v) => !v)} className="mb-4 self-start px-3 py-1.5 rounded-full bg-sand-100">
        <Text className="text-sm font-medium">{hideTranslation ? '👁️ Afficher la traduction' : '🙈 Cacher la traduction'}</Text>
      </Pressable>

      <View className="gap-3">
        {conversation.lines.map((line, i) => (
          <View key={i} className="bg-white border border-sand-200 rounded-xl p-3">
            <Text className="text-xs text-gray-400 mb-1">{line.speaker}</Text>
            <View className="flex-row items-start justify-between">
              <View className="flex-1 pr-2">
                <Text className="text-lg">{line.darija}</Text>
                <Text className="text-sm text-gray-500">{line.translit}</Text>
                {!hideTranslation && <Text className="text-sm text-brand-600 mt-1">{line.fr}</Text>}
              </View>
              <AudioButton text={line.darija} size="sm" />
            </View>
          </View>
        ))}
      </View>

      {conversation.quiz.length > 0 && (
        <View className="mt-6">
          {!showQuiz ? (
            <Pressable
              onPress={() => { setShowQuiz(true); addXp(5) }}
              className="py-3 rounded-xl bg-brand-500 items-center"
            >
              <Text className="text-white font-semibold">✏️ Vérifier ma compréhension</Text>
            </Pressable>
          ) : (
            <QuizRunner questions={conversation.quiz} />
          )}
        </View>
      )}
    </ScrollView>
  )
}
