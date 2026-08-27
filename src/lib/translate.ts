import { vocabulary } from '../data/vocabulary'
import { phrases } from '../data/phrases'
import type { Phrase, VocabWord } from '../types'

// Traducteur "en direct" 100% hors-ligne, basé sur le contenu déjà vérifié
// de l'app (vocabulaire + phrases). Ce n'est PAS un moteur de traduction
// automatique généraliste : il ne fabrique jamais de Darija inventée pour
// une phrase inconnue. Il fait de son mieux avec ce qu'il connaît
// vraiment :
//  1. correspondance exacte d'une phrase ou d'un mot déjà dans la base,
//  2. sinon, traduction mot à mot (avec avertissement clair que la
//     structure grammaticale n'est pas garantie),
//  3. et des suggestions de phrases proches si rien de fiable n'est trouvé.

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // accents
    .replace(/[^a-z0-9\s']/g, '')
    .trim()
}

function tokenize(s: string): string[] {
  return normalize(s).split(/\s+/).filter(Boolean)
}

export interface WordTranslation {
  token: string
  match: VocabWord | Phrase | null
}

export interface TranslationResult {
  exactPhrase: Phrase | null
  exactWord: VocabWord | null
  wordByWord: WordTranslation[]
  suggestions: (Phrase | VocabWord)[]
}

function findExact<T extends { fr: string }>(items: T[], query: string): T | null {
  const q = normalize(query)
  return items.find((item) => normalize(item.fr) === q) ?? null
}

// Cherche le meilleur mot/expression de vocabulaire pour un token isolé.
function findBestWordMatch(token: string): VocabWord | Phrase | null {
  const exactVocab = vocabulary.find((v) => normalize(v.fr) === token)
  if (exactVocab) return exactVocab
  // Un mot du vocabulaire dont la traduction française COMMENCE par le token
  // (utile pour "manger" -> matches même si stocké différemment) ou qui le
  // contient comme mot entier.
  const partial = vocabulary.find((v) => normalize(v.fr).split(/\s+/).includes(token))
  return partial ?? null
}

export function translate(query: string): TranslationResult {
  const trimmed = query.trim()
  if (trimmed.length === 0) {
    return { exactPhrase: null, exactWord: null, wordByWord: [], suggestions: [] }
  }

  const exactPhrase = findExact(phrases, trimmed)
  const exactWord = exactPhrase ? null : findExact(vocabulary, trimmed)

  let wordByWord: WordTranslation[] = []
  if (!exactPhrase && !exactWord) {
    const tokens = tokenize(trimmed)
    wordByWord = tokens.map((token) => ({ token, match: findBestWordMatch(token) }))
  }

  let suggestions: (Phrase | VocabWord)[] = []
  if (!exactPhrase && !exactWord) {
    const q = normalize(trimmed)
    const tokens = tokenize(trimmed)
    const scored: { item: Phrase | VocabWord; score: number }[] = []
    for (const item of [...phrases, ...vocabulary]) {
      const itemFr = normalize(item.fr)
      if (itemFr === q) continue
      let score = 0
      if (itemFr.includes(q) || q.includes(itemFr)) score += 3
      for (const token of tokens) {
        if (itemFr.split(/\s+/).includes(token)) score += 1
      }
      if (score > 0) scored.push({ item, score })
    }
    suggestions = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((s) => s.item)
  }

  return { exactPhrase, exactWord, wordByWord, suggestions }
}
