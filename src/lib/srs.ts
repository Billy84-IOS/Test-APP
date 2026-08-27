import type { SrsEntry } from './types'

// Système de répétition espacée simple (inspiré de Leitner) : 5 "boîtes",
// chacune avec un intervalle avant la prochaine révision. Une bonne réponse
// fait avancer la carte d'une boîte ; une mauvaise la renvoie à la boîte 1.
const INTERVALS_DAYS = [0, 1, 2, 4, 8, 16] // index = numéro de boîte (1 à 5)

export function createSrsEntry(itemId: string, itemType: SrsEntry['itemType']): SrsEntry {
  return {
    itemId,
    itemType,
    box: 1,
    dueAt: new Date().toISOString(),
    lastReviewedAt: new Date().toISOString(),
    timesReviewed: 0,
    timesCorrect: 0,
  }
}

export function reviewSrsEntry(entry: SrsEntry, known: boolean): SrsEntry {
  const nextBox = known ? Math.min(entry.box + 1, 5) : 1
  const days = INTERVALS_DAYS[nextBox]
  const due = new Date()
  due.setDate(due.getDate() + days)
  return {
    ...entry,
    box: nextBox,
    dueAt: due.toISOString(),
    lastReviewedAt: new Date().toISOString(),
    timesReviewed: entry.timesReviewed + 1,
    timesCorrect: entry.timesCorrect + (known ? 1 : 0),
  }
}

export function isDue(entry: SrsEntry): boolean {
  return new Date(entry.dueAt).getTime() <= Date.now()
}

export function difficultyLabel(entry: SrsEntry): 'nouveau' | 'difficile' | 'en cours' | 'maîtrisé' {
  if (entry.timesReviewed === 0) return 'nouveau'
  if (entry.box <= 1) return 'difficile'
  if (entry.box >= 5) return 'maîtrisé'
  return 'en cours'
}
