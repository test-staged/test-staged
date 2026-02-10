# Configuration

`test-staged` is zero-config by default, but you can customize its behavior using a configuration file.

## Configuration Files

`test-staged` supports the following configuration files (searched in order):

1. `package.json` (under `test-staged` key)
2. `.test-stagedrc`
3. `.test-stagedrc.json`
4. `.test-stagedrc.js`
5. `.test-stagedrc.cjs`
6. `test-staged.config.js`
7. `test-staged.config.cjs`

## Options

```typescript
interface TestStagedConfig {
  /**
   * Force a specific runner.
   * If not provided, it will be automatically detected.
   */
  runner?: 'jest' | 'vitest' | 'mocha' | 'ava';

  /**
   * Custom glob patterns to match staged files against.
   * Defaults to ['**\/*.{js,jsx,ts,tsx,mjs,cjs,vue,svelte,html}']
   */
  patterns?: string[];

  /**
   * Custom test file extensions.
   * Defaults to ['.test', '.spec']
   */
  testExtensions?: string[];

  /**
   * Whether to merge custom patterns with defaults.
   * If true, patterns will be [...defaults, ...config.patterns].
   * If false, config.patterns replaces defaults.
   * @default false
   */
  mergePatterns?: boolean;

  /**
   * 'related': Use native "related tests" feature if available (default).
   * 'match': Map staged files to test files (e.g. foo.ts -> foo.test.ts) and run them directly.
   */
  mode?: 'related' | 'match';

  /**
   * Jest-specific configuration
   */
  jest?: Record<string, any>;

  /**
   * Vitest-specific configuration
   */
  vitest?: Record<string, any>;
}
```

## Examples

### JSON Configuration

`.test-stagedrc.json`:

```json
{
  "runner": "jest",
  "mode": "match",
  "patterns": ["**/*.custom.js"],
  "mergePatterns": true
}
```
