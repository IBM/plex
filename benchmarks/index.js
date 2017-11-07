'use strict';

const listen = require('./tools/listen');
const setupServer = require('./tools/server');

setupServer()
  .then(listen)
  .then(handler => {})
  .catch(error => {
    console.log(error);
  });
