# Architecture

## Flux Web Push

1. Le navigateur s'abonne via `PushManager.subscribe()` avec la clé VAPID publique.
2. Le service worker reçoit l'événement `push` et affiche la notification.
3. Le backend envoie la payload via `web-push`, signé avec la clé VAPID privée.

## Flux FCM (Firebase Cloud Messaging)

1. L'application mobile récupère un token d'enregistrement FCM.
2. Le backend authentifie l'appel à l'API FCM v1 avec un compte de service Google.
3. L'API FCM délivre la notification à l'appareil cible.

## Sécurité

- Aucun secret n'est versionné.
- Les clés VAPID et le compte de service FCM sont injectés par variables d'environnement.
- Les données d'abonnement sont stockées en mémoire (démo uniquement ; utiliser Redis/Postgres en production).

## Stack

- Node.js 18+
- TypeScript
- Express
- `google-auth-library` pour l'authentification FCM
- `web-push` pour Web Push
