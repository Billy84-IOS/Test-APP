import type { QuizQuestion } from '../types'
import { vocabulary } from '../data/vocabulary'
import { phrases } from '../data/phrases'
import { verbs } from '../data/verbs'

let qn = 0
const qId = () => `gen-q-${++qn}`

function pickDistractors<T>(pool: T[], exclude: T, count: number, key: (t: T) => string): string[] {
  return pool
    .filter((p) => key(p) !== key(exclude))
    .sort(() => (key(exclude).length % 2 ? 1 : -1))
    .slice(0, count)
    .map(key)
}

export function generateVocabQcm(count = 10, categoryId?: string): QuizQuestion[] {
  const pool = categoryId ? vocabulary.filter((v) => v.categoryId === categoryId) : vocabulary
  const picked = [...pool].sort(() => 0.5 - Math.random()).slice(0, count)
  return picked.map((word) => {
    const distractors = pickDistractors(vocabulary, word, 2, (v) => v.fr)
    const choices = [word.fr, ...distractors].sort(() => 0.5 - Math.random())
    return {
      id: qId(),
      type: 'darija-to-fr',
      prompt: `« ${word.darija} » (${word.translit}) veut dire :`,
      choices,
      correctAnswer: word.fr,
    }
  })
}

export function generateFrToDarijaQcm(count = 10, categoryId?: string): QuizQuestion[] {
  const pool = categoryId ? vocabulary.filter((v) => v.categoryId === categoryId) : vocabulary
  const picked = [...pool].sort(() => 0.5 - Math.random()).slice(0, count)
  return picked.map((word) => {
    const distractors = pickDistractors(vocabulary, word, 2, (v) => v.translit)
    const choices = [word.translit, ...distractors].sort(() => 0.5 - Math.random())
    return {
      id: qId(),
      type: 'fr-to-darija',
      prompt: `Comment dit-on « ${word.fr} » en Darija ?`,
      choices,
      correctAnswer: word.translit,
    }
  })
}

export function generatePhraseQuiz(count = 10): QuizQuestion[] {
  const picked = [...phrases].sort(() => 0.5 - Math.random()).slice(0, count)
  return picked.map((p) => {
    const distractors = pickDistractors(phrases, p, 2, (x) => x.fr)
    const choices = [p.fr, ...distractors].sort(() => 0.5 - Math.random())
    return {
      id: qId(),
      type: 'qcm',
      prompt: `« ${p.translit} » veut dire :`,
      choices,
      correctAnswer: p.fr,
      explanation: p.explanation,
    }
  })
}

export function generateReorderQuiz(count = 6): QuizQuestion[] {
  const candidates = phrases.filter((p) => p.translit.split(' ').length >= 3 && p.translit.split(' ').length <= 6)
  const picked = [...candidates].sort(() => 0.5 - Math.random()).slice(0, count)
  return picked.map((p) => ({
    id: qId(),
    type: 'reorder',
    prompt: `Remets dans l'ordre : « ${p.fr} »`,
    words: p.translit.replace(/[.,!?]/g, '').split(' '),
    correctAnswer: p.translit.replace(/[.,!?]/g, ''),
  }))
}

export function generateVerbQuiz(count = 8): QuizQuestion[] {
  const persons = ['ana', 'nta', 'nti', 'huwa', 'hiya', 'hna', 'ntuma', 'huma'] as const
  const tenses = ['present', 'past', 'future'] as const
  const tenseTranslit = { present: 'presentTranslit', past: 'pastTranslit', future: 'futureTranslit' } as const
  const tenseLabel = { present: 'au présent', past: 'au passé', future: 'au futur' }
  const questions: QuizQuestion[] = []
  const shuffledVerbs = [...verbs].sort(() => 0.5 - Math.random())
  for (let i = 0; i < Math.min(count, shuffledVerbs.length); i++) {
    const verb = shuffledVerbs[i]
    const person = persons[i % persons.length]
    const tense = tenses[i % tenses.length]
    const correct = verb[tenseTranslit[tense]][person]
    const distractors = shuffledVerbs
      .filter((v) => v.id !== verb.id)
      .slice(0, 2)
      .map((v) => v[tenseTranslit[tense]][person])
    questions.push({
      id: qId(),
      type: 'qcm',
      prompt: `Comment dit-on « ${verb.fr} » ${tenseLabel[tense]} pour "${person}" ?`,
      choices: [correct, ...distractors].sort(() => 0.5 - Math.random()),
      correctAnswer: correct,
    })
  }
  return questions
}
