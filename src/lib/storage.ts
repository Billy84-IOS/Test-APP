import type { UserProgress } from './types'
import { defaultProgress } from './types'

const STORAGE_KEY = 'darija-progress-v1'

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return structuredClone(defaultProgress)
    const parsed = JSON.parse(raw)
    // Fusion défensive : si une nouvelle version de l'app ajoute des champs,
    // on ne perd pas la progression déjà sauvegardée localement.
    return { ...structuredClone(defaultProgress), ...parsed }
  } catch {
    return structuredClone(defaultProgress)
  }
}

export function saveProgress(progress: UserProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // localStorage indisponible (navigation privée pleine, quota dépassé...) :
    // on échoue silencieusement, l'app reste utilisable pour la session en cours.
  }
}
