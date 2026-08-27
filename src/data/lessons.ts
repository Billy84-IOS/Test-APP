import type { Lesson, QuizQuestion, VocabWord } from '../types'
import { vocabulary } from './vocabulary'
import { phrases } from './phrases'
import { grammarPoints } from './grammar'
import { verbs } from './verbs'
import { conversations } from './conversations'

// --- Petits utilitaires pour construire les leçons sans coder d'IDs en dur :
// on dérive toujours les références à partir des tableaux de contenu déjà
// définis, ce qui garde l'ensemble cohérent même si le contenu grandit.

const byCategory = (categoryId: string, limit?: number) =>
  vocabulary.filter((v) => v.categoryId === categoryId).slice(0, limit).map((v) => v.id)

const phrasesByCategory = (categoryId: string, limit?: number) =>
  phrases.filter((p) => p.categoryId === categoryId).slice(0, limit).map((p) => p.id)

const grammarByIndex = (...indexes: number[]) => indexes.map((i) => grammarPoints[i]?.id).filter((v): v is string => Boolean(v))
const verbRange = (start: number, end: number) => verbs.slice(start, end).map((v) => v.id)
const convId = (index: number) => conversations[index]?.id

let qn = 0
const qId = () => `lesson-q-${++qn}`

function vocabQuiz(categoryId: string, count = 3): QuizQuestion[] {
  const words = vocabulary.filter((v) => v.categoryId === categoryId).slice(0, count)
  return words.map((word, i) => {
    const distractors = vocabulary
      .filter((v) => v.categoryId !== categoryId)
      .slice(i * 2, i * 2 + 2)
      .map((v) => v.fr)
    const choices = shuffle([word.fr, ...distractors])
    return {
      id: qId(),
      type: 'qcm',
      prompt: `Que veut dire « ${word.darija} » (${word.translit}) ?`,
      choices,
      correctAnswer: word.fr,
    }
  })
}

function phraseQuiz(categoryId: string, count = 2): QuizQuestion[] {
  return phrases
    .filter((p) => p.categoryId === categoryId)
    .slice(0, count)
    .map((phrase) => ({
      id: qId(),
      type: 'darija-to-fr' as const,
      prompt: `Traduis : « ${phrase.translit} »`,
      correctAnswer: phrase.fr,
      explanation: phrase.explanation,
    }))
}

// Mélange déterministe (pas de vrai hasard, pour un contenu stable) basé sur
// la longueur des chaînes — suffisant pour varier l'ordre des choix de QCM.
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort((a, b) => String(a).length - String(b).length)
}

let ln = 0
const lId = () => `lesson-${++ln}`

function lesson(data: Omit<Lesson, 'id'>): Lesson {
  return { id: lId(), ...data }
}

