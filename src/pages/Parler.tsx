import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { phrases } from '../data/phrases'
import { speak } from '../lib/tts'
import { useProgress } from '../context/ProgressContext'

function pickSession() {
  return [...phrases].sort(() => 0.5 - Math.random()).slice(0, 8)
}

export function Parler() {
  const { reviewItem } = useProgress()
  const [session] = useState(pickSession)
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const current = session[index]

  const done = index >= session.length

  const next = (success: boolean) => {
    reviewItem(current.id, 'phrase', success)
    setRevealed(false)
    setIndex((i) => i + 1)
  }

  const progressLabel = useMemo(() => `${Math.min(index + 1, session.length)} / ${session.length}`, [index, session.length])

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-1">🗣️ Je veux parler</h1>
      <p className="text-gray-500 mb-6">Direct à l'essentiel : écoute, répète, on corrige ensemble.</p>

      {done ? (
        <div className="text-center py-10">
          <p className="text-5xl mb-3">🎉</p>
          <p className="text-xl font-bold mb-4">Session terminée !</p>
          <div className="flex gap-2 justify-center">
            <button onClick={() => window.location.reload()} className="px-4 py-2 bg-brand-500 text-white rounded-xl font-medium">
              Nouvelle session
            </button>
            <Link to="/conversations" className="px-4 py-2 bg-sand-100 rounded-xl font-medium">Pratiquer un dialogue</Link>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-xs text-gray-400 text-center mb-3">{progressLabel}</p>
          <div className="bg-white border border-sand-200 rounded-3xl p-6 text-center">
            <p className="text-sm text-gray-400 mb-2">Comment dit-on...</p>
            <p className="text-xl font-semibold mb-4">{current.fr}</p>

            {!revealed ? (
              <button onClick={() => setRevealed(true)} className="px-5 py-2.5 bg-brand-500 text-white rounded-xl font-medium">
                Voir la réponse
              </button>
            ) : (
              <div>
                <p className="font-arabic text-2xl mb-1">{current.darija}</p>
                <p className="text-gray-400 mb-4">{current.translit}</p>
                <div className="flex gap-2 justify-center mb-4">
                  <button onClick={() => speak(current.darija)} className="px-4 py-2 bg-teal-500 text-white rounded-xl text-sm font-medium">🔊 Écouter</button>
                  <button onClick={() => speak(current.darija, 'lent')} className="px-4 py-2 bg-sand-100 rounded-xl text-sm font-medium">🐢 Lentement</button>
                </div>
                <p className="text-xs text-gray-400 mb-3">Répète-la à voix haute, puis dis si tu l'as réussie.</p>
                <div className="flex gap-2 justify-center">
                  <button onClick={() => next(false)} className="px-4 py-2 bg-white border border-sand-200 rounded-xl font-medium">😕 À revoir</button>
                  <button onClick={() => next(true)} className="px-4 py-2 bg-teal-500 text-white rounded-xl font-medium">✅ Réussi</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
