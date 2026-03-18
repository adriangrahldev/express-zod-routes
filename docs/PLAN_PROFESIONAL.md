# Plan profesional — Express + Zod (rutas tipadas)

> **Estado:** v1 publicada en [GitHub](https://github.com/adriangrahldev/express-zod-routes) y [npm](https://www.npmjs.com/package/express-zod-routes). Este documento sirve como **referencia histórica** y base para el roadmap.

> Objetivo original: librería npm mantenible, documentación clara, CI en GitHub y releases versionadas.

---

## 1. Visión y alcance

| In scope (v1)                                                         | Fuera de v1 (roadmap)    |
| --------------------------------------------------------------------- | ------------------------ |
| Middleware que valida `body`, `query`, `params` con Zod               | OpenAPI auto-generado    |
| Tipos inferidos en handlers (augment de `Request` o factory de rutas) | Integración Nest/Fastify |
| Errores HTTP 400 con payload JSON consistente                         | CLI                      |
| Compatible Express 4.x / 5.x                                          | GraphQL                  |

**Paquete (npm):** [`express-zod-routes`](https://www.npmjs.com/package/express-zod-routes).

---

## 2. Arquitectura (envidiable pero simple)

```
src/
├── index.ts                 # API pública mínima (re-exports)
├── middleware/
│   ├── validate.ts          # Núcleo: parse + merge en req
│   └── error-mapper.ts      # ZodError → HTTP 400 + formato estable
├── types/
│   └── schemas.ts           # ValidationSchemas, InferValidated
├── global-augment.ts        # Augment Express.Request.validated
└── constants.ts             # Códigos/mensajes por defecto
```

**Principios:**

- **Un solo punto de verdad:** validación = Zod; no duplicar lógica.
- **Sin magia oculta:** el usuario pasa schemas explícitos por ruta.
- **Tree-shakeable:** exportar ESM + CJS si hace falta para máxima adopción.
- **Sin acoplar a un ORM:** solo Express + Zod.

**API pública tentativa (v1):**

```ts
validate({ body: z.object({...}), query: z.object({...}) })
// o
createValidator({ params: idSchema })
```

Documentar en README **un** patrón recomendado (augment vs wrapper) para no fragmentar la comunidad.

---

## 3. Stack técnico

| Área        | Elección                                                   |
| ----------- | ---------------------------------------------------------- |
| Lenguaje    | TypeScript strict (`strict: true`)                         |
| Build       | `tsup` (ESM + CJS + d.ts) o `unbuild`                      |
| Tests       | Vitest + supertest (app Express mínima en `test/fixtures`) |
| Lint/format | ESLint flat + Prettier                                     |
| Commits     | Conventional Commits                                       |
| Versionado  | Changesets **o** release manual con tags `v1.0.0`          |
| CI          | GitHub Actions: lint, test, build en PR y `main`           |

**Peer dependencies:** `express`, `zod` (rangos semver claros en README).

---

## 4. Commits por funcionalidad (orden sugerido)

Cada bloque = **1 commit** (o 1 PR con squash por tema). Mensajes en **Conventional Commits**:

```
feat|fix|docs|chore|test|ci|refactor(scope): descripción
```

| #   | Commit (ejemplo)                                  | Contenido                                             |
| --- | ------------------------------------------------- | ----------------------------------------------------- |
| 1   | `chore: initial project scaffold`                 | package.json, tsconfig, tsup, .gitignore, LICENSE MIT |
| 2   | `feat(middleware): validate body with zod`        | Núcleo mínimo solo `body`                             |
| 3   | `feat(middleware): support query and params`      | Extensión schemas                                     |
| 4   | `feat(errors): map ZodError to 400 JSON response` | Formato estable `{ issues: [...] }`                   |
| 5   | `feat(types): express request augmentation`       | `express.d.ts` + doc de uso                           |
| 6   | `refactor(middleware): extract error mapper`      | Sin cambio de API                                     |
| 7   | `test: add vitest and integration tests`          | supertest + casos felices/error                       |
| 8   | `ci: add github actions workflow`                 | Node LTS, cache pnpm/npm                              |
| 9   | `docs: readme with install and examples`          | README principal                                      |
| 10  | `docs: add CONTRIBUTING and CODE_OF_CONDUCT`      | Comunidad                                             |
| 11  | `chore: release v1.0.0`                           | CHANGELOG + tag (o changeset publish)                 |

**Ramas:** `main` protegida; features en `feat/nombre-corto`; fixes en `fix/descripcion`.

---

## 5. GitHub (versionado y profesional)

1. **Repo público** con descripción y topics: `express`, `zod`, `typescript`, `validation`, `middleware`.
2. **Branch protection** en `main`: require PR, require CI verde.
3. **Releases:** cada versión = tag `vX.Y.Z` + notas en GitHub Release (copiar de CHANGELOG).
4. **Seguridad:** Dependabot; opcional CodeQL.
5. **Plantilla de issue/PR** (bug, feature).

Publicación npm: token en GitHub Secrets solo si automatizas publish con Changesets + `NPM_TOKEN`.

---

## 6. Documentación (niveles)

| Nivel    | Dónde                       | Qué                                                                   |
| -------- | --------------------------- | --------------------------------------------------------------------- |
| 30 s     | README                      | instalación, 1 ejemplo copy-paste                                     |
| 5 min    | README                      | API, tablas de opciones, errores                                      |
| Profundo | `docs/`                     | patrones MERN, TypeScript avanzado, migración desde validación manual |
| Código   | JSDoc en funciones públicas | parámetros y ejemplos cortos                                          |
| Ejemplos | `examples/basic-express/`   | repo o carpeta con `npm run dev`                                      |

**README — secciones obligatorias:**

- Badges (CI, npm version, license)
- Por qué existe (1 párrafo)
- Instalación + peer deps
- Uso mínimo
- API (`validate`, opciones, formato de error)
- Comparación breve con alternativas (honestidad)
- Contributing + License

---

## 7. Checklist pre–v1.0.0

- [ ] Cobertura de tests en paths críticos del middleware
- [ ] README probado copiando el snippet en proyecto limpio
- [ ] `engines` en package.json si aplica
- [ ] CHANGELOG con [Keep a Changelog]
- [ ] Sin secretos en el repo
- [ ] Licencia MIT en raíz

---

## 8. Siguiente paso operativo

1. Crear repo en GitHub vacío.
2. En local: scaffold (commit 1) → implementar por filas de la tabla de commits.
3. Abrir PRs pequeños o commits directos en `main` hasta tener CI verde.
4. Publicar `v1.0.0` en npm y marcar release en GitHub.

---

_Documento vivo: actualiza roadmap y tabla de commits cuando añadas features._
