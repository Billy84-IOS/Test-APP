import type { GrammarPoint } from '../types'

let n = 0
const id = () => `grammar-${++n}`
let order = 0
const nextOrder = () => ++order

export const grammarPoints: GrammarPoint[] = [
  {
    id: id(), order: nextOrder(), level: 0, title: 'Les sons difficiles pour un francophone',
    explanation:
      "La Darija utilise des sons arabes qui n'existent pas en français. À l'écrit informel (SMS, réseaux sociaux), les Marocains utilisent des chiffres pour les noter : 3 = ﻉ (son guttural, gorge serrée, différent de notre 'a'), 7 = ﺡ (un 'h' fortement expiré), 9 = ﻕ (un 'k' prononcé très au fond de la gorge), 5 ou 'kh' = ﺥ (comme le 'j' espagnol ou le 'ch' allemand dans 'Bach'). Ne cherche pas la perfection tout de suite : les Marocains comprennent très bien un accent étranger.",
    examples: [
      { darija: '3afak', translit: "3 = ايin (ﻉ)", fr: "s'il te plaît — le 3 se prononce dans la gorge" },
      { darija: 'khoya', translit: "kh = ﺥ", fr: 'mon frère — comme la jota espagnole' },
      { darija: '9ahwa', translit: "9 = ﻕ", fr: 'café — k très guttural, au fond de la gorge' },
      { darija: '7mer', translit: "7 = ﺡ", fr: "rouge — h très expiré, comme si tu soufflais sur une vitre" },
    ],
  },
  {
    id: id(), order: nextOrder(), level: 0, title: 'Lire la Darija en alphabet latin',
    explanation:
      "Il n'y a pas d'orthographe officielle unique : chaque Marocain peut écrire un peu différemment. Dans cette application, on suit les conventions les plus courantes (celles utilisées dans les SMS et sur les réseaux sociaux). Les voyelles sont souvent réduites ou absentes à l'écrit — c'est normal, la Darija est une langue essentiellement orale.",
    examples: [
      { darija: 'bghit', translit: 'b-r-ir-t (voyelles réduites)', fr: 'je veux' },
      { darija: 'mzyan', translit: 'mzyan (pas "mazyane")', fr: 'bien / bon' },
    ],
  },
  {
    id: id(), order: nextOrder(), level: 1, title: 'Les pronoms personnels',
    explanation: 'Ce sont les mots de base pour dire "je, tu, il..." — indispensables avant de conjuguer un verbe.',
    table: {
      headers: ['Darija', 'Translittération', 'Français'],
      rows: [
        ['أنا', 'ana', 'je / moi'],
        ['نتا', 'nta', 'tu (homme)'],
        ['نتي', 'nti', 'tu (femme)'],
        ['هو', 'huwa', 'il'],
        ['هي', 'hiya', 'elle'],
        ['حنا', 'hna', 'nous'],
        ['نتوما', 'ntuma', 'vous'],
        ['هما', 'huma', 'ils / elles'],
      ],
    },
    examples: [{ darija: 'أنا بغيت نتعلم', translit: 'Ana bghit net3allem', fr: "Moi, je veux apprendre" }],
  },
  {
    id: id(), order: nextOrder(), level: 1, title: 'Masculin et féminin',
    explanation:
      "En Darija, le féminin d'un adjectif ou d'un mot se forme très souvent en ajoutant un 'a' à la fin. Le 'tu' change aussi selon le genre de la personne à qui on parle (nta / nti).",
    examples: [
      { darija: 'كبير / كبيرة', translit: 'kbir (masc.) / kbira (fém.)', fr: 'grand / grande' },
      { darija: 'صغير / صغيرة', translit: 'sghir (masc.) / sghira (fém.)', fr: 'petit / petite' },
      { darija: 'مزيان / مزيانة', translit: 'mezyan (masc.) / mezyana (fém.)', fr: 'bien / bonne' },
    ],
  },
  {
    id: id(), order: nextOrder(), level: 1, title: 'Le pluriel',
    explanation:
      "Le pluriel en Darija est souvent irrégulier (comme en arabe) : il faut apprendre la forme au cas par cas plutôt que d'appliquer une règle fixe. Mais un très grand nombre de mots empruntés ou récents prennent simplement -at ou -in à la fin.",
    examples: [
      { darija: 'ولد / ولاد', translit: 'weld / wlad', fr: 'garçon / garçons (enfants)' },
      { darija: 'بنت / بنات', translit: 'bnt / bnat', fr: 'fille / filles' },
      { darija: 'كتاب / كتوبات', translit: 'ktab / ktoubat', fr: 'livre / livres' },
    ],
  },
  {
    id: id(), order: nextOrder(), level: 1, title: 'Être (au présent, souvent sous-entendu)',
    explanation:
      "Contrairement au français, la Darija n'a pas besoin d'un verbe 'être' au présent pour les phrases simples : on juxtapose directement le sujet et l'attribut.",
    examples: [
      { darija: 'أنا فرنساوي', translit: 'Ana fransawi', fr: 'Je suis français (littéralement : moi français)' },
      { darija: 'هي فرحانة', translit: 'Hiya farhana', fr: 'Elle est contente' },
      { darija: 'دابا برد', translit: 'Daba berd', fr: 'Maintenant il fait froid' },
    ],
  },
  {
    id: id(), order: nextOrder(), level: 1, title: 'Avoir : "3end"',
    explanation:
      "Il n'y a pas de verbe 'avoir' conjugué : on utilise le mot 'عند' (3end, littéralement 'chez/auprès de') suivi d'un pronom attaché.",
    table: {
      headers: ['Darija', 'Translittération', 'Français'],
      rows: [
        ['عندي', '3endi', "j'ai"],
        ['عندك', '3endek', 'tu as'],
        ['عندو', '3endou', 'il a'],
        ['عندها', '3endha', 'elle a'],
        ['عندنا', '3endna', 'nous avons'],
        ['عندكم', '3endkoum', 'vous avez'],
        ['عندهم', '3endhoum', 'ils/elles ont'],
      ],
    },
    examples: [{ darija: 'عندي جوج ولاد', translit: '3endi jouj wlad', fr: "J'ai deux enfants" }],
  },
  {
    id: id(), order: nextOrder(), level: 1, title: 'La négation : "ma...ch"',
    explanation:
      "La négation la plus courante encadre le verbe conjugué avec 'ma' avant et 'ch' (ou '-ch') après.",
    examples: [
      { darija: 'ما فهمتش', translit: 'Ma fhemtch', fr: 'Je ne comprends pas' },
      { darija: 'ما بغيتش', translit: 'Ma bghitch', fr: 'Je ne veux pas' },
      { darija: 'ماشي مشكل', translit: 'Mashi mushkil', fr: "Pas de problème (négation avec 'mashi' devant un nom/adjectif)" },
    ],
  },
  {
    id: id(), order: nextOrder(), level: 1, title: 'Poser une question',
    explanation:
      "On peut souvent transformer une phrase affirmative en question simplement par l'intonation, ou utiliser un mot interrogatif en tête (ou parfois en fin) de phrase.",
    table: {
      headers: ['Darija', 'Translittération', 'Français'],
      rows: [
        ['أشنو', 'ashnu', 'quoi'],
        ['شكون', 'chkoun', 'qui'],
        ['فين', 'fin', 'où'],
        ['إمتى', 'imta', 'quand'],
        ['علاش', 'alach', 'pourquoi'],
        ['كيفاش', 'kifash', 'comment'],
        ['بشحال', "bcheh7al", 'combien (prix)'],
        ['شحال', "ch7al", 'combien (quantité)'],
        ['واش', 'wach', "particule qui introduit une question oui/non"],
      ],
    },
    examples: [
      { darija: 'واش نتا فرنساوي؟', translit: 'Wach nta fransawi?', fr: 'Est-ce que tu es français ?' },
      { darija: 'فين ساكن؟', translit: 'Fin saken?', fr: 'Où habites-tu ?' },
    ],
  },
  {
    id: id(), order: nextOrder(), level: 2, title: "L'impératif (donner un ordre)",
    explanation:
      "Pour donner un ordre simple, on utilise souvent le radical du verbe sans pronom, parfois avec une légère modification de la première voyelle.",
    examples: [
      { darija: 'سير', translit: 'Sir', fr: 'Vas-y' },
      { darija: 'عاود', translit: 'Awed', fr: 'Répète' },
      { darija: 'گلس', translit: 'Gles', fr: 'Assieds-toi' },
      { darija: 'سمح ليا', translit: 'Smeh liya', fr: 'Excuse-moi' },
    ],
  },
  {
    id: id(), order: nextOrder(), level: 2, title: 'Les possessifs',
    explanation:
      "La possession se marque le plus souvent en collant un suffixe directement au nom (comme pour 'ma mère, mon père' déjà vus), ou avec le mot 'dyal' (de, à) pour les cas plus complexes.",
    table: {
      headers: ['Darija', 'Translittération', 'Français'],
      rows: [
        ['ديالي', 'dyali', 'à moi / le mien'],
        ['ديالك', 'dyalek', 'à toi / le tien'],
        ['ديالو', 'dyalou', 'à lui / le sien'],
        ['ديالها', 'dyalha', 'à elle / le sien'],
        ['ديالنا', 'dyalna', 'à nous / le nôtre'],
      ],
    },
    examples: [{ darija: 'هادا الكتاب ديالي', translit: 'Hada lktab dyali', fr: 'Ce livre est à moi' }],
  },
  {
    id: id(), order: nextOrder(), level: 2, title: 'Les démonstratifs (ce, cette, ceci)',
    table: {
      headers: ['Darija', 'Translittération', 'Français'],
      rows: [
        ['هادا', 'hada', 'ce / celui-ci (masc.)'],
        ['هادي', 'hadi', 'cette / celle-ci (fém.)'],
        ['هادو', 'hadou', 'ces / ceux-ci (pluriel)'],
      ],
    },
    explanation: 'Le démonstratif se place généralement avant le nom.',
    examples: [{ darija: 'بشحال هادا؟', translit: 'Bcheh7al hada?', fr: 'Combien ça coûte, ceci ?' }],
  },
  {
    id: id(), order: nextOrder(), level: 2, title: 'Les prépositions courantes',
    table: {
      headers: ['Darija', 'Translittération', 'Français'],
      rows: [
        ['ف', 'f', 'dans / à'],
        ['ل', 'l', 'à / vers'],
        ['من', 'men', 'de / depuis'],
        ['مع', 'm3a', 'avec'],
        ['فوق', 'fouq', 'sur / au-dessus'],
        ['تحت', 'tht', 'sous'],
        ['قدام', 'qeddam', 'devant'],
        ['ورا', 'wra', 'derrière'],
      ],
    },
    explanation: 'Les prépositions se placent avant le nom, comme en français.',
    examples: [{ darija: 'كنخدم فبنك', translit: 'Kankhdem f bank', fr: 'Je travaille dans une banque' }],
  },
  {
    id: id(), order: nextOrder(), level: 2, title: 'Les adjectifs',
    explanation:
      "L'adjectif se place après le nom qu'il qualifie et s'accorde en genre (souvent en ajoutant -a au féminin).",
    examples: [
      { darija: 'واحد الدار كبيرة', translit: 'Wahed ddar kbira', fr: 'Une grande maison' },
      { darija: 'أتاي سخون', translit: 'Atay skhoun', fr: 'Un thé chaud' },
    ],
  },
  {
    id: id(), order: nextOrder(), level: 3, title: 'Les adverbes de fréquence et de quantité',
    table: {
      headers: ['Darija', 'Translittération', 'Français'],
      rows: [
        ['بزاف', 'bezzaf', 'beaucoup'],
        ['شوية', 'chwiya', 'un peu'],
        ['دائما', 'daiman', 'toujours'],
        ['بعض المرات', 'be3d lmrrat', 'parfois'],
        ['عمرني', "3omri", 'jamais (+ négation)'],
        ['غير', 'ghir', 'seulement / juste'],
      ],
    },
    explanation: 'Ces mots se placent généralement après le verbe ou en fin de phrase.',
    examples: [{ darija: 'كنشرب أتاي بزاف', translit: 'Kanshreb atay bezzaf', fr: 'Je bois beaucoup de thé' }],
  },
  {
    id: id(), order: nextOrder(), level: 3, title: 'Le comparatif',
    explanation:
      "Pour comparer, on modifie souvent l'adjectif (schéma proche de 'ktar' = plus) suivi de 'men' (que).",
    examples: [
      { darija: 'هادا كبر من هادا', translit: 'Hada kber men hada', fr: "Celui-ci est plus grand que celui-là" },
      { darija: 'بنتي كبيرة أكثر مني', translit: 'Bnti kbira ktar minni', fr: 'Ma fille est plus grande que moi' },
    ],
  },
  {
    id: id(), order: nextOrder(), level: 3, title: 'Structure de la phrase simple',
    explanation:
      "L'ordre le plus courant est Sujet - Verbe - Complément, comme en français, ce qui rend la construction de phrases assez intuitive pour un francophone.",
    examples: [{ darija: 'أنا كنسكن فالرباط', translit: 'Ana kanseken f Rrbat', fr: "J'habite à Rabat" }],
  },
  {
    id: id(), order: nextOrder(), level: 3, title: 'Exprimer un besoin',
    explanation: "On utilise le verbe '7taj' (avoir besoin) ou simplement 'khass' (il faut / falloir), très utilisé.",
    examples: [
      { darija: 'خصني نمشي', translit: 'Khassni nemchi', fr: "Il faut que je parte / je dois partir" },
      { darija: 'كنحتاج مساعدة', translit: "Kan7taj mosa3ada", fr: "J'ai besoin d'aide" },
    ],
  },
  {
    id: id(), order: nextOrder(), level: 3, title: 'Exprimer un souhait',
    explanation: "'Bghit' (je veux) sert aussi à exprimer un souhait, souvent suivi d'un verbe au présent sans 'ka-'.",
    examples: [{ darija: 'بغيت نتعلم الدارجة', translit: 'Bghit net3allem ddarija', fr: "Je voudrais apprendre la darija" }],
  },
  {
    id: id(), order: nextOrder(), level: 4, title: "Exprimer l'obligation",
    explanation: "'Khass' + pronom collé exprime une obligation forte ('il faut que / je dois').",
    table: {
      headers: ['Darija', 'Translittération', 'Français'],
      rows: [
        ['خصني', 'khassni', 'je dois'],
        ['خصك', 'khassek', 'tu dois'],
        ['خصو', 'khasso', 'il doit'],
        ['خصها', 'khassha', 'elle doit'],
      ],
    },
    examples: [{ darija: 'خصك تجي بكري', translit: 'Khassek tji bekri', fr: 'Tu dois venir tôt' }],
  },
  {
    id: id(), order: nextOrder(), level: 4, title: 'Possibilité et impossibilité',
    explanation: "Le verbe '9der' (pouvoir) conjugué exprime la possibilité ; sa négation, l'impossibilité.",
    examples: [
      { darija: 'نقدر نعاونك', translit: "Ne9der ne3awnek", fr: "Je peux t'aider" },
      { darija: 'ما نقدرش نجي', translit: "Ma ne9derch nji", fr: 'Je ne peux pas venir' },
    ],
  },
  {
    id: id(), order: nextOrder(), level: 4, title: 'Le futur avec "ghadi"',
    explanation:
      "Le futur se forme avec 'ghadi' (ou 'rad') placé avant le verbe au présent sans le préfixe 'ka-'.",
    examples: [{ darija: 'غادي نمشي غدا', translit: 'Ghadi nemchi ghedda', fr: 'Je vais partir demain' }],
  },
]
