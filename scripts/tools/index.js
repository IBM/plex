'use strict';

/**
 * Often times, we generate a filename by creating an array of each part of the
 * path for the filename and then we need to clean it up using this function.
 *
 * Here, `formatFilename` gets rid of false-y values and normalizes each part
 * of the path before joining them with the '/' separator.
 */
const formatFilename = array =>
  array
    .filter(Boolean)
    .map(string => string.toLowerCase())
    .join('/');

exports.formatFilename = formatFilename;

/**
 * `createFontFace` is used to generate the actual `@font-face` declarations
 * that get written to the appropriate files.
 */
const createFontFace = (filename, family, weight, unicode) => {
  const fontFileName = [
    `IBMPlex${family.type}`,
    weight.variant ? weight.type + weight.variant : weight.type,
    unicode.type,
  ]
    .filter(Boolean)
    .join('-');

  const urls = {
    woff2: `../fonts/${family.type}/web/woff2/${fontFileName}.woff2`,
    woff: `../fonts/${family.type}/web/woff/${fontFileName}.woff`,
  };

  return `@font-face {
  font-family: '${family.name}';
  font-style: ${weight.properties.fontStyle};
  font-weight: ${weight.properties.fontWeight};
  src: url('${urls.woff2}') format('woff2'),
    url('${urls.woff}') format('woff');
  unicode-range: '${unicode.characters.join(', ')}';
}
`;
};

exports.createFontFace = createFontFace;
