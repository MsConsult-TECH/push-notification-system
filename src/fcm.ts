import { GoogleAuth } from 'google-auth-library';
import { config } from './config';
import { NotificationPayload } from './types';

const FCM_SCOPE = 'https://www.googleapis.com/auth/cloud-platform';

function getServiceAccount(): object {
  if (config.fcmServiceAccountJson) {
    return JSON.parse(config.fcmServiceAccountJson);
  }
  if (config.fcmServiceAccountPath) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(config.fcmServiceAccountPath);
  }
  throw new Error('FCM service account not configured');
}

export async function sendFcmMessage(token: string, payload: NotificationPayload): Promise<void> {
  const auth = new GoogleAuth({
    credentials: getServiceAccount(),
    scopes: [FCM_SCOPE],
  });

  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();

  const url = `https://fcm.googleapis.com/v1/projects/${config.fcmProjectId}/messages:send`;

  const body = {
    message: {
      token,
      notification: {
        title: payload.title,
        body: payload.body,
        imageUrl: payload.image,
      },
      android: {
        notification: {
          icon: payload.icon,
          tag: payload.tag,
        },
      },
      apns: {
        payload: {
          aps: {
            badge: payload.badge ? parseInt(payload.badge, 10) : undefined,
          },
        },
      },
      data: payload.data,
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`FCM send failed (${response.status}): ${text}`);
  }
}
