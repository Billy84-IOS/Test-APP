import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { conversations } from '../data/conversations'
import { AudioButton } from '../components/AudioButton'
import { FavoriteButton } from '../components/FavoriteButton'
import { QuizRunner } from '../components/QuizRunner'
import { useProgress } from '../context/ProgressContext'

export function ConversationDetail() {
  const { conversationId } = useParams()
  const { addXp } = useProgress()
  const [hideTranslation, setHideTranslation] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const conversation = conversations.find((c) => c.id === conversationId)

  if (!conversation) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 text-center">
        <p className="text-gray-500">Conversation introuvable.</p>
        <Link to="/conversations" className="text-brand-600 font-medium">Retour</Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-16">
      <Link to="/conversations" className="text-sm text-gray-400 mb-2 inline-block">← Toutes les conversations</Link>
      <div className="flex items-start justify-between gap-2 mb-1">
        <h1 className="text-2xl font-bold">{conversation.icon} {conversation.title}</h1>
        <FavoriteButton kind="conversations" itemId={conversation.id} />
      </div>
      <p className="text-gray-500 mb-4">{conversation.situation}</p>

      <button
        onClick={() => setHideTranslation((v) => !v)}
        className="mb-4 text-sm px-3 py-1.5 rounded-full bg-sand-100 font-medium"
      >
        {hideTranslation ? '👁️ Afficher la traduction' : '🙈 Cacher la traduction'}
      </button>

      <div className="space-y-3">
        {conversation.lines.map((line, i) => (
          <div key={i} className="bg-white border border-sand-200 rounded-xl p-3">
            <p className="text-xs text-gray-400 mb-1">{line.speaker}</p>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-arabic text-lg">{line.darija}</p>
                <p className="text-sm text-gray-500">{line.translit}</p>
                {!hideTranslation && <p className="text-sm text-brand-600 mt-1">{line.fr}</p>}
              </div>
              <AudioButton text={line.darija} size="sm" />
            </div>
          </div>
        ))}
      </div>

      {conversation.quiz.length > 0 && (
        <div className="mt-6">
          {!showQuiz ? (
            <button
              onClick={() => { setShowQuiz(true); addXp(5) }}
              className="w-full py-3 rounded-xl bg-brand-500 text-white font-semibold"
            >
              ✏️ Vérifier ma compréhension
            </button>
          ) : (
            <QuizRunner questions={conversation.quiz} />
          )}
        </div>
      )}
    </div>
  )
}