export const lessons: Lesson[] = [
  // ───────────────────────── Niveau 0 — Découverte ─────────────────────────
  lesson({
    title: 'Qu\'est-ce que la Darija ?', level: 0, order: 1, icon: '🌍',
    description: "Découvre ce qui différencie la Darija marocaine du français et de l'arabe classique, et pourquoi elle se parle et s'écrit un peu partout au Maroc.",
    vocabIds: [], phraseIds: [], grammarIds: [], verbIds: [], quiz: [],
  }),
  lesson({
    title: 'Prononcer les sons marocains', level: 0, order: 2, icon: '🔊',
    description: "Les sons difficiles pour un francophone et les chiffres utilisés pour les noter à l'écrit (3, 7, 9, 5...).",
    vocabIds: [], phraseIds: [], grammarIds: grammarByIndex(0), verbIds: [], quiz: [],
  }),
  lesson({
    title: 'Lire la Darija en alphabet latin', level: 0, order: 3, icon: '🔤',
    description: "Comprendre comment la Darija s'écrit de façon informelle (SMS, réseaux sociaux) sans orthographe officielle unique.",
    vocabIds: [], phraseIds: [], grammarIds: grammarByIndex(1), verbIds: [], quiz: [],
  }),

  // ───────────────────────── Niveau 1 — Survie ─────────────────────────
  lesson({
    title: 'Se saluer', level: 1, order: 4, icon: '👋',
    description: 'Les salutations essentielles : bonjour, salut, comment ça va, au revoir.',
    vocabIds: byCategory('salutations'), phraseIds: phrasesByCategory('salutations', 4),
    grammarIds: [], verbIds: [],
    quiz: [...vocabQuiz('salutations'), ...phraseQuiz('salutations')],
  }),
  lesson({
    title: 'Politesse : merci, pardon, s\'il te plaît', level: 1, order: 5, icon: '🙏',
    description: 'Les formules de politesse indispensables pour tout échange au quotidien.',
    vocabIds: [], phraseIds: phrasesByCategory('expressions', 5),
    grammarIds: [], verbIds: [],
    quiz: phraseQuiz('expressions', 3),
  }),
  lesson({
    title: 'Oui, non, je comprends', level: 1, order: 6, icon: '💬',
    description: 'Répondre simplement et signaler qu\'on comprend ou non.',
    vocabIds: [], phraseIds: phrases.filter((p) => ['Oui', 'Non', 'Peut-être', 'Je comprends', 'Je ne comprends pas', 'Répète', 'Parle doucement'].includes(p.fr)).map((p) => p.id),
    grammarIds: grammarByIndex(7), verbIds: [],
    quiz: phraseQuiz('expressions', 2),
  }),
  lesson({
    title: 'Se présenter', level: 1, order: 7, icon: '🧑',
    description: 'Dire son nom, d\'où l\'on vient, sa nationalité.',
    vocabIds: [], phraseIds: phrases.filter((p) => p.fr.toLowerCase().includes("t'appelles") || p.fr.startsWith("Je m'appelle") || p.fr.includes('viens-tu') || p.fr.includes('français')).map((p) => p.id),
    grammarIds: [], verbIds: [], conversationId: convId(0),
    quiz: phraseQuiz('salutations', 2),
  }),
  lesson({
    title: 'Les pronoms et "être"', level: 1, order: 8, icon: '📖',
    description: 'Je, tu, il... et comment dire "je suis" sans verbe être conjugué.',
    vocabIds: [], phraseIds: [], grammarIds: grammarByIndex(2, 5), verbIds: [],
    quiz: [],
  }),
  lesson({
    title: '"Avoir" et la négation', level: 1, order: 9, icon: '🚫',
    description: 'Le mot "3end" pour dire "avoir", et la négation "ma...ch".',
    vocabIds: [], phraseIds: [], grammarIds: grammarByIndex(6, 7), verbIds: [],
    quiz: [],
  }),

  // ───────────────────────── Niveau 2 — Darija de survie ─────────────────────────
  lesson({
    title: 'Compter de 0 à 20', level: 2, order: 10, icon: '🔢',
    description: 'Les nombres indispensables pour les prix, les heures, les quantités.',
    vocabIds: byCategory('nombres', 11), phraseIds: [], grammarIds: [], verbIds: [],
    quiz: vocabQuiz('nombres', 4),
  }),
  lesson({
    title: 'Compter jusqu\'à 100', level: 2, order: 11, icon: '💯',
    description: 'Les dizaines, pour négocier un prix ou comprendre un numéro de téléphone.',
    vocabIds: vocabulary.filter((v) => v.categoryId === 'nombres').slice(21).map((v) => v.id),
    phraseIds: [], grammarIds: [], verbIds: [],
    quiz: [],
  }),
  lesson({
    title: 'Poser des questions', level: 2, order: 12, icon: '❓',
    description: 'Quoi, qui, où, quand, comment, combien : les mots-clés pour t\'informer.',
    vocabIds: [], phraseIds: [], grammarIds: grammarByIndex(8), verbIds: [],
    quiz: [],
  }),
  lesson({
    title: 'Demander son chemin', level: 2, order: 13, icon: '🗺️',
    description: 'Se repérer en ville et comprendre les indications.',
    vocabIds: byCategory('ville'), phraseIds: phrasesByCategory('ville'),
    grammarIds: [], verbIds: [], conversationId: convId(4),
    quiz: [...vocabQuiz('ville', 3), ...phraseQuiz('ville', 2)],
  }),
  lesson({
    title: 'Prendre un taxi', level: 2, order: 14, icon: '🚕',
    description: 'Monter dans un taxi, donner sa destination, comprendre le prix.',
    vocabIds: byCategory('transports'), phraseIds: phrasesByCategory('transports'),
    grammarIds: [], verbIds: [], conversationId: convId(3),
    quiz: vocabQuiz('transports', 3),
  }),
  lesson({
    title: 'Négocier au marché', level: 2, order: 15, icon: '🏷️',
    description: 'Demander un prix et négocier, une compétence essentielle au souk.',
    vocabIds: byCategory('shopping'), phraseIds: phrasesByCategory('shopping'),
    grammarIds: [], verbIds: verbRange(15, 16), conversationId: convId(2),
    quiz: [...vocabQuiz('shopping', 3), ...phraseQuiz('shopping', 2)],
  }),

  // ───────────────────────── Niveau 3 — Conversations simples ─────────────────────────
  lesson({
    title: 'Commander au café', level: 3, order: 16, icon: '☕',
    description: 'Vocabulaire des boissons et comment commander poliment.',
    vocabIds: byCategory('boissons'), phraseIds: phrasesByCategory('restaurant'),
    grammarIds: [], verbIds: verbRange(2, 3), conversationId: convId(1),
    quiz: vocabQuiz('boissons', 3),
  }),
  lesson({
    title: 'Au restaurant', level: 3, order: 17, icon: '🍽️',
    description: 'Commander un repas complet, comprendre le menu, demander l\'addition.',
    vocabIds: byCategory('nourriture'), phraseIds: phrasesByCategory('restaurant'),
    grammarIds: [], verbIds: verbRange(1, 2), conversationId: convId(11),
    quiz: vocabQuiz('nourriture', 4),
  }),
  lesson({
    title: 'Faire des courses', level: 3, order: 18, icon: '🛒',
    description: 'Acheter fruits, légumes et produits du quotidien.',
    vocabIds: byCategory('nourriture', 10), phraseIds: [], grammarIds: [], verbIds: [],
    conversationId: convId(5), quiz: [],
  }),
  lesson({
    title: 'À l\'hôtel', level: 3, order: 19, icon: '🏨',
    description: 'Réserver, s\'enregistrer, demander le wifi.',
    vocabIds: byCategory('hotel'), phraseIds: [], grammarIds: [], verbIds: [],
    conversationId: convId(6), quiz: vocabQuiz('hotel', 3),
  }),
  lesson({
    title: 'Décrire avec des adjectifs', level: 3, order: 20, icon: '🎨',
    description: 'Accorder les adjectifs et les utiliser dans une phrase, et comparer deux choses.',
    vocabIds: byCategory('couleurs'), phraseIds: [], grammarIds: grammarByIndex(13, 15), verbIds: [],
    quiz: vocabQuiz('couleurs', 3),
  }),

  // ───────────────────────── Niveau 4 — Vie quotidienne ─────────────────────────
  lesson({
    title: 'La famille', level: 4, order: 21, icon: '👨‍👩‍👧‍👦',
    description: 'Nommer les membres de sa famille.',
    vocabIds: byCategory('famille'), phraseIds: [], grammarIds: [], verbIds: [],
    conversationId: convId(10), quiz: vocabQuiz('famille', 4),
  }),
  lesson({
    title: 'L\'hospitalité marocaine', level: 4, order: 22, icon: '🏡',
    description: 'Être invité chez quelqu\'un, comprendre les codes de politesse et d\'hospitalité.',
    vocabIds: [], phraseIds: [], grammarIds: [], verbIds: [],
    conversationId: convId(8), quiz: [],
  }),
  lesson({
    title: 'Le corps et la santé', level: 4, order: 23, icon: '🩺',
    description: 'Parler d\'une douleur, aller à la pharmacie.',
    vocabIds: [...byCategory('corps'), ...byCategory('sante')], phraseIds: [], grammarIds: [], verbIds: [],
    quiz: [...vocabQuiz('corps', 2), ...vocabQuiz('sante', 2)],
  }),
  lesson({
    title: 'Les verbes essentiels (1)', level: 4, order: 24, icon: '🏃',
    description: 'Vouloir, manger, boire, aller, venir : les verbes qu\'on utilise tous les jours.',
    vocabIds: [], phraseIds: [], grammarIds: [], verbIds: verbRange(0, 5), quiz: [],
  }),
  lesson({
    title: 'Les verbes essentiels (2)', level: 4, order: 25, icon: '🗣️',
    description: 'Faire, travailler, parler, écouter, voir, savoir, comprendre.',
    vocabIds: [], phraseIds: [], grammarIds: [], verbIds: verbRange(5, 13), quiz: [],
  }),

  // ─────────────────── Niveau 5 — Conversation intermédiaire ───────────────────
  lesson({
    title: 'Au travail', level: 5, order: 26, icon: '💼',
    description: 'Échanger avec des collègues, parler de son emploi.',
    vocabIds: byCategory('travail'), phraseIds: [], grammarIds: [], verbIds: verbRange(6, 7),
    conversationId: convId(12), quiz: vocabQuiz('travail', 3),
  }),
  lesson({
    title: 'Téléphoner', level: 5, order: 27, icon: '📞',
    description: 'Réserver, prendre rendez-vous, comprendre une conversation téléphonique.',
    vocabIds: byCategory('telephone'), phraseIds: [], grammarIds: [], verbIds: [],
    conversationId: convId(13), quiz: vocabQuiz('telephone', 2),
  }),
  lesson({
    title: 'Besoin, souhait, obligation', level: 5, order: 28, icon: '🎯',
    description: 'Exprimer "je dois", "j\'ai besoin de", "je voudrais".',
    vocabIds: [], phraseIds: [], grammarIds: grammarByIndex(17, 18, 19), verbIds: verbRange(13, 14),
    quiz: [],
  }),
  lesson({
    title: 'À l\'aéroport', level: 5, order: 29, icon: '✈️',
    description: 'Passer les contrôles, expliquer le motif de sa visite.',
    vocabIds: byCategory('hotel', 4), phraseIds: [], grammarIds: [], verbIds: [],
    conversationId: convId(7), quiz: [],
  }),
  lesson({
    title: 'Le futur et la possibilité', level: 5, order: 30, icon: '🔮',
    description: 'Parler de ce qu\'on va faire, et de ce qu\'on peut ou ne peut pas faire.',
    vocabIds: [], phraseIds: [], grammarIds: grammarByIndex(20, 21), verbIds: verbRange(14, 15),
    quiz: [],
  }),

  // ───────────────────────── Niveau 6 — Darija avancée ─────────────────────────
  lesson({
    title: 'Expressions et langage courant', level: 6, order: 31, icon: '🔥',
    description: 'Les expressions que les Marocains utilisent vraiment tous les jours.',
    vocabIds: byCategory('expressions'), phraseIds: [], grammarIds: [], verbIds: [],
    quiz: vocabQuiz('expressions', 4),
  }),
  lesson({
    title: 'Discuter entre amis', level: 6, order: 32, icon: '😄',
    description: 'Suivre une conversation informelle et rapide entre amis marocains.',
    vocabIds: [], phraseIds: [], grammarIds: [], verbIds: [],
    conversationId: convId(9), quiz: [],
  }),
  lesson({
    title: 'Verbes avancés', level: 6, order: 33, icon: '🧠',
    description: 'Acheter, jouer, revenir, entrer, sortir, commencer.',
    vocabIds: [], phraseIds: [], grammarIds: [], verbIds: verbRange(15, 20), quiz: [],
  }),

  // ───────────────────────── Niveau 7 — Conversationnel ─────────────────────────
  lesson({
    title: 'Inviter et être invité', level: 7, order: 34, icon: '🫖',
    description: 'Maîtriser les codes de l\'hospitalité pour de vraies interactions sociales.',
    vocabIds: [], phraseIds: [], grammarIds: [], verbIds: [],
    conversationId: convId(14), quiz: [],
  }),
  lesson({
    title: 'Révision conversationnelle générale', level: 7, order: 35, icon: '🏆',
    description: 'Mets tout en pratique : reprends librement n\'importe quelle conversation apprise et essaie de la rejouer sans regarder la traduction.',
    vocabIds: [], phraseIds: [], grammarIds: [], verbIds: [], quiz: [],
  }),
]

export function wordsForIds(ids: string[]): VocabWord[] {
  const set = new Set(ids)
  return vocabulary.filter((v) => set.has(v.id))
}
