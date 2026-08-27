import { useMemo, useState } from 'react'
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

export function Exercises() {
  const [active, setActive] = useState<ExerciseKind | null>(null)
  const exercise = EXERCISES.find((e) => e.kind === active)
  const quiz = useMemo(() => exercise?.generate() ?? [], [exercise])

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-1">✏️ Exercices</h1>
      <p className="text-gray-500 mb-6">Choisis un type d'exercice pour t'entraîner.</p>

      {!active ? (
        <div className="grid sm:grid-cols-2 gap-3">
          {EXERCISES.map((e) => (
            <button
              key={e.kind}
              onClick={() => setActive(e.kind)}
              className="text-left bg-white border border-sand-200 rounded-xl p-4 flex items-center gap-3 active:scale-[0.98] transition"
            >
              <span className="text-2xl">{e.icon}</span>
              <div>
                <p className="font-semibold text-sm">{e.label}</p>
                <p className="text-xs text-gray-400">{e.desc}</p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setActive(null)} className="text-sm text-gray-400 mb-2">← Choisir un autre exercice</button>
          <QuizRunner questions={quiz} />
        </div>
      )}
    </div>
  )
}
