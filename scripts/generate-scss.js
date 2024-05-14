/**
 * `scripts/generate-scss.js` is used to help generate all the sass files that we
 * need for each-or selected font family, supported weight, and unicode range.
 */

const fs = require('fs-extra');
const path = require('path');

const { formatFilename, createFontFace } = require('./tools');
const unicodes = require('./data/unicodes');
const weights = require('./data/weights');
const families = require('./data/families');

const familiesData = process.env.npm_package_config_family ? families.filter(({ packageName }) => { return packageName === process.env.npm_package_config_family }) : families;

/**
 * The general flow for this is to iterate through families, weights, and
 * unicodes, using them to generate an array of objects that contains
 * `filename` and `content` fields.
 *
 * We then use this array to write all the necessary files that we need to
 * support our use-case.
 */
const filesToWrite = familiesData
.map((family, index) => {

  // Generate path
  const output_dir = path.resolve(__dirname, `../packages/${family.packageName}/scss`);
  familiesData[index].output_dir = output_dir;

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

  const files = filteredWeights
  .map(weight => {
    // When mapping over the unicodes, we'll create the actual @font-face
    // declarations and the appropriate file labeled by the unicode's type
    // field.
    const innerFiles = unicodes
    .filter(unicode => family.unicodes.includes(unicode.type))
    .map(unicode => {
      const filename = formatFilename([
        weight.type,
        weight.variant,
        `_${unicode.type}.scss`,
      ]);
      return {
        filename: `${output_dir}/${filename.split(' ').join('-')}`,
        content: createFontFace(family, weight, unicode),
        unicode,
      };
    })
    .filter(Boolean);

    // Create a helpful `_index.scss` partial that imports all of the
    // unicode files that were generated above.

    const filename = formatFilename([
      weight.type,
      weight.variant,
      '_index.scss',
    ]);

    const order = {
      Cyrillic: 1,
      Pi: 2,
      Latin3: 3,
      Latin2: 4,
      Latin1: 5,
    };

    const contentSplit = innerFiles
    .sort((a, b) => order[a.unicode.type] - order[b.unicode.type])
    .filter(({ unicode }) => family.unicodes.includes(unicode.type))
    .map(({ unicode }) => {
      const importPath = formatFilename([unicode.type]);
      return `@import '${importPath}';`;
    })
    .join('\n');

    const contentWhole = createFontFace(family, weight);

    // We spread all the inner files, since they are valid files that we'll
    // want to create in the future, and then reduce over the whole
    // collection to flatten the array entries.
    // String contentWhole (woff) goes before contentSplit (woff2) so modern
    // browsers will look for split files.

    return [
      ...innerFiles,
      {
        hasItalic: family.hasItalic,
        filename: `${output_dir}/${filename.split(' ').join('-')}`,
        content: `$font-prefix: '..' !default;\n${contentWhole}\n${contentSplit}`,
        weight,
      },
    ];
  })
  .filter(Boolean)
  .reduce((acc, array) => acc.concat(array), []);

  // Here we'll generate a `_index.scss` partial for a specific font family
  // that includes all the various weight files generated for the font-family.
  // If a family is split from the core stylesheet, we don't use the underscore
  // since it isn't a partial

  //const fontFileRoot = family.preferredName || family.type;

  /*const filename = `${output_dir}/${fontFileRoot.toLowerCase()
  .split(' ')
  .join('-')}/_index.scss`;*/

  /*const content = files
  .filter(file => file.weight)
  .map(({ weight }) => {
        
    const importPath = formatFilename([weight.type, weight.variant]);
    return `@import '${importPath}/index';`;
  })
  .join('\n');*/

  return files;
})
.reduce((acc, array) => acc.concat(array));

// Write all the files that we created above
filesToWrite.forEach(({ filename, content }) => {

  fs.outputFileSync(filename, content, 'utf8');
});

familiesData.forEach(family => {

  const output_dir = family.output_dir;

  const weightStrings = 
  weights.filter(weight => {

    const italicWeight = weight.variant === 'Italic' || weight.type === 'Italic';

    if (italicWeight) {
      return family.hasItalic;
    }

    if (family.weights) {
      return family.weights.includes(weight.type);
    }

    return true;
  })
  .map((weight) => {

    return weight.variant === 'Italic' ? `@import '${weight.type.toLowerCase()}/italic/index';` : `@import '${weight.type.toLowerCase()}/index';`;
  });

  // Create partial for all families
  const rootPartial = `$font-prefix: '..' !default;\n\n` + weightStrings.join('\n');

  fs.outputFileSync(`${output_dir}/index.scss`, rootPartial, 'utf8');
});