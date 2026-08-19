import webpush from 'web-push';
import { config } from './config';
import { NotificationPayload, PushSubscription } from './types';

export function configureWebPush(): void {
  webpush.setVapidDetails(config.vapidSubject, config.vapidPublicKey, config.vapidPrivateKey);
}

export async function sendWebPush(
  subscription: PushSubscription,
  payload: NotificationPayload
): Promise<void> {
  const notification = {
    title: payload.title,
    body: payload.body,
    icon: payload.icon,
    badge: payload.badge,
    image: payload.image,
    tag: payload.tag,
    requireInteraction: payload.requireInteraction,
    data: payload.data,
  };

  await webpush.sendNotification(
    subscription as webpush.PushSubscription,
    JSON.stringify(notification)
  );
}
