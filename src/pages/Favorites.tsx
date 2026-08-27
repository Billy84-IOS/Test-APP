import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import { vocabulary } from '../data/vocabulary'
import { phrases } from '../data/phrases'
import { conversations } from '../data/conversations'
import { lessons } from '../data/lessons'
import { AudioButton } from '../components/AudioButton'
import { FavoriteButton } from '../components/FavoriteButton'

export function Favorites() {
  const { progress } = useProgress()
  const favWords = vocabulary.filter((v) => progress.favorites.vocab.includes(v.id))
  const favPhrases = phrases.filter((p) => progress.favorites.phrases.includes(p.id))
  const favConversations = conversations.filter((c) => progress.favorites.conversations.includes(c.id))
  const favLessons = lessons.filter((l) => progress.favorites.lessons.includes(l.id))

  const empty = favWords.length === 0 && favPhrases.length === 0 && favConversations.length === 0 && favLessons.length === 0

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-1">⭐ Mes favoris</h1>
      <p className="text-gray-500 mb-6">Tout ce que tu as marqué d'une étoile.</p>

      {empty && <p className="text-gray-400 text-sm">Rien pour l'instant. Touche l'étoile ☆ sur un mot, une phrase ou une conversation pour l'ajouter ici.</p>}

      {favWords.length > 0 && (
        <section className="mb-6">
          <h2 className="font-semibold mb-2">Vocabulaire</h2>
          <div className="space-y-2">
            {favWords.map((w) => (
              <div key={w.id} className="bg-white border border-sand-200 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="font-arabic">{w.darija}</p>
                  <p className="text-xs text-gray-400">{w.translit} — {w.fr}</p>
                </div>
                <div className="flex items-center gap-1">
                  <AudioButton text={w.darija} size="sm" />
                  <FavoriteButton kind="vocab" itemId={w.id} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {favPhrases.length > 0 && (
        <section className="mb-6">
          <h2 className="font-semibold mb-2">Phrases</h2>
          <div className="space-y-2">
            {favPhrases.map((p) => (
              <div key={p.id} className="bg-white border border-sand-200 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="font-arabic">{p.darija}</p>
                  <p className="text-xs text-gray-400">{p.translit} — {p.fr}</p>
                </div>
                <div className="flex items-center gap-1">
                  <AudioButton text={p.darija} size="sm" />
                  <FavoriteButton kind="phrases" itemId={p.id} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {favConversations.length > 0 && (
        <section className="mb-6">
          <h2 className="font-semibold mb-2">Conversations</h2>
          <div className="space-y-2">
            {favConversations.map((c) => (
              <Link key={c.id} to={`/conversations/${c.id}`} className="flex items-center gap-2 bg-white border border-sand-200 rounded-xl p-3">
                <span className="text-xl">{c.icon}</span>
                <span className="font-medium text-sm">{c.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {favLessons.length > 0 && (
        <section>
          <h2 className="font-semibold mb-2">Leçons</h2>
          <div className="space-y-2">
            {favLessons.map((l) => (
              <Link key={l.id} to={`/apprendre/${l.id}`} className="flex items-center gap-2 bg-white border border-sand-200 rounded-xl p-3">
                <span className="text-xl">{l.icon}</span>
                <span className="font-medium text-sm">{l.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
