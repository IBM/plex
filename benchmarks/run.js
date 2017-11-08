'use strict';

const puppeteer = require('puppeteer');
const config = require('./tools/config');

const { PROTOCOL, HOST, PORT } = config;

// TODO: identify network conditions

const withRetries = (promiseFn, { onError, maxRetries = 10 } = {}) => {
  return (...args) =>
    new Promise((resolve, reject) => {
      let numRetries = 0;
      const retry = (...args) => {
        if (numRetries > maxRetries) {
          reject(new Error('withRetries: Exceeded maxRetries value'));
          return;
        }
        promiseFn(...args)
          .then(resolve)
          .catch(error => {
            onError && onError(error);
            numRetries++;
            retry(...args);
          });
      };

      retry(...args);
    });
};

const runFixtureWithBrowser = browser => async fixture => {
  console.log('Running fixture:', fixture);

  const url = `${PROTOCOL}://${HOST}:${PORT}/fixtures/${fixture}`;
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle' });

  const entries = await page.evaluate(
    `window.performance.getEntriesByName('font-load')`
  );

  await page.close();

  if (entries.length === 0) {
    throw new Error(`Font did not load for fixture: ${fixture}`);
  }

  return {
    [fixture]: entries[0].duration,
  };
};

const repeat = async (numTimes, fn) => {
  const results = [];
  for (let i = 0; i < numTimes; i++) {
    results.push(await fn());
  }
  return results;
};

const average = (collection, keys) => {
  const length = collection.length;
  const averages = {};

  keys.forEach(key => {
    const total = collection.reduce((acc, results) => {
      return acc + results[key];
    }, 0);
    averages[key] = total / length;
  });

  return averages;
};

const run = async fixtures => {
  const browser = await puppeteer.launch();
  const runFixture = runFixtureWithBrowser(browser);
  const results = await repeat(5, async () => {
    const measurements = await Promise.all(
      fixtures.map(withRetries(runFixture))
    );
    return measurements.reduce(
      (acc, measurement) => ({
        ...acc,
        ...measurement,
      }),
      {}
    );
  });

  await browser.close();

  return average(results, Object.keys(results[0]));
};

module.exports = run;
