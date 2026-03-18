# Commits sugeridos (historial limpio)

Si quieres **rehacer** el historial con un commit por funcionalidad **antes** del primer `push`:

```bash
# Empezar de cero (solo si aún no has pusheado)
rm -rf .git
git init
```

Añade en este orden (ajusta mensajes si quieres):

```text
chore: initial scaffold (package, tsconfig, tsup, eslint, prettier, license)
feat(middleware): validate body with zod
feat(middleware): validate query and params
feat(errors): map ZodError to JSON response
feat(types): InferValidated and Express Request.validated augmentation
test: vitest and supertest integration tests
ci: github actions workflow
docs: readme, contributing, code of conduct, changelog
chore: example basic-express
```

En la práctica, con **un solo commit inicial** también es válido para v1; puedes usar commits atómicos a partir de la siguiente feature.
