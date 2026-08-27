import * as Speech from 'expo-speech'

// Synthèse vocale 100% gratuite via expo-speech (moteur natif iOS/Android,
// aucune clé API, aucun service payant). La disponibilité d'une voix arabe
// dépend de l'appareil ; on tente plusieurs locales et on se dégrade
// silencieusement si indisponible (le texte et la translittération restent
// affichés dans tous les cas).

const PREFERRED_LANGS = ['ar-MA', 'ar-SA', 'ar']

export function isTtsAvailable(): boolean {
  return true // expo-speech est toujours disponible sur iOS/Android natif
}

export function speak(text: string, rate: 'normal' | 'lent' = 'normal') {
  Speech.stop()
  Speech.speak(text, {
    language: PREFERRED_LANGS[0],
    rate: rate === 'lent' ? 0.4 : 0.85,
    pitch: 1.0,
    onError: () => {
      // Se rabat sur la locale arabe générique si 'ar-MA' n'est pas
      // installée sur l'appareil.
      Speech.speak(text, { language: 'ar', rate: rate === 'lent' ? 0.4 : 0.85 })
    },
  })
}

export function stopSpeaking() {
  Speech.stop()
}
