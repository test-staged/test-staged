# Why test-staged?

## The Problem

As projects grow, the number of tests increases. Running the entire test suite before every commit becomes slow and impractical.

Developers often skip running tests locally because it takes too long, relying on CI to catch issues. This results in a slow feedback loop:
1. Commit changes.
2. Push to remote.
3. Wait for CI to fail.
4. Fix and repeat.

## The Solution

`test-staged` aims to solve this by running **only the tests related to your staged changes**.

It intelligently determines which tests need to be run based on the files you are about to commit:
- If you change a component, it runs the tests for that component.
- If you change a utility function, it runs all tests that import that utility (when supported by the runner).

This provides immediate feedback, preventing broken code from being committed while keeping the pre-commit check fast.

## How is it different from lint-staged?

We love `lint-staged`! It's an amazing tool for running linters and formatters on staged files. However, running tests is different.

- `lint-staged` runs commands *on the staged files themselves*.
- `test-staged` runs commands (tests) *related to the staged files*.

For example, if you modify `Button.tsx`:
- `lint-staged` might run `eslint Button.tsx`.
- `test-staged` will look for `Button.test.tsx` (or any other test file that imports `Button.tsx`) and run that.

## Disclaimer

`test-staged` is designed to be a "fast feedback" tool for your local development workflow. It is **not** a replacement for running your full test suite in your CI/CD pipeline.

While "related" mode is powerful, static analysis might miss some edge cases (e.g., dynamic imports or complex dependency injection). Always ensure your full test suite passes before merging to production.

## Credits

This project was heavily inspired by [lint-staged](https://github.com/lint-staged/lint-staged).

We want to express our sincere gratitude to the `lint-staged` team for their incredible work and for establishing the pattern of running checks on staged files. `test-staged` aims to be the perfect companion to `lint-staged` in your pre-commit workflow.
