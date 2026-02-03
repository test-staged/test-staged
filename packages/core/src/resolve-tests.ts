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
  const candidates: string[] = [];
  
  const addCandidates = (basePath: string) => {
      for (const testExt of TEST_EXTENSIONS) {
        // Default: same extension (e.g. .ts -> .spec.ts)
        candidates.push(`${basePath}${testExt}${ext}`);
        
        // Cross-extension checks:
        // If the file is a source file (script, component, template), check for standard test extensions
        // This covers:
        // - JS/TS: .js, .jsx, .mjs, .cjs, .ts, .tsx
        // - Frameworks: .vue, .svelte
        // - Templates: .html (Angular)
        if (['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx', '.vue', '.svelte', '.html'].includes(ext)) {
            candidates.push(`${basePath}${testExt}.ts`);
            candidates.push(`${basePath}${testExt}.tsx`);
            candidates.push(`${basePath}${testExt}.js`);
            candidates.push(`${basePath}${testExt}.jsx`);
        }
      }
  };

  const base = file.slice(0, -ext.length);
  
  // 1. Same directory: foo.test.ts, foo.spec.ts
  addCandidates(base);

  // 2. __tests__ directory: __tests__/foo.test.ts
  const dir = path.dirname(file);
  const name = path.basename(file, ext);
  
  if (!dir.includes('__tests__')) {
     addCandidates(path.join(dir, '__tests__', name));
  }

  // 3. Mirror directories (test/, tests/)
  const testDirs = ['test', 'tests'];
  for (const testDir of testDirs) {
      // src/foo.ts -> test/foo.test.ts
      if (file.startsWith(`src${path.sep}`)) {
          const relativePath = file.slice(4); // remove src/
          const relativeBase = relativePath.slice(0, -ext.length);
          addCandidates(path.join(testDir, relativeBase));
      }
      
      // foo.ts -> test/foo.test.ts
      // lib/foo.ts -> test/lib/foo.test.ts
      addCandidates(path.join(testDir, base));
  }

  return candidates;
}
