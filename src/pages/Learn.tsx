import { Link } from 'react-router-dom'
import { lessons } from '../data/lessons'
import { levels } from '../data/categories'
import { useProgress } from '../context/ProgressContext'

export function Learn() {
  const { progress } = useProgress()

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-1">📚 Apprendre</h1>
      <p className="text-gray-500 mb-6">Ton parcours, du niveau débutant à conversationnel.</p>

      <div className="space-y-8">
        {levels.map((lvl) => {
          const levelLessons = lessons.filter((l) => l.level === lvl.level).sort((a, b) => a.order - b.order)
          if (levelLessons.length === 0) return null
          return (
            <section key={lvl.level}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{lvl.icon}</span>
                <div>
                  <h2 className="font-bold">Niveau {lvl.level} · {lvl.title}</h2>
                  <p className="text-xs text-gray-400">{lvl.description}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {levelLessons.map((lesson) => {
                  const done = progress.completedLessonIds.includes(lesson.id)
                  return (
                    <Link
                      key={lesson.id}
                      to={`/apprendre/${lesson.id}`}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition active:scale-[0.98] ${
                        done ? 'border-teal-300 bg-teal-50' : 'border-sand-200 bg-white'
                      }`}
                    >
                      <span className="text-2xl">{lesson.icon}</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm truncate">{lesson.title}</p>
                        <p className="text-xs text-gray-400 truncate">{lesson.description}</p>
                      </div>
                      {done && <span className="text-teal-500 shrink-0">✓</span>}
                    </Link>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
