/**
 * `scripts/parse-unicodes.js` is used to help parse unicodes from one of the provided CSS file and output file ready to be used in unicodes folder
 */
const fs = require('fs-extra');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));

const subsetRegex = /\/\* Subset: (\d+) \*\//;
const unicodeRangeRegex = /unicode-range: (.*?)\n/;

const outputDir = path.resolve(__dirname, `./data/unicodes`);

const { i, p, f } = argv;
let collection = `module.exports = [`;

if (p && f && f.includes('.js')) {

  const cssPath = path.resolve(__dirname, `../${p}`);
  const cssContent = fs.readFileSync(cssPath).toString();
  const definitionMatches = cssContent.match(/\/*((.|\n)*?)\}\n/gm);

  definitionMatches.forEach((definition) => {

    const subsetMatches = definition.match(subsetRegex);
    const unicodeRangeMatches = definition.match(unicodeRangeRegex);

    if (subsetMatches && subsetMatches[1] && unicodeRangeMatches && unicodeRangeMatches[1]) {

      collection += 
`{
  type: '${i.toUpperCase()}-${subsetMatches[1]}',
  characters: [${unicodeRangeMatches[1].split(',').map((item) => `'${item.trim()}'`)}]
},\n`;
    }
  });

  collection += `]`;

  fs.outputFileSync(`${outputDir}/${f}`, collection, 'utf8');

  console.log(`File written to: ${outputDir}/${f}`);

} else {

  console.log('Missing one of the arguments [-i XY -p /path/to/file.css -f filename.js]');
  process.exit(1);
}