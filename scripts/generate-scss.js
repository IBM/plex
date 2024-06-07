/**
 * `scripts/generate-scss.js` is used to help generate all the sass files that we
 * need for each-or selected font family, supported weight, and unicode range.
 */

const fs = require('fs-extra');
const path = require('path');

const { createUnicodes, createTools, createEntryScss, createTemporaryScss, creatWeightScss } = require('./tools');
const unicodes = require('./data/unicodes');
const weights = require('./data/weights');
const families = require('./data/families');

const familiesData = process.env.npm_package_config_family ? families.filter(({ packageName }) => { return packageName === process.env.npm_package_config_family }) : families;

const filesToWrite = [];

familiesData.forEach((family, index) => {

    // Generate path
    const output_dir = path.resolve(__dirname, `../packages/${family.packageName}/scss`);
    familiesData[index].output_dir = output_dir;

    // Create sass unicodes and tools helpers
    const order = {
      Cyrillic: 1,
      Pi: 2,
      Latin3: 3,
      Latin2: 4,
      Latin1: 5,
    };

    const familyUnicodes = unicodes.filter(unicode => family.unicodes.includes(unicode.type)).sort((a, b) => order[a.type] - order[b.type]);
    const hasFamilyUnicodes = familyUnicodes.length;

    if (hasFamilyUnicodes) {

      const familyUnicodesFileContent = createUnicodes(familyUnicodes);

      filesToWrite.push({
        filename: `${output_dir}/unicodes/_index.scss`,
        content: familyUnicodesFileContent
      });
    }

    const toolsFileContent = createTools(hasFamilyUnicodes);

    filesToWrite.push({
      filename: `${output_dir}/tools/_index.scss`,
      content: toolsFileContent
    });

    // Don't generate scss if the font doesn't have italic weights / existing weights
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

    // Generate main scss file as an entry point
    const entryScssFileContent = createEntryScss(filteredWeights, hasFamilyUnicodes ? familyUnicodes.map((unicode) => unicode.type) : false);
    filesToWrite.push({
      filename: `${output_dir}/index.scss`,
      content: entryScssFileContent
    });

    // Generate temporary scss file for css generation
    const temporaryScssFiles = createTemporaryScss();
    temporaryScssFiles.forEach(({ filename, content }) => {

      filesToWrite.push({
        filename: `${output_dir}/${filename}`,
        content
      });
    });

    // Generate partial scss files for weights
    filteredWeights.forEach(weight => {

      const { partialScssFilename, partialScssFileContent } = creatWeightScss(weight, family, hasFamilyUnicodes ? familyUnicodes : false, output_dir);
      filesToWrite.push({
        filename: partialScssFilename,
        content: partialScssFileContent
      });
    });
});

// Write all the files that we created above
filesToWrite.forEach(({ filename, content }) => {

  fs.outputFileSync(filename, content, 'utf8');
});