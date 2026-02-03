import cac from 'cac';
import pc from 'picocolors';
import { run } from '@test-staged/core';
import { version } from '../package.json';

const cli = cac('test-staged');

cli
  .command('[...globs]', 'Run tests for staged files')
  .option('--cwd <cwd>', 'Current working directory')
  .action(async (globs, options) => {
    try {
      await run({
        cwd: options.cwd,
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
