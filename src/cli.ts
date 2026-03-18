import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { generateRouteSource, routeFileName } from './cli/generate-route.js';

const RESERVED = new Set(['add-route', 'gen', 'new', 'help', '-h', '--help']);

function defaultOutDir(): string {
  const cwd = process.cwd();
  if (existsSync(join(cwd, 'src', 'routes'))) return 'src/routes';
  if (existsSync(join(cwd, 'routes'))) return 'routes';
  if (existsSync(join(cwd, 'src'))) return 'src/routes';
  return 'routes';
}

function isSlug(token: string | undefined): boolean {
  if (!token || token.startsWith('-')) return false;
  return /^[a-z][a-z0-9-]{0,62}$/i.test(token) && !RESERVED.has(token.toLowerCase());
}

function printHelp(): void {
  const d = defaultOutDir();
  console.log(`express-zod-routes — CLI

Shortest:
  npx express-zod-routes <slug>     e.g. npx express-zod-routes orders
  npx express-zod-routes gen orders
  ezr orders                        (after: npm i -g express-zod-routes)

Default output dir: ./${d} (auto: src/routes or routes)

Full form:
  npx express-zod-routes add-route <slug> [--out-dir dir] [--mount path] [--force]
`);
}

function main(): void {
  const argv = process.argv.slice(2);
  if (argv.length === 0 || argv[0] === '-h' || argv[0] === '--help' || argv[0] === 'help') {
    printHelp();
    process.exit(argv.length === 0 ? 1 : 0);
  }

  let slug: string;
  let optionArgs: string[];

  const a0 = argv[0];
  const a1 = argv[1];

  if (a0 === 'add-route' || a0 === 'gen' || a0 === 'new') {
    if (!a1 || a1.startsWith('-')) {
      console.error(`Missing <slug>. Example: express-zod-routes ${a0} users`);
      process.exit(1);
    }
    slug = a1;
    optionArgs = argv.slice(2);
  } else if (isSlug(a0)) {
    slug = a0;
    optionArgs = argv.slice(1);
  } else {
    console.error('Unknown command:', a0);
    printHelp();
    process.exit(1);
  }

  const { values } = parseArgs({
    args: optionArgs,
    allowPositionals: true,
    options: {
      'out-dir': { type: 'string' },
      mount: { type: 'string' },
      force: { type: 'boolean', default: false },
    },
  });

  const outDir = resolve(process.cwd(), values['out-dir'] ?? defaultOutDir());
  const mountPath =
    values.mount ?? `/${slug.replace(/[^a-z0-9/-]/gi, '').replace(/^\/+/, '/') || slug}`;
  const content = generateRouteSource(slug, { mountPath });
  const fileName = routeFileName(slug);
  const filePath = join(outDir, fileName);

  mkdirSync(outDir, { recursive: true });
  if (existsSync(filePath) && !values.force) {
    console.error(`Already exists: ${filePath}\nUse --force to overwrite.`);
    process.exit(1);
  }

  writeFileSync(filePath, content, 'utf8');
  console.log(`Created ${filePath}`);
}

main();
