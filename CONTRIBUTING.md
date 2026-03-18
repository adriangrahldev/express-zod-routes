# Contributing

Thanks for your interest in **express-zod-routes**.

## Setup

```bash
git clone <repo-url>
cd express-zod-routes
npm ci
npm run test
npm run build
```

## Scripts

| Command          | Description       |
| ---------------- | ----------------- |
| `npm run build`  | ESM + CJS + types |
| `npm run test`   | Vitest            |
| `npm run lint`   | ESLint            |
| `npm run format` | Prettier write    |

## Pull requests

1. Fork and create a branch: `feat/short-name` or `fix/short-name`.
2. Keep commits focused; prefer [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, etc.).
3. Ensure `npm run lint` and `npm run test` pass.
4. Update `CHANGELOG.md` under `[Unreleased]` when the change is user-facing.

## Scope

v1 focuses on Express + Zod validation middleware. Large features (OpenAPI generation, other frameworks) are better discussed in an issue first.
