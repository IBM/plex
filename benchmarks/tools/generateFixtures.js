'use strict';

const fs = require('fs-extra');
const path = require('path');
const rimraf = require('rimraf');
const families = require('../../src/families');
const unicodes = require('../../src/unicodes');
const weights = require('../../src/weights');
const createFixtureCSS = require('./createFixtureCSS');
const createFixtureHTML = require('./createFixtureHTML');

// Custom flatMap variant that we need to flatten the nested transformations, in
// addition to filtering out anything that is false-y.
const flatMap = (array, callback) =>
  [].concat(...array.map(callback).filter(Boolean));

module.exports = fixturesDir => {
  console.log('Generating fixtures in:', fixturesDir);
  const getFolderName = ({ family, weight, unicode }) => {
    const folder = [
      family.type,
      weight && weight.type,
      weight && weight.variant,
      unicode && unicode.type,
    ]
      .filter(Boolean)
      .join('-');

    return `${fixturesDir}/${folder}`;
  };

  const fixtures = flatMap(families, family => {
    const weightFixtures = flatMap(weights, weight => {
      if (family.type === 'Mono' && weight.mono === undefined) {
        return;
      }
      const unicodeFixtures = flatMap(unicodes, unicode => {
        return {
          folder: getFolderName({ family, weight, unicode }),
          html: createFixtureHTML({ family, weight, unicode }),
          css: createFixtureCSS({ family, weight, unicode }),
        };
      });
      const weightFixture = {
        folder: getFolderName({ family, weight }),
        html: createFixtureHTML({ family, weight }),
        css: createFixtureCSS({ family, weight }),
      };

      return [...unicodeFixtures, weightFixture];
    });
    const familyFixture = {
      folder: getFolderName({ family }),
      html: createFixtureHTML({ family }),
      css: createFixtureCSS({ family }),
    };

    return [...weightFixtures, familyFixture];
  });

  rimraf.sync(fixturesDir);
  rimraf.sync(path.resolve(__dirname, '../fixtures.json'));

  fixtures.forEach(fixture => {
    const { folder, css, html } = fixture;

    fs.ensureDirSync(folder);
    fs.outputFileSync(`${folder}/index.html`, html);
    fs.outputFileSync(`${folder}/styles.css`, css);
  });

  fs.writeJsonSync(
    path.resolve(__dirname, '../fixtures.json'),
    fixtures.map(fixture => path.basename(fixture.folder)),
    {
      spaces: 2,
    }
  );

  return Promise.resolve();
};
