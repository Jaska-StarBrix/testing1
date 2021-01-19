/**
 * @references https://basarat.gitbook.io/typescript/intro-1/jest#step-2-configure-jest
 * @references https://jestjs.io/docs/en/configuration
 */
module.exports = {
  setupFiles: ['./jest.setup.js'],
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
}
