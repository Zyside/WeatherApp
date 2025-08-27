import { weatherCodeToDescription } from './weatherCodes';

test('maps known codes', () => {
  expect(weatherCodeToDescription(0)).toMatch(/Clear/);
  expect(weatherCodeToDescription(63)).toMatch(/Moderate rain/);
});

test('returns Unknown for unmapped', () => {
  expect(weatherCodeToDescription(999)).toBe('Unknown');
});
