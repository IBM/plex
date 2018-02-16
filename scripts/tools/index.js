"use strict";

/**
 * Often times, we generate a filename by creating an array of each part of the
 * path for the filename and then we need to clean it up using this function.
 *
 * Here, `formatFilename` gets rid of false-y values and normalizes each part
 * of the path before joining them with the '/' separator.
 */
const formatFilename = array =>
  array.filter(Boolean).map(string => string.toLowerCase()).join("/");

exports.formatFilename = formatFilename;

/**
 * `createFontFace` is used to generate the actual `@font-face` declarations
 * that get written to the appropriate files.
 */
const createFontFace = (filename, family, weight, unicode) => {
  const fontFileName = [
    `IBMPlex${family.type.replace(" ", "")}`,
    weight.variant ? weight.type + weight.variant : weight.type,
    unicode.type
  ]
    .filter(Boolean)
    .join("-");
  const localFileName = [
    `IBM Plex ${family.type}`,
    weight.type !== "Regular" &&
      (weight.variant ? weight.type + " " + weight.variant : weight.type)
  ]
    .filter(Boolean)
    .join(" ");
  const localPostscriptName = [
    `IBMPlex${family.type.replace(" ", "")}`,
    weight.type !== "Regular" &&
      (weight.variant ? "-" + weight.type + weight.variant : "-" + weight.type)
  ]
    .filter(Boolean)
    .join("");

  const urls = {
    woff2: `#{$font-prefix}/IBM-Plex-${family.type.replace(" ", "-")}/fonts/split/woff2/${fontFileName}.woff2`,
    woff: `#{$font-prefix}/IBM-Plex-${family.type.replace(" ", "-")}/fonts/split/woff/${fontFileName}.woff`
  };

  return `@font-face {
  font-family: '${family.name}';
  font-style: ${weight.properties.fontStyle};
  font-weight: ${weight.properties.fontWeight};
  src: local('${localFileName}'),
    local('${localPostscriptName}'),
    url('${urls.woff2}') format('woff2'),
    url('${urls.woff}') format('woff');
  unicode-range: '${unicode.characters.join(", ")}';
}
`;
};

exports.createFontFace = createFontFace;
