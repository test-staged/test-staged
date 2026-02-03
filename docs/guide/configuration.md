# Configuration

`test-staged` is zero-config by default, but you can customize its behavior using a configuration file (e.g., `.test-stagedrc.json`, `test-staged.config.js`) or a `test-staged` property in `package.json`.

## Options

```typescript
interface TestStagedConfig {
  /**
   * Force a specific runner.
   * If not provided, it will be automatically detected.
   */
  runner?: 'jest' | 'vitest' | 'mocha' | 'ava';

  /**
   * Custom file patterns to match staged files against.
   * Defaults to ['**/*.{js,jsx,ts,tsx,mjs,cjs,vue,svelte,html}']
   */
  patterns?: string[];

  /**
   * Whether to merge custom patterns with defaults.
   * If true, patterns will be [...defaults, ...config.patterns].
   * If false, config.patterns replaces defaults.
   * @default false
   */
  mergePatterns?: boolean;

  /**
   * Jest-specific configuration
   */
  jest?: {
    /**
     * "related" (default): Uses `jest --findRelatedTests`.
     * "match": Manually resolves test files and runs them.
     */
    mode?: 'related' | 'match';
  };

  /**
   * Vitest-specific configuration
   */
  vitest?: {
    /**
     * "related" (default): Uses `vitest related`.
     * "match": Manually resolves test files and runs them.
     */
    mode?: 'related' | 'match';
  };
}
```

## Examples

### JSON Configuration

`.test-stagedrc.json`:

```json
{
  "runner": "jest",
  "jest": {
    "mode": "match"
  },
  "patterns": ["**/*.custom.js"],
  "mergePatterns": true
}
```
