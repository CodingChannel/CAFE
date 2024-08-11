module.exports = {
  preset: "ts-jest",
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "^@src/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: ["src/node_modules/(?!axios)/"],
  setupFilesAfterEnv: ["src/jest.setup.ts"],
};
