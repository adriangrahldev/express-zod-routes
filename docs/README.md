# Documentación del repositorio

Esta carpeta es para **quien mantiene el proyecto**. Los usuarios del paquete deben ir al [**README principal**](../README.md) en la raíz.

| Documento                                      | Para qué sirve                                                                                    |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [**PUBLISH_NPM.md**](PUBLISH_NPM.md)           | Publicar en npm con **provenance** (Trusted Publisher + GitHub Actions).                          |
| CLI (`npx express-zod-routes add-route …`)     | [README → CLI](https://github.com/adriangrahldev/express-zod-routes#cli--scaffold-a-route-module) |
| [**PLAN_PROFESIONAL.md**](PLAN_PROFESIONAL.md) | Plan original, arquitectura y roadmap histórico (v1 ya publicada).                                |
| [CONTRIBUTING.md](../CONTRIBUTING.md) (raíz)   | Cómo colaborar: setup, PRs, commits, changelog.                                                   |
| [SECURITY.md](../SECURITY.md) (raíz)           | Política de seguridad y reporte de vulnerabilidades.                                              |

**Flujo típico:** cambias código → PR → merge → subes versión en `package.json` + `CHANGELOG.md` → tag `vX.Y.Z` → **Release** en GitHub → (si configuraste Trusted Publisher) el workflow publica en npm.
