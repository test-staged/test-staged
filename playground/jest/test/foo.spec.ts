import { add, subtract } from '../src/foo';
test('add', () => expect(add(1, 1)).toBe(2));
test('subtract', () => expect(subtract(1, 1)).toBe(0));
