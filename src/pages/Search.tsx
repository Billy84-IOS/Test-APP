import { useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { vocabulary } from '../data/vocabulary'
import { phrases } from '../data/phrases'
import { conversations } from '../data/conversations'
import { grammarPoints } from '../data/grammar'
import { verbs } from '../data/verbs'

export function Search() {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()

  const results = useMemo(() => {
    if (q.length < 2) return null
    return {
      vocab: vocabulary.filter((v) => v.fr.toLowerCase().includes(q) || v.translit.toLowerCase().includes(q)).slice(0, 8),
      phrases: phrases.filter((p) => p.fr.toLowerCase().includes(q) || p.translit.toLowerCase().includes(q)).slice(0, 8),
      conversations: conversations.filter((c) => c.title.toLowerCase().includes(q) || c.situation.toLowerCase().includes(q)),
      grammar: grammarPoints.filter((g) => g.title.toLowerCase().includes(q)),
      verbs: verbs.filter((v) => v.fr.toLowerCase().includes(q) || v.translit.toLowerCase().includes(q)),
    }
  }, [q])

  const totalResults = results
    ? results.vocab.length + results.phrases.length + results.conversations.length + results.grammar.length + results.verbs.length
    : 0

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">🔍 Recherche</h1>
      <input
        autoFocus
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ex : taxi, merci, famille..."
        className="w-full px-4 py-3 rounded-xl border border-sand-200 mb-6 focus:outline-none focus:ring-2 focus:ring-brand-400"
      />

      {!results && <p className="text-gray-400 text-sm">Tape au moins 2 lettres pour chercher dans tout le contenu.</p>}
      {results && totalResults === 0 && <p className="text-gray-400 text-sm">Aucun résultat pour « {query} ».</p>}

      {results && results.vocab.length > 0 && (
        <Section title="Vocabulaire">
          {results.vocab.map((v) => (
            <Link key={v.id} to={`/vocabulaire/${v.categoryId}`} className="block py-2 border-b border-sand-100">
              <span className="font-arabic">{v.darija}</span> <span className="text-gray-400 text-sm">({v.translit})</span> — {v.fr}
            </Link>
          ))}
        </Section>
      )}
      {results && results.phrases.length > 0 && (
        <Section title="Phrases">
          {results.phrases.map((p) => (
            <div key={p.id} className="py-2 border-b border-sand-100">
              <span className="font-arabic">{p.darija}</span> <span className="text-gray-400 text-sm">({p.translit})</span> — {p.fr}
            </div>
          ))}
        </Section>
      )}
      {results && results.conversations.length > 0 && (
        <Section title="Conversations">
          {results.conversations.map((c) => (
            <Link key={c.id} to={`/conversations/${c.id}`} className="block py-2 border-b border-sand-100">
              {c.icon} {c.title}
            </Link>
          ))}
        </Section>
      )}
      {results && results.grammar.length > 0 && (
        <Section title="Grammaire">
          {results.grammar.map((g) => (
            <div key={g.id} className="py-2 border-b border-sand-100">{g.title}</div>
          ))}
        </Section>
      )}
      {results && results.verbs.length > 0 && (
        <Section title="Verbes">
          {results.verbs.map((v) => (
            <div key={v.id} className="py-2 border-b border-sand-100">{v.translit} — {v.fr}</div>
          ))}
        </Section>
      )}
    </div>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-2">{title}</h2>
      <div className="bg-white border border-sand-200 rounded-xl px-3">{children}</div>
    </div>
  )
}
