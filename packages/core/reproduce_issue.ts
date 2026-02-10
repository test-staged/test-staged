import fs from 'node:fs';
import path from 'node:path';
import { resolveTestFiles } from './src/resolve-tests';

const tempDir = path.resolve(__dirname, 'temp_repro');

if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
fs.mkdirSync(tempDir);
fs.mkdirSync(path.join(tempDir, 'src'));

// User's scenario
// Source: CamelCase.vue
// Test: CamelCaseTest.js

fs.writeFileSync(path.join(tempDir, 'src/CamelCase.vue'), 'source');
fs.writeFileSync(path.join(tempDir, 'src/CamelCaseTest.js'), 'test');

const cwd = tempDir;
const files = [
  'src/CamelCase.vue'
];

console.log('Testing resolution for *Test.js pattern...');

// Try with 'Test' as extension
const extensions = ['Test']; 
// Note: In resolveTestFiles, we join base + testExt + ext.
// If testExt is 'Test', base is 'CamelCase', target ext is '.js'.
// It tries: 
// 1. base + testExt + sourceExt -> CamelCaseTest.vue (No)
// 2. base + testExt + .js -> CamelCaseTest.js (Should match)

const result = resolveTestFiles(files, cwd, extensions);
// result is already correct paths (relative or absolute depending on implementation, 
// but resolveTestFiles returns paths relative to CWD if input was relative? 
// No, resolveTestFiles preserves input format mostly, but getTestCandidates constructs paths.
// In resolve-tests.ts: candidates.push(`${basePath}${testExt}${ext}`)
// basePath comes from file.slice(0, -ext.length). 
// So if file is relative, candidate is relative.
// But check existence uses path.resolve(cwd, candidate).

console.log('Extensions:', extensions);
console.log('Input:', files);
console.log('Result:', result);

// We expect src/CamelCaseTest.js
const expected = 'src/CamelCaseTest.js';
const matched = result.some(r => r.endsWith(expected));

if (matched) {
    console.log('SUCCESS: Found the test file.');
} else {
    console.log('FAILURE: Did not find the test file.');
    process.exit(1);
}

// Additional verification for isTestFile safety
// We need to import isTestFile but it is not exported.
// So we can test via resolveTestFiles behavior.
// If we pass a file that looks like a test, it should be returned as is.

const ambiguousFile = 'src/Testimonials.vue';
fs.writeFileSync(path.join(tempDir, ambiguousFile), 'component');

// If 'Test' is an extension, does resolveTestFiles think Testimonials.vue is a test file?
// logic: isTestFile('src/Testimonials.vue', ['Test'])
// stem = 'Testimonials'
// stem.endsWith('Test') -> false.
// So it should NOT be returned immediately (unless it finds a test FOR it, but there are no other files).

const resAmbiguous = resolveTestFiles([ambiguousFile], cwd, extensions);
console.log('Ambiguous Result:', resAmbiguous);

if (resAmbiguous.length === 0) {
    console.log('SUCCESS: Testimonials.vue was NOT treated as a test file.');
} else {
    // If it found a test FOR it, that's fine. But if it returned itself, that's bad.
    if (resAmbiguous.includes(ambiguousFile)) {
        console.log('FAILURE: Testimonials.vue WAS treated as a test file.');
        process.exit(1);
    }
}

// Test a valid test file
const validTestFile = 'src/MyTest.js';
fs.writeFileSync(path.join(tempDir, validTestFile), 'test');
// stem = 'MyTest'. endsWith('Test') -> true.
const resValid = resolveTestFiles([validTestFile], cwd, extensions);
if (resValid.includes(validTestFile)) {
     console.log('SUCCESS: MyTest.js WAS treated as a test file.');
} else {
     console.log('FAILURE: MyTest.js was NOT treated as a test file.');
     process.exit(1);
}


fs.rmSync(tempDir, { recursive: true, force: true });
