# DevClient — Expo Dev Client (iOS)

Application native installée **une seule fois** sur ton iPhone via EAS Build.
Une fois installée, elle sert de "conteneur" pour charger/tester n'importe
quel projet Expo/React Native en te connectant à un serveur Metro — plus
besoin de Mac/Xcode pour itérer au quotidien.

Ce repo est scaffoldé, mais **le build iOS doit être lancé depuis une
machine qui a un accès réseau complet** (ton VPS, pas cette session Claude
Code — voir "Pourquoi un VPS" plus bas).

## Prérequis sur le VPS

- Node.js 18+ et npm
- Un compte [expo.dev](https://expo.dev)
- Un compte Apple Developer

## Étapes (depuis le terminal iPhone → VPS)

```bash
# 1. Récupérer le code
git clone <url-du-repo>
cd Test-APP
git checkout claude/ios-expo-vps-build-evlpiq

# 2. Installer les dépendances
npm install

# 3. Se connecter à Expo (garde eas-cli en local au projet, pas besoin d'install globale)
npx eas-cli login
# ou, sans interaction (recommandé en headless) :
export EXPO_TOKEN="ton_access_token_expo.dev"

# 4. Config des credentials Apple (première fois seulement)
npx eas-cli credentials
# Choisis iOS -> laisse EAS gérer automatiquement certificats + provisioning profile.
# Recommandé : utilise une clé API App Store Connect (.p8) plutôt que login
# Apple ID + 2FA interactif, plus fiable en headless.
# App Store Connect -> Users and Access -> Integrations -> Team Keys

# 5. Lancer le build (profil "development" = dev client, distribution interne)
npx eas-cli build --platform ios --profile development

# 6. Suivre l'avancement et récupérer le lien d'install sur expo.dev,
#    ou scanner le QR code affiché dans le terminal.
```

### Utilisation au quotidien une fois le dev client installé

```bash
npx expo start --dev-client
```

Scanne le QR code (ou ouvre le lien) depuis l'app DevClient installée sur
ton iPhone. Ça recharge le bundle JS en direct — pas besoin de rebuilder
tant que tu ne touches pas au code natif / aux dépendances natives.

## Pourquoi passer par un VPS et pas directement par cette session ?

Cet environnement Claude Code applique une politique réseau qui bloque
les appels sortants vers `api.expo.dev`. Le scaffold, la config, et les
commits/push fonctionnent très bien ici, mais `eas login` / `eas build`
doivent être exécutés depuis une machine avec un accès réseau complet
— typiquement ton VPS.

## Bundle identifier

Actuellement configuré sur `com.redaperrin.devclient` dans `app.json`.
Change-le avant ton premier build si tu veux autre chose (doit correspondre
à un App ID que tu peux créer/posséder dans ton compte Apple Developer).
