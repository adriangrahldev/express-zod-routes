import express from 'express';
import { z } from 'zod';
import { validate } from '../../src/index.js';

export function createMinimalApp() {
  const app = express();
  app.use(express.json());

  app.post(
    '/users',
    validate({
      body: z.object({
        name: z.string().min(1),
        email: z.string().email(),
      }),
    }),
    (req, res) => {
      res.status(201).json(req.validated?.body);
    }
  );

  app.get(
    '/search',
    validate({
      query: z.object({
        q: z.string().min(1),
        page: z.coerce.number().int().min(1).optional(),
      }),
    }),
    (req, res) => {
      res.json(req.validated?.query);
    }
  );

  app.get(
    '/items/:id',
    validate({
      params: z.object({
        id: z.string().uuid(),
      }),
    }),
    (req, res) => {
      res.json(req.validated?.params);
    }
  );

  app.post(
    '/combined/:id',
    validate({
      params: z.object({ id: z.string() }),
      body: z.object({ action: z.enum(['a', 'b']) }),
    }),
    (req, res) => {
      res.json(req.validated);
    }
  );

  app.post(
    '/custom-error',
    validate({
      body: z.object({ x: z.number() }),
      statusCode: 422,
      errorMessage: 'Payload inválido',
    }),
    (_req, res) => res.sendStatus(204)
  );

  return app;
}
