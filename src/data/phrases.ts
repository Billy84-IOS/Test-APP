import type { Phrase } from '../types'

let n = 0
const id = () => `phrase-${++n}`

function p(data: Omit<Phrase, 'id' | 'audio'>): Phrase {
  return { id: id(), audio: { tts: data.darija }, ...data }
}

// Niveau 1 — Survie : les phrases indispensables demandées, avec explication
// et exemple d'usage pour chacune.
export const survivalPhrases: Phrase[] = [
  p({
    darija: 'صباح الخير', translit: 'Sbah lkhir', fr: 'Bonjour',
    explanation: "Salutation du matin. Se dit jusqu'à peu près midi.",
    example: { darija: 'صباح الخير، لاباس؟', translit: 'Sbah lkhir, labas?', fr: 'Bonjour, ça va ?' },
    categoryId: 'salutations', difficulty: 'debutant', register: 'neutre',
  }),
  p({
    darija: 'سلام', translit: 'Salam', fr: 'Salut',
    explanation: "Salutation universelle, utilisable à toute heure, entre amis comme avec des inconnus.",
    example: { darija: 'سلام! كيداير؟', translit: 'Salam! Kidayer?', fr: 'Salut ! Comment ça va ?' },
    categoryId: 'salutations', difficulty: 'debutant', register: 'tres-courant',
  }),
  p({
    darija: 'كيداير؟ / كيدايرة؟', translit: 'Kidayer? (à un homme) / Kidayra? (à une femme)', fr: 'Comment ça va ?',
    explanation: "Autre façon très courante de demander comment ça va, en plus de 'Labas?'.",
    categoryId: 'salutations', difficulty: 'debutant', register: 'tres-courant',
  }),
  p({
    darija: 'لاباس، الحمد لله', translit: 'Labas, lhamdulillah', fr: 'Ça va bien',
    explanation: "Réponse standard à 'Labas?'. Littéralement 'pas de mal, grâce à Dieu' — se dit même par les non-pratiquants, c'est une expression figée.",
    categoryId: 'salutations', difficulty: 'debutant', register: 'tres-courant',
  }),
  p({
    darija: 'شكرا', translit: 'Choukran', fr: 'Merci',
    explanation: "Compris et utilisé partout au Maroc.",
    categoryId: 'expressions', difficulty: 'debutant', register: 'neutre',
  }),
  p({
    darija: 'بلا جميل', translit: 'Bla jmil', fr: 'De rien',
    explanation: "Littéralement 'sans faveur'. Réponse décontractée à un merci.",
    categoryId: 'expressions', difficulty: 'facile', register: 'familier',
  }),
  p({
    darija: 'عافاك', translit: 'Afak', fr: "S'il te plaît",
    explanation: "S'utilise à la fin d'une demande, très fréquent au quotidien.",
    example: { darija: 'عطيني الما عافاك', translit: 'Atini lma afak', fr: "Donne-moi de l'eau s'il te plaît" },
    categoryId: 'expressions', difficulty: 'debutant', register: 'neutre',
  }),
  p({
    darija: 'سمح ليا', translit: 'Smeh liya', fr: 'Excuse-moi',
    explanation: "Utilisé pour interpeller poliment quelqu'un ou s'excuser légèrement.",
    categoryId: 'expressions', difficulty: 'debutant', register: 'neutre',
  }),
  p({
    darija: 'سمح ليا', translit: 'Smeh liya', fr: 'Pardon',
    explanation: "La même expression que 'excuse-moi' sert aussi pour un pardon plus appuyé — le contexte fait la différence.",
    categoryId: 'expressions', difficulty: 'debutant', register: 'neutre',
  }),
  p({
    darija: 'إيه', translit: 'Ih', fr: 'Oui',
    explanation: "Forme très courante et décontractée. 'Na3am' est la version plus polie/formelle.",
    categoryId: 'expressions', difficulty: 'debutant', register: 'tres-courant',
  }),
  p({
    darija: 'لا', translit: 'La', fr: 'Non',
    categoryId: 'expressions', difficulty: 'debutant', register: 'neutre',
  }),
  p({
    darija: 'يمكن', translit: 'Yemken', fr: 'Peut-être',
    categoryId: 'expressions', difficulty: 'facile', register: 'neutre',
  }),
  p({
    darija: 'فهمت', translit: 'Fhemt', fr: 'Je comprends',
    explanation: "Littéralement 'j'ai compris', utilisé au sens de 'je comprends'.",
    categoryId: 'expressions', difficulty: 'debutant', register: 'neutre',
  }),
  p({
    darija: 'ما فهمتش', translit: 'Ma fhemtch', fr: 'Je ne comprends pas',
    explanation: "La négation en Darija encadre le verbe avec 'ma...ch'.",
    categoryId: 'expressions', difficulty: 'debutant', register: 'neutre',
  }),
  p({
    darija: 'عاود', translit: 'Awed', fr: 'Répète',
    example: { darija: 'عاود عافاك', translit: 'Awed afak', fr: "Répète s'il te plaît" },
    categoryId: 'expressions', difficulty: 'debutant', register: 'neutre',
  }),
  p({
    darija: 'هضر بشوية', translit: 'Hdar bshwiya', fr: 'Parle doucement',
    categoryId: 'expressions', difficulty: 'facile', register: 'neutre',
  }),
  p({
    darija: 'أش سميتك؟', translit: 'Ash smitek?', fr: "Comment tu t'appelles ?",
    categoryId: 'salutations', difficulty: 'debutant', register: 'neutre',
  }),
  p({
    darija: 'سميتي...', translit: 'Smiti...', fr: "Je m'appelle...",
    example: { darija: 'سميتي ريان', translit: 'Smiti Rayan', fr: "Je m'appelle Rayan" },
    categoryId: 'salutations', difficulty: 'debutant', register: 'neutre',
  }),
  p({
    darija: 'منين نتا؟ / منين نتي؟', translit: 'Mnin nta? (à un homme) / Mnin nti? (à une femme)', fr: "D'où viens-tu ?",
    categoryId: 'salutations', difficulty: 'facile', register: 'neutre',
  }),
  p({
    darija: 'أنا فرنساوي / أنا فرنساوية', translit: 'Ana fransawi (homme) / Ana fransawiya (femme)', fr: 'Je suis français(e)',
    categoryId: 'salutations', difficulty: 'debutant', register: 'neutre',
  }),
  p({
    darija: 'فين كاين...؟', translit: 'Fin kayn...?', fr: 'Où est... ?',
    example: { darija: 'فين كاين الحمام؟', translit: 'Fin kayn lhammam?', fr: 'Où sont les toilettes ?' },
    categoryId: 'ville', difficulty: 'debutant', register: 'neutre',
  }),
  p({
    darija: 'بشحال هادا؟', translit: 'Bcheh7al hada?', fr: 'Combien ça coûte ?',
    explanation: "Question de base pour tout achat.",
    categoryId: 'shopping', difficulty: 'debutant', register: 'tres-courant',
  }),
  p({
    darija: 'بغيت...', translit: 'Bghit...', fr: 'Je veux...',
    example: { darija: 'بغيت أتاي', translit: 'Bghit atay', fr: 'Je veux un thé' },
    categoryId: 'expressions', difficulty: 'debutant', register: 'neutre',
  }),
  p({
    darija: 'ما بغيتش...', translit: 'Ma bghitch...', fr: 'Je ne veux pas...',
    categoryId: 'expressions', difficulty: 'debutant', register: 'neutre',
  }),
  p({
    darija: 'كنبغي...', translit: 'Kanbghi...', fr: "J'aime...",
    explanation: "Le même verbe 'bgha' sert pour 'vouloir' et 'aimer' — la forme conjuguée (habituelle 'kan-') marque ici le goût général plutôt qu'une envie ponctuelle.",
    example: { darija: 'كنبغي الطاجين', translit: 'Kanbghi ttajine', fr: "J'aime le tajine" },
    categoryId: 'expressions', difficulty: 'facile', register: 'neutre',
  }),
  p({
    darija: 'ما كنبغيش...', translit: 'Ma kanbghich...', fr: "Je n'aime pas...",
    categoryId: 'expressions', difficulty: 'facile', register: 'neutre',
  }),
]

