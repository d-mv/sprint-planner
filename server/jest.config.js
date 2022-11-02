module.exports = {
  displayName: {
    name: 'FASTIFY',
    color: 'green',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  roots: ['src/__tests__'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
