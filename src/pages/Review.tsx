import { useMemo, useState } from 'react'
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

export function Review() {
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
    <div className="max-w-lg mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-1">🔁 Révisions</h1>
      <p className="text-gray-500 mb-4">Répétition espacée : les mots difficiles reviennent plus souvent.</p>

      <div className="grid grid-cols-3 gap-2 mb-6 text-center">
        <div className="bg-white border border-sand-200 rounded-xl p-3">
          <p className="text-lg font-bold text-brand-600">{dueItems.length}</p>
          <p className="text-xs text-gray-400">à revoir</p>
        </div>
        <div className="bg-white border border-sand-200 rounded-xl p-3">
          <p className="text-lg font-bold text-amber-500">{difficultCount}</p>
          <p className="text-xs text-gray-400">difficiles</p>
        </div>
        <div className="bg-white border border-sand-200 rounded-xl p-3">
          <p className="text-lg font-bold text-teal-600">{masteredCount}</p>
          <p className="text-xs text-gray-400">maîtrisés</p>
        </div>
      </div>

      {total === 0 ? (
        <p className="text-center text-gray-400 py-10">Aucune carte à réviser pour l'instant. Reviens plus tard ou explore le vocabulaire !</p>
      ) : sessionIndex >= total ? (
        <div className="text-center py-10">
          <p className="text-5xl mb-3">🎉</p>
          <p className="text-xl font-bold">Session terminée !</p>
          <p className="text-gray-500">Tu as révisé {total} cartes.</p>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <ProgressBar value={sessionIndex} max={total} color="bg-brand-500" />
            <p className="text-xs text-gray-400 mt-1 text-center">{sessionIndex + 1} / {total}</p>
          </div>
          <FlashCard
            front={current.front}
            frontSub={current.frontSub}
            back={current.back}
            onKnow={() => handleAnswer(true)}
            onDontKnow={() => handleAnswer(false)}
          />
        </div>
      )}
    </div>
  )
}
