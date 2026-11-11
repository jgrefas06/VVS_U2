module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/compras.test.js'],
  moduleNameMapper: {
    '^\\.\\./src/compras$': '<rootDir>/evidencias/compras-inicial.js'
  }
};
