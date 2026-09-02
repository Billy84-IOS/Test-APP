# 🃏 CardTable

Plateforme web de jeux de cartes multijoueur entre amis — Président, Kem's,
Rami, 8 américain. Jouable sur ordinateur, tablette et smartphone.

**État du projet : Phase 2 (comptes) terminée.** Inscription, connexion,
sessions, tableau de bord et profil fonctionnent. Pas encore d'amis, de lobby
ni de jeux jouables — voir [Plan des phases](#plan-des-phases).

## Stack

- **Frontend** : Next.js 16 (App Router, Turbopack) + React 19 + TypeScript + Tailwind CSS v4
- **Backend** : Node.js + Express (REST) + Socket.IO (temps réel) + TypeScript
- **Base de données** : PostgreSQL + Prisma
- **Monorepo** : pnpm workspaces
- **Infra** : Docker Compose (dev : PostgreSQL ; prod : tout conteneurisé — Phase 11)

## Prérequis

- Node.js ≥ 20
- pnpm ≥ 10 (`corepack enable` ou `npm install -g pnpm`)
- Docker + Docker Compose (pour PostgreSQL en local) — ou un PostgreSQL déjà installé

## Installation

```bash
pnpm install
```

## Variables d'environnement

Copie les fichiers d'exemple et adapte si besoin :

```bash
cp apps/server/.env.example apps/server/.env
cp apps/web/.env.example apps/web/.env.local
```

Voir `.env.example` à la racine pour la vue d'ensemble (utilisé par Docker Compose en prod).

## Lancer la base de données

```bash
docker compose -f docker/docker-compose.yml up -d
```

> Si tu n'as pas Docker, un PostgreSQL local fonctionne aussi : crée une base
> `cardtable` et adapte `DATABASE_URL` dans `apps/server/.env`.

## Migrations Prisma

```bash
pnpm db:migrate     # crée/applique les migrations en dev
pnpm db:generate     # régénère le client Prisma (fait automatiquement par migrate)
```

## Lancer en développement

Dans deux terminaux séparés :

```bash
pnpm dev:server   # http://localhost:4000
pnpm dev:web      # http://localhost:3000
```

La page d'accueil affiche l'état de connexion serveur ↔ base de données —
si elle est verte, les fondations sont opérationnelles.

Le navigateur ne parle jamais directement au port 4000 : Next relaie
`/api/*` vers le serveur (voir `apps/web/next.config.ts`). Un seul port
(3000) est donc à exposer publiquement.

> `@cardtable/shared` est un paquet TypeScript **compilé** : il doit être
> construit avant que le serveur (Node) ou Next puisse le charger. Les
> scripts `dev:server`, `dev:web`, `typecheck` et `test` le font déjà
> automatiquement (`pnpm build:shared`).

## Tests

Les tests du serveur tournent sur une **vraie base PostgreSQL dédiée** (aucun
mock de Prisma), vidée avant chaque test. Crée-la une fois :

```bash
createdb cardtable_test          # ou : psql -c 'CREATE DATABASE cardtable_test;'
DATABASE_URL="postgresql://cardtable:cardtable@localhost:5432/cardtable_test" \
  pnpm --filter @cardtable/server prisma migrate deploy
```

```bash
pnpm test          # tous les packages
pnpm --filter @cardtable/server test   # un seul package
```

L'URL est surchargeable via `TEST_DATABASE_URL`.

## Lint & vérification des types

```bash
pnpm lint
pnpm typecheck
```

> Note Next.js 16 : après un `pnpm install` ou un changement de routes, si
> `typecheck` ne trouve pas `LayoutProps`/`PageProps`, lance une fois
> `npx next typegen` (ou `next dev`/`next build`) dans `apps/web` — ces types
> sont générés, pas fournis par le package.

## Build de production

```bash
pnpm build          # shared → server → web, dans l'ordre des dépendances
pnpm start:server   # node dist/index.js
pnpm start:web      # next start
```

## Architecture

```
apps/
  web/          Next.js — interface utilisateur
  server/       Express + Socket.IO — API REST, temps réel, autorité de jeu
packages/
  shared/       Types partagés entre web et server (aucune dépendance)
  game-engine/  (Phase 5+) Logique pure des 4 jeux, testable sans navigateur
docker/
  docker-compose.yml       PostgreSQL pour le développement local
```

### Authentification (Phase 2)

- Mots de passe hachés en **argon2id** — jamais stockés ni renvoyés en clair.
- Sessions **en base**, référencées par un cookie `httpOnly` + `SameSite=Lax`
  (`secure` en production). Le client ne peut pas lire ni forger la session.
- Validation **zod** côté serveur sur chaque route ; les règles partagées
  (`packages/shared/src/auth.ts`) ne servent côté client qu'à améliorer
  l'expérience — le serveur revalide toujours.
- **Rate limiting** sur `/auth/*` et les actions sensibles (changement de mot
  de passe, suppression de compte). Désactivable via `RATE_LIMIT_ENABLED=false`
  uniquement pour les tests.
- Connexion refusée avec un message identique que le compte existe ou non, et
  vérification factice du hash quand l'utilisateur n'existe pas : aucune fuite
  d'information ni par le message, ni par le temps de réponse.
- Changer son mot de passe invalide **toutes** les sessions existantes, puis
  en rouvre une pour l'appareil courant.
- Les pages `/dashboard` et `/profil` sont protégées **côté serveur** (Server
  Component qui interroge `/auth/me`), pas par une garde côté navigateur.

**Principe d'architecture central** : le serveur est l'unique source de
vérité. Le client envoie des *intentions* (`game:action`), jamais des
décisions. Dès qu'un état de partie contient de l'information privée
(cartes en main, signe secret de Kem's...), le serveur calcule une vue
filtrée par joueur et l'émet individuellement par socket — jamais de
`broadcast` brut sur la room. Voir `packages/shared/src/socketEvents.ts`.

## Plan des phases

1. **Architecture / fondations** ✅ — monorepo, DB, healthcheck bout-en-bout
2. **Comptes** ✅ — inscription, connexion, sessions, tableau de bord, profil
3. Amis (recherche, demandes, présence)
4. Lobby (création de partie, code, invitations, temps réel)
5. Moteur de cartes (paquet, mélange, distribution — testable, sans framework)
6. Président / Trou du cul
7. Kem's (équipes, signe secret)
8. Rami
9. 8 américain
10. Polish (animations, UX mobile, statistiques)
11. Production (Docker complet, Caddy/HTTPS, VPS, backups)

Chaque phase attend une validation avant de démarrer la suivante.

## Déploiement VPS (Phase 11 — pas encore fait)

À documenter une fois la Phase 11 atteinte : Docker Compose de production,
reverse proxy avec HTTPS automatique, sauvegardes PostgreSQL.
