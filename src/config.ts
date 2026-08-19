import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',

  fcmProjectId: process.env.FCM_PROJECT_ID || '',
  fcmServiceAccountPath: process.env.FCM_SERVICE_ACCOUNT_PATH,
  fcmServiceAccountJson: process.env.FCM_SERVICE_ACCOUNT_JSON,

  vapidPublicKey: process.env.VAPID_PUBLIC_KEY || '',
  vapidPrivateKey: process.env.VAPID_PRIVATE_KEY || '',
  vapidSubject: process.env.VAPID_SUBJECT || '',
};

export function assertConfig(): void {
  const missing: string[] = [];

  if (!config.fcmProjectId) missing.push('FCM_PROJECT_ID');
  if (!config.fcmServiceAccountPath && !config.fcmServiceAccountJson) {
    missing.push('FCM_SERVICE_ACCOUNT_PATH or FCM_SERVICE_ACCOUNT_JSON');
  }
  if (!config.vapidPublicKey) missing.push('VAPID_PUBLIC_KEY');
  if (!config.vapidPrivateKey) missing.push('VAPID_PRIVATE_KEY');
  if (!config.vapidSubject) missing.push('VAPID_SUBJECT');

  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }
}
