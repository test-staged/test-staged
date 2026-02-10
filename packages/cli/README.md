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

### Command Line Flags

```bash
Usage: test-staged [globs] [options]

Options:
  --cwd <cwd>   Current working directory
  -h, --help    Display help
  -v, --version Display version
```

You can pass glob patterns as arguments to override the configuration:

```bash
npx test-staged "**/*.ts" "!**/*.test.ts"
```

## Supported Test Runners

`test-staged` automatically detects which runner you are using based on your `package.json` dependencies and configuration files.

| Runner | Support Level | Method |
| :--- | :--- | :--- |
| **Vitest** | ⭐️ Full | Native `vitest related` |
| **Jest** | ⭐️ Full | Native `jest --findRelatedTests` |
| **Mocha** | ✅ Basic | File pattern matching |
| **Ava** | ✅ Basic | File pattern matching |

## Configuration

`test-staged` is zero-config by default, but you can customize its behavior using a configuration file.

### Configuration Files

`test-staged` supports the following configuration files (searched in order):

1. `package.json` (under `test-staged` key)
2. `.test-stagedrc`
3. `.test-stagedrc.json`
4. `.test-stagedrc.js`
5. `.test-stagedrc.cjs`
6. `test-staged.config.js`
7. `test-staged.config.cjs`

### Options

```json
{
  // Force a specific runner (optional)
  "runner": "jest",

  // 'related': Use native "related tests" feature if available (default).
  // 'match': Map staged files to test files (e.g. foo.ts -> foo.test.ts) and run them directly.
  "mode": "related",

  // Custom test extensions (optional)
  // Defaults to [".test", ".spec"]
  "testExtensions": [".test", ".spec", ".mytest"]
}
```

## Troubleshooting

### Runner not detected

If `test-staged` cannot detect your test runner, you can manually specify it in the configuration:

```json
{
  "runner": "jest"
}
```

### Tests not found

If your test files are not being picked up, ensure your `testExtensions` are configured correctly. By default, it looks for `.test` and `.spec` extensions.

```json
{
  "testExtensions": [".test.ts", ".spec.ts", "Test.ts"]
}
```

### "Related" mode not supported

Some runners (like Mocha and Ava) do not support "related" mode (running tests related to changed files via dependency graph). In these cases, `test-staged` will automatically fall back to "match" mode (mapping source files to test files by name).

## Development

### Releasing

This project uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

1. **Create a changeset**: When you make changes, run:
   ```bash
   pnpm changeset
   ```
   Select the packages you changed and the bump type (major/minor/patch). This will create a markdown file in `.changeset/`.

2. **Commit**: Commit the changeset file along with your code changes.

3. **Version Packages**: When ready to release, run:
   ```bash
   pnpm version-packages
   ```
   This will consume the changesets, bump versions in `package.json`, and update `CHANGELOG.md`.

4. **Publish**: Push the changes and run:
   ```bash
   pnpm release
   ```
   This will build the project and publish packages to npm.
