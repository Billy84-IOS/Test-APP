# 🇲🇦 Darija — Apprends le marocain gratuitement

Application web (mobile-first, installable en PWA) pour apprendre à parler la
Darija marocaine, du niveau débutant absolu jusqu'à la conversation. 100%
gratuite, sans compte, sans publicité, sans abonnement.

## Stack

- **React + TypeScript + Vite** — build rapide, aucun serveur requis
- **Tailwind CSS v4** — design mobile-first
- **React Router** — navigation par pages
- **vite-plugin-pwa** — installable et utilisable hors-ligne
- **localStorage** — progression sauvegardée sur l'appareil, sans compte
- **Web Speech API** — synthèse vocale gratuite intégrée au navigateur (aucune clé API)

## Démarrer en local

```bash
npm install
npm run dev       # serveur de développement
npm run build      # build de production dans dist/
npm run preview    # tester le build de production
npm run lint        # vérifie le code avec oxlint
```

## Architecture

```
src/
  types/            Types TypeScript du modèle de contenu pédagogique
  data/              Tout le contenu : vocabulary.ts, phrases.ts, verbs.ts,
                     grammar.ts, conversations.ts, lessons.ts, categories.ts
                     (séparé de l'UI, facilement extensible)
  lib/               Logique : storage (localStorage), srs (répétition
                     espacée), tts (synthèse vocale), quizGen (génération
                     d'exercices), types
  context/           ProgressContext — état de progression global (XP, série
                     de jours, favoris, SRS, statistiques)
  components/        Composants réutilisables (Layout, AudioButton,
                     FlashCard, QuizRunner, FavoriteButton, ProgressBar)
  pages/             Une page par écran (Accueil, Apprendre, Vocabulaire,
                     Conversations, Écouter, Exercices, Révisions, Progrès,
                     Dictionnaire, Favoris, Recherche, Je suis au Maroc,
                     Je veux parler, Je veux comprendre)
```

### Ajouter du contenu

Le contenu (mots, phrases, verbes, grammaire, conversations, leçons) est
entièrement séparé du code d'interface dans `src/data/`. Pour ajouter des
mots, des phrases ou des leçons, il suffit d'ajouter des entrées dans ces
fichiers — aucune autre partie de l'application n'a besoin d'être modifiée.
Les leçons référencent le contenu dynamiquement (par catégorie ou par index)
plutôt que par identifiants codés en dur, pour rester robustes quand le
contenu grandit.

### État actuel du contenu (V1)

- ~180 mots de vocabulaire sur 25 catégories
- ~40 phrases de survie
- 20 verbes conjugués (présent / passé / futur / négation)
- 22 points de grammaire progressifs
- 15 conversations réalistes avec quiz de compréhension
- 35 leçons organisées en 8 niveaux (Découverte → Conversationnel)

C'est une base solide et vérifiée plutôt qu'un contenu gonflé
artificiellement — l'architecture est prête pour ajouter des centaines
d'entrées supplémentaires sans rien casser.

## Déploiement

L'application est 100% statique après build (`npm run build` → dossier
`dist/`) : elle peut être déployée gratuitement sur Netlify, Vercel, GitHub
Pages, Cloudflare Pages, ou tout hébergeur de fichiers statiques.
