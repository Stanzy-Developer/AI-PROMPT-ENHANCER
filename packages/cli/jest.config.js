/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      useESM: true,
    }],
    '^.+\\.m?js$': ['babel-jest', {
      presets: ['@babel/preset-env'],
    }]
  },
  transformIgnorePatterns: [
    'node_modules/(?!(ink|ink-testing-library)/.*)'
  ]
};
