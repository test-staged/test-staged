# Troubleshooting

## Runner not detected

If `test-staged` cannot detect your test runner, you can manually specify it in the configuration:

```json
{
  "runner": "jest"
}
```

## Tests not found

If your test files are not being picked up, ensure your `testExtensions` are configured correctly. By default, it looks for `.test` and `.spec` extensions.

```json
{
  "testExtensions": [".test.ts", ".spec.ts", "Test.ts"]
}
```

## "Related" mode not supported

Some runners (like Mocha and Ava) do not support "related" mode (running tests related to changed files via dependency graph). In these cases, `test-staged` will automatically fall back to "match" mode (mapping source files to test files by name).
