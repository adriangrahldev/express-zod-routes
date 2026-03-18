# Tu turno: GitHub y npm

El código del paquete está listo en esta carpeta. **Yo no puedo crear el repositorio ni publicar en npm por ti.** Cuando completes cada paso, el siguiente bloque queda desbloqueado.

---

## Paso 1 — Crear el repositorio en GitHub

1. En GitHub: **New repository**.
2. Nombre sugerido: `express-zod-routes` (o el que prefieras).
3. Público, sin README inicial (ya tienes uno aquí).

**URL del repo:** `git@github.com:adriangrahldev/express-zod-routes.git`

---

## Paso 2 — Subir el código (local)

En la carpeta del proyecto:

```bash
git init
git add .
git commit -m "chore: initial release express-zod-routes v1.0.0"
git branch -M main
git remote add origin git@github.com:adriangrahldev/express-zod-routes.git
git push -u origin main
```

Si prefieres **commits separados por funcionalidad** (como en el plan), antes del primer push puedes rehacer el historial con varios commits; hay una guía en `docs/COMMITS_SUGERIDOS.md`.

---

## Paso 3 — npm (opcional)

1. Cuenta en [npmjs.com](https://www.npmjs.com), `npm login`.
2. Si el nombre `express-zod-routes` está ocupado, cambia el campo `"name"` en `package.json` (ej. `@tuusuario/express-zod-routes`).
3. `npm publish --access public` (si usas scope).

**Si npm te pide 2FA o cambios de configuración**, hazlo en tu cuenta npm; si algo falla, copia el error y lo vemos.

---

## Paso 4 — Release en GitHub

Tras publicar (o aunque solo subas código):

- Crea un **Release** `v1.0.0` apuntando al commit estable.
- Pega en la descripción el contenido relevante de `CHANGELOG.md`.

---

Cuando termines el **Paso 1**, envíame la **URL del repo** (o tu usuario) y, si quieres, adapto los archivos con tu usuario de un solo golpe.
