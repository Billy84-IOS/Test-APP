import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { lessons, wordsForIds } from '../data/lessons'
import { phrases } from '../data/phrases'
import { grammarPoints } from '../data/grammar'
import { verbs } from '../data/verbs'
import { conversations } from '../data/conversations'
import { AudioButton } from '../components/AudioButton'
import { FavoriteButton } from '../components/FavoriteButton'
import { QuizRunner } from '../components/QuizRunner'
import { useProgress } from '../context/ProgressContext'

export function LessonDetail() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const { completeLesson, progress } = useProgress()
  const [showQuiz, setShowQuiz] = useState(false)
  const lesson = lessons.find((l) => l.id === lessonId)

  if (!lesson) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 text-center">
        <p className="text-gray-500">Leçon introuvable.</p>
        <Link to="/apprendre" className="text-brand-600 font-medium">Retour au parcours</Link>
      </div>
    )
  }

  const words = wordsForIds(lesson.vocabIds)
  const lessonPhrases = phrases.filter((p) => lesson.phraseIds.includes(p.id))
  const lessonGrammar = grammarPoints.filter((g) => lesson.grammarIds.includes(g.id))
  const lessonVerbs = verbs.filter((v) => lesson.verbIds.includes(v.id))
  const conversation = conversations.find((c) => c.id === lesson.conversationId)
  const done = progress.completedLessonIds.includes(lesson.id)

  const isEmpty = words.length === 0 && lessonPhrases.length === 0 && lessonGrammar.length === 0 && lessonVerbs.length === 0 && !conversation

  const finishLesson = () => {
    completeLesson(lesson.id)
    navigate('/apprendre')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
      <Link to="/apprendre" className="text-sm text-gray-400 mb-2 inline-block">← Retour au parcours</Link>
      <h1 className="text-2xl font-bold flex items-center gap-2">{lesson.icon} {lesson.title}</h1>
      <p className="text-gray-500 mb-6">{lesson.description}</p>

      {isEmpty && (
        <div className="bg-sand-100 rounded-2xl p-5 text-gray-500 text-sm mb-6">
          Cette leçon est une introduction théorique — lis bien l'explication, aucune donnée supplémentaire n'est nécessaire ici.
        </div>
      )}

      {words.length > 0 && (
        <section className="mb-8">
          <h2 className="font-semibold mb-3">🗂️ Vocabulaire</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {words.map((w) => (
              <div key={w.id} className="bg-white border border-sand-200 rounded-xl p-3 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-arabic text-lg truncate">{w.darija}</p>
                  <p className="text-xs text-gray-400">{w.translit}</p>
                  <p className="text-sm font-medium">{w.fr}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <AudioButton text={w.darija} size="sm" />
                  <FavoriteButton kind="vocab" itemId={w.id} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {lessonPhrases.length > 0 && (
        <section className="mb-8">
          <h2 className="font-semibold mb-3">💬 Phrases</h2>
          <div className="space-y-2">
            {lessonPhrases.map((p) => (
              <div key={p.id} className="bg-white border border-sand-200 rounded-xl p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-arabic text-lg">{p.darija}</p>
                    <p className="text-xs text-gray-400">{p.translit}</p>
                    <p className="text-sm font-medium text-brand-600">{p.fr}</p>
                    {p.explanation && <p className="text-xs text-gray-400 mt-1">{p.explanation}</p>}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <AudioButton text={p.darija} size="sm" />
                    <FavoriteButton kind="phrases" itemId={p.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {lessonGrammar.length > 0 && (
        <section className="mb-8">
          <h2 className="font-semibold mb-3">📖 Grammaire</h2>
          <div className="space-y-4">
            {lessonGrammar.map((g) => (
              <div key={g.id} className="bg-white border border-sand-200 rounded-xl p-4">
                <p className="font-semibold mb-2">{g.title}</p>
                <p className="text-sm text-gray-600 mb-3">{g.explanation}</p>
                {g.table && (
                  <div className="overflow-x-auto mb-3">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr>
                          {g.table.headers.map((h) => (
                            <th key={h} className="text-left border-b border-sand-200 pb-1 pr-3 text-gray-400 font-medium">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {g.table.rows.map((row, i) => (
                          <tr key={i}>
                            {row.map((cell, j) => (
                              <td key={j} className="py-1 pr-3 border-b border-sand-100">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className="space-y-1.5">
                  {g.examples.map((ex, i) => (
                    <p key={i} className="text-sm">
                      <span className="font-arabic">{ex.darija}</span>{' '}
                      <span className="text-gray-400">({ex.translit})</span> — <span className="text-gray-600">{ex.fr}</span>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {lessonVerbs.length > 0 && (
        <section className="mb-8">
          <h2 className="font-semibold mb-3">🏃 Verbes</h2>
          <div className="space-y-3">
            {lessonVerbs.map((v) => (
              <details key={v.id} className="bg-white border border-sand-200 rounded-xl p-4">
                <summary className="font-semibold cursor-pointer flex items-center justify-between">
                  <span>{v.translit} <span className="text-gray-400 font-normal">— {v.fr}</span></span>
                </summary>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-400">
                        <th className="text-left pr-3">Pers.</th>
                        <th className="text-left pr-3">Présent</th>
                        <th className="text-left pr-3">Passé</th>
                        <th className="text-left">Futur</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(['ana', 'nta', 'nti', 'huwa', 'hiya', 'hna', 'ntuma', 'huma'] as const).map((p) => (
                        <tr key={p} className="border-t border-sand-100">
                          <td className="pr-3 py-1 text-gray-400">{p}</td>
                          <td className="pr-3 py-1">{v.presentTranslit[p]}</td>
                          <td className="pr-3 py-1">{v.pastTranslit[p]}</td>
                          <td className="py-1">{v.futureTranslit[p]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-xs text-gray-400 mt-2">Négation : {v.negativePattern}</p>
                  {v.examples.map((ex, i) => (
                    <p key={i} className="text-sm mt-2">{ex.translit} — <span className="text-gray-500">{ex.fr}</span></p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {conversation && (
        <section className="mb-8">
          <h2 className="font-semibold mb-3">🎭 Conversation liée</h2>
          <Link to={`/conversations/${conversation.id}`} className="flex items-center gap-3 bg-white border border-sand-200 rounded-xl p-4 active:scale-[0.99] transition">
            <span className="text-2xl">{conversation.icon}</span>
            <div>
              <p className="font-medium">{conversation.title}</p>
              <p className="text-xs text-gray-400">{conversation.situation}</p>
            </div>
          </Link>
        </section>
      )}

      {lesson.quiz.length > 0 && !showQuiz && (
        <button onClick={() => setShowQuiz(true)} className="w-full py-3 rounded-xl bg-sand-100 font-semibold mb-4">
          ✏️ Faire le mini-quiz ({lesson.quiz.length} questions)
        </button>
      )}
      {showQuiz && <QuizRunner questions={lesson.quiz} />}

      <button
        onClick={finishLesson}
        className="w-full py-3.5 rounded-xl bg-brand-500 text-white font-semibold mt-4 active:scale-[0.99] transition"
      >
        {done ? '✓ Leçon déjà terminée — revoir quand même' : 'Terminer la leçon'}
      </button>
    </div>
  )
}
