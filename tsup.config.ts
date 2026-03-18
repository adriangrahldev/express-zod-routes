import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    sourcemap: true,
    splitting: false,
    treeshake: true,
    outDir: 'dist',
    outExtension({ format }) {
      return { js: format === 'cjs' ? '.cjs' : '.js' };
    },
  },
  {
    entry: ['src/cli.ts'],
    format: ['esm'],
    platform: 'node',
    clean: false,
    outDir: 'dist',
    banner: {
      js: '#!/usr/bin/env node',
    },
    minify: false,
    sourcemap: true,
  },
]);
