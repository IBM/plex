const sass = require('sass');
const fs = require('fs-extra');
const families = require('./data/families');

const familiesData = process.env.npm_package_config_family ? families.filter(({ packageName }) => { return packageName === process.env.npm_package_config_family }) : families;


const compile = (file, output) => {

  const { css: expandedCss } = sass.compile(file);
  
  fs.outputFileSync(`${output}.css`, expandedCss);

  const { css: minifiedCss } = sass.compile(file, {
    style: 'compressed',
  });
  fs.outputFileSync(`${output}.min.css`, minifiedCss);

  fs.removeSync(file);
};

familiesData.forEach(family => {

  const inputFileAll = `packages/${family.packageName}/scss/css-all.scss`;
  const outputAll = `packages/${family.packageName}/css/${family.name.replace(/\s/g, '-').toLowerCase()}-all`;

  const inputFileDefault = `packages/${family.packageName}/scss/css-default.scss`;
  const outputDefault = `packages/${family.packageName}/css/${family.name.replace(/\s/g, '-').toLowerCase()}-default`;

  compile(inputFileAll, outputAll);
  compile(inputFileDefault, outputDefault);
});