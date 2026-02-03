import fs from 'node:fs';
import path from 'node:path';

const TEST_EXTENSIONS = ['.test', '.spec'];

export function resolveTestFiles(files: string[], cwd: string): string[] {
  const testFiles = new Set<string>();

  for (const file of files) {
    // If the file itself looks like a test file, keep it
    if (isTestFile(file)) {
      testFiles.add(file);
      continue;
    }

    // Otherwise try to find related test files
    const candidates = getTestCandidates(file);
    for (const candidate of candidates) {
      if (fs.existsSync(path.resolve(cwd, candidate))) {
        testFiles.add(candidate);
      }
    }
  }

  return Array.from(testFiles);
}

function isTestFile(file: string): boolean {
  return TEST_EXTENSIONS.some(ext => file.includes(ext));
}

function getTestCandidates(file: string): string[] {
  const ext = path.extname(file);
  const base = file.slice(0, -ext.length);
  const candidates: string[] = [];

  // 1. Same directory: foo.test.ts, foo.spec.ts
  for (const testExt of TEST_EXTENSIONS) {
    candidates.push(`${base}${testExt}${ext}`);
    // Also check for .ts/.tsx if source is .js/.jsx
    if (ext === '.js' || ext === '.jsx') {
        candidates.push(`${base}${testExt}.ts`);
        candidates.push(`${base}${testExt}.tsx`);
    }
  }

  // 2. __tests__ directory: __tests__/foo.test.ts
  const dir = path.dirname(file);
  const name = path.basename(file, ext);
  
  // Only if __tests__ doesn't already exist in the path (simple check)
  if (!dir.includes('__tests__')) {
     for (const testExt of TEST_EXTENSIONS) {
        candidates.push(path.join(dir, '__tests__', `${name}${testExt}${ext}`));
        if (ext === '.js' || ext === '.jsx') {
            candidates.push(path.join(dir, '__tests__', `${name}${testExt}.ts`));
            candidates.push(path.join(dir, '__tests__', `${name}${testExt}.tsx`));
        }
     }
  }

  return candidates;
}
