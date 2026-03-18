/**
 * Augments Express `Request` with `validated` when you import `express-zod-routes`.
 */
export {};

declare global {
  // Express typings extend via namespace merge
  // eslint-disable-next-line @typescript-eslint/no-namespace -- Express.Request augmentation
  namespace Express {
    interface Request {
      /**
       * Parsed values after {@link validate}. Only keys you passed schemas for are set.
       */
      validated?: {
        body?: unknown;
        query?: unknown;
        params?: unknown;
      };
    }
  }
}
