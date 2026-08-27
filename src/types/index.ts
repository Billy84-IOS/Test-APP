// Modèle de données central de l'application. Tout le contenu pédagogique
// (vocabulaire, phrases, verbes, grammaire, conversations, leçons) respecte
// ces types pour rester facilement extensible.

export type Level = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export type Difficulty = 'debutant' | 'facile' | 'moyen' | 'avance'

export type Register = 'neutre' | 'familier' | 'tres-courant' | 'a-eviter'

export interface AudioRef {
  /** Texte à envoyer au moteur TTS du navigateur (Web Speech API). */
  tts: string
  /** Chemin vers un fichier audio réel, ajouté plus tard (optionnel). */
  file?: string
}

export interface Variant {
  darija: string
  translit: string
  region?: string
  note?: string
}

export interface VocabWord {
  id: string
  darija: string
  translit: string
  fr: string
  categoryId: string
  example?: { darija: string; translit: string; fr: string }
  audio?: AudioRef
  difficulty: Difficulty
  variants?: Variant[]
  tags?: string[]
}

export interface Phrase {
  id: string
  darija: string
  translit: string
  fr: string
  explanation?: string
  audio?: AudioRef
  example?: { darija: string; translit: string; fr: string }
  categoryId: string
  difficulty: Difficulty
  register?: Register
  tags?: string[]
}

export interface VerbConjugationSet {
  ana: string // je
  nta: string // tu (masc.)
  nti: string // tu (fém.)
  huwa: string // il
  hiya: string // elle
  hna: string // nous
  ntuma: string // vous
  huma: string // ils/elles
}

export interface Verb {
  id: string
  infinitive: string // forme de référence (souvent 3ème pers. masc. passé)
  translit: string
  fr: string
  present: VerbConjugationSet
  presentTranslit: VerbConjugationSet
  past: VerbConjugationSet
  pastTranslit: VerbConjugationSet
  future: VerbConjugationSet
  futureTranslit: VerbConjugationSet
  negativePattern: string // ex. "ma...ch"
  examples: { darija: string; translit: string; fr: string }[]
  difficulty: Difficulty
}

export interface GrammarExample {
  darija: string
  translit: string
  fr: string
}

export interface GrammarPoint {
  id: string
  title: string
  level: Level
  explanation: string
  table?: { headers: string[]; rows: string[][] }
  examples: GrammarExample[]
  order: number
}

export interface ConversationLine {
  speaker: string
  darija: string
  translit: string
  fr: string
  audio?: AudioRef
}

export interface Conversation {
  id: string
  title: string
  icon: string
  level: Level
  situation: string
  lines: ConversationLine[]
  vocabIds: string[]
  quiz: QuizQuestion[]
}

export type ExerciseType =
  | 'fr-to-darija'
  | 'darija-to-fr'
  | 'qcm'
  | 'fill-blank'
  | 'reorder'
  | 'listen-word'
  | 'listen-sentence'
  | 'choose-translation'
  | 'listen-then-answer'

export interface QuizQuestion {
  id: string
  type: ExerciseType
  prompt: string
  promptAudio?: AudioRef
  choices?: string[]
  correctAnswer: string
  explanation?: string
  words?: string[] // pour reorder
}

export interface Lesson {
  id: string
  title: string
  level: Level
  order: number
  icon: string
  description: string
  vocabIds: string[]
  phraseIds: string[]
  grammarIds: string[]
  verbIds: string[]
  conversationId?: string
  quiz: QuizQuestion[]
}

export interface Category {
  id: string
  name: string
  icon: string
  description?: string
}

export interface LevelInfo {
  level: Level
  title: string
  icon: string
  description: string
}
