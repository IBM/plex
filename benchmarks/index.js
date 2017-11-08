'use strict';

const fs = require('fs-extra');
const path = require('path');
const listen = require('./tools/listen');
const setupServer = require('./tools/server');
const run = require('./run');
const generate = require('./tools/generateFixtures');
const fixtures = require('./fixtures.json');

const FIXTURES_DIRECTORY = path.join(__dirname, './fixtures');

generate(FIXTURES_DIRECTORY)
  .then(() => setupServer(FIXTURES_DIRECTORY))
  .then(listen)
  .then(handler => Promise.all([handler, run(fixtures)]))
  .then(([handler, results]) => {
    handler.close();
    fs.writeJsonSync(path.resolve(__dirname, './results.json'), results, {
      spaces: 2,
    });
    process.exit(0);
  })
  .catch(error => {
    console.log(error);
  });
