import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { generateRouteSource, routeFileName } from './cli/generate-route.js';

function printHelp(): void {
  console.log(`express-zod-routes — CLI

Usage:
  npx express-zod-routes add-route <slug> [options]

Arguments:
  <slug>   Resource name (e.g. users, user-profile)

Options:
  --out-dir <dir>   Output directory (default: routes)
  --mount <path>    Mount path hint in comment (default: /<slug>)
  --force           Overwrite if file exists

Example:
  npx express-zod-routes add-route users
  npx express-zod-routes add-route products --out-dir src/api/routes
`);
}

function main(): void {
  const argv = process.argv.slice(2);
  if (argv.length === 0 || argv[0] === '-h' || argv[0] === '--help') {
    printHelp();
    process.exit(argv[0] === '-h' || argv[0] === '--help' ? 0 : 1);
  }

  const { values, positionals } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      'out-dir': { type: 'string', default: 'routes' },
      mount: { type: 'string' },
      force: { type: 'boolean', default: false },
    },
  });

  const cmd = positionals[0];
  if (cmd !== 'add-route') {
    console.error('Unknown command:', cmd);
    printHelp();
    process.exit(1);
  }

  const slug = positionals[1];
  if (!slug || slug.startsWith('-')) {
    console.error('Missing <slug>. Example: express-zod-routes add-route users');
    process.exit(1);
  }

  const outDir = resolve(process.cwd(), values['out-dir']);
  const mountPath =
    values.mount ?? `/${slug.replace(/[^a-z0-9/-]/gi, '').replace(/^\/+/, '/') || slug}`;
  const content = generateRouteSource(slug, { mountPath });
  const fileName = routeFileName(slug);
  const filePath = join(outDir, fileName);

  mkdirSync(outDir, { recursive: true });
  if (existsSync(filePath) && !values.force) {
    console.error(`File already exists: ${filePath}\nUse --force to overwrite.`);
    process.exit(1);
  }

  writeFileSync(filePath, content, 'utf8');
  console.log(`Created ${filePath}`);
}

main();
