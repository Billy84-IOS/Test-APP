import type { VocabWord } from '../types'

// Base de vocabulaire Darija marocaine. Translittération en alphabet latin
// avec les conventions courantes utilisées par les Marocains à l'écrit
// informel : 3 = ﻉ (ayn), 7 = ﺡ (ha emphatique), 9 = ﻕ (qaf), 5/kh = ﺥ (kha).
// Le champ `audio.tts` est le texte envoyé au moteur vocal du navigateur.

let n = 0
const id = (prefix: string) => `${prefix}-${++n}`

function w(
  categoryId: string,
  darija: string,
  translit: string,
  fr: string,
  difficulty: VocabWord['difficulty'] = 'debutant',
): VocabWord {
  return {
    id: id(categoryId),
    darija,
    translit,
    fr,
    categoryId,
    difficulty,
    audio: { tts: darija },
  }
}

export const vocabulary: VocabWord[] = [
  // Salutations (mots, les phrases complètes sont dans phrases.ts)
  w('salutations', 'سلام', 'salam', 'salut / paix (salutation universelle)'),
  w('salutations', 'صباح الخير', 'sbah lkhir', 'bonjour (le matin)'),
  w('salutations', 'مسا الخير', 'msa lkhir', 'bonsoir'),
  w('salutations', 'بسلامة', 'bslama', 'au revoir'),
  w('salutations', 'مرحبا', 'marhba', 'bienvenue'),
  w('salutations', 'صحة', 'saha', 'santé (bon appétit / à tes souhaits)'),

  // Famille
  w('famille', 'بابا', 'baba', 'papa'),
  w('famille', 'ماما', 'mama', 'maman'),
  w('famille', 'خويا', 'khoya', 'mon frère'),
  w('famille', 'ختي', 'khti', 'ma sœur'),
  w('famille', 'جدي', 'jeddi', 'mon grand-père'),
  w('famille', 'جدتي', 'jdati', 'ma grand-mère'),
  w('famille', 'عمي', "3mmi", 'mon oncle (paternel)'),
  w('famille', 'خالي', 'khali', 'mon oncle (maternel)'),
  w('famille', 'عمتي', "3mti", 'ma tante (paternelle)'),
  w('famille', 'خالتي', 'khalti', 'ma tante (maternelle)'),
  w('famille', 'مراتي', 'mrati', 'ma femme'),
  w('famille', 'راجلي', 'rajli', 'mon mari'),
  w('famille', 'ولدي', 'weldi', 'mon fils'),
  w('famille', 'بنتي', 'bnti', 'ma fille'),
  w('famille', 'العائلة', "l3a2ila", 'la famille'),

  // Personnes
  w('personnes', 'راجل', 'rajel', 'homme'),
  w('personnes', 'مرا', 'mra', 'femme'),
  w('personnes', 'ولد', 'weld', 'garçon / fils'),
  w('personnes', 'بنت', 'bnt', 'fille'),
  w('personnes', 'صاحبي', 'sahbi', 'mon ami'),
  w('personnes', 'صاحبتي', 'sahbti', 'mon amie'),
  w('personnes', 'الناس', 'nnas', 'les gens'),
  w('personnes', 'صغير', 'sghir', 'petit / jeune'),
  w('personnes', 'كبير', 'kbir', 'grand / âgé'),

  // Nombres 0-20
  w('nombres', 'صفر', 'sifr', 'zéro'),
  w('nombres', 'واحد', 'wahed', 'un (1)'),
  w('nombres', 'جوج', 'jouj', 'deux (2)'),
  w('nombres', 'تلاتة', 'tlata', 'trois (3)'),
  w('nombres', 'ربعة', "rb3a", 'quatre (4)'),
  w('nombres', 'خمسة', 'khamsa', 'cinq (5)'),
  w('nombres', 'ستة', 'stta', 'six (6)'),
  w('nombres', 'سبعة', "sb3a", 'sept (7)'),
  w('nombres', 'تمنية', 'tmnya', 'huit (8)'),
  w('nombres', 'تسعود', "tsa3ud", 'neuf (9)'),
  w('nombres', 'عشرة', "3achra", 'dix (10)'),
  w('nombres', 'حداش', 'hdach', 'onze (11)'),
  w('nombres', 'طناش', 'tnach', 'douze (12)'),
  w('nombres', 'تلطاش', 'tlttach', 'treize (13)'),
  w('nombres', 'ربعطاش', 'rbatach', 'quatorze (14)'),
  w('nombres', 'خمسطاش', 'khamstach', 'quinze (15)'),
  w('nombres', 'سطاش', 'sttach', 'seize (16)'),
  w('nombres', 'سبعطاش', "sba3tach", 'dix-sept (17)'),
  w('nombres', 'تمنطاش', 'tmntach', 'dix-huit (18)'),
  w('nombres', 'تسعطاش', "tsa3tach", 'dix-neuf (19)'),
  w('nombres', 'عشرين', "3achrin", 'vingt (20)'),
  w('nombres', 'تلاتين', 'tlatin', 'trente (30)', 'facile'),
  w('nombres', 'ربعين', "rb3in", 'quarante (40)', 'facile'),
  w('nombres', 'خمسين', 'khamsin', 'cinquante (50)', 'facile'),
  w('nombres', 'ستين', 'sttin', 'soixante (60)', 'facile'),
  w('nombres', 'سبعين', "sb3in", 'soixante-dix (70)', 'facile'),
  w('nombres', 'تمانين', 'tmanin', 'quatre-vingts (80)', 'facile'),
  w('nombres', 'تسعين', "tsa3in", 'quatre-vingt-dix (90)', 'facile'),
  w('nombres', 'مية', 'miya', 'cent (100)', 'facile'),

  // Couleurs
  w('couleurs', 'بيض', 'byed', 'blanc'),
  w('couleurs', 'كحل', 'khal', 'noir'),
  w('couleurs', 'حمر', "7mer", 'rouge'),
  w('couleurs', 'خضر', 'khder', 'vert'),
  w('couleurs', 'زرق', 'zreg', 'bleu'),
  w('couleurs', 'صفر', 'sfer', 'jaune'),
  w('couleurs', 'وردي', 'wardi', 'rose'),
  w('couleurs', 'رمادي', 'rmadi', 'gris'),
  w('couleurs', 'قهوي', 'qehwi', 'marron'),
  w('couleurs', 'برتقالي', "brtqali", 'orange'),

  // Nourriture
  w('nourriture', 'خبز', 'khobz', 'pain'),
  w('nourriture', 'طاجين', 'tajine', 'tajine'),
  w('nourriture', 'كسكسو', 'kesksou', 'couscous'),
  w('nourriture', 'لحم', 'lham', 'viande'),
  w('nourriture', 'دجاج', 'djaj', 'poulet'),
  w('nourriture', 'حوت', 'hout', 'poisson'),
  w('nourriture', 'خضرة', 'khodra', 'légumes'),
  w('nourriture', 'فاكية', 'fakya', 'fruits'),
  w('nourriture', 'البيض', 'lbaid', 'œufs'),
  w('nourriture', 'جبن', 'jben', 'fromage'),
  w('nourriture', 'ملح', 'melh', 'sel'),
  w('nourriture', 'سكر', 'sukkar', 'sucre'),
  w('nourriture', 'زيت', 'zit', 'huile'),
  w('nourriture', 'عسل', "3sel", 'miel'),

  // Boissons
  w('boissons', 'الما', 'lma', "l'eau"),
  w('boissons', 'أتاي', 'atay', 'thé (à la menthe)'),
  w('boissons', 'قهوة', 'qahwa', 'café'),
  w('boissons', 'حليب', "hlib", 'lait'),
  w('boissons', 'عصير', "3sir", 'jus'),

  // Maison
  w('maison', 'دار', 'dar', 'maison'),
  w('maison', 'بيت', 'bit', 'chambre'),
  w('maison', 'كوزينا', 'kuzina', 'cuisine'),
  w('maison', 'حمام', "hammam", 'salle de bain'),
  w('maison', 'باب', 'bab', 'porte'),
  w('maison', 'شرجم', 'shrjem', 'fenêtre'),
  w('maison', 'طابلة', 'tabla', 'table'),
  w('maison', 'كرسي', 'korsi', 'chaise'),
  w('maison', 'فراش', 'frash', 'lit'),

  // Vêtements
  w('vetements', 'حوايج', "hwayj", 'vêtements'),
  w('vetements', 'قميجة', 'qmija', 'chemise'),
  w('vetements', 'سروال', 'serwal', 'pantalon'),
  w('vetements', 'صباط', 'sebbat', 'chaussures'),
  w('vetements', 'جلابة', 'jellaba', 'djellaba'),

  // Corps
  w('corps', 'راس', 'ras', 'tête'),
  w('corps', 'عين', "3in", 'œil'),
  w('corps', 'فم', 'fomm', 'bouche'),
  w('corps', 'يد', 'yed', 'main'),
  w('corps', 'رجل', 'rjel', 'jambe / pied'),
  w('corps', 'قلب', 'qelb', 'cœur'),
  w('corps', 'ودن', 'wden', 'oreille'),

  // Santé
  w('sante', 'مريض', 'mrid', 'malade'),
  w('sante', 'طبيب', 'tbib', 'médecin'),
  w('sante', 'صيدلية', 'sidliya', 'pharmacie'),
  w('sante', 'دوا', 'dwa', 'médicament'),
  w('sante', 'وجع', "wja3", 'douleur / mal'),

  // Émotions
  w('emotions', 'فرحان', 'farhan', 'content'),
  w('emotions', 'حزين', "hzin", 'triste'),
  w('emotions', 'غضبان', "ghadban", 'fâché'),
  w('emotions', 'خايف', 'khayef', 'effrayé'),
  w('emotions', 'تعبان', "t3ban", 'fatigué'),
  w('emotions', 'مزيان', 'mezyan', 'bien / bon'),

  // Météo
  w('meteo', 'الشمس', 'chems', 'le soleil'),
  w('meteo', 'الشتا', 'chta', 'la pluie'),
  w('meteo', 'الريح', 'rih', 'le vent'),
  w('meteo', 'البرد', 'lberd', 'le froid'),
  w('meteo', 'السخانة', 'sokhana', 'la chaleur'),

  // Temps / jours
  w('temps', 'اليوم', 'lyoum', "aujourd'hui"),
  w('temps', 'غدا', 'ghedda', 'demain'),
  w('temps', 'البارح', 'lbareh', 'hier'),
  w('temps', 'دابا', 'daba', 'maintenant'),
  w('jours', 'الإتنين', 'ttnin', 'lundi'),
  w('jours', 'التلات', 'ttlat', 'mardi'),
  w('jours', 'الأربعة', "larb3a", 'mercredi'),
  w('jours', 'الخميس', 'lkhmis', 'jeudi'),
  w('jours', 'الجمعة', "jjem3a", 'vendredi'),
  w('jours', 'السبت', 'ssebt', 'samedi'),
  w('jours', 'الحد', "lhedd", 'dimanche'),

  // Transports
  w('transports', 'الطوبيس', 'ttobis', 'le bus'),
  w('transports', 'الطران', 'ttran', 'le train'),
  w('transports', 'التوموبيل', 'ttomobil', 'la voiture'),
  w('transports', 'الطاكسي', 'ttaxi', 'le taxi'),
  w('transports', 'الطيارة', 'ttiyara', "l'avion"),
  w('transports', 'البيسكليت', 'lbisklit', 'le vélo'),

  // Ville / directions
  w('ville', 'نيشان', 'nichan', 'tout droit'),
  w('ville', 'اليمن', 'limen', 'à droite'),
  w('ville', 'الليسر', 'lisser', 'à gauche'),
  w('ville', 'قريب', 'qrib', 'proche'),
  w('ville', "بعيد", "b3id", 'loin'),
  w('ville', 'زنقة', 'zenqa', 'rue'),

  // Restaurant / café
  w('restaurant', 'الفاكتورة', 'lfatora', "l'addition"),
  w('restaurant', 'اللائحة', 'lla2iha', 'le menu'),
  w('restaurant', 'الغرسون', 'lgarsson', 'le serveur'),

  // Hôtel / voyage
  w('hotel', 'أوطيل', 'otel', "l'hôtel"),
  w('hotel', 'الحجز', "lhajz", 'la réservation'),
  w('hotel', 'جواز السفر', 'jawaz ssafar', 'le passeport'),
  w('hotel', 'الباگاج', 'lbagaj', 'les bagages'),

  // Shopping / marché
  w('shopping', 'السوق', 'ssouq', 'le marché'),
  w('shopping', 'الفلوس', 'lflouss', "l'argent"),
  w('shopping', 'الثمن', "ttaman", 'le prix'),
  w('shopping', 'رخيص', 'rkhis', 'pas cher'),
  w('shopping', 'غالي', 'ghali', 'cher'),

  // Travail / école
  w('travail', 'الخدمة', 'lkhedma', 'le travail'),
  w('travail', 'المدرسة', 'lmedrasa', "l'école"),
  w('travail', 'القراية', 'lqraya', 'les études'),
  w('travail', 'الأستاذ', 'lustad', 'le professeur'),

  // Téléphone / internet
  w('telephone', 'البورطابل', 'lportabl', 'le téléphone portable'),
  w('telephone', 'الرقم', "rraqm", 'le numéro'),
  w('telephone', 'الأنترنت', 'linternet', "l'internet"),

  // Argent / administration
  w('argent', 'البنك', 'lbank', 'la banque'),
  w('argent', 'الكارط', 'lkart', 'la carte'),

  // Animaux / nature
  w('animaux', 'قط', 'qett', 'chat'),
  w('animaux', 'كلب', 'kelb', 'chien'),
  w('animaux', 'عصفور', "3sfour", 'oiseau'),
  w('animaux', 'حصان', "hsan", 'cheval'),
  w('animaux', 'شجرة', 'chejra', 'arbre'),
  w('animaux', 'البحر', "lbhar", 'la mer'),
  w('animaux', 'الجبل', 'ljbel', 'la montagne'),

  // Expressions courantes
  w('expressions', 'واخا', 'wakha', "d'accord"),
  w('expressions', 'يالله', 'yallah', 'allez / on y va'),
  w('expressions', 'ان شاء الله', 'inchallah', "si Dieu le veut"),
  w('expressions', 'ماشي مشكل', 'mashi mushkil', 'pas de problème'),
  w('expressions', 'بزاف', 'bezzaf', 'beaucoup'),
  w('expressions', 'شوية', 'chwiya', 'un peu'),
]
