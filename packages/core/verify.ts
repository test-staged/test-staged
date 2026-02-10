import fs from 'node:fs';
import path from 'node:path';
import { resolveTestFiles } from './src/resolve-tests';

const tempDir = path.resolve(__dirname, 'temp_verification');

if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
fs.mkdirSync(tempDir);
fs.mkdirSync(path.join(tempDir, 'src'));

// Create files
// 1. A custom test file
fs.writeFileSync(path.join(tempDir, 'src/foo.mytest.js'), 'test');
// 2. A source file
fs.writeFileSync(path.join(tempDir, 'src/bar.ts'), 'source');
// 3. A test file for the source file (using custom extension)
fs.writeFileSync(path.join(tempDir, 'src/bar.mytest.js'), 'test');

const cwd = tempDir;
const files = [
  'src/foo.mytest.js',
  'src/bar.ts'
];

console.log('Testing resolveTestFiles with custom extensions...');

// Call with custom extensions
const result = resolveTestFiles(files, cwd, ['.mytest']);

// result should already be relative paths matching the input structure
console.log('Result:', result);

// Expected result:
// 'src/foo.mytest.js' (preserved because it matches .mytest)
// 'src/bar.mytest.js' (resolved from src/bar.ts using .mytest)

const expected = [
  'src/foo.mytest.js',
  'src/bar.mytest.js'
];

const sortedResult = result.sort();
const sortedExpected = expected.sort();

if (JSON.stringify(sortedResult) === JSON.stringify(sortedExpected)) {
  console.log('SUCCESS: Custom extensions worked as expected.');
} else {
  console.error('FAILURE: Expected', sortedExpected, 'but got', sortedResult);
  process.exit(1);
}

// Clean up
fs.rmSync(tempDir, { recursive: true, force: true });
