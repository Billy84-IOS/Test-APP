import { useState } from 'react'
import { AudioButton } from './AudioButton'

interface FlashCardProps {
  front: string
  frontSub?: string
  back: string
  onKnow: () => void
  onDontKnow: () => void
}

export function FlashCard({ front, frontSub, back, onKnow, onDontKnow }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="max-w-md mx-auto">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="w-full min-h-56 bg-white border-2 border-sand-200 rounded-3xl flex flex-col items-center justify-center gap-3 p-6 text-center shadow-sm active:scale-[0.99] transition"
      >
        {!flipped ? (
          <>
            <p className="font-arabic text-3xl">{front}</p>
            {frontSub && <p className="text-gray-400 text-sm">{frontSub}</p>}
            <span className="text-xs text-gray-300 mt-2">Touche pour retourner</span>
          </>
        ) : (
          <p className="text-2xl font-semibold text-brand-600">{back}</p>
        )}
      </button>

      <div className="flex items-center justify-center mt-3">
        <AudioButton text={front} />
      </div>

      {flipped && (
        <div className="flex gap-3 mt-5">
          <button
            type="button"
            onClick={onDontKnow}
            className="flex-1 py-3 rounded-2xl bg-white border border-sand-200 text-gray-600 font-semibold active:scale-95 transition"
          >
            😕 Je ne connais pas
          </button>
          <button
            type="button"
            onClick={onKnow}
            className="flex-1 py-3 rounded-2xl bg-teal-500 text-white font-semibold active:scale-95 transition"
          >
            ✅ Je connais
          </button>
        </div>
      )}
    </div>
  )
}
