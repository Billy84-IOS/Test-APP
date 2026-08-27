import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { DailyGoal, OnboardingGoal, OnboardingLevel, UserProgress } from '../lib/types'
import { loadProgress, saveProgress } from '../lib/storage'
import { createSrsEntry, reviewSrsEntry } from '../lib/srs'
import type { SrsEntry } from '../lib/types'

type FavoriteKind = keyof UserProgress['favorites']

interface ProgressContextValue {
  progress: UserProgress
  completeOnboarding: (level: OnboardingLevel, goal: OnboardingGoal, dailyGoalMinutes: DailyGoal) => void
  addXp: (amount: number) => void
  completeLesson: (lessonId: string, xp?: number) => void
  toggleFavorite: (kind: FavoriteKind, itemId: string) => void
  isFavorite: (kind: FavoriteKind, itemId: string) => boolean
  recordQuizAnswer: (correct: boolean) => void
  reviewItem: (itemId: string, itemType: SrsEntry['itemType'], known: boolean) => void
  addTimeSpent: (minutes: number) => void
  resetProgress: () => void
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

function todayIso() {
  return new Date().toISOString().slice(0, 10)
}

function isYesterday(dateIso: string) {
  const d = new Date(dateIso)
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return d.toISOString().slice(0, 10) === yesterday.toISOString().slice(0, 10)
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() => loadProgress())

  // Calcule la série de jours consécutifs au montage de l'app.
  useEffect(() => {
    setProgress((prev) => {
      const today = todayIso()
      if (prev.lastActiveDate === today) return prev
      const streakDays = prev.lastActiveDate && isYesterday(prev.lastActiveDate) ? prev.streakDays + 1 : prev.lastActiveDate ? 1 : prev.streakDays
      return { ...prev, lastActiveDate: today, streakDays }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      completeOnboarding: (level, goal, dailyGoalMinutes) =>
        setProgress((p) => ({ ...p, onboarded: true, level, goal, dailyGoalMinutes })),
      addXp: (amount) => setProgress((p) => ({ ...p, xp: p.xp + amount })),
      completeLesson: (lessonId, xp = 20) =>
        setProgress((p) =>
          p.completedLessonIds.includes(lessonId)
            ? { ...p, xp: p.xp + Math.round(xp / 2) }
            : { ...p, xp: p.xp + xp, completedLessonIds: [...p.completedLessonIds, lessonId] },
        ),
      toggleFavorite: (kind, itemId) =>
        setProgress((p) => {
          const list = p.favorites[kind]
          const next = list.includes(itemId) ? list.filter((id) => id !== itemId) : [...list, itemId]
          return { ...p, favorites: { ...p.favorites, [kind]: next } }
        }),
      isFavorite: (kind, itemId) => progress.favorites[kind].includes(itemId),
      recordQuizAnswer: (correct) =>
        setProgress((p) => ({
          ...p,
          xp: p.xp + (correct ? 2 : 0),
          stats: {
            ...p.stats,
            quizzesTaken: p.stats.quizzesTaken + 1,
            correctAnswers: p.stats.correctAnswers + (correct ? 1 : 0),
            totalAnswers: p.stats.totalAnswers + 1,
          },
        })),
      reviewItem: (itemId, itemType, known) =>
        setProgress((p) => {
          const existing = p.srs[itemId] ?? createSrsEntry(itemId, itemType)
          const updated = reviewSrsEntry(existing, known)
          return { ...p, srs: { ...p.srs, [itemId]: updated }, xp: p.xp + (known ? 1 : 0) }
        }),
      addTimeSpent: (minutes) =>
        setProgress((p) => ({ ...p, stats: { ...p.stats, timeSpentMinutes: p.stats.timeSpentMinutes + minutes } })),
      resetProgress: () => setProgress(loadProgress()),
    }),
    [progress],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress doit être utilisé dans un <ProgressProvider>')
  return ctx
}
