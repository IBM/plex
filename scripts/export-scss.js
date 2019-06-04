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
    const files = weights
      .map(weight => {
        // When mapping over the unicodes, we'll create the actual @font-face
        // declarations and the appropriate file labeled by the unicode's type
        // field.
        const innerFiles = unicodes
          .filter(unicode => family.unicodes.includes(unicode.type))
          .map(unicode => {
            const filename = formatFilename([
              family.type,
              weight.type,
              weight.variant,
              `_${unicode.type}.scss`,
            ]);
            if (family.hasItalic === false && weight.variant === 'Italic')
              return null;
            return {
              filename: `${OUTPUT_DIRECTORY}/${filename.split(' ').join('-')}`,
              content: createFontFace(filename, family, weight, unicode),
              unicode,
            };
          })
          .filter(Boolean);
        // console.log(innerFiles)
        // Create a helpful `_index.scss` partial that imports all of the
        // unicode files that were generated above.

        // Ignore italic fonts if flag present
        if (family.hasItalic === false && weight.variant === 'Italic')
          return null;

        const filename = formatFilename([
          family.type,
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
        const contentWhole = createFontFace(filename, family, weight);

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
    const filename = `${OUTPUT_DIRECTORY}/${family.type
      .split(' ')
      .join('-')}/_index.scss`;
    const content = files
      .filter(file => file.weight)
      .filter(file => {
        // Ignore italic fonts if flag present
        if (file.hasItalic === false && file.weight.type === 'Italic')
          return false;
        return true;
      })
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

// Remove each generated font family directory (if it exists)
families.forEach(family => {
  const familyDirectory = path.resolve(
    OUTPUT_DIRECTORY,
    family.type.toLowerCase()
  );
  rimraf.sync(familyDirectory);
});

// Write all the files that we created above
filesToWrite.forEach(({ filename, content }) => {
  fs.outputFileSync(filename, content, 'utf8');
});

// Create partial for all families
const rootPartial = `\n$font-prefix: '..' !default;

${families
  .map(
    family =>
      `@import '${family.type
        .split(' ')
        .join('-')
        .toLowerCase()}/index';`
  )
  .join('\n')}`;
fs.outputFileSync(`${OUTPUT_DIRECTORY}/ibm-plex.scss`, rootPartial, 'utf8');
