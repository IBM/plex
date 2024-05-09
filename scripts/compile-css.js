const sass = require('sass');
const fs = require('fs-extra');
const families = require('./data/families');

const familiesData = process.env.npm_package_config_family ? families.filter(({ packageName }) => { return packageName === process.env.npm_package_config_family }) : families;

const compile = (file, output) => {
  const { css: expandedCss } = sass.renderSync({ file });
  fs.outputFileSync(`${output}.css`, expandedCss);

  const { css: minifiedCss } = sass.renderSync({
    file,
    outputStyle: 'compressed',
  });
  fs.outputFileSync(`${output}.min.css`, minifiedCss);
};

familiesData.forEach(family => {

  const inputFile = `packages/${family.packageName}/scss/index.scss`;
  const output = `packages/${family.packageName}/css/${family.name.replace(/\s/g, '-').toLowerCase()}`;

  compile(inputFile, output);
});