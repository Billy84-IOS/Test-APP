import { useMemo, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { vocabulary } from '../data/vocabulary'
import { phrases } from '../data/phrases'
import { verbs } from '../data/verbs'
import { FlashCard } from '../components/FlashCard'
import { useProgress } from '../context/ProgressContext'
import { isDue, difficultyLabel } from '../lib/srs'
import { ProgressBar } from '../components/ProgressBar'

interface FlashItem {
  id: string
  itemType: 'vocab' | 'phrase' | 'verb'
  front: string
  frontSub: string
  back: string
}

function buildPool(): FlashItem[] {
  const vocabItems: FlashItem[] = vocabulary.map((v) => ({ id: v.id, itemType: 'vocab', front: v.darija, frontSub: v.translit, back: v.fr }))
  const phraseItems: FlashItem[] = phrases.map((p) => ({ id: p.id, itemType: 'phrase', front: p.darija, frontSub: p.translit, back: p.fr }))
  const verbItems: FlashItem[] = verbs.map((v) => ({ id: v.id, itemType: 'verb', front: v.infinitive, frontSub: v.translit, back: v.fr }))
  return [...vocabItems, ...phraseItems, ...verbItems]
}

export function ReviewScreen() {
  const { progress, reviewItem } = useProgress()
  const pool = useMemo(() => buildPool(), [])
  const [sessionIndex, setSessionIndex] = useState(0)

  const dueItems = pool.filter((item) => {
    const entry = progress.srs[item.id]
    return entry && isDue(entry)
  })
  const newItems = pool.filter((item) => !progress.srs[item.id])
  const queue = [...dueItems, ...newItems.slice(0, Math.max(0, 20 - dueItems.length))]
  const total = queue.length
  const current = queue[sessionIndex]

  const masteredCount = Object.values(progress.srs).filter((e) => difficultyLabel(e) === 'maîtrisé').length
  const difficultCount = Object.values(progress.srs).filter((e) => difficultyLabel(e) === 'difficile').length

  const handleAnswer = (known: boolean) => {
    reviewItem(current.id, current.itemType, known)
    setSessionIndex((i) => i + 1)
  }

  return (
    <ScrollView className="flex-1 bg-sand-50" contentContainerStyle={{ padding: 16 }}>
      <Text className="text-2xl font-bold mb-1">🔁 Révisions</Text>
      <Text className="text-gray-500 mb-4">Répétition espacée : les mots difficiles reviennent plus souvent.</Text>

      <View className="flex-row gap-2 mb-6">
        <View className="flex-1 bg-white border border-sand-200 rounded-xl p-3 items-center">
          <Text className="text-lg font-bold text-brand-600">{dueItems.length}</Text>
          <Text className="text-xs text-gray-400">à revoir</Text>
        </View>
        <View className="flex-1 bg-white border border-sand-200 rounded-xl p-3 items-center">
          <Text className="text-lg font-bold text-amber-500">{difficultCount}</Text>
          <Text className="text-xs text-gray-400">difficiles</Text>
        </View>
        <View className="flex-1 bg-white border border-sand-200 rounded-xl p-3 items-center">
          <Text className="text-lg font-bold text-teal-600">{masteredCount}</Text>
          <Text className="text-xs text-gray-400">maîtrisés</Text>
        </View>
      </View>

      {total === 0 ? (
        <Text className="text-center text-gray-400 py-10">Aucune carte à réviser pour l'instant. Reviens plus tard ou explore le vocabulaire !</Text>
      ) : sessionIndex >= total ? (
        <View className="items-center py-10">
          <Text className="text-5xl mb-3">🎉</Text>
          <Text className="text-xl font-bold">Session terminée !</Text>
          <Text className="text-gray-500">Tu as révisé {total} cartes.</Text>
        </View>
      ) : (
        <View>
          <View className="mb-4">
            <ProgressBar value={sessionIndex} max={total} color="bg-brand-500" />
            <Text className="text-xs text-gray-400 mt-1 text-center">{sessionIndex + 1} / {total}</Text>
          </View>
          <FlashCard
            front={current.front}
            frontSub={current.frontSub}
            back={current.back}
            onKnow={() => handleAnswer(true)}
            onDontKnow={() => handleAnswer(false)}
          />
        </View>
      )}
    </ScrollView>
  )
}
