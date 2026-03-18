# Publicar en npm con provenance (GitHub Actions)

Publicar desde CI con **`--provenance`** mejora la trazabilidad del paquete (p. ej. paneles tipo Socket) al vincular el tarball a un commit y workflow verificable.

## 1. Configurar “Trusted Publisher” en npm

1. Entra en [npmjs.com](https://www.npmjs.com) → paquete **express-zod-routes** → **Publishing access** (o **Settings** del paquete).
2. **Connect GitHub Actions** / **Add Trusted Publisher** (el nombre puede variar).
3. Indica:
   - **Organization or user:** `adriangrahldev`
   - **Repository:** `express-zod-routes`
   - **Workflow file:** `publish-npm.yml` (el de `.github/workflows/publish-npm.yml`)
4. Guarda. No hace falta `NPM_TOKEN` en GitHub Secrets para este flujo.

## 2. Subir una nueva versión

1. En el repo: sube la versión en `package.json` y documenta en `CHANGELOG.md`.
2. Commit + push a `main`.
3. Crea un **tag** que coincida con semver (ej. `v1.0.1`).
4. En GitHub: **Releases → Draft a new release** → elige ese tag → publica el release.

El workflow **Publish to npm** se ejecutará al publicar el release y hará `npm publish --provenance`.

## 3. Manual (`workflow_dispatch`)

Si necesitas reintentar, en **Actions → Publish to npm → Run workflow** (usa el `ref` actual; la versión en `package.json` de ese commit debe ser la que quieres publicar y **no** debe existir ya en npm).

## Notas

- La primera publicación puede haber sido desde tu máquina; las siguientes pueden ser solo por release + este workflow.
- Si npm exige 2FA para publicar, el **Trusted Publisher** con OIDC suele sustituir el OTP en CI (según la política actual de npm).
