import { withRetry } from '../src/retry';

describe('withRetry', () => {
  it('returns the result on first attempt', async () => {
    const result = await withRetry(() => Promise.resolve('ok'), {
      maxAttempts: 3,
      delayMs: 10,
    });
    expect(result).toBe('ok');
  });

  it('retries until success', async () => {
    let attempts = 0;
    const result = await withRetry(
      () => {
        attempts++;
        if (attempts < 3) return Promise.reject(new Error('temp'));
        return Promise.resolve('ok');
      },
      { maxAttempts: 3, delayMs: 10 }
    );
    expect(result).toBe('ok');
    expect(attempts).toBe(3);
  });

  it('throws after max attempts', async () => {
    let attempts = 0;
    await expect(
      withRetry(
        () => {
          attempts++;
          return Promise.reject(new Error('permanent'));
        },
        { maxAttempts: 2, delayMs: 10 }
      )
    ).rejects.toThrow('permanent');
    expect(attempts).toBe(2);
  });

  it('does not retry when shouldRetry returns false', async () => {
    let attempts = 0;
    await expect(
      withRetry(
        () => {
          attempts++;
          return Promise.reject(new Error('skip'));
        },
        {
          maxAttempts: 3,
          delayMs: 10,
          shouldRetry: (err) => !(err instanceof Error && err.message === 'skip'),
        }
      )
    ).rejects.toThrow('skip');
    expect(attempts).toBe(1);
  });
});
