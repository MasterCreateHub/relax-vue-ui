module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    '^@packages/(.*)$': '<rootDir>/packages/$1',
  },
};