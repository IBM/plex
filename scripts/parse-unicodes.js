/**
 * `scripts/parse-unicodes.js` is used to help parse unicodes from one of the provided CSS file and output file ready to be used in unicodes folder
 *  usage: yarn unicodes -i {LANGCODE} -p /packages/{package-name}/fonts/split/woff/hinted/{css-input-filename}.css -f {output-filename}.js
 *  example: yarn unicodes -i TC -p /packages/plex-sans-tc/fonts/split/woff/hinted/IBMPlexSansTC-Bold.css -f chinesetc.js
 *  
 *  usage for base type set: yarn unicodes -p /packages/{package-name}/fonts/split/woff/{css-input-filename}.css -f {output-filename}.js
 *  example: yarn unicodes -p /packages/plex-sans-condensed/fonts/split/woff/IBMPlexSansCondensed-Bold.css -f condensed.js
 */

const fs = require('fs-extra');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));

const subsetRegex = /\/\* Subset: (.+) \*\//;
const unicodeRangeRegex = /unicode-range: (.*?)\n/;

const outputDir = path.resolve(__dirname, `./data/unicodes`);

const { i, p, f } = argv;
let collection = `module.exports = [`;

if (p && f && f.includes('.js')) {
  const cssPath = path.resolve(__dirname, `../${p}`);
  const cssContent = fs.readFileSync(cssPath).toString();
  const definitionMatches = cssContent.match(/\/*((.|\n)*?)\}\n/gm);

  definitionMatches.forEach(definition => {
    const subsetMatches = definition.match(subsetRegex);
    const unicodeRangeMatches = definition.match(unicodeRangeRegex);

    if (
      subsetMatches &&
      subsetMatches[1] &&
      unicodeRangeMatches &&
      unicodeRangeMatches[1]
    ) {
      if (i === undefined) {
        collection += `{
          type: '*${subsetMatches[1]}',
          characters: [${unicodeRangeMatches[1]
            .split(',')
            .map(item => `'${item.trim()}'`)}]
        },\n`;
      } else {
        collection += `{
          type: '${i.toUpperCase()}-${subsetMatches[1]}',
          characters: [${unicodeRangeMatches[1]
            .split(',')
            .map(item => `'${item.trim()}'`)}]
        },\n`;
      }
    }
  });

  collection += `]`;

  fs.outputFileSync(`${outputDir}/${f}`, collection, 'utf8');

  console.log(`File written to: ${outputDir}/${f}`);
} else {
  console.log(
    'Missing one of the arguments [-i XY -p /path/to/file.css -f filename.js]'
  );
  process.exit(1);
}
