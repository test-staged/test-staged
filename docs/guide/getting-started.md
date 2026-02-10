# Getting Started

Running your entire test suite before every commit is slow. `test-staged` intelligently identifies which tests are related to your staged changes and runs only them. It's like `lint-staged`, but for tests.

## Installation

```bash
# npm
npm install -D test-staged

# pnpm
pnpm add -D test-staged

# yarn
yarn add -D test-staged

# bun
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
