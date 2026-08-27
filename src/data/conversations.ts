import type { Conversation, QuizQuestion } from '../types'

let cid = 0
const id = () => `conv-${++cid}`
let qid = 0
const qId = () => `conv-q-${++qid}`

function qcm(prompt: string, choices: string[], correctAnswer: string, explanation?: string): QuizQuestion {
  return { id: qId(), type: 'qcm', prompt, choices, correctAnswer, explanation }
}

export const conversations: Conversation[] = [
  {
    id: id(), title: 'Faire connaissance', icon: '🤝', level: 1,
    situation: 'Tu rencontres quelqu\'un pour la première fois dans la rue.',
    lines: [
      { speaker: 'A', darija: 'سلام! كيداير؟', translit: 'Salam! Kidayer?', fr: 'Salut ! Comment ça va ?' },
      { speaker: 'B', darija: 'لاباس، الحمد لله. و نتا؟', translit: 'Labas, lhamdulillah. W nta?', fr: 'Ça va, grâce à Dieu. Et toi ?' },
      { speaker: 'A', darija: 'لاباس. أشنو سميتك؟', translit: 'Labas. Ashnu smitek?', fr: 'Ça va. Comment tu t\'appelles ?' },
      { speaker: 'B', darija: 'سميتي يوسف. و نتا؟', translit: 'Smiti Youssef. W nta?', fr: 'Je m\'appelle Youssef. Et toi ?' },
      { speaker: 'A', darija: 'سميتي توماس. منين نتا؟', translit: 'Smiti Thomas. Mnin nta?', fr: 'Je m\'appelle Thomas. D\'où viens-tu ?' },
      { speaker: 'B', darija: 'أنا من الدار البيضاء. و نتا؟', translit: 'Ana men Ddar lbida. W nta?', fr: 'Je viens de Casablanca. Et toi ?' },
      { speaker: 'A', darija: 'أنا فرنساوي. مبروك التعارف!', translit: 'Ana fransawi. Mabrouk t3aruf!', fr: 'Je suis français. Ravi de te rencontrer !' },
    ],
    vocabIds: [],
    quiz: [
      qcm('Comment demande-t-on "Comment tu t\'appelles ?" en Darija ?', ['Fin kayn?', 'Ashnu smitek?', 'Bcheh7al hada?'], 'Ashnu smitek?'),
      qcm('"Mnin nta?" veut dire :', ['Comment vas-tu ?', 'D\'où viens-tu ?', 'Qui es-tu ?'], 'D\'où viens-tu ?'),
    ],
  },
  {
    id: id(), title: 'Commander dans un café', icon: '☕', level: 2,
    situation: 'Tu es assis dans un café marocain et tu commandes.',
    lines: [
      { speaker: 'Serveur', darija: 'صباح الخير، أشنو غادي تشرب؟', translit: 'Sbah lkhir, ashnu ghadi tshreb?', fr: 'Bonjour, qu\'est-ce que vous buvez ?' },
      { speaker: 'Client', darija: 'بغيت أتاي بالنعناع عافاك', translit: 'Bghit atay b na3na3 afak', fr: 'Je veux un thé à la menthe s\'il vous plaît' },
      { speaker: 'Serveur', darija: 'واخا، شي حاجة أخرى؟', translit: 'Wakha, chi haja okhra?', fr: 'D\'accord, autre chose ?' },
      { speaker: 'Client', darija: 'إيه، عطيني ياك واحد الكرواصون', translit: 'Ih, atini yak wahed lkroissant', fr: 'Oui, donnez-moi aussi un croissant' },
      { speaker: 'Serveur', darija: 'واخا داباه', translit: 'Wakha dabah', fr: 'D\'accord, tout de suite' },
      { speaker: 'Client', darija: 'الفاكتورة عافاك', translit: 'Lfatora afak', fr: 'L\'addition s\'il vous plaît' },
      { speaker: 'Serveur', darija: 'بشحال؟ عشرين درهم', translit: 'Bcheh7al? 3achrin dirham', fr: 'Ça fait 20 dirhams' },
    ],
    vocabIds: [],
    quiz: [
      qcm('"Atay b na3na3" veut dire :', ['Café au lait', 'Thé à la menthe', 'Jus d\'orange'], 'Thé à la menthe'),
      qcm('Pour demander l\'addition on dit :', ['Lfatora afak', 'Bslama', 'Sbah lkhir'], 'Lfatora afak'),
    ],
  },
  {
    id: id(), title: 'Acheter quelque chose au marché', icon: '🛍️', level: 2,
    situation: 'Tu négocies un prix au souk.',
    lines: [
      { speaker: 'Vendeur', darija: 'أهلا! أشنو بغيتي؟', translit: 'Ahlan! Ashnu bghiti?', fr: 'Bienvenue ! Qu\'est-ce que vous voulez ?' },
      { speaker: 'Client', darija: 'بشحال هاد الجلابة؟', translit: 'Bcheh7al had jjellaba?', fr: 'Combien coûte cette djellaba ?' },
      { speaker: 'Vendeur', darija: 'ديك مية درهم غير', translit: 'Dik miya dirham ghir', fr: 'Celle-là, seulement 100 dirhams' },
      { speaker: 'Client', darija: 'غالي بزاف! نقص شوية عافاك', translit: 'Ghali bezzaf! Nqess chwiya afak', fr: 'C\'est trop cher ! Baisse un peu s\'il te plaît' },
      { speaker: 'Vendeur', darija: 'واخا، ثمانين درهم، خاطرك', translit: 'Wakha, tmanin dirham, khatrek', fr: 'D\'accord, 80 dirhams, pour toi' },
      { speaker: 'Client', darija: 'واخا، نشريها', translit: "Wakha, nechriha", fr: "D'accord, je la prends" },
    ],
    vocabIds: [],
    quiz: [
      qcm('"Nqess chwiya afak" sert à :', ['Demander le chemin', 'Négocier un prix', 'Commander à manger'], 'Négocier un prix'),
      qcm('"Ghali bezzaf" veut dire :', ['Pas cher du tout', 'Trop cher', 'Très joli'], 'Trop cher'),
    ],
  },
  {
    id: id(), title: 'Prendre un taxi', icon: '🚕', level: 2,
    situation: 'Tu montes dans un taxi et donnes ta destination.',
    lines: [
      { speaker: 'Client', darija: 'سلام، دينا للمحطة عافاك', translit: 'Salam, ddini l lmahatta afak', fr: 'Bonjour, emmenez-moi à la gare s\'il vous plaît' },
      { speaker: 'Chauffeur', darija: 'واخا، أركب', translit: 'Wakha, rkeb', fr: 'D\'accord, montez' },
      { speaker: 'Client', darija: 'بشحال غادي يكون الثمن؟', translit: 'Bcheh7al ghadi ykoun ttaman?', fr: 'Combien va coûter le trajet ?' },
      { speaker: 'Chauffeur', darija: 'بالكونتور، ماشي مشكل', translit: 'B lkontor, mashi mushkil', fr: 'Au compteur, pas de problème' },
      { speaker: 'Client', darija: 'واقفني هنا عافاك', translit: 'Weqqefni hna afak', fr: 'Arrêtez-vous ici s\'il vous plaît' },
    ],
    vocabIds: [],
    quiz: [
      qcm('"Ddini l..." veut dire :', ['Combien ça coûte ?', 'Emmène-moi à...', 'Où est... ?'], 'Emmène-moi à...'),
    ],
  },
  {
    id: id(), title: 'Demander son chemin', icon: '🗺️', level: 2,
    situation: 'Tu es perdu et demandes ton chemin à un passant.',
    lines: [
      { speaker: 'Toi', darija: 'سمح ليا، فين كاين البريد؟', translit: 'Smeh liya, fin kayn lbrid?', fr: 'Excusez-moi, où est la poste ?' },
      { speaker: 'Passant', darija: 'سير نيشان، من بعد دور اليمن', translit: 'Sir nichan, men be3d dour limen', fr: 'Va tout droit, puis tourne à droite' },
      { speaker: 'Toi', darija: 'واش بعيد من هنا؟', translit: 'Wach b3id men hna?', fr: 'Est-ce que c\'est loin d\'ici ?' },
      { speaker: 'Passant', darija: 'لا، قريب، خمس دقايق بالرجلين', translit: 'La, qrib, khams dqayeq b rejlin', fr: 'Non, c\'est proche, cinq minutes à pied' },
      { speaker: 'Toi', darija: 'شكرا بزاف!', translit: 'Choukran bezzaf!', fr: 'Merci beaucoup !' },
    ],
    vocabIds: [],
    quiz: [
      qcm('"Sir nichan" veut dire :', ['Tourne à gauche', 'Va tout droit', 'Arrête-toi'], 'Va tout droit'),
    ],
  },
  {
    id: id(), title: 'Faire des courses', icon: '🛒', level: 3,
    situation: 'Tu achètes des fruits et légumes chez l\'épicier.',
    lines: [
      { speaker: 'Client', darija: 'عندك الطماطم؟', translit: '3ndek ttomatich?', fr: 'Vous avez des tomates ?' },
      { speaker: 'Épicier', darija: 'إيه، شحال بغيتي؟', translit: 'Ih, ch7al bghiti?', fr: 'Oui, combien vous en voulez ?' },
      { speaker: 'Client', darija: 'عطيني كيلو عافاك، و شوية بصل', translit: 'Atini kilo afak, w chwiya bsel', fr: 'Donnez-moi un kilo s\'il vous plaît, et un peu d\'oignons' },
      { speaker: 'Épicier', darija: 'واخا، شي حاجة أخرى؟', translit: 'Wakha, chi haja okhra?', fr: 'D\'accord, autre chose ?' },
      { speaker: 'Client', darija: 'لا، هاداك كافي، بشحال الكل؟', translit: 'La, hadak kafi, bcheh7al lkoll?', fr: 'Non, ça suffit, ça fait combien en tout ?' },
    ],
    vocabIds: [],
    quiz: [
      qcm('"Ch7al bghiti?" veut dire :', ['Combien en voulez-vous ?', 'Où est-ce ?', 'Comment allez-vous ?'], 'Combien en voulez-vous ?'),
    ],
  },
  {
    id: id(), title: 'À l\'hôtel', icon: '🏨', level: 3,
    situation: 'Tu arrives à la réception de ton hôtel.',
    lines: [
      { speaker: 'Toi', darija: 'مسا الخير، عندي حجز', translit: 'Msa lkhir, 3ndi lhajz', fr: 'Bonsoir, j\'ai une réservation' },
      { speaker: 'Réceptionniste', darija: 'أشنو سميتك عافاك؟', translit: 'Ashnu smitek afak?', fr: 'Votre nom s\'il vous plaît ?' },
      { speaker: 'Toi', darija: 'سميتي توماس مارتان', translit: 'Smiti Thomas Martin', fr: 'Je m\'appelle Thomas Martin' },
      { speaker: 'Réceptionniste', darija: 'واخا، هاك الكليف ديال البيت', translit: 'Wakha, hak lclé dyal lbit', fr: 'Voici la clé de la chambre' },
      { speaker: 'Toi', darija: 'واش كاين الوايفاي؟', translit: 'Wach kayn lwifi?', fr: 'Est-ce qu\'il y a le wifi ?' },
      { speaker: 'Réceptionniste', darija: 'إيه، الكود مكتوب فالورقة', translit: 'Ih, lkod mektoub f lwarqa', fr: 'Oui, le code est écrit sur le papier' },
    ],
    vocabIds: [],
    quiz: [
      qcm('"3ndi lhajz" veut dire :', ['J\'ai faim', 'J\'ai une réservation', 'Je suis perdu'], 'J\'ai une réservation'),
    ],
  },
  {
    id: id(), title: 'À l\'aéroport', icon: '✈️', level: 3,
    situation: 'Tu passes le contrôle à l\'aéroport.',
    lines: [
      { speaker: 'Agent', darija: 'جواز السفر ديالك عافاك', translit: 'Jawaz ssafar dyalek afak', fr: 'Votre passeport s\'il vous plaît' },
      { speaker: 'Toi', darija: 'تفضل', translit: 'Tfaddal', fr: 'Tenez' },
      { speaker: 'Agent', darija: 'جيتي غادي فين؟', translit: 'Jiti ghadi fin?', fr: 'Vous allez où ?' },
      { speaker: 'Toi', darija: 'جيت باش نزور مراكش', translit: 'Jit bach nzour Marrakech', fr: 'Je viens pour visiter Marrakech' },
      { speaker: 'Agent', darija: 'مرحبا بيك فالمغرب!', translit: 'Marhba bik f lmeghrib!', fr: 'Bienvenue au Maroc !' },
    ],
    vocabIds: [],
    quiz: [
      qcm('"Marhba bik" veut dire :', ['Au revoir', 'Bienvenue', 'À bientôt'], 'Bienvenue'),
    ],
  },
  {
    id: id(), title: 'Chez quelqu\'un', icon: '🏡', level: 4,
    situation: 'Un ami marocain t\'invite chez lui.',
    lines: [
      { speaker: 'Hôte', darija: 'مرحبا بيك دار ديالنا دارك', translit: 'Marhba bik, dar dyalna darek', fr: 'Bienvenue, notre maison est ta maison' },
      { speaker: 'Toi', darija: 'شكرا بزاف على الدعوة', translit: 'Choukran bezzaf 3la ddaawa', fr: 'Merci beaucoup pour l\'invitation' },
      { speaker: 'Hôte', darija: 'گلس، بغيتي أتاي وللا قهوة؟', translit: 'Gles, bghiti atay wella qahwa?', fr: 'Assieds-toi, tu veux du thé ou du café ?' },
      { speaker: 'Toi', darija: 'أتاي عافاك، شكرا', translit: 'Atay afak, choukran', fr: 'Un thé s\'il te plaît, merci' },
      { speaker: 'Hôte', darija: 'صحيتك، كول معانا', translit: 'Sahitek, koul m3ana', fr: 'Bon appétit, mange avec nous' },
    ],
    vocabIds: [],
    quiz: [
      qcm('"Wella" dans "atay wella qahwa" veut dire :', ['et', 'ou', 'avec'], 'ou'),
    ],
  },
  {
    id: id(), title: 'Parler avec des amis marocains', icon: '😄', level: 4,
    situation: 'Discussion décontractée entre amis, un vendredi soir.',
    lines: [
      { speaker: 'Ami 1', darija: 'أشنو الأخبار؟ شنو غادي دير الجمعة؟', translit: 'Ashnu lakhbar? Chnu ghadi dir jjem3a?', fr: 'Quoi de neuf ? Tu fais quoi ce vendredi ?' },
      { speaker: 'Ami 2', darija: 'ماعندي والو، بغيت غير نرتاح', translit: 'Ma 3endi walou, bghit ghir nertah', fr: 'Rien de spécial, je veux juste me reposer' },
      { speaker: 'Ami 1', darija: 'يالله نمشيو نشربو أتاي؟', translit: 'Yallah nemchiw nshrbou atay?', fr: 'Allez, on va boire un thé ?' },
      { speaker: 'Ami 2', darija: 'واخا، فين بغيتي؟', translit: 'Wakha, fin bghiti?', fr: 'D\'accord, où veux-tu aller ?' },
      { speaker: 'Ami 1', darija: 'عند لقهوة ديال الحومة', translit: 'and lqahwa dyal lhouma', fr: 'Au café du quartier' },
    ],
    vocabIds: [],
    quiz: [
      qcm('"Yallah" sert à dire :', ['Allez / on y va', 'Peut-être', 'Jamais'], 'Allez / on y va'),
    ],
  },
  {
    id: id(), title: 'Parler avec la famille', icon: '👨‍👩‍👧', level: 4,
    situation: 'Un appel avec sa mère marocaine.',
    lines: [
      { speaker: 'Maman', darija: 'ألو ولدي، كيداير؟ واكلتي؟', translit: 'Allo weldi, kidayer? Waklti?', fr: 'Allô mon fils, comment vas-tu ? Tu as mangé ?' },
      { speaker: 'Fils', darija: 'لاباس ماما، إيه كليت دابا', translit: 'Labas mama, ih klit daba', fr: 'Ça va maman, oui je viens de manger' },
      { speaker: 'Maman', darija: 'مزيان. إمتى غادي تجي تشوفنا؟', translit: 'Mezyan. Imta ghadi tji tchoufna?', fr: 'Bien. Quand vas-tu venir nous voir ?' },
      { speaker: 'Fils', darija: 'غادي نجي جمعة الجاية إن شاء الله', translit: 'Ghadi nji jjem3a jjaya inchallah', fr: 'Je viendrai vendredi prochain si Dieu le veut' },
    ],
    vocabIds: [],
    quiz: [
      qcm('"Waklti?" veut dire :', ['Tu as dormi ?', 'Tu as mangé ?', 'Tu as fini ?'], 'Tu as mangé ?'),
    ],
  },
  {
    id: id(), title: 'Au restaurant', icon: '🍽️', level: 3,
    situation: 'Tu commandes un repas complet au restaurant.',
    lines: [
      { speaker: 'Serveur', darija: 'مرحبا، عندكم طاولة ديال جوج؟', translit: 'Marhba, 3ndkoum tabla dyal jouj?', fr: 'Bienvenue, vous avez une table pour deux ?' },
      { speaker: 'Client', darija: 'إيه عافاك. أشنو عندكم اليوم؟', translit: 'Ih afak. Ashnu 3ndkoum lyoum?', fr: 'Oui s\'il vous plaît. Qu\'avez-vous aujourd\'hui ?' },
      { speaker: 'Serveur', darija: 'عندنا طاجين دجاج و كسكسو', translit: 'Andna tajine djaj w kesksou', fr: 'Nous avons du tajine de poulet et du couscous' },
      { speaker: 'Client', darija: 'نتا بغيت طاجين، و هي بغات كسكسو', translit: 'Nta bghit tajine, w hiya bghat kesksou', fr: 'Je veux le tajine, et elle veut le couscous' },
      { speaker: 'Serveur', darija: 'واخا، دابا نجيبهم ليكم', translit: 'Wakha, daba njibhoum likoum', fr: 'D\'accord, je vous les apporte tout de suite' },
    ],
    vocabIds: [],
    quiz: [
      qcm('"Ashnu 3ndkoum lyoum?" veut dire :', ['Combien ça coûte aujourd\'hui ?', 'Qu\'avez-vous aujourd\'hui ?', 'Où est le restaurant ?'], 'Qu\'avez-vous aujourd\'hui ?'),
    ],
  },
  {
    id: id(), title: 'Au travail', icon: '💼', level: 5,
    situation: 'Une conversation avec un collègue au bureau.',
    lines: [
      { speaker: 'Collègue', darija: 'صباح الخير، واش خدمتي على المشروع؟', translit: 'Sbah lkhir, wach khdemti 3la lmachrou3?', fr: 'Bonjour, tu as travaillé sur le projet ?' },
      { speaker: 'Toi', darija: 'إيه، خدمت عليه لبارح بالليل', translit: 'Ih, khdemt 3lih lbareh billil', fr: 'Oui, j\'ai travaillé dessus hier soir' },
      { speaker: 'Collègue', darija: 'مزيان! واش خصنا نجتمعو مع المدير؟', translit: 'Mezyan! Wach khassna njtem3ou m3a lmudir?', fr: 'Bien ! On doit se réunir avec le directeur ?' },
      { speaker: 'Toi', darija: 'إيه، فالساعة عشرة صباحا', translit: "Ih, f ssa3a 3achra sbahan", fr: 'Oui, à 10 heures du matin' },
    ],
    vocabIds: [],
    quiz: [
      qcm('"Khdemti" vient du verbe :', ['bgha (vouloir)', 'khdem (travailler)', 'mcha (aller)'], 'khdem (travailler)'),
    ],
  },
  {
    id: id(), title: 'Téléphoner', icon: '📞', level: 4,
    situation: 'Tu appelles pour réserver une table.',
    lines: [
      { speaker: 'Toi', darija: 'ألو، بغيت نحجز طاولة ديال ربعة', translit: "Allo, bghit nhjez tabla dyal rb3a", fr: 'Allô, je veux réserver une table pour quatre' },
      { speaker: 'Employé', darija: 'لأي ساعة عافاك؟', translit: 'L ay sa3a afak?', fr: 'Pour quelle heure s\'il vous plaît ?' },
      { speaker: 'Toi', darija: 'فالثمنية ديال المسا', translit: "F ttmnya dyal lmsa", fr: 'À huit heures du soir' },
      { speaker: 'Employé', darija: 'واخا، تسجلات باسم شكون؟', translit: "Wakha, tsejjlat b ism chkoun?", fr: 'D\'accord, réservation à quel nom ?' },
    ],
    vocabIds: [],
    quiz: [
      qcm('"L ay sa3a?" veut dire :', ['À quelle heure ?', 'Combien de personnes ?', 'Quel est ton nom ?'], 'À quelle heure ?'),
    ],
  },
  {
    id: id(), title: 'Inviter quelqu\'un à boire un thé', icon: '🫖', level: 5,
    situation: 'Une scène de politesse et d\'hospitalité très marocaine.',
    lines: [
      { speaker: 'A', darija: 'أجي نشربو أتاي عندي فالدار', translit: 'Aji nshrbou atay 3ndi f ddar', fr: 'Viens boire un thé chez moi' },
      { speaker: 'B', darija: 'ألف شكر، ولكن ما نقدرش اليوم', translit: 'Alf choukr, walakin ma ne9derch lyoum', fr: 'Merci mille fois, mais je ne peux pas aujourd\'hui' },
      { speaker: 'A', darija: 'علاش؟ خصك تجي، ولو شوية', translit: 'Alach? Khassek tji, welou chwiya', fr: 'Pourquoi ? Il faut que tu viennes, ne serait-ce qu\'un peu' },
      { speaker: 'B', darija: 'واخا، نجي غير نص ساعة', translit: 'Wakha, nji ghir nos sa3a', fr: 'D\'accord, je viens juste une demi-heure' },
    ],
    vocabIds: [],
    quiz: [
      qcm('Insister poliment pour inviter fait partie de :', ["l'hospitalité marocaine", "une règle administrative", "une expression argotique"], "l'hospitalité marocaine", "Au Maroc, refuser une invitation directement est rare ; on insiste souvent avant d'accepter."),
    ],
  },
]
