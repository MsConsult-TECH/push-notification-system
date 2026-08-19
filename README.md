# Reliable Push Notifications — MsConsult-TECH

Backend TypeScript/Node.js d'envoi de notifications push fiables, combinant **FCM** (Firebase Cloud Messaging, API v1) pour le mobile et **Web Push** (VAPID) pour les Progressive Web Apps.

Publié par [MsConsult-TECH](https://github.com/MsConsult-TECH).

## Positionnement

Ce repo n'est pas un tutoriel. C'est une **preuve d'architecture** montrant comment industrialiser un service de notifications push :

- code typé et testé,
- gestion des secrets par variables d'environnement,
- retry côté backend pour les erreurs temporaires,
- CI/CD avec lint, tests, build et audit de dépendances.

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   PWA / Mobile  │────▶│  Backend Node.js │────▶│   FCM API v1    │
│                 │     │  (Express + TS)  │     │  (Android/iOS)  │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌─────────────────┐
                        │   Web Push      │
                        │   (VAPID)       │
                        └─────────────────┘
```

Les décisions d'architecture sont documentées dans [`docs/adr-001-why-fcm-and-webpush.md`](./docs/adr-001-why-fcm-and-webpush.md).

## Démarrage rapide

```bash
# 1. Cloner
git clone https://github.com/MsConsult-TECH/reliable-push-notifications.git
cd reliable-push-notifications

# 2. Installer
npm install

# 3. Configurer
cp .env.example .env
# Renseigner FCM_PROJECT_ID, FCM_SERVICE_ACCOUNT_PATH, VAPID_*

# 4. Lancer
npm run dev
```

## Endpoints API

| Méthode | Endpoint        | Description                                          |
|---------|-----------------|------------------------------------------------------|
| POST    | `/api/register` | Enregistrer un abonnement Web Push ou un token FCM   |
| POST    | `/api/send`     | Envoyer une notification                             |
| GET     | `/api/health`   | Vérifier l'état du service                           |

## Robustesse

- **Retry** : les envois FCM et Web Push sont encapsulés dans une stratégie de retry (`src/retry.ts`).
- **Validation** : tous les payloads entrants sont validés avant traitement.
- **Pas de secret commité** : `.env`, clés VAPID et comptes de service sont ignorés par Git.

## CI/CD

![CI](https://github.com/MsConsult-TECH/reliable-push-notifications/workflows/CI/badge.svg)

La pipeline GitHub Actions exécute :

- lint ESLint,
- tests Jest,
- build TypeScript,
- audit npm.

Le scan de secrets est activé nativement par GitHub sur les repos publics.

## Tests

```bash
npm test
npm run lint
npm run build
```

## Stack

- Node.js 18+
- TypeScript
- Express
- `google-auth-library` (authentification FCM)
- `web-push` (Web Push VAPID)
- Jest + ESLint + Prettier

## Licence

MIT — voir [LICENSE](./LICENSE).
