import { Link } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import { lessons } from '../data/lessons'
import { difficultyLabel } from '../lib/srs'
import { ProgressBar } from '../components/ProgressBar'

function xpLevel(xp: number) {
  return Math.floor(xp / 150) + 1
}

export function ProgressPage() {
  const { progress } = useProgress()
  const srsEntries = Object.values(progress.srs)
  const wordsLearned = srsEntries.filter((e) => e.itemType === 'vocab' && e.timesReviewed > 0).length
  const phrasesLearned = srsEntries.filter((e) => e.itemType === 'phrase' && e.timesReviewed > 0).length
  const mastered = srsEntries.filter((e) => difficultyLabel(e) === 'maîtrisé').length
  const level = xpLevel(progress.xp)
  const xpIntoLevel = progress.xp % 150
  const successRate = progress.stats.totalAnswers > 0 ? Math.round((progress.stats.correctAnswers / progress.stats.totalAnswers) * 100) : 0
  const nextLesson = lessons.find((l) => !progress.completedLessonIds.includes(l.id))

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-1">📈 Progrès</h1>
      <p className="text-gray-500 mb-6">Toute ta progression, sauvegardée sur cet appareil.</p>

      <div className="bg-white border border-sand-200 rounded-2xl p-5 mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="font-semibold">Niveau {level}</p>
          <p className="text-sm text-gray-400">{xpIntoLevel} / 150 XP</p>
        </div>
        <ProgressBar value={xpIntoLevel} max={150} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <Stat label="Série de jours" value={`${progress.streakDays} 🔥`} />
        <Stat label="Leçons terminées" value={`${progress.completedLessonIds.length}/${lessons.length}`} />
        <Stat label="Mots appris" value={String(wordsLearned)} />
        <Stat label="Phrases apprises" value={String(phrasesLearned)} />
        <Stat label="Mots maîtrisés" value={String(mastered)} />
        <Stat label="Quiz effectués" value={String(progress.stats.quizzesTaken)} />
        <Stat label="Taux de réussite" value={`${successRate}%`} />
        <Stat label="Temps d'apprentissage" value={`${progress.stats.timeSpentMinutes} min`} />
      </div>

      {nextLesson && (
        <div className="bg-brand-50 border border-brand-100 rounded-2xl p-4">
          <p className="text-sm font-medium text-brand-600 mb-2">Prochaine recommandation</p>
          <Link to={`/apprendre/${nextLesson.id}`} className="flex items-center gap-3">
            <span className="text-2xl">{nextLesson.icon}</span>
            <span className="font-medium">{nextLesson.title}</span>
          </Link>
        </div>
      )}
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-sand-200 rounded-xl p-3 text-center">
      <p className="text-lg font-bold text-brand-600">{value}</p>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  )
}
