#!/usr/bin/env node

import cac from 'cac';
import pc from 'picocolors';
import { run } from '@test-staged/core';
import { version } from '../package.json';

const cli = cac('test-staged');
 // 'related': Use native "related tests" feature if available (default).
  // 'match': Map staged files to test files (e.g. foo.ts -> foo.test.ts) and run them directly.
cli
  .command('[...globs]', 'Run tests for staged files')
  .option('--cwd <cwd>', 'Current working directory')
  .option('--mode <mode>', 'Test mode: `related` or `match`')
  .action(async (globs, options) => {
    try {
      await run({
        cwd: options.cwd,
        mode: options.mode,
        globs: globs.length > 0 ? globs : undefined,
      });
    } catch (e: any) {
      console.error(pc.red(e.message));
      process.exit(1);
    }
  });

cli.help();
cli.version(version);
cli.parse();
