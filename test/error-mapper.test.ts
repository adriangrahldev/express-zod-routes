import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { mapZodErrorToResponse } from '../src/middleware/error-mapper.js';

describe('mapZodErrorToResponse', () => {
  it('maps Zod issues to stable shape', () => {
    const schema = z.object({ a: z.number(), b: z.string() });
    const result = schema.safeParse({ a: 'x', b: 1 });
    expect(result.success).toBe(false);
    if (result.success) return;
    const body = mapZodErrorToResponse(result.error);
    expect(body.error).toBe('Validation failed');
    expect(body.issues.length).toBeGreaterThanOrEqual(1);
    for (const issue of body.issues) {
      expect(issue).toHaveProperty('path');
      expect(issue).toHaveProperty('message');
      expect(issue).toHaveProperty('code');
    }
  });

  it('accepts custom message', () => {
    const result = z.string().email().safeParse('bad');
    expect(result.success).toBe(false);
    if (result.success) return;
    expect(mapZodErrorToResponse(result.error, 'Custom').error).toBe('Custom');
  });
});
