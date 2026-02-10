
import path from 'node:path';

const files = [
  'foo.test.js',
  '.test.js',
  'foo.spec.ts',
  'foo.ts',
  'foo.component.ts'
];

console.log('--- path.extname behavior ---');
files.forEach(f => {
  console.log(`'${f}' -> '${path.extname(f)}'`);
});
