import type { z } from 'zod';

/** Schemas you can pass to {@link validate} */
export interface ValidationSchemas {
  body?: z.ZodTypeAny;
  query?: z.ZodTypeAny;
  params?: z.ZodTypeAny;
}

type Empty = Record<never, never>;

/**
 * Shape of `req.validated` inferred from the schemas passed to {@link validate}.
 *
 * @example
 * ```ts
 * const schemas = { body: z.object({ email: z.string().email() }) };
 * app.post(
 *   '/',
 *   validate(schemas),
 *   (req: Request & { validated: InferValidated<typeof schemas> }, res) => {
 *     req.validated.body.email;
 *   }
 * );
 * ```
 */
export type InferValidated<S extends ValidationSchemas> = (S['body'] extends z.ZodTypeAny
  ? { body: z.infer<NonNullable<S['body']>> }
  : Empty) &
  (S['query'] extends z.ZodTypeAny ? { query: z.infer<NonNullable<S['query']>> } : Empty) &
  (S['params'] extends z.ZodTypeAny ? { params: z.infer<NonNullable<S['params']>> } : Empty);
