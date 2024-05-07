/**
 * `scripts/clean-packages.js` is used to help clean all-or selected the sass / css / zip files that we
 * created for each font family
 */

const rimraf = require('rimraf');
const fs = require('fs-extra');
const families = require('./data/families');

let cleanFamilies = [];

try {

  cleanFamilies = JSON.parse(fs.readFileSync('scripts/families.json')).data;

} catch (err) {

  cleanFamilies = families;
}


cleanFamilies.forEach(({ packageName }) => {

  rimraf(`packages/${packageName}/scss`, {}, () => {

    console.log(`Removed scss files for ${packageName}`);
  });

  rimraf(`packages/${packageName}/css`, {}, () => {

    console.log(`Removed css files for ${packageName}`);
  });
});