// Phrases de survie supplémentaires (section 12/13 : au restaurant, en ville,
// pour négocier, demander de l'aide...).
export const survivalExtra: Phrase[] = [
  p({
    darija: 'بغيت نمشي ل...', translit: 'Bghit nemchi l...', fr: 'Je veux aller à...',
    categoryId: 'ville', difficulty: 'facile', register: 'neutre',
  }),
  p({
    darija: 'كيفاش نوصل ل...؟', translit: 'Kifash nwsel l...?', fr: 'Comment je fais pour arriver à... ?',
    categoryId: 'ville', difficulty: 'moyen', register: 'neutre',
  }),
  p({
    darija: 'واش عندك...؟', translit: 'Wach 3andek...?', fr: 'Est-ce que tu as... ?',
    categoryId: 'shopping', difficulty: 'facile', register: 'neutre',
  }),
  p({
    darija: 'عطيني... عافاك', translit: 'Atini... afak', fr: 'Donne-moi... s\'il te plaît',
    categoryId: 'shopping', difficulty: 'debutant', register: 'neutre',
  }),
  p({
    darija: 'بغيت نشري هادشي', translit: 'Bghit nechri hadchi', fr: 'Je veux acheter ça',
    categoryId: 'shopping', difficulty: 'facile', register: 'neutre',
  }),
  p({
    darija: 'غالي بزاف', translit: 'Ghali bezzaf', fr: "C'est trop cher",
    categoryId: 'shopping', difficulty: 'debutant', register: 'tres-courant',
  }),
  p({
    darija: 'نقص شوية عافاك', translit: "Nqess chwiya afak", fr: 'Baisse un peu le prix, s\'il te plaît',
    explanation: "Phrase clé pour négocier au souk — la négociation fait partie de la culture du marché.",
    categoryId: 'shopping', difficulty: 'moyen', register: 'tres-courant',
  }),
  p({
    darija: 'فين كاينة المحطة؟', translit: 'Fin kayna lmahatta?', fr: 'Où est la gare/station ?',
    categoryId: 'transports', difficulty: 'facile', register: 'neutre',
  }),
  p({
    darija: 'دينا ل... عافاك', translit: 'Ddini l... afak', fr: "Emmène-moi à... s'il te plaît (au taxi)",
    categoryId: 'transports', difficulty: 'facile', register: 'neutre',
  }),
  p({
    darija: 'عاونّي عافاك', translit: "Awenni afak", fr: 'Aide-moi, s\'il te plaît',
    categoryId: 'expressions', difficulty: 'debutant', register: 'neutre',
  }),
  p({
    darija: 'أنا ضايع', translit: 'Ana dayeh', fr: 'Je suis perdu(e)',
    categoryId: 'ville', difficulty: 'facile', register: 'neutre',
  }),
  p({
    darija: 'أشنو هادا؟', translit: 'Ashnu hada?', fr: "Qu'est-ce que c'est ?",
    categoryId: 'expressions', difficulty: 'debutant', register: 'tres-courant',
  }),
  p({
    darija: 'واش كاين الوايفاي؟', translit: 'Wach kayn lwifi?', fr: "Est-ce qu'il y a le wifi ?",
    categoryId: 'telephone', difficulty: 'facile', register: 'tres-courant',
  }),
  p({
    darija: 'الفاكتورة عافاك', translit: 'Lfatora afak', fr: "L'addition, s'il vous plaît",
    categoryId: 'restaurant', difficulty: 'debutant', register: 'neutre',
  }),
  p({
    darija: 'صحيتي', translit: 'Sahitini / Bsaha', fr: 'Bon appétit',
    explanation: "Se dit avant ou pendant le repas ; on répond souvent 'Allah y3tik saha'.",
    categoryId: 'restaurant', difficulty: 'facile', register: 'tres-courant',
  }),
]

export const phrases: Phrase[] = [...survivalPhrases, ...survivalExtra]
