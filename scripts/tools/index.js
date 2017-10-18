'use strict';

const path = require('path');

const formatFilename = array => array
  .filter(Boolean)
  .map(string => string.toLowerCase())
  .join('/');

exports.formatFilename = formatFilename;

const createFontFace = (
  filename,
  fontDirectory,
  family,
  weight,
  unicode
) => {
  const fontFileName = [
    `IBMPlex${family.type}`,
    weight.variant
      ? weight.type + weight.variant
      : weight.type,
    unicode.type,
  ].filter(Boolean).join('-');
  const relativePath = path.relative(filename, fontDirectory);

  const urls = {
    woff2: `${relativePath}/${family.type}/web/woff2/${fontFileName}.woff2`,
    woff: `${relativePath}/${family.type}/web/woff/${fontFileName}.woff`,
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
