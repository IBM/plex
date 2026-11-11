
/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  fixturesFolder: false,
  video: false,
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  pageLoadTimeout: 80000,
  defaultCommandTimeout: 80000,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  numTestsKeptInMemory: 0,
  e2e: {
    baseUrl: 'http://localhost:8080',
    specPattern: 'cypress/integration/**/*.e2e.js',
    supportFile: 'cypress/support/index.js',
    setupNodeEvents(on, config) {
      return require('./plugins/index.js')(on, config);
    },
  },
});
