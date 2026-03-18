# Contributing

Thanks for your interest in **express-zod-routes**.

Maintainer-oriented docs: **[`docs/README.md`](docs/README.md)** (npm publish, historical plan).

## Setup

```bash
git clone https://github.com/adriangrahldev/express-zod-routes.git
cd express-zod-routes
npm ci
npm run test
npm run build
```

## Scripts

| Command             | Description       |
| ------------------- | ----------------- |
| `npm run build`     | ESM + CJS + types |
| `npm run test`      | Vitest            |
| `npm run lint`      | ESLint            |
| `npm run format`    | Prettier write    |
| `npm run typecheck` | `tsc --noEmit`    |

## Pull requests

1. Fork and create a branch: `feat/short-name` or `fix/short-name`.
2. Keep commits focused; use [Conventional Commits](https://www.conventionalcommits.org/):

   `feat:`, `fix:`, `docs:`, `chore:`, `test:`, `ci:`, `refactor(scope):`

3. Run `npm run lint` and `npm run test` (and `npm run format` if you touched formatting).
4. Update **`CHANGELOG.md`**: add a line under `[Unreleased]` or under the new version section for user-facing changes.

### Optional: atomic commits (example)

For a larger change you can split commits, e.g.:

```text
feat(middleware): add optional transform hook
test: cover new hook
docs: document hook in README
```

## Scope

v1 focuses on Express + Zod validation middleware. Bigger ideas (OpenAPI generation, Nest/Fastify) are best discussed in an issue first.

## Security

Do not open public issues for vulnerabilities. See [SECURITY.md](SECURITY.md).
