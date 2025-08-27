/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  reporters: ['default'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
