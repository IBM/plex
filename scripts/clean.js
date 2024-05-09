/**
 * `scripts/clean-packages.js` is used to help clean all-or selected the sass / css / zip files that we
 * created for each font family
 */

const rimraf = require('rimraf');
const families = require('./data/families');

const removeFamilyFiles = (familyName) => {

  rimraf(`packages/${familyName}/scss`, {}, () => {

    console.log(`Removed scss files for ${familyName}`);
  });

  rimraf(`packages/${familyName}/css`, {}, () => {

    console.log(`Removed css files for ${familyName}`);
  });
}

if (process.env.npm_package_config_family) {

  console.log(`Removing scss and css files for ${process.env.npm_package_config_family} family`);

  removeFamilyFiles(process.env.npm_package_config_family)

} else {

  console.log("Removing scss and css files for all families");

  families.forEach(({ packageName }) => {

    removeFamilyFiles(packageName);
  });
}