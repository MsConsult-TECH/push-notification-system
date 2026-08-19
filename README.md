# fcm-notifications-demo

Démo backend + PWA d'envoi de notifications push fiables avec **FCM** (Firebase Cloud Messaging) et **Web Push** (VAPID).

Publié par [MsConsult](https://github.com/MsConsult).

## Objectif

Ce repo n'est pas un produit final. C'est une **preuve technique** montrant comment envoyer des notifications push depuis un backend Node.js/TypeScript vers :

- une **Progressive Web App** (Web Push)
- une **application mobile Android / iOS** (FCM via l'API v1)

## Démarrage rapide

```bash
# 1. Cloner
git clone https://github.com/MsConsult/fcm-notifications-demo.git
cd fcm-notifications-demo

# 2. Installer
npm install

# 3. Configurer
cp .env.example .env
# Renseigner FCM_PROJECT_ID, FCM_SERVICE_ACCOUNT_PATH, VAPID_*

# 4. Lancer
npm run dev
```

## Endpoints API

| Méthode | Endpoint    | Description                                   |
|---------|-------------|-----------------------------------------------|
| POST    | `/api/register` | Enregistrer un abonnement Web Push ou un token FCM |
| POST    | `/api/send`     | Envoyer une notification                      |
| GET     | `/api/health`   | Vérifier que le serveur est vivant            |

## Structure

```
fcm-notifications-demo/
├── src/
│   ├── server.ts       # Point d'entrée Express
│   ├── routes.ts       # Routes /register, /send, /health
│   ├── fcm.ts          # Envoi FCM via API v1
│   ├── webpush.ts      # Envoi Web Push VAPID
│   ├── validation.ts   # Validation des payloads
│   ├── config.ts       # Configuration par variables d'environnement
│   └── types.ts        # Types partagés
├── public/             # PWA de test
├── tests/              # Tests Jest
└── docs/               # Documentation d'architecture
```

## Sécurité

- Aucun secret n'est commité.
- `.env` et `service-account*.json` sont ignorés par Git.
- Les clés VAPID et le compte de service FCM sont injectés par variables d'environnement.

## Tests

```bash
npm test
npm run lint
npm run build
```

## Licence

MIT — voir [LICENSE](./LICENSE).
