import simpleGit from 'simple-git';
import micromatch from 'micromatch';
import path from 'node:path';
import { getPackageManager } from '@test-staged/detect-pm';
import { detectTestRunner } from '@test-staged/detect-runner';
import { getAdapter } from '@test-staged/adapters';
import { execa } from 'execa';
import { resolveTestFiles } from './resolve-tests';
import { loadConfig } from './config';

export { resolveTestFiles } from './resolve-tests';
export interface Options {
  cwd?: string;
  globs?: string[];
}

export async function run(options: Options = {}) {
  const cwd = options.cwd ? path.resolve(options.cwd) : process.cwd();
  const git = simpleGit(cwd);

  // 1. Get Git Root and Staged Files
  let gitRoot = '';
  try {
    gitRoot = await git.revparse(['--show-toplevel']);
    gitRoot = gitRoot.trim();
  } catch (e) {
    console.error('Failed to find git root. Are you in a git repo?');
    throw e;
  }

  let staged = '';
  try {
    staged = await git.diff(['--cached', '--name-only']);
  } catch (e) {
    console.error('Failed to get staged files.');
    throw e;
  }
  
  const filesRelative = staged.split('\n').filter(Boolean);

  if (filesRelative.length === 0) {
    console.log('No staged files found.');
    return;
  }

  // 2. Convert to Absolute Paths and Filter by CWD
  const filesAbsolute = filesRelative.map(f => path.join(gitRoot, f));
  
  // Only keep files that are inside the current working directory
  const filesInCwd = filesAbsolute.filter(f => f.startsWith(cwd));

  if (filesInCwd.length === 0) {
    console.log('No staged files found in the current directory.');
    return;
  }

  // 4. Detect PM and Runner
  const config = await loadConfig(cwd);

  // 3. Filter by Globs (relative to CWD)
  const defaultGlobs = ['**/*.{js,jsx,ts,tsx,mjs,cjs,vue,svelte,html}'];
  
  let globs = defaultGlobs;
  if (options.globs) {
    globs = options.globs;
  } else if (config.patterns) {
    if (config.mergePatterns) {
      globs = [...defaultGlobs, ...config.patterns];
    } else {
      globs = config.patterns;
    }
  }
  
  // micromatch expects strings. We can match against absolute paths if globs are absolute, 
  // or match relative paths. 
  // Let's make paths relative to CWD for matching and logging.
  const filesRelativeToCwd = filesInCwd.map(f => path.relative(cwd, f));
  
  const matchedRelative = micromatch(filesRelativeToCwd, globs);

  if (matchedRelative.length === 0) {
    console.log('No matching staged files found to test.');
    return;
  }

  console.log(`Found ${matchedRelative.length} staged files to test.`);

  const pm = await getPackageManager(cwd);
  const runner = config.runner || await detectTestRunner(cwd);

  if (runner === 'unknown') {
    console.error('Could not detect a supported test runner (jest, vitest).');
    process.exit(1);
  }

  const adapter = getAdapter(runner);
  if (!adapter) {
    console.error(`No adapter found for runner: ${runner}`);
    process.exit(1);
  }

  // Check config mode
  let mode: 'related' | 'match' = config.mode || 'related';
  
  // Warn if 'related' mode is requested but not supported by the runner
  if (mode === 'related' && !adapter.supportsRelated) {
    console.warn(`[test-staged] Warning: Runner '${runner}' does not support 'related' mode. Falling back to 'match' mode.`);
    mode = 'match';
  }

  // Resolve test files if the adapter doesn't support related tests natively OR if mode is 'match'
  let filesToRun = matchedRelative;
  if (!adapter.supportsRelated || mode === 'match') {
    filesToRun = resolveTestFiles(matchedRelative, cwd, config.testExtensions);
    if (filesToRun.length === 0) {
      console.log('No related test files found for staged files.');
      return;
    }
  }

  // 5. Build Command
  // Pass relative paths to the runner (cleaner output usually)
  const testArgs = adapter.getCommand(filesToRun, { mode });
  
  let execCmd = testArgs[0];
  let execArgs = testArgs.slice(1);

  if (pm?.agent === 'pnpm') {
    execCmd = 'pnpm';
    execArgs = ['exec', testArgs[0], ...testArgs.slice(1)];
  } else if (pm?.agent === 'yarn') {
    execCmd = 'yarn';
    execArgs = ['exec', testArgs[0], ...testArgs.slice(1)];
  } else if (pm?.agent === 'npm') {
    execCmd = 'npx';
    execArgs = [testArgs[0], ...testArgs.slice(1)];
  } else if (pm?.agent === 'bun') {
    execCmd = 'bun';
    execArgs = ['x', testArgs[0], ...testArgs.slice(1)];
  }

  console.log(`Running: ${execCmd} ${execArgs.join(' ')}`);

  // 6. Execute
  try {
    await execa(execCmd, execArgs, { 
      cwd, 
      stdio: 'inherit' 
    });
    console.log('Tests passed!');
  } catch (e) {
    console.error('Tests failed!');
    process.exit(1);
  }
}
