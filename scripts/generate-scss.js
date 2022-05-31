/**
 * `scripts/export-css.js` is used to help generate all the sass files that we
 * need for each font family, supported weight, and unicode range.
 */

const fs = require('fs-extra');
const path = require('path');
const rimraf = require('rimraf');

const families = require('./data/families');
const { formatFilename, createFontFace } = require('./tools');
const unicodes = require('./data/unicodes');
const weights = require('./data/weights');

const OUTPUT_DIRECTORY = path.resolve(__dirname, '../scss');

/**
 * The general flow for this is to iterate through families, weights, and
 * unicodes, using them to generate an array of objects that contains
 * `filename` and `content` fields.
 *
 * We then use this array to write all the necessary files that we need to
 * support our use-case.
 */
const filesToWrite = families
  .map(family => {
    // Don't generate scss if the font doesn't have italic weights
    const filteredWeights = weights.filter(weight => {
      const italicWeight =
        weight.variant === 'Italic' || weight.type === 'Italic';

      if (italicWeight) {
        return family.hasItalic;
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
            const fileNameRoot = family.preferredName || family.type;
            const filename = formatFilename([
              fileNameRoot,
              weight.type,
              weight.variant,
              `_${unicode.type}.scss`,
            ]);
            return {
              filename: `${OUTPUT_DIRECTORY}/${filename.split(' ').join('-')}`,
              content: createFontFace(family, weight, unicode),
              unicode,
            };
          })
          .filter(Boolean);
        // console.log(innerFiles)
        // Create a helpful `_index.scss` partial that imports all of the
        // unicode files that were generated above.

        const fileNameRoot = family.preferredName || family.type;

        const filename = formatFilename([
          fileNameRoot,
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
            filename: `${OUTPUT_DIRECTORY}/${filename.split(' ').join('-')}`,
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

    const fontFileRoot = family.preferredName || family.type;

    const filename = `${OUTPUT_DIRECTORY}/${fontFileRoot.toLowerCase()
      .split(' ')
      .join('-')}/${family.ownStyleSheet ? 'index.scss' : '_index.scss'}`;

    const content = files
      .filter(file => file.weight)
      .map(({ weight }) => {
        const importPath = formatFilename([weight.type, weight.variant]);
        return `@import '${importPath}/index';`;
      })
      .join('\n');

    return [
      ...files,
      {
        filename,
        content: `$font-prefix: '..' !default;\n${content}`,
      },
    ];
  })
  .reduce((acc, array) => acc.concat(array));

// Write all the files that we created above
filesToWrite.forEach(({ filename, content }) => {
  fs.outputFileSync(filename, content, 'utf8');
});

const familyStrings = families.map(family => {
  if (family.ownStyleSheet) {
    return;
  }
  const fontFileRoot = family.preferredName || family.type;
  return `@import '${fontFileRoot
    .split(' ')
    .join('-')
    .toLowerCase()}/index';`;
});

// Create partial for all families
const rootPartial =
  `$font-prefix: '..' !default;\n\n` + familyStrings.join('\n');

fs.outputFileSync(`${OUTPUT_DIRECTORY}/ibm-plex.scss`, rootPartial, 'utf8');
