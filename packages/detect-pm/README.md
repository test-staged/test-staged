# @test-staged/detect-pm

> Package manager detector for `test-staged`.

This package is responsible for identifying which package manager (npm, pnpm, yarn, bun) is being used in the current project. This ensures that `test-staged` runs commands using the correct package manager.

## Usage

This package is intended for internal use by `@test-staged/core`.

```ts
import { detectPackageManager } from '@test-staged/detect-pm';

const pm = await detectPackageManager(process.cwd());
// returns 'npm', 'pnpm', 'yarn', etc.
```
