import { cToF } from './format';

test('cToF converts correctly', () => {
  expect(cToF(0)).toBeCloseTo(32);
  expect(cToF(25)).toBeCloseTo(77);
  expect(cToF(-10)).toBeCloseTo(14);
});
