# Supported Test Runners

`test-staged` automatically detects which runner you are using based on your `package.json` dependencies and configuration files.

| Runner | Support Level | Method |
| :--- | :--- | :--- |
| **Vitest** | ⭐️ Full | Native `vitest related` |
| **Jest** | ⭐️ Full | Native `jest --findRelatedTests` |
| **Mocha** | ✅ Basic | File pattern matching |
| **Ava** | ✅ Basic | File pattern matching |

## Detection Logic

1. Checks `package.json` dependencies.
2. Checks for configuration files (e.g., `vitest.config.ts`, `jest.config.js`).
3. Defaults to file pattern matching if no native "related" mode is available.
