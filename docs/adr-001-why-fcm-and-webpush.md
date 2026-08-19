# ADR 001 — Pourquoi FCM + Web Push ?

## Contexte

MsConsult a besoin d'une solution d'envoi de notifications push fiable et maintenable pour ses applications web et mobiles. Deux canaux principaux existent :

- **Firebase Cloud Messaging (FCM)** pour Android et iOS.
- **Web Push (VAPID)** pour les navigateurs et les Progressive Web Apps.

## Décision

Utiliser **FCM via l'API v1** pour le mobile et **Web Push** pour le web, via un backend Node.js/TypeScript unique.

## Justification

| Critère | FCM | Web Push |
|---------|-----|----------|
| Couverture mobile | Native Android/iOS | Limitée |
| Couverture web | Non supporté | Native (Chrome, Firefox, Safari) |
| Coût | Gratuit | Gratuit |
| Complexité | Compte de service requis | Paire VAPID requise |
| Fiabilité | Élevée, retry côté backend | Dépend du navigateur |

Un backend unique permet de normaliser la validation des payloads, le retry, la gestion des erreurs et la journalisation.

## Conséquences

- Deux mécanismes d'authentification à gérer : compte de service Google et clés VAPID.
- Les secrets sont injectés par variables d'environnement, jamais commités.
- Le retry est implémenté côté backend pour les erreurs temporaires.

## Statut

Accepté — 2026-08-19.
