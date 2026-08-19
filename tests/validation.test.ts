import {
  validateNotificationPayload,
  validatePushSubscription,
  validateSendRequest,
} from '../src/validation';

describe('validation', () => {
  describe('validateNotificationPayload', () => {
    it('accepts a valid payload', () => {
      const result = validateNotificationPayload({ title: 'Hello', body: 'World' });
      expect(result.title).toBe('Hello');
      expect(result.body).toBe('World');
    });

    it('rejects a missing title', () => {
      expect(() => validateNotificationPayload({ body: 'World' })).toThrow('title');
    });

    it('rejects a missing body', () => {
      expect(() => validateNotificationPayload({ title: 'Hello' })).toThrow('body');
    });
  });

  describe('validatePushSubscription', () => {
    it('accepts a valid subscription', () => {
      const sub = {
        endpoint: 'https://example.com/push',
        keys: { p256dh: 'abc', auth: 'def' },
      };
      expect(validatePushSubscription(sub).endpoint).toBe('https://example.com/push');
    });

    it('rejects an invalid subscription', () => {
      expect(() => validatePushSubscription({ endpoint: 'x' })).toThrow('Invalid');
    });
  });

  describe('validateSendRequest', () => {
    it('accepts a valid web request', () => {
      const req = validateSendRequest({
        target: 'web',
        subscription: {
          endpoint: 'https://example.com/push',
          keys: { p256dh: 'abc', auth: 'def' },
        },
        payload: { title: 'T', body: 'B' },
      });
      expect(req.target).toBe('web');
    });

    it('accepts a valid fcm request', () => {
      const req = validateSendRequest({
        target: 'fcm',
        token: 'tok',
        payload: { title: 'T', body: 'B' },
      });
      expect(req.target).toBe('fcm');
      expect(req.token).toBe('tok');
    });

    it('rejects an invalid target', () => {
      expect(() =>
        validateSendRequest({ target: 'sms', payload: { title: 'T', body: 'B' } })
      ).toThrow('target');
    });
  });
});
