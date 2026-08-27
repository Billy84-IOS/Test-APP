import { useState } from 'react'
import { speak, isTtsAvailable } from '../lib/tts'

export function AudioButton({ text, size = 'md' }: { text: string; size?: 'sm' | 'md' | 'lg' }) {
  const [playing, setPlaying] = useState(false)
  const dims = size === 'sm' ? 'w-8 h-8 text-sm' : size === 'lg' ? 'w-14 h-14 text-2xl' : 'w-10 h-10 text-base'

  if (!isTtsAvailable()) return null

  const handleClick = (rate: 'normal' | 'lent') => {
    setPlaying(true)
    speak(text, rate)
    window.setTimeout(() => setPlaying(false), 1200)
  }

  return (
    <div className="inline-flex items-center gap-1">
      <button
        type="button"
        onClick={() => handleClick('normal')}
        aria-label={`Écouter « ${text} »`}
        className={`${dims} flex items-center justify-center rounded-full bg-teal-500 text-white hover:bg-teal-600 active:scale-95 transition ${playing ? 'animate-pulse' : ''}`}
      >
        🔊
      </button>
      <button
        type="button"
        onClick={() => handleClick('lent')}
        aria-label={`Écouter « ${text} » lentement`}
        title="Écouter lentement"
        className="w-7 h-7 flex items-center justify-center rounded-full bg-sand-200 text-teal-700 hover:bg-sand-100 active:scale-95 transition text-xs"
      >
        🐢
      </button>
    </div>
  )
}
