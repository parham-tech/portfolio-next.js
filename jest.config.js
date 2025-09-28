// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|scss|sass)$": "identity-obj-proxy",
    "\\.(png|jpg|jpeg|gif|svg|webp)$": "<rootDir>/test/__mocks__/fileMock.js",
  },
};

module.exports = createJestConfig(customJestConfig);
