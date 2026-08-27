import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import { lessons } from '../data/lessons'
import { levels } from '../data/categories'
import { ProgressBar } from '../components/ProgressBar'

const QUICK_ACCESS = [
  { to: '/au-maroc?cat=transports', label: 'Taxi', icon: '🚕' },
  { to: '/au-maroc?cat=restaurant', label: 'Restaurant', icon: '🍽️' },
  { to: '/au-maroc?cat=shopping', label: 'Shopping', icon: '🛍️' },
  { to: '/au-maroc?cat=hotel', label: 'Hôtel', icon: '🏨' },
  { to: '/au-maroc?cat=ville', label: 'Directions', icon: '🗺️' },
  { to: '/au-maroc?cat=argent', label: 'Prix', icon: '💰' },
]

export function Home() {
  const { progress } = useProgress()

  const nextLesson = lessons.find((l) => !progress.completedLessonIds.includes(l.id))
  const currentLevelInfo = levels.find((l) => l.level === (nextLesson?.level ?? 0))
  const completedCount = progress.completedLessonIds.length

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <section>
        <h1 className="text-2xl font-bold mb-1">🇲🇦 Apprends la Darija</h1>
        <p className="text-gray-500">Commence à parler marocain, gratuitement.</p>
      </section>

      <section className="bg-white rounded-2xl border border-sand-200 p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">Ta progression</span>
          <span className="text-sm font-semibold text-brand-600">{completedCount} / {lessons.length} leçons</span>
        </div>
        <ProgressBar value={completedCount} max={lessons.length} />
      </section>

      {nextLesson && (
        <Link
          to={`/apprendre/${nextLesson.id}`}
          className="block bg-brand-500 text-white rounded-2xl p-5 shadow-sm active:scale-[0.99] transition"
        >
          <p className="text-xs uppercase tracking-wide text-brand-100 mb-1">
            {currentLevelInfo?.icon} Niveau {nextLesson.level} · {currentLevelInfo?.title}
          </p>
          <p className="text-lg font-bold flex items-center gap-2">{nextLesson.icon} Leçon du jour : {nextLesson.title}</p>
          <p className="text-brand-100 text-sm mt-1">{nextLesson.description}</p>
        </Link>
      )}

      <section className="grid grid-cols-2 gap-3">
        <Link to="/parler" className="bg-teal-500 text-white rounded-2xl p-4 active:scale-95 transition">
          <p className="text-2xl mb-1">🗣️</p>
          <p className="font-semibold">Je veux parler</p>
          <p className="text-xs text-teal-50">Phrases et répétition</p>
        </Link>
        <Link to="/comprendre" className="bg-gold-400 text-white rounded-2xl p-4 active:scale-95 transition">
          <p className="text-2xl mb-1">👂</p>
          <p className="font-semibold">Je veux comprendre</p>
          <p className="text-xs text-white/80">Écoute et dialogues</p>
        </Link>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Link to="/revisions" className="bg-white border border-sand-200 rounded-2xl p-4 active:scale-95 transition">
          <p className="text-xl mb-1">🔁</p>
          <p className="font-medium text-sm">Réviser mes mots</p>
        </Link>
        <Link to="/conversations" className="bg-white border border-sand-200 rounded-2xl p-4 active:scale-95 transition">
          <p className="text-xl mb-1">💬</p>
          <p className="font-medium text-sm">Pratiquer une conversation</p>
        </Link>
        <Link to="/au-maroc" className="bg-white border border-sand-200 rounded-2xl p-4 active:scale-95 transition">
          <p className="text-xl mb-1">🆘</p>
          <p className="font-medium text-sm">Phrases essentielles</p>
        </Link>
      </section>

      <section>
        <h2 className="font-semibold mb-3">🇲🇦 Je suis au Maroc — accès rapide</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {QUICK_ACCESS.map((q) => (
            <Link key={q.label} to={q.to} className="bg-white border border-sand-200 rounded-xl p-3 text-center active:scale-95 transition">
              <p className="text-xl">{q.icon}</p>
              <p className="text-xs font-medium mt-1">{q.label}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
