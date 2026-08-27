// Synthèse vocale 100% gratuite via la Web Speech API du navigateur — aucune
// clé API, aucun service payant. La qualité/disponibilité d'une voix arabe
// dépend du navigateur/OS de l'utilisateur ; on tente plusieurs locales et on
// se dégrade silencieusement si aucune voix n'est disponible (le texte et la
// translittération restent affichés dans tous les cas).

const PREFERRED_LANGS = ['ar-MA', 'ar-SA', 'ar']

let cachedVoices: SpeechSynthesisVoice[] = []

function loadVoices() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  cachedVoices = window.speechSynthesis.getVoices()
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  loadVoices()
  window.speechSynthesis.onvoiceschanged = loadVoices
}

export function isTtsAvailable(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

function pickVoice(): SpeechSynthesisVoice | undefined {
  for (const lang of PREFERRED_LANGS) {
    const voice = cachedVoices.find((v) => v.lang.toLowerCase().startsWith(lang.toLowerCase()))
    if (voice) return voice
  }
  return undefined
}

export function speak(text: string, rate: 'normal' | 'lent' = 'normal') {
  if (!isTtsAvailable()) return
  window.speechSynthesis.cancel() // évite d'empiler plusieurs lectures
  const utterance = new SpeechSynthesisUtterance(text)
  const voice = pickVoice()
  if (voice) {
    utterance.voice = voice
    utterance.lang = voice.lang
  } else {
    utterance.lang = 'ar'
  }
  utterance.rate = rate === 'lent' ? 0.6 : 0.95
  window.speechSynthesis.speak(utterance)
}

export function stopSpeaking() {
  if (isTtsAvailable()) window.speechSynthesis.cancel()
}
