import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { vocabulary } from '../data/vocabulary'
import { phrases } from '../data/phrases'
import { AudioButton } from '../components/AudioButton'

const TABS = [
  { id: 'transports', label: 'Taxi', icon: '🚕' },
  { id: 'restaurant', label: 'Restaurant', icon: '🍽️' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'hotel', label: 'Hôtel', icon: '🏨' },
  { id: 'ville', label: 'Directions', icon: '🗺️' },
  { id: 'argent', label: 'Prix', icon: '💰' },
  { id: 'urgence', label: 'Urgence', icon: '🆘' },
]

const URGENCE_PHRASE_TEXTS = ["Aide-moi, s'il te plaît", 'Je suis perdu(e)', 'Excuse-moi', "Je ne comprends pas", 'Répète']

export function Survival() {
  const [params] = useSearchParams()
  const [tab, setTab] = useState(params.get('cat') ?? 'transports')

  const words = vocabulary.filter((v) => v.categoryId === tab)
  const tabPhrases = tab === 'urgence'
    ? phrases.filter((p) => URGENCE_PHRASE_TEXTS.includes(p.fr))
    : phrases.filter((p) => p.categoryId === tab)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-1">🇲🇦 Je suis au Maroc</h1>
      <p className="text-gray-500 mb-4">Accès rapide aux phrases dont tu as besoin sur place.</p>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-4 px-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border ${tab === t.id ? 'bg-brand-500 text-white border-brand-500' : 'bg-white border-sand-200'}`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {tabPhrases.length > 0 && (
        <div className="space-y-2 mb-6">
          {tabPhrases.map((p) => (
            <div key={p.id} className="bg-white border border-sand-200 rounded-xl p-3 flex items-center justify-between gap-2">
              <div>
                <p className="font-arabic text-lg">{p.darija}</p>
                <p className="text-xs text-gray-400">{p.translit}</p>
                <p className="font-medium text-sm text-brand-600">{p.fr}</p>
              </div>
              <AudioButton text={p.darija} />
            </div>
          ))}
        </div>
      )}

      {words.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {words.map((w) => (
            <div key={w.id} className="bg-white border border-sand-200 rounded-xl p-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="font-arabic truncate">{w.darija}</p>
                <p className="text-xs text-gray-400 truncate">{w.translit} — {w.fr}</p>
              </div>
              <AudioButton text={w.darija} size="sm" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
