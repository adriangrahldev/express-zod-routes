import type { ZodError, ZodIssue } from 'zod';
import { DEFAULT_VALIDATION_ERROR_MESSAGE } from '../constants.js';

/** One validation issue in the API response */
export interface ValidationIssue {
  /** Dot-separated path (e.g. `user.email`) */
  path: string;
  message: string;
  code: ZodIssue['code'];
}

/** Stable JSON body for HTTP 400 validation errors */
export interface ValidationErrorBody {
  error: string;
  issues: ValidationIssue[];
}

function issuePath(issue: ZodIssue): string {
  return issue.path.map(String).join('.') || '(root)';
}

/**
 * Maps a Zod error to the package’s standard error payload (for custom error middleware).
 */
export function mapZodErrorToResponse(
  err: ZodError,
  message: string = DEFAULT_VALIDATION_ERROR_MESSAGE
): ValidationErrorBody {
  return {
    error: message,
    issues: err.issues.map((issue) => ({
      path: issuePath(issue),
      message: issue.message,
      code: issue.code,
    })),
  };
}
