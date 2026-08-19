import { Router, Request, Response } from 'express';
import { sendFcmMessage } from './fcm';
import { sendWebPush } from './webpush';
import { validateSendRequest } from './validation';

const router = Router();

// Stockage mémoire pour la démo. En production, utiliser Redis/Postgres.
// In-memory store for demo purposes only.
const subscriptions = new Map<string, unknown>();
const fcmTokens = new Map<string, string>();

router.post('/register', (req: Request, res: Response) => {
  const { type, id, subscription, token } = req.body;

  if (type === 'web' && subscription) {
    subscriptions.set(id || subscription.endpoint, subscription);
    return res.json({ ok: true, registered: 'web' });
  }

  if (type === 'fcm' && token) {
    fcmTokens.set(id || token, token);
    return res.json({ ok: true, registered: 'fcm' });
  }

  return res.status(400).json({ error: 'Invalid registration payload' });
});

router.post('/send', async (req: Request, res: Response) => {
  try {
    const request = validateSendRequest(req.body);

    if (request.target === 'web') {
      if (!request.subscription) {
        return res.status(400).json({ error: 'Missing subscription for web target' });
      }
      await sendWebPush(request.subscription, request.payload);
    } else {
      if (!request.token) {
        return res.status(400).json({ error: 'Missing token for fcm target' });
      }
      await sendFcmMessage(request.token, request.payload);
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error('Send failed:', err);
    return res.status(500).json({
      error: err instanceof Error ? err.message : 'Send failed',
    });
  }
});

router.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

export { router };
