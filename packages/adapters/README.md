# @test-staged/adapters

> Test runner adapters for `test-staged`.

This package contains the adapter implementations that allow `test-staged` to communicate with various test runners.

## Supported Runners

- **Jest**: Supports finding related tests.
- **Vitest**: Supports finding related tests.
- **Mocha**: Supports running specific test files (fallback mode).
- **Ava**: Supports running specific test files (fallback mode).

## Usage

This package is intended for internal use by `@test-staged/core`.

```ts
import { getAdapter } from '@test-staged/adapters';

const adapter = getAdapter('jest');
// Use adapter to run tests...
```
