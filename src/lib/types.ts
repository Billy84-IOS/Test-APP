export type OnboardingLevel = 'rien' | 'quelques-mots' | 'comprend-un-peu' | 'parle-un-peu'
export type OnboardingGoal = 'voyage' | 'famille' | 'amis' | 'travail' | 'culture' | 'autre'
export type DailyGoal = 5 | 10 | 20 | 30

export interface SrsEntry {
  itemId: string
  itemType: 'vocab' | 'phrase' | 'verb'
  box: number // 1 à 5 (système de Leitner)
  dueAt: string // ISO date
  lastReviewedAt: string
  timesReviewed: number
  timesCorrect: number
}

export interface Favorites {
  vocab: string[]
  phrases: string[]
  conversations: string[]
  lessons: string[]
}

export interface Stats {
  wordsLearned: number
  phrasesLearned: number
  timeSpentMinutes: number
  quizzesTaken: number
  correctAnswers: number
  totalAnswers: number
}

export interface UserProgress {
  onboarded: boolean
  level: OnboardingLevel | null
  goal: OnboardingGoal | null
  dailyGoalMinutes: DailyGoal
  xp: number
  streakDays: number
  lastActiveDate: string | null
  completedLessonIds: string[]
  favorites: Favorites
  srs: Record<string, SrsEntry>
  stats: Stats
}

export const defaultProgress: UserProgress = {
  onboarded: false,
  level: null,
  goal: null,
  dailyGoalMinutes: 10,
  xp: 0,
  streakDays: 0,
  lastActiveDate: null,
  completedLessonIds: [],
  favorites: { vocab: [], phrases: [], conversations: [], lessons: [] },
  srs: {},
  stats: {
    wordsLearned: 0,
    phrasesLearned: 0,
    timeSpentMinutes: 0,
    quizzesTaken: 0,
    correctAnswers: 0,
    totalAnswers: 0,
  },
}
