import express from 'express';
import { z } from 'zod';
import { validate } from 'express-zod-routes';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ ok: true, hint: 'POST /users with { "name", "email" }' });
});

app.post(
  '/users',
  validate({
    body: z.object({
      name: z.string().min(1),
      email: z.string().email(),
    }),
  }),
  (req, res) => {
    res.status(201).json({ created: req.validated!.body });
  }
);

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
