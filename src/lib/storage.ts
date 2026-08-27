import AsyncStorage from '@react-native-async-storage/async-storage'
import type { UserProgress } from './types'
import { defaultProgress } from './types'

const STORAGE_KEY = 'darija-progress-v1'

// structuredClone n'est pas garanti disponible selon le moteur JS (Hermes) :
// on utilise une copie profonde universelle basée sur JSON.
function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

export async function loadProgress(): Promise<UserProgress> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY)
    if (!raw) return clone(defaultProgress)
    const parsed = JSON.parse(raw)
    // Fusion défensive : si une nouvelle version de l'app ajoute des champs,
    // on ne perd pas la progression déjà sauvegardée localement.
    return { ...clone(defaultProgress), ...parsed }
  } catch {
    return clone(defaultProgress)
  }
}

export async function saveProgress(progress: UserProgress) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // Stockage indisponible : on échoue silencieusement, l'app reste
    // utilisable pour la session en cours.
  }
}
