# 🇲🇦 Darija — Apprends le marocain gratuitement

Application **Expo (React Native)** pour apprendre à parler la Darija
marocaine, du niveau débutant absolu jusqu'à la conversation. 100%
gratuite, sans compte, sans publicité, sans abonnement. Buildable en app
native iOS/Android via **EAS Build**.

## Stack

- **Expo SDK 57 + Expo Router** (navigation par fichiers) + TypeScript
- **NativeWind** (Tailwind CSS pour React Native) — mobile-first
- **expo-dev-client** — build de développement installable sur ton iPhone
- **AsyncStorage** — progression sauvegardée sur l'appareil, sans compte
- **expo-speech** — synthèse vocale native gratuite (aucune clé API)

## Nouveautés de cette version

- **⚡ Traduction en direct** (`/traduire`) : écris une phrase en français,
  la traduction en Darija s'affiche instantanément si elle est connue,
  sinon une traduction mot à mot + des suggestions proches (100%
  hors-ligne, jamais de traduction inventée — voir `src/lib/translate.ts`)
- Portage complet de la version web précédente vers Expo/React Native

## Démarrer (depuis ton VPS, terminal iPhone)

```bash
git clone <url-du-repo>
cd Test-APP
git checkout claude/ios-expo-vps-build-evlpiq
npm install
npx expo install --check    # aligne les versions de paquets natifs avec le SDK
```

### Build de développement iOS via EAS

```bash
npx eas-cli login
# ou en headless : export EXPO_TOKEN="ton_access_token_expo.dev"
npx eas-cli credentials        # 1ère fois : configure les certificats iOS
npx eas-cli build --platform ios --profile development
```

Récupère le lien d'installation sur **expo.dev** ou scanne le QR code.

### Utilisation au quotidien une fois le dev client installé

```bash
npx expo start --dev-client
```

## Architecture

```
app/                Routes Expo Router (fichiers = écrans/navigation)
  _layout.tsx        Layout racine : Provider de progression + onboarding
  (tabs)/            Les 5 onglets principaux (Accueil, Apprendre,
                     Exercices, Révisions, Progrès)
  vocabulaire/       Liste + détail par catégorie
  conversations/     Liste + lecteur de dialogue
  traduire.tsx        Traduction en direct (nouveau)
  ecouter.tsx, dictionnaire.tsx, favoris.tsx, recherche.tsx,
  au-maroc.tsx, parler.tsx, comprendre.tsx

src/
  types/             Types TypeScript du contenu pédagogique
  data/              Tout le contenu : vocabulary.ts, phrases.ts, verbs.ts,
                     grammar.ts, conversations.ts, lessons.ts, categories.ts
                     (pur TypeScript, indépendant de l'UI — extensible)
  lib/               storage (AsyncStorage), srs (répétition espacée), tts
                     (expo-speech), quizGen (génération d'exercices),
                     translate (traducteur en direct)
  context/           ProgressContext — état global (XP, série, favoris, SRS)
  components/        AudioButton, FlashCard, QuizRunner, FavoriteButton...
  screens/           Un écran par fonctionnalité, monté par les fichiers app/
```

### Ajouter du contenu

Le contenu (mots, phrases, verbes, grammaire, conversations, leçons) vit
entièrement dans `src/data/`, séparé de l'UI. Les leçons référencent le
contenu dynamiquement (par catégorie ou par index) plutôt que par
identifiants codés en dur, pour rester robustes quand le contenu grandit.

### État actuel du contenu (V1)

- ~180 mots de vocabulaire sur 25 catégories
- ~40 phrases de survie
- 20 verbes conjugués (présent / passé / futur / négation)
- 22 points de grammaire progressifs
- 15 conversations réalistes avec quiz de compréhension
- 35 leçons organisées en 8 niveaux (Découverte → Conversationnel)

Base solide et vérifiée plutôt que du contenu gonflé artificiellement —
l'architecture est prête pour ajouter beaucoup plus sans rien casser.

## Vérifications effectuées dans cette session

- `npx tsc --noEmit` : aucune erreur
- `npx expo export --platform ios` et `--platform android` : bundle Metro
  complet (1600+ modules) sans erreur
- Aucun simulateur/appareil physique n'est disponible dans cet
  environnement — le test fonctionnel réel (rendu, interactions tactiles)
  doit se faire via le build EAS installé sur ton iPhone.

## Pourquoi build via EAS depuis un VPS et pas cette session

Cette session Claude Code applique une politique réseau qui bloque les
appels sortants vers `api.expo.dev`. Le code, la config et les commits
fonctionnent très bien ici, mais `eas login` / `eas build` doivent être
exécutés depuis une machine avec un accès réseau complet — ton VPS.
