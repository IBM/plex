const sass = require('sass');
const fs = require('fs-extra');
const path = require('path');
const weights = require('./data/weights');
const families = require('./data/families');

const familiesData = process.env.npm_package_config_family ? families.filter(({ packageName }) => { return packageName === process.env.npm_package_config_family }) : families;

const OUTPUT_DIRECTORY = path.resolve(__dirname, '../cdn');

const excludedFromAllCSS = [
  'IBM Plex Sans KR',
  'IBM Plex Sans JP',
  'IBM Plex Sans TC',
  'IBM Plex Math'
]

let fullFileContent = '';
const fullFileContentIncludes = [];

fs.ensureDirSync(OUTPUT_DIRECTORY);
fs.ensureDirSync(`${OUTPUT_DIRECTORY}/temp`);

familiesData.forEach((family, index) => {

  const { name, packageName } = family;
  const familyName = name.replace(/ /g, '-');
  const fontDirectory = `../../packages/${packageName}/scss/index.scss`;
  const fontExcludedFromAllCSS = excludedFromAllCSS.includes(name);

  const filteredWeights = weights.filter(weight => {

    const italicWeight = weight.variant === 'Italic' || weight.type === 'Italic';

    if (italicWeight) {
      return family.hasItalic;
    }

    if (family.weights) {
      return family.weights.includes(weight.type);
    }

    return true;
  });

  const fontWeightsListAllDisabled = {};

  filteredWeights.forEach(weight => {

    const italic = weight.variant === 'Italic' || weight.type === 'Italic';
    const normalizeWeight = weight.type.toLowerCase();
  
    if (italic) {

      fontWeightsListAllDisabled[normalizeWeight === 'italic' ? normalizeWeight : `${normalizeWeight}Italic`] = false;

    } else {

      fontWeightsListAllDisabled[normalizeWeight] = false;
    }
  });

  let completeFileContent = `@use '${fontDirectory}' as family${index} with (\n\t$font-prefix: 'fonts/${familyName}',\n\t$font-weights: (`;
  
  if (!fontExcludedFromAllCSS) {
  
    fullFileContent += `@use '${fontDirectory}' as family${index} with (\n\t$font-prefix: 'fonts/${familyName}',\n\t$font-weights: (`;
  }

  for (const weight in fontWeightsListAllDisabled) {

    let weightFileContent = `@use '${fontDirectory}' as family${index} with (\n\t$font-prefix: 'fonts/${familyName}',\n\t$font-weights: (`;

    completeFileContent += `\n\t\t${weight}: true,`;

    if (!fontExcludedFromAllCSS) {
    
      fullFileContent += `\n\t\t${weight}: true,`;
    }

    const fontWeightsListEnabledThis = {
      ...fontWeightsListAllDisabled,
      [weight]: true
    }

    for (const _weight in fontWeightsListEnabledThis) {

      weightFileContent += `\n\t\t${_weight}: ${fontWeightsListEnabledThis[_weight]},`;
    }

    weightFileContent += `\n\t)\n);\n@include family${index}.all();`;

    fs.outputFileSync(`cdn/temp/${packageName}-${weight}.scss`, weightFileContent, 'utf8');

    const { css: minifiedCss } = sass.compile(`cdn/temp/${packageName}-${weight}.scss`, {
      style: 'compressed',
    });

    fs.outputFileSync(`cdn/${packageName.replace('plex-', '')}-${weight.replace('Italic', '-italic')}.css`, minifiedCss);
  }

  completeFileContent += `\n\t)\n);\n@include family${index}.all();`;
  
  if (!fontExcludedFromAllCSS) {
  
    fullFileContent += `\n\t)\n);\n\n`;
    fullFileContentIncludes.push(`@include family${index}.all();`);
  }

  fs.outputFileSync(`cdn/temp/${packageName}-complete.scss`, completeFileContent, 'utf8');

  const { css: minifiedCss } = sass.compile(`cdn/temp/${packageName}-complete.scss`, {
    style: 'compressed',
  });

  fs.outputFileSync(`cdn/${packageName.replace('plex-', '')}.css`, minifiedCss);

  fs.copySync(`packages/${packageName}/fonts`, `cdn/fonts/${familyName}/fonts/`);

});

fullFileContent += fullFileContentIncludes.join('\n');

fs.outputFileSync(`cdn/temp/plex-full.scss`, fullFileContent, 'utf8');

const { css: minifiedCss } = sass.compile(`cdn/temp/plex-full.scss`, {
  style: 'compressed',
});

fs.outputFileSync(`cdn/plex-full.css`, minifiedCss);

fs.removeSync('cdn/temp');