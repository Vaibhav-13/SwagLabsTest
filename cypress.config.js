const { defineConfig } = require("cypress");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    specPattern: "cypress/e2e/**/*.feature",
    setupNodeEvents(on, config) {
      require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin(on, config);
      on("file:preprocessor", createEsbuildPlugin(config));
      return config;
    },
  },
});