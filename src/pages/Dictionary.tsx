import { useMemo, useState } from 'react'
import { vocabulary } from '../data/vocabulary'
import { phrases } from '../data/phrases'
import { AudioButton } from '../components/AudioButton'
import { FavoriteButton } from '../components/FavoriteButton'

type Direction = 'fr-darija' | 'darija-fr'

export function Dictionary() {
  const [query, setQuery] = useState('')
  const [direction, setDirection] = useState<Direction>('fr-darija')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length === 0) return []
    const vocabResults = vocabulary.filter((v) =>
      direction === 'fr-darija' ? v.fr.toLowerCase().includes(q) : v.translit.toLowerCase().includes(q) || v.darija.includes(q),
    )
    const phraseResults = phrases.filter((p) =>
      direction === 'fr-darija' ? p.fr.toLowerCase().includes(q) : p.translit.toLowerCase().includes(q) || p.darija.includes(q),
    )
    return [...vocabResults.map((v) => ({ ...v, kind: 'vocab' as const })), ...phraseResults.map((p) => ({ ...p, kind: 'phrase' as const }))]
  }, [query, direction])

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-1">📕 Dictionnaire</h1>
      <p className="text-gray-500 mb-4">Recherche Darija ↔ Français.</p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setDirection('fr-darija')}
          className={`flex-1 py-2 rounded-xl text-sm font-medium border ${direction === 'fr-darija' ? 'bg-brand-500 text-white border-brand-500' : 'bg-white border-sand-200'}`}
        >
          Français → Darija
        </button>
        <button
          onClick={() => setDirection('darija-fr')}
          className={`flex-1 py-2 rounded-xl text-sm font-medium border ${direction === 'darija-fr' ? 'bg-brand-500 text-white border-brand-500' : 'bg-white border-sand-200'}`}
        >
          Darija → Français
        </button>
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={direction === 'fr-darija' ? 'Ex : bonjour, merci, taxi...' : 'Ex : salam, bghit, choukran...'}
        className="w-full px-4 py-3 rounded-xl border border-sand-200 mb-4 focus:outline-none focus:ring-2 focus:ring-brand-400"
      />

      {query.trim().length === 0 ? (
        <p className="text-gray-400 text-sm">Commence à taper pour chercher.</p>
      ) : results.length === 0 ? (
        <p className="text-gray-400 text-sm">Aucun résultat pour « {query} ».</p>
      ) : (
        <div className="space-y-2">
          {results.map((r) => (
            <div key={r.id} className="bg-white border border-sand-200 rounded-xl p-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="font-arabic text-lg">{r.darija}</p>
                <p className="text-xs text-gray-400">{r.translit}</p>
                <p className="font-medium text-sm">{r.fr}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <AudioButton text={r.darija} size="sm" />
                <FavoriteButton kind={r.kind === 'vocab' ? 'vocab' : 'phrases'} itemId={r.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
