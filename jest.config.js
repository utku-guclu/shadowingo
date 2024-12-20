module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    '@env': './.env', // Ensure this path is correct
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/playwright-tests/'], // Exclude Playwright tests
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Add Detox setup
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Add Detox setup
};
