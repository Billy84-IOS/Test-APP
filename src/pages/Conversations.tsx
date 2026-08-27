import { Link } from 'react-router-dom'
import { conversations } from '../data/conversations'
import { levels } from '../data/categories'

export function Conversations() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-1">💬 Conversations</h1>
      <p className="text-gray-500 mb-6">Des dialogues réalistes pour t'entraîner à de vraies situations.</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {conversations.map((c) => {
          const lvl = levels.find((l) => l.level === c.level)
          return (
            <Link key={c.id} to={`/conversations/${c.id}`} className="bg-white border border-sand-200 rounded-xl p-4 active:scale-95 transition">
              <p className="text-2xl mb-1">{c.icon}</p>
              <p className="font-medium">{c.title}</p>
              <p className="text-xs text-gray-400 mb-1">{c.situation}</p>
              <p className="text-xs text-brand-500">{lvl?.icon} Niveau {c.level}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
