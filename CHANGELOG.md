# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.1] - 2026-03-18

### Added

- `SECURITY.md` and GitHub security reporting policy
- Workflow **Publish to npm** with `--provenance` (OIDC); see [docs/PUBLISH_NPM.md](docs/PUBLISH_NPM.md)
- `docs/README.md` — index for maintainer documentation

### Changed

- `package.json`: **`author`** field for npm and metadata
- **CONTRIBUTING**: real clone URL, link to `docs/`, scripts table, commit examples, security pointer
- **PLAN_PROFESIONAL**: banner noting v1 shipped; npm link updated

### Removed

- Obsolete `docs/TU_TURNO_GITHUB.md` and redundant `docs/COMMITS_SUGERIDOS.md` (content folded into CONTRIBUTING)

## [1.0.0] - 2025-03-18

First stable release. Express middleware that validates **body**, **query**, and **params** with [Zod](https://zod.dev). Parsed values are exposed on **req.validated**; failed validation returns a **consistent JSON** response without calling `next`.

### Install

```bash
npm install express-zod-routes
```

Peer dependencies: `express` ^4.18 || ^5, `zod` ^3.22.

### Added

- **validate** / **createValidator** — validate `body`, `query`, and/or `params` with Zod schemas
- **req.validated** — merged parsed values after successful validation
- **Error payload** — `{ "error": string, "issues": [{ "path", "message", "code" }] }` with default status **400**
- **Options** — `statusCode` and `errorMessage` for failed validation
- **mapZodErrorToResponse** — reuse the same error shape in custom error middleware
- **TypeScript** — `InferValidated` helper and Express `Request.validated` augmentation
- **Dual build** — ESM + CJS

### Links

- **Repository:** <https://github.com/adriangrahldev/express-zod-routes>
- **Documentation:** README in the repository

[1.0.1]: https://github.com/adriangrahldev/express-zod-routes/releases/tag/v1.0.1
[1.0.0]: https://github.com/adriangrahldev/express-zod-routes/releases/tag/v1.0.0
