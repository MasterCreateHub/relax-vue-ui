module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    '^/src/(.*)$': '<rootDir>/src/$1',
    '^@packages/(.*)$': '<rootDir>/packages/$1',
  },
  testMatch: [
    '<rootDir>/tests/unit/**/*.spec.js',
    '<rootDir>/packages/**/tests/unit/**/*.spec.js',
    '<rootDir>/src/directives/**/tests/unit/**/*.spec.js', // 添加对 directives 目录下测试文件的匹配
  ],
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup.js', // 添加 setup.js 文件路径
  ],
};