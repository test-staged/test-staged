export interface AdapterOptions {
  mode?: 'related' | 'match';
}

export interface TestAdapter {
  name: string;
  supportsRelated: boolean;
  getCommand(files: string[], options?: AdapterOptions): string[];
}

export const jestAdapter: TestAdapter = {
  name: 'jest',
  supportsRelated: true,
  getCommand(files, options) {
    if (options?.mode === 'match') {
      return ['jest', ...files];
    }
    return ['jest', '--findRelatedTests', ...files];
  },
};

export const vitestAdapter: TestAdapter = {
  name: 'vitest',
  supportsRelated: true,
  getCommand(files, options) {
    if (options?.mode === 'match') {
      return ['vitest', 'run', ...files];
    }
    return ['vitest', 'related', '--run', ...files];
  },
};

export const avaAdapter: TestAdapter = {
  name: 'ava',
  supportsRelated: false,
  getCommand(files) {
    return ['ava', ...files];
  },
};

export const mochaAdapter: TestAdapter = {
  name: 'mocha',
  supportsRelated: false,
  getCommand(files) {
    return ['mocha', ...files];
  },
};

export function getAdapter(runner: string): TestAdapter | null {
  switch (runner) {
    case 'jest': return jestAdapter;
    case 'vitest': return vitestAdapter;
    case 'ava': return avaAdapter;
    case 'mocha': return mochaAdapter;
    default: return null;
  }
}
