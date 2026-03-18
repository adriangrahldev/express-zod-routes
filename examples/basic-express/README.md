# Example: basic Express + express-zod-routes

From the **repository root** (parent of `examples/basic-express`):

```bash
npm run build
cd examples/basic-express
npm install
npm start
```

Then:

```bash
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d "{\"name\":\"Ada\",\"email\":\"ada@example.com\"}"
```

Invalid body returns `400` with `{ "error", "issues" }`.
