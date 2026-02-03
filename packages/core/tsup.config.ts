import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  noExternal: ['execa'],
  clean: true,
  target: 'es2020',
});
