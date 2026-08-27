import { useMemo, useState } from 'react'
import { useRouter } from 'expo-router'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { phrases } from '../data/phrases'
import { speak } from '../lib/tts'
import { useProgress } from '../context/ProgressContext'

function pickSession() {
  return [...phrases].sort(() => 0.5 - Math.random()).slice(0, 8)
}

export function ParlerScreen() {
  const { reviewItem } = useProgress()
  const router = useRouter()
  const [session, setSession] = useState(pickSession)
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const current = session[index]
  const done = index >= session.length

  const next = (success: boolean) => {
    reviewItem(current.id, 'phrase', success)
    setRevealed(false)
    setIndex((i) => i + 1)
  }

  const restart = () => {
    setSession(pickSession())
    setIndex(0)
    setRevealed(false)
  }

  const progressLabel = useMemo(() => `${Math.min(index + 1, session.length)} / ${session.length}`, [index, session.length])

  return (
    <ScrollView className="flex-1 bg-sand-50" contentContainerStyle={{ padding: 16, flexGrow: 1 }}>
      <Text className="text-gray-500 mb-6">Direct à l'essentiel : écoute, répète, on corrige ensemble.</Text>

      {done ? (
        <View className="items-center py-10">
          <Text className="text-5xl mb-3">🎉</Text>
          <Text className="text-xl font-bold mb-4">Session terminée !</Text>
          <View className="flex-row gap-2">
            <Pressable onPress={restart} className="px-4 py-2 bg-brand-500 rounded-xl">
              <Text className="text-white font-medium">Nouvelle session</Text>
            </Pressable>
            <Pressable onPress={() => router.push('/conversations')} className="px-4 py-2 bg-sand-100 rounded-xl">
              <Text className="font-medium">Pratiquer un dialogue</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View>
          <Text className="text-xs text-gray-400 text-center mb-3">{progressLabel}</Text>
          <View className="bg-white border border-sand-200 rounded-3xl p-6 items-center">
            <Text className="text-sm text-gray-400 mb-2">Comment dit-on...</Text>
            <Text className="text-xl font-semibold mb-4 text-center">{current.fr}</Text>

            {!revealed ? (
              <Pressable onPress={() => setRevealed(true)} className="px-5 py-2.5 bg-brand-500 rounded-xl">
                <Text className="text-white font-medium">Voir la réponse</Text>
              </Pressable>
            ) : (
              <View className="items-center">
                <Text className="text-2xl mb-1">{current.darija}</Text>
                <Text className="text-gray-400 mb-4">{current.translit}</Text>
                <View className="flex-row gap-2 mb-4">
                  <Pressable onPress={() => speak(current.darija)} className="px-4 py-2 bg-teal-500 rounded-xl">
                    <Text className="text-white text-sm font-medium">🔊 Écouter</Text>
                  </Pressable>
                  <Pressable onPress={() => speak(current.darija, 'lent')} className="px-4 py-2 bg-sand-100 rounded-xl">
                    <Text className="text-sm font-medium">🐢 Lentement</Text>
                  </Pressable>
                </View>
                <Text className="text-xs text-gray-400 mb-3 text-center">Répète-la à voix haute, puis dis si tu l'as réussie.</Text>
                <View className="flex-row gap-2">
                  <Pressable onPress={() => next(false)} className="px-4 py-2 bg-white border border-sand-200 rounded-xl">
                    <Text className="font-medium">😕 À revoir</Text>
                  </Pressable>
                  <Pressable onPress={() => next(true)} className="px-4 py-2 bg-teal-500 rounded-xl">
                    <Text className="text-white font-medium">✅ Réussi</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  )
}
