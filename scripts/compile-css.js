const sass = require('sass');
const fs = require('fs-extra');
const families = require('./data/families');

const compile = (file, output) => {
  const { css: expandedCss } = sass.renderSync({ file });
  fs.outputFileSync(`${output}.css`, expandedCss);

  const { css: minifiedCss } = sass.renderSync({
    file,
    outputStyle: 'compressed',
  });
  fs.outputFileSync(`${output}.min.css`, minifiedCss);
};

compile('scss/ibm-plex.scss', 'css/ibm-plex');

// Compile CJK/split families seperately from core bundle
families
  .filter(family => family.ownStyleSheet)
  .forEach(font => {
    const inputFile = `scss/${font.type
      .replace(/\s/g, '-')
      .toLowerCase()}/index.scss`;
    const output = `css/${font.name.replace(/\s/g, '-').toLowerCase()}`;

    compile(inputFile, output);
  });
