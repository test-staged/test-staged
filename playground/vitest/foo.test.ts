import { expect, test } from 'vitest';
import { add, subtract } from './foo';
test('add', () => expect(add(1, 1)).toBe(2));
test('subtract', () => expect(subtract(1, 1)).toBe(0));