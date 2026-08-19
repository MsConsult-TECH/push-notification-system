import { NotificationPayload, PushSubscription, SendRequest } from './types';

export function validateNotificationPayload(payload: unknown): NotificationPayload {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Payload must be an object');
  }

  const p = payload as Record<string, unknown>;

  if (typeof p.title !== 'string' || p.title.trim().length === 0) {
    throw new Error('Payload title is required');
  }

  if (typeof p.body !== 'string' || p.body.trim().length === 0) {
    throw new Error('Payload body is required');
  }

  return {
    title: p.title,
    body: p.body,
    icon: typeof p.icon === 'string' ? p.icon : undefined,
    badge: typeof p.badge === 'string' ? p.badge : undefined,
    image: typeof p.image === 'string' ? p.image : undefined,
    tag: typeof p.tag === 'string' ? p.tag : undefined,
    data:
      typeof p.data === 'object' && p.data !== null
        ? (p.data as Record<string, unknown>)
        : undefined,
    requireInteraction:
      typeof p.requireInteraction === 'boolean' ? p.requireInteraction : undefined,
  };
}

export function validatePushSubscription(sub: unknown): PushSubscription {
  if (!sub || typeof sub !== 'object') {
    throw new Error('Subscription must be an object');
  }

  const s = sub as Record<string, unknown>;
  const endpoint = typeof s.endpoint === 'string' ? s.endpoint : '';
  const keys = s.keys as Record<string, unknown> | undefined;

  if (!endpoint || !keys || typeof keys.p256dh !== 'string' || typeof keys.auth !== 'string') {
    throw new Error('Invalid push subscription');
  }

  return {
    endpoint,
    expirationTime:
      s.expirationTime === null
        ? null
        : typeof s.expirationTime === 'number'
          ? s.expirationTime
          : null,
    keys: {
      p256dh: keys.p256dh,
      auth: keys.auth,
    },
  };
}

export function validateSendRequest(body: unknown): SendRequest {
  if (!body || typeof body !== 'object') {
    throw new Error('Request body must be an object');
  }

  const b = body as Record<string, unknown>;
  const target = b.target === 'web' || b.target === 'fcm' ? b.target : null;

  if (!target) {
    throw new Error("target must be 'web' or 'fcm'");
  }

  const payload = validateNotificationPayload(b.payload);

  return {
    target,
    subscription: target === 'web' ? validatePushSubscription(b.subscription) : undefined,
    token: target === 'fcm' && typeof b.token === 'string' ? b.token : undefined,
    payload,
  };
}
