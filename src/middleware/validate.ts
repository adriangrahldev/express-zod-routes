import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { ZodTypeAny } from 'zod';
import { DEFAULT_VALIDATION_ERROR_MESSAGE, DEFAULT_VALIDATION_STATUS } from '../constants.js';
import type { ValidationSchemas } from '../types/schemas.js';
import { mapZodErrorToResponse } from './error-mapper.js';

export interface ValidateOptions extends ValidationSchemas {
  /** HTTP status when validation fails (default: 400) */
  statusCode?: number;
  /** Override default error message in JSON body */
  errorMessage?: string;
}

function parseSegment(
  schema: ZodTypeAny,
  raw: unknown,
  errorMessage: string,
  statusCode: number,
  res: Response
): { ok: true; data: unknown } | { ok: false } {
  const result = schema.safeParse(raw);
  if (result.success) {
    return { ok: true, data: result.data };
  }
  res.status(statusCode).json(mapZodErrorToResponse(result.error, errorMessage));
  return { ok: false };
}

/**
 * Express middleware: validates `body`, `query`, and/or `params` with Zod.
 * On success, merges results into `req.validated`. On failure, sends JSON 400 and does not call `next`.
 *
 * @example
 * ```ts
 * app.post(
 *   '/users',
 *   express.json(),
 *   validate({ body: z.object({ name: z.string().min(1) }) }),
 *   (req, res) => res.json(req.validated!.body)
 * );
 * ```
 */
export function validate(schemas: ValidateOptions): RequestHandler {
  const keys = ['body', 'query', 'params'] as const;
  const hasAny = keys.some((k) => schemas[k] !== undefined);
  if (!hasAny) {
    throw new Error(
      'express-zod-routes: validate() requires at least one of body, query, or params'
    );
  }

  const statusCode = schemas.statusCode ?? DEFAULT_VALIDATION_STATUS;
  const errorMessage = schemas.errorMessage ?? DEFAULT_VALIDATION_ERROR_MESSAGE;

  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const prev = req.validated ?? {};
      const nextValidated: NonNullable<Request['validated']> = { ...prev };

      if (schemas.body) {
        const out = parseSegment(schemas.body, req.body, errorMessage, statusCode, res);
        if (!out.ok) return;
        nextValidated.body = out.data;
      }
      if (schemas.query) {
        const out = parseSegment(schemas.query, req.query, errorMessage, statusCode, res);
        if (!out.ok) return;
        nextValidated.query = out.data;
      }
      if (schemas.params) {
        const out = parseSegment(schemas.params, req.params, errorMessage, statusCode, res);
        if (!out.ok) return;
        nextValidated.params = out.data;
      }

      req.validated = nextValidated;
      next();
    } catch (e) {
      next(e);
    }
  };
}

/** Alias for {@link validate} */
export const createValidator = validate;
