import { useState } from 'react'
import { Link } from 'react-router-dom'
import { conversations } from '../data/conversations'
import { AudioButton } from '../components/AudioButton'
import { QuizRunner } from '../components/QuizRunner'

function randomConversation() {
  return conversations[Math.floor(Math.random() * conversations.length)]
}

export function Comprendre() {
  const [conversation, setConversation] = useState(randomConversation)
  const [revealed, setRevealed] = useState<number[]>([])
  const [showQuiz, setShowQuiz] = useState(false)

  const reset = () => {
    setConversation(randomConversation())
    setRevealed([])
    setShowQuiz(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-1">👂 Je veux comprendre</h1>
      <p className="text-gray-500 mb-6">Écoute chaque réplique, essaie de comprendre avant de révéler.</p>

      <div className="flex items-center justify-between mb-4">
        <p className="font-semibold">{conversation.icon} {conversation.title}</p>
        <button onClick={reset} className="text-sm text-brand-600 font-medium">🔀 Autre dialogue</button>
      </div>

      <div className="space-y-3">
        {conversation.lines.map((line, i) => {
          const isRevealed = revealed.includes(i)
          return (
            <div key={i} className="bg-white border border-sand-200 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">{line.speaker}</p>
              <div className="flex items-center justify-between gap-2">
                <AudioButton text={line.darija} size="sm" />
                {!isRevealed ? (
                  <button onClick={() => setRevealed((r) => [...r, i])} className="text-sm text-teal-600 font-medium">
                    Révéler
                  </button>
                ) : (
                  <span className="text-xs text-gray-300">révélé</span>
                )}
              </div>
              {isRevealed && (
                <div className="mt-2">
                  <p className="font-arabic">{line.darija}</p>
                  <p className="text-xs text-gray-400">{line.translit}</p>
                  <p className="text-sm text-brand-600">{line.fr}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6">
        {revealed.length === conversation.lines.length && conversation.quiz.length > 0 && !showQuiz && (
          <button onClick={() => setShowQuiz(true)} className="w-full py-3 rounded-xl bg-brand-500 text-white font-semibold">
            Vérifier ma compréhension
          </button>
        )}
        {showQuiz && <QuizRunner questions={conversation.quiz} />}
      </div>

      <Link to="/ecouter" className="block text-center mt-6 text-sm text-gray-400">Passer au mode écoute par niveau →</Link>
    </div>
  )
}
