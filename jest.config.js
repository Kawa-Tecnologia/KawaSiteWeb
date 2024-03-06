// eslint-disable-next-line no-undef
module.exports = {
    testMatch: ["<rootDir>/src/__tests__/**/*.test.js"],
    transform: {
      "^.+\\.js$": "babel-jest",
      "^.+\\.jsx?$": "babel-jest"

    },
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
  };