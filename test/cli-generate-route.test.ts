import { describe, expect, it } from 'vitest';
import { generateRouteSource, routeFileName, slugToCamelCase } from '../src/cli/generate-route.js';

describe('slugToCamelCase', () => {
  it('handles simple slug', () => {
    expect(slugToCamelCase('users')).toBe('users');
  });
  it('handles kebab-case', () => {
    expect(slugToCamelCase('user-profile')).toBe('userProfile');
  });
});

describe('routeFileName', () => {
  it('produces safe filename', () => {
    expect(routeFileName('users')).toBe('users.routes.ts');
    expect(routeFileName('User-Profile')).toBe('user-profile.routes.ts');
  });
});

describe('generateRouteSource', () => {
  it('includes validate, router export, and mount hint', () => {
    const src = generateRouteSource('users', { mountPath: '/users' });
    expect(src).toContain("app.use('/users', usersRouter)");
    expect(src).toContain('validate({ body: usersPostBodySchema })');
    expect(src).toContain('export const usersRouter = router');
    expect(src).toContain("from 'express-zod-routes'");
  });

  it('uses camelCase for compound slug', () => {
    const src = generateRouteSource('order-item', { mountPath: '/order-item' });
    expect(src).toContain('orderItemRouter');
    expect(src).toContain('orderItemPostBodySchema');
  });
});
