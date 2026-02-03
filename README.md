# test-staged 🚫🧪

Run tests for your staged files. **Zero config.**

> Run only the tests that are related to your changes. Stop pushing broken code.

## Why?

Running your entire test suite before every commit is slow. `test-staged` intelligently identifies which tests are related to your staged changes and runs only them. It's like `lint-staged`, but for tests.

## Features

- ⚡️ **Fast**: Runs only tests related to staged files.
- ⚙️ **Zero Config**: Automatically detects your package manager and test runner.
- 🧩 **Smart Detection**:
  - **Jest / Vitest**: Uses native "related tests" mode (dependency graph analysis).
  - **Mocha / Ava**: Automatically maps source files to test files (e.g., `foo.ts` → `foo.test.ts`, `src/foo.ts` → `src/__tests__/foo.test.ts`).
- 📦 **Monorepo Support**: Works seamlessly in workspaces.
- 🛠 **Agnostic**: Works with `npm`, `pnpm`, `yarn`, and `bun`.

## Installation

```bash
npm install -D test-staged
```
or
```bash
pnpm add -D test-staged
```
or
```bash
yarn add -D test-staged
```
or
```bash
bun add -D test-staged
```

## Usage

You can run it manually, but it's best used as a `pre-commit` hook.

### Manual Run

```bash
npx test-staged
```

### Set up with Husky (Recommended)

1. Install `husky`:
   ```bash
   npm install -D husky
   npx husky init
   ```

2. Add `test-staged` to your pre-commit hook:
   ```bash
   echo "npx test-staged" > .husky/pre-commit
   ```

Now, every time you commit, `test-staged` will run tests related to your changes. If tests fail, the commit is blocked.

## Supported Test Runners

`test-staged` automatically detects which runner you are using based on your `package.json` dependencies and configuration files.

| Runner | Support Level | Method |
| :--- | :--- | :--- |
| **Vitest** | ⭐️ Full | Native `vitest related` |
| **Jest** | ⭐️ Full | Native `jest --findRelatedTests` |
| **Mocha** | ✅ Basic | File pattern matching |
| **Ava** | ✅ Basic | File pattern matching |

## How it works

1. **Detects Staged Files**: Gets the list of files currently staged in git.
2. **Resolves Tests**:
   - For **Jest/Vitest**, it passes the staged files directly to the runner's "related" mode, which uses the dependency graph to find affected tests.
   - For **Mocha/Ava**, it scans for matching test files (e.g. `Component.ts` -> `Component.test.ts`).
3. **Runs Tests**: Executes the test runner with the appropriate arguments.

## License

MIT
