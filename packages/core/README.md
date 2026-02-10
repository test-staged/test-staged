# @test-staged/core

> The core logic for `test-staged`.

This package contains the main execution engine for `test-staged`. It orchestrates the process of finding staged files, resolving related tests, and executing them using the appropriate runner adapter.

## Features

- **Git Integration**: Retrieves staged files using `simple-git`.
- **Test Resolution**: Finds tests related to changed source files.
- **Runner Execution**: Invokes the detected test runner with the correct arguments.
- **Configuration**: Handles configuration loading via `lilconfig`.

## Usage

This package is typically consumed by the CLI (`test-staged` package), but can be used programmatically.

```ts
import { testStaged } from '@test-staged/core';

await testStaged({
  cwd: process.cwd(),
  // options...
});
```
