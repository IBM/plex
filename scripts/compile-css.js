const sass = require('sass');
const fs = require('fs-extra');

const familiesData = JSON.parse(fs.readFileSync('scripts/families.json')).data;

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

fs.unlinkSync('scripts/families.json');