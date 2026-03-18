import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { z } from 'zod';
import { createValidator, validate } from '../src/index.js';
import { createMinimalApp } from './fixtures/minimal-app.js';

interface ValidationErrorJson {
  error: string;
  issues: Array<{ path: string; message: string; code: string }>;
}

interface CombinedJson {
  params?: { id: string };
  body?: { action: 'a' | 'b' };
}

describe('validate', () => {
  const app = createMinimalApp();

  it('accepts valid body and exposes req.validated.body', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'Ada', email: 'ada@example.com' })
      .expect(201);
    expect(res.body).toEqual({ name: 'Ada', email: 'ada@example.com' });
  });

  it('returns 400 with issues on invalid body', async () => {
    const res = await request(app).post('/users').send({ name: '', email: 'bad' }).expect(400);
    const body = res.body as ValidationErrorJson;
    expect(body.error).toBe('Validation failed');
    expect(Array.isArray(body.issues)).toBe(true);
    expect(body.issues.length).toBeGreaterThan(0);
    const first = body.issues[0];
    expect(first).toMatchObject({
      path: expect.any(String) as string,
      message: expect.any(String) as string,
      code: expect.any(String) as string,
    });
  });

  it('validates query with coercion', async () => {
    const res = await request(app).get('/search?q=hello&page=2').expect(200);
    expect(res.body).toEqual({ q: 'hello', page: 2 });
  });

  it('validates params (uuid)', async () => {
    const id = '550e8400-e29b-41d4-a716-446655440000';
    const res = await request(app).get(`/items/${id}`).expect(200);
    expect(res.body).toEqual({ id });
  });

  it('rejects invalid uuid in params', async () => {
    await request(app).get('/items/not-a-uuid').expect(400);
  });

  it('validates body and params together', async () => {
    const res = await request(app).post('/combined/foo').send({ action: 'a' }).expect(200);
    const body = res.body as CombinedJson;
    expect(body.params).toEqual({ id: 'foo' });
    expect(body.body).toEqual({ action: 'a' });
  });

  it('respects statusCode and errorMessage', async () => {
    const res = await request(app).post('/custom-error').send({ x: 'nope' }).expect(422);
    const body = res.body as ValidationErrorJson;
    expect(body.error).toBe('Payload inválido');
  });
});

describe('validate() guard', () => {
  it('throws if no schemas provided', () => {
    expect(() => validate({})).toThrow(/at least one/);
  });
});

describe('createValidator', () => {
  it('is an alias of validate', async () => {
    const express = (await import('express')).default;
    const app = express();
    app.use(express.json());
    app.post(
      '/',
      createValidator({
        body: z.object({ n: z.number() }),
      }),
      (req, res) => res.json(req.validated?.body)
    );
    const res = await request(app).post('/').send({ n: 1 }).expect(200);
    expect(res.body).toEqual({ n: 1 });
  });
});
