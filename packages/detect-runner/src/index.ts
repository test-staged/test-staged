import fs from 'node:fs/promises';
import path from 'node:path';

export type TestRunner = 'jest' | 'vitest' | 'mocha' | 'ava' | 'unknown';

export async function detectTestRunner(cwd: string = process.cwd()): Promise<TestRunner> {
  const pkgPath = path.join(cwd, 'package.json');
  let pkg: any = {};

  try {
    const content = await fs.readFile(pkgPath, 'utf-8');
    pkg = JSON.parse(content);
  } catch {
    // ignore
  }

  const allDeps = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
  };

  if (allDeps.vitest) return 'vitest';
  if (allDeps.jest) return 'jest';
  if (allDeps.ava) return 'ava';
  if (allDeps.mocha) return 'mocha';

  // Fallback: check config files
  const files = await fs.readdir(cwd).catch(() => []);
  
  if (files.some(f => f.includes('vitest.config'))) return 'vitest';
  if (files.some(f => f.includes('jest.config'))) return 'jest';
  if (files.some(f => f.includes('.mocharc'))) return 'mocha';
  if (files.some(f => f.includes('ava.config'))) return 'ava';

  return 'unknown';
}
