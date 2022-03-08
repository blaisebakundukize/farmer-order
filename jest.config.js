/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(spec))\\.(ts?)$',
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverage: true,
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.json',
    },
  },
  setupFilesAfterEnv: ['<rootDir>/src/initSpec.ts'],
};
