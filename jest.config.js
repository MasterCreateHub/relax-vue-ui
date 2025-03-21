module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    '^/src/(.*)$': '<rootDir>/src/$1',
    '^@packages/(.*)$': '<rootDir>/packages/$1',
  },
  testMatch: [
    '<rootDir>/tests/unit/**/*.spec.js',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup.js',
  ],
};