'use strict';

const fs = require('fs-extra');
const path = require('path');
const rimraf = require('rimraf');

const fallbacks = require('../src/fallbacks');
const families = require('../src/families');
const { formatFilename, createFontFace } = require('./tools');
const unicodes = require('../src/unicodes');
const weights = require('../src/weights');

const FONT_DIRECTORY = path.resolve(__dirname, '../src/fonts');
const OUTPUT_DIRECTORY = path.resolve(__dirname, '../src');

const filesToWrite = families
  .map(family => {
    const files = weights
      .map(weight => {
        const innerFiles = unicodes.map(unicode => {
          const filename = formatFilename([
            family.type,
            weight.type,
            weight.variant,
            `${unicode.type}.scss`,
          ]);

          return {
            filename: `${OUTPUT_DIRECTORY}/${filename}`,
            content: createFontFace(
              filename,
              FONT_DIRECTORY,
              family,
              weight,
              unicode
            ),
            unicode,
          };
        });
        const filename = formatFilename([
          family.type,
          weight.type,
          weight.variant,
          'index.scss',
        ]);
        const content = innerFiles
          .map(({ unicode }) => {
            const importPath = formatFilename([unicode.type]);
            return `@import './${importPath}.scss';`;
          }).join('\n');

        return [
          ...innerFiles,
          {
            filename: `${OUTPUT_DIRECTORY}/${filename}`,
            content,
            weight,
          },
        ];
      })
      .reduce((acc, array) => acc.concat(array), []);

    const filename = `${OUTPUT_DIRECTORY}/${family.type}/index.scss`;
    const content = files
      .filter(file => file.weight)
      .map(({ weight }) => {
        const importPath = formatFilename([weight.type, weight.variant]);
        return `@import './${importPath}/index.scss';`;
      }).join('\n');

    return [
      ...files,
      {
        filename,
        content,
      },
    ];
  })
  .reduce((acc, array) => acc.concat(array));

rimraf.sync(OUTPUT_DIRECTORY);

filesToWrite.forEach(({ filename, content }) => {
  fs.outputFileSync(filename, content, 'utf8');
});
