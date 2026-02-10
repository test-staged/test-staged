# @test-staged/detect-runner

> Test runner detector for `test-staged`.

This package inspects the project's dependencies and configuration to automatically determine which test runner is being used (e.g., Jest, Vitest).

## Usage

This package is intended for internal use by `@test-staged/core`.

```ts
import { detectRunner } from '@test-staged/detect-runner';

const runner = await detectRunner(process.cwd());
// returns 'jest', 'vitest', etc.
```
