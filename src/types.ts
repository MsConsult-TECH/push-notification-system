/**
 * Shared types for the FCM + Web Push notification demo.
 * Bilingual comments: French context, English identifiers.
 */

export interface PushSubscription {
  endpoint: string;
  expirationTime?: number | null;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  image?: string;
  tag?: string;
  data?: Record<string, unknown>;
  requireInteraction?: boolean;
}

export interface SendRequest {
  target: 'web' | 'fcm';
  subscription?: PushSubscription;
  token?: string;
  payload: NotificationPayload;
}
