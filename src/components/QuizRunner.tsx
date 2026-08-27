import { useMemo, useState } from 'react'
import type { QuizQuestion } from '../types'
import { speak } from '../lib/tts'
import { useProgress } from '../context/ProgressContext'

const CHOICE_TYPES: QuizQuestion['type'][] = ['qcm', 'choose-translation', 'listen-word', 'listen-sentence', 'listen-then-answer']
const TYPE_TYPES: QuizQuestion['type'][] = ['darija-to-fr', 'fr-to-darija', 'fill-blank']

function normalize(s: string) {
  return s.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

export function QuizRunner({ questions, onFinish }: { questions: QuizQuestion[]; onFinish?: (score: number, total: number) => void }) {
  const { recordQuizAnswer } = useProgress()
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [typed, setTyped] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [reorderPicked, setReorderPicked] = useState<string[]>([])

  const question = questions[index]
  const shuffledWords = useMemo(() => (question?.words ? [...question.words].sort(() => (question.words!.indexOf(question.words![0]) % 2 ? 1 : -1)) : []), [question])

  if (questions.length === 0) {
    return <p className="text-gray-400 text-sm py-6">Aucun exercice disponible pour cette section pour le moment.</p>
  }

  if (index >= questions.length) {
    return (
      <div className="text-center py-10">
        <p className="text-5xl mb-3">🎉</p>
        <p className="text-xl font-bold mb-1">Terminé !</p>
        <p className="text-gray-500">Score : {score} / {questions.length}</p>
      </div>
    )
  }

  const advance = (correct: boolean) => {
    recordQuizAnswer(correct)
    const nextScore = score + (correct ? 1 : 0)
    setScore(nextScore)
    window.setTimeout(() => {
      setSelected(null)
      setTyped('')
      setRevealed(false)
      setReorderPicked([])
      const nextIndex = index + 1
      setIndex(nextIndex)
      if (nextIndex >= questions.length) onFinish?.(nextScore, questions.length)
    }, 700)
  }

  const handleChoice = (choice: string) => {
    if (selected) return
    setSelected(choice)
    advance(choice === question.correctAnswer)
  }

  const handleReorderWord = (word: string) => {
    if (revealed) return
    const next = [...reorderPicked, word]
    setReorderPicked(next)
    if (question.words && next.length === question.words.length) {
      const correct = next.join(' ') === question.correctAnswer
      setRevealed(true)
      advance(correct)
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
        <span>Question {index + 1} / {questions.length}</span>
        <span>Score : {score}</span>
      </div>

      <div className="bg-white rounded-2xl border border-sand-200 p-5 mb-4">
        <p className="font-semibold text-lg mb-1">{question.prompt}</p>
        {question.promptAudio && (
          <button
            type="button"
            onClick={() => speak(question.promptAudio!.tts)}
            className="mt-2 text-sm text-teal-600 flex items-center gap-1"
          >
            🔊 Écouter
          </button>
        )}
      </div>

      {CHOICE_TYPES.includes(question.type) && question.choices && (
        <div className="grid gap-2">
          {question.choices.map((choice) => {
            const isSelected = selected === choice
            const isCorrect = choice === question.correctAnswer
            const showState = selected !== null
            return (
              <button
                key={choice}
                type="button"
                disabled={selected !== null}
                onClick={() => handleChoice(choice)}
                className={`text-left px-4 py-3 rounded-xl border transition font-medium ${
                  showState && isCorrect
                    ? 'bg-green-50 border-green-400 text-green-700'
                    : showState && isSelected
                      ? 'bg-red-50 border-red-400 text-red-700'
                      : 'bg-white border-sand-200 hover:border-brand-400'
                }`}
              >
                {choice}
              </button>
            )
          })}
        </div>
      )}

      {question.type === 'reorder' && question.words && (
        <div>
          <div className="min-h-12 flex flex-wrap gap-2 mb-4 p-3 bg-white rounded-xl border border-sand-200">
            {reorderPicked.map((w, i) => (
              <span key={i} className="px-3 py-1.5 bg-brand-50 text-brand-600 rounded-lg text-sm font-medium">{w}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {shuffledWords.map((w, i) => (
              <button
                key={i}
                type="button"
                disabled={reorderPicked.includes(w) || revealed}
                onClick={() => handleReorderWord(w)}
                className="px-3 py-1.5 bg-sand-100 rounded-lg text-sm font-medium disabled:opacity-30"
              >
                {w}
              </button>
            ))}
          </div>
          {revealed && <p className="mt-3 text-sm text-gray-500">Réponse : {question.correctAnswer}</p>}
        </div>
      )}

      {TYPE_TYPES.includes(question.type) && (
        <div>
          <input
            type="text"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            disabled={revealed}
            placeholder="Écris ta réponse..."
            className="w-full px-4 py-3 rounded-xl border border-sand-200 mb-3 focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
          {!revealed ? (
            <button
              type="button"
              onClick={() => setRevealed(true)}
              disabled={typed.trim().length === 0}
              className="px-4 py-2 bg-brand-500 text-white rounded-xl font-medium disabled:opacity-40"
            >
              Vérifier
            </button>
          ) : (
            <div>
              <p className={`text-sm font-medium mb-2 ${normalize(typed) === normalize(question.correctAnswer) ? 'text-green-600' : 'text-amber-600'}`}>
                Réponse attendue : {question.correctAnswer}
              </p>
              <div className="flex gap-2">
                <button type="button" onClick={() => advance(true)} className="px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-medium">
                  J'avais juste
                </button>
                <button type="button" onClick={() => advance(false)} className="px-4 py-2 bg-sand-200 text-gray-600 rounded-xl text-sm font-medium">
                  Je me suis trompé
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {question.explanation && selected && (
        <p className="mt-3 text-sm text-gray-500 bg-sand-100 rounded-xl p-3">{question.explanation}</p>
      )}
    </div>
  )
}
