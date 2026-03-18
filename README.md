# express-zod-routes

[![CI](https://github.com/adriangrahldev/express-zod-routes/actions/workflows/ci.yml/badge.svg)](https://github.com/adriangrahldev/express-zod-routes/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/express-zod-routes.svg)](https://www.npmjs.com/package/express-zod-routes)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Express middleware** that validates `body`, `query`, and `params` with **[Zod](https://zod.dev)**. On success, parsed values land on **`req.validated`**. On failure, the client gets a **consistent JSON 400** (or your chosen status) without calling `next`.

Built for **MERN / TypeScript** stacks: one source of truth for validation, no duplicate DTO logic.

## Install

```bash
npm install express-zod-routes
```

Peer dependencies:

- `express` `^4.18.0 || ^5.0.0`
- `zod` `^3.22.0`

## CLI — scaffold a route module

Generate a **Router** with `validate({ body })` already wired (Zod + `express-zod-routes`):

```bash
npx express-zod-routes add-route users
npx express-zod-routes add-route products --out-dir src/routes
npx express-zod-routes add-route order-item --mount /api/order-items --force
```

Creates e.g. `routes/users.routes.ts`. Mount in your app:

```ts
import { usersRouter } from './routes/users.routes.js';
app.use('/users', usersRouter);
```

Run `npx express-zod-routes --help` for all options.

## Quick start

```ts
import express from 'express';
import { z } from 'zod';
import { validate } from 'express-zod-routes';

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
    // req.validated.body is parsed & typed with InferValidated (see below)
    res.status(201).json(req.validated!.body);
  }
);
```

## API

### `validate(schemas)` · `createValidator(schemas)`

Same function; `createValidator` is an alias.

| Option         | Type      | Description                                       |
| -------------- | --------- | ------------------------------------------------- |
| `body`         | `ZodType` | Validates `req.body` (use after `express.json()`) |
| `query`        | `ZodType` | Validates `req.query` (strings → use `z.coerce`)  |
| `params`       | `ZodType` | Validates `req.params`                            |
| `statusCode`   | `number`  | Default `400`                                     |
| `errorMessage` | `string`  | Default `"Validation failed"`                     |

At least one of `body`, `query`, or `params` is required.

### `req.validated`

After the middleware runs successfully, `req.validated` contains only the keys you validated (merged if you stack multiple validators on the same route — usually one per route is enough).

Importing the package augments Express’s `Request` so `validated` is recognized by TypeScript.

### Typing handlers with `InferValidated`

```ts
import type { Request } from 'express';
import { validate, type InferValidated } from 'express-zod-routes';

const schemas = {
  body: z.object({ email: z.string().email() }),
} as const;

app.post(
  '/',
  validate(schemas),
  (req: Request & { validated: InferValidated<typeof schemas> }, res) => {
    req.validated.body.email;
    res.sendStatus(204);
  }
);
```

### Error response shape

```json
{
  "error": "Validation failed",
  "issues": [{ "path": "email", "message": "Invalid email", "code": "invalid_string" }]
}
```

### `mapZodErrorToResponse(err, message?)`

Use in your own error middleware if you reuse the same JSON shape.

## Query & params tips

- **Query** values are strings (or arrays) from Express. Use `z.coerce.number()`, `z.enum()`, etc.
- **Params** are strings; use `z.string().uuid()`, regex, or transforms as needed.

## Comparison

| Approach              | express-zod-routes       |
| --------------------- | ------------------------ |
| Manual `if` + res 400 | Centralized Zod + format |
| Only body validation  | body + query + params    |

Other great options exist (`express-zod-api`, custom Zod wrappers). This package stays small: one middleware, `req.validated`, stable errors.

## Example project

See [`examples/basic-express`](examples/basic-express).

## Maintainers

Internal docs (publish to npm with provenance, historical plan): **[`docs/README.md`](docs/README.md)**.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Security

See [SECURITY.md](SECURITY.md). Prefer [private advisories](https://github.com/adriangrahldev/express-zod-routes/security/advisories/new) over public issues for vulnerabilities.

Maintainers: releases with npm **provenance** are documented in [docs/PUBLISH_NPM.md](docs/PUBLISH_NPM.md).

## License

MIT © see [LICENSE](LICENSE).
