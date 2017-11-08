'use strict';

const express = require('express');
const request = require('request');
const config = require('./config');

const { CDN_URL } = config;
const server = express();

module.exports = fixturesDir => {
  // TODO: setup static server for HTML fixtures
  server.use('/fixtures', express.static(fixturesDir));

  // TODO: setup proxy for CDN that hosts fonts
  server.get('*', (req, res) => {
    const url = CDN_URL + req.url;
    req.pipe(request(url)).pipe(res);
    // res.send(url);
  });

  return Promise.resolve(server);
};
