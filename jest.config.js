module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ["./jest.setup.js"],
  testEnvironment: "node",
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@react-navigation|@expo|expo|@unimodules))",
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      { configFile: "./babel.config.js" },
    ],
  },
};
