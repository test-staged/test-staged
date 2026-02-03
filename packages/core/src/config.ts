import { lilconfig } from 'lilconfig';

export interface TestStagedConfig {
  /**
   * Force a specific test runner.
   */
  runner?: 'jest' | 'vitest' | 'mocha' | 'ava';
  
  /**
   * Configuration for Jest.
   */
  jest?: {
    /**
     * 'related': Use `jest --findRelatedTests` (default).
     * 'match': Map staged files to test files (e.g. foo.ts -> foo.test.ts) and run them directly.
     */
    mode?: 'related' | 'match';
  };

  /**
   * Configuration for Vitest.
   */
  vitest?: {
    /**
     * 'related': Use `vitest related` (default).
     * 'match': Map staged files to test files and run them directly.
     */
    mode?: 'related' | 'match';
  };
}

export async function loadConfig(cwd: string): Promise<TestStagedConfig> {
  const explorer = lilconfig('test-staged', {
    searchPlaces: [
      'package.json',
      '.test-stagedrc',
      '.test-stagedrc.json',
      '.test-stagedrc.js',
      '.test-stagedrc.cjs',
      'test-staged.config.js',
      'test-staged.config.cjs',
    ],
  });

  try {
    const result = await explorer.search(cwd);
    return (result?.config || {}) as TestStagedConfig;
  } catch (e) {
    // Return empty config if loading fails
    return {};
  }
}
