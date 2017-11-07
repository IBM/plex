'use strict';

const express = require('express');
const request = require('request');
const config = require('./config');

const { CDN_URL } = config;
const server = express();

// TODO: setup static server for HTML fixtures

// TODO: setup proxy for CDN that hosts fonts

server.get('*', (req, res) => {
  const url = CDN_URL + req.url;
  req.pipe(request(url)).pipe(res);
  // res.send(url);
});

module.exports = () => Promise.resolve(server);
