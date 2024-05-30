/**
 * `createUnicodes` is used to generate the actual `unicodes` sass helper
 */

const createUnicodes = (unicodes) => {

  let fileContent = `@use 'sass:map';\n\n$ranges: (\n`;

  fileContent += unicodes.map(({ type, characters }, index) => {

    return `\t'${type}': (\n${characters.map(ch => `\t\t${ch}`).join(',\n')}\n\t)${index === unicodes.length - 1 ? '' : ','}`
  })
  .join('\n');

  fileContent += `\n);`;

  return fileContent;
};

exports.createUnicodes = createUnicodes;

/**
 * `createTools` is used to generate the actual `tools` sass helpers
 */
const createTools = (unicodes) => {

  let fileContent = `@use 'sass:map';\n`;

  if (unicodes) {

    fileContent += `@use "sass:string";\n@use '../unicodes/' as unicodes;\n\n`;
    fileContent += `@function get-range($name) {\n\t@if map.has-key(unicodes.$ranges, $name) {\n\t\t@return map.get(unicodes.$ranges, $name);\n\t}\n\t@error 'Unable to find range with the name: #{$name}';\n}\n\n`;
    fileContent += `@function split-range($name) {\n\t$index: string.index($name, '-');\n\t@if $index != null {\n\t\t@return string.slice($name, $index + 1);\n\t}\n\t@return $name;\n}\n`;
  }

  fileContent += `\n@function enabled($font-weights, $weight) {\n\t@if map.has-key($font-weights, $weight) {\n\t\t@return map.get($font-weights, $weight);\n\t}\n\t@return false;\n}`;

  return fileContent;
};

exports.createTools = createTools;

/**
 * `createEntryScss` is used to generate entry scss file 
 */
const createEntryScss = (weights, unicodes) => {

  const fontWeightsListAll = [];
  const fontWeightsListDefault = ['light', 'regular', 'semibold'];

  let fileContent = `@use 'sass:map';\n@use './tools/' as tools;\n\n`;

  fileContent += weights.map((weight) => {

    const italic = weight.variant === 'Italic' || weight.type === 'Italic';
    const normalizeWeight = weight.type.toLowerCase();

    if (italic) {

      fontWeightsListAll.push(normalizeWeight === 'italic' ? `\t${normalizeWeight}: true` : `\t${normalizeWeight}Italic: true`);

      return normalizeWeight === 'italic' ? 
        `@use '${normalizeWeight}/index' as ${normalizeWeight};`:
        `@use '${normalizeWeight}/italic/index' as ${normalizeWeight}Italic;`

    } else {

      fontWeightsListAll.push(`\t${normalizeWeight}: true`);

      return `@use '${normalizeWeight}/index' as ${normalizeWeight};`;
    }
  }).join('\n');

  const fontWeightsList = fontWeightsListAll.map((weight) => weight.split(': true')[0].trim());

  fileContent += `\n\n$font-prefix: '..' !default;\n`;
  fileContent += unicodes ? `$unicode-ranges: (${unicodes.map((range) => `'${range}'`).join(',')});\n` : '';
  fileContent += `$-font-weights: (\n${fontWeightsListAll.join(',\n')}\n);\n`;
  fileContent += `$font-weights: () !default;\n$font-weights: map.merge($-font-weights, $font-weights);\n\n`;

  fileContent += `@mixin all($font-prefix: $font-prefix${unicodes ? ', $unicode-ranges: $unicode-ranges' : ''}) {\n`;
  fileContent += fontWeightsList.map((weight) => {

    return `\t@if tools.enabled($font-weights, '${weight}') {\n\t\t@include ${weight}.all($font-prefix${unicodes ? ', $unicode-ranges' : ''});\n\t}\n`;
  }).join('\n');
  fileContent += `}\n\n`;

  fileContent += `@mixin default($font-prefix: $font-prefix${unicodes ? ', $unicode-ranges: $unicode-ranges' : ''}) {\n`;
  fileContent += fontWeightsList.map((weight) => {

    return fontWeightsListDefault.includes(weight) ? `\t@if tools.enabled($font-weights, '${weight}') {\n\t\t@include ${weight}.all($font-prefix${unicodes ? ', $unicode-ranges' : ''});\n\t}\n` : false;
  }).filter(Boolean).join('\n');
  fileContent += `}`;

  return fileContent;
};

exports.createEntryScss = createEntryScss;

/**
 * `createTemporaryScss` is used to generate temporary scss file used to generate css
 */
const createTemporaryScss = () => {

  let fileContent = `@use './index.scss' as family;\n@include family.all();`;

  return fileContent;
}

exports.createTemporaryScss = createTemporaryScss;

/**
 * `creatWeightScss` is used to generate partial scss files for weights and unicode ranges if available
 */
const creatWeightScss = (weight, family, unicodes, dir) => {

  const root = family.preferredName || family.type;
  const italic = weight.variant === 'Italic' || weight.type === 'Italic';
  const normalizeWeight = weight.type.toLowerCase();
  let weightType = weight.type;

  const mixinNames = {
    complete: '',
    split: ''
  };
  const fontFileName = [`IBMPlex${root.split(' ').join('')}`, weight.variant ? weight.type + weight.variant : weight.type, unicodes ? `#{$unicode-range}` : ''].filter(Boolean).join('-');
  const localFileName = [`IBM Plex ${family.type}`, weightType !== 'Regular' && (weight.variant ? `${weightType} ${weight.variant}` : weightType)].filter(Boolean).join(' ');
  const localPostscriptName = [`IBMPlex${family.type.split(' ').join('')}`, weightType !== 'Regular' && (weight.variant ? `-${weightType}${weight.variant}` : `-${weightType}`)].filter(Boolean).join('');
  const urls = {
    woff: `#{$font-prefix}/fonts/complete/woff/${family.hinted ? 'hinted/' : ''}${fontFileName}.woff`,
    woff2Split: `#{$font-prefix}/fonts/split/woff2/${family.hinted ? 'hinted/' : ''}${fontFileName}.woff2`,
    woff2Complete: `#{$font-prefix}/fonts/complete/woff2/${family.hinted ? 'hinted/' : ''}${fontFileName}.woff2`
  };

  let filename = `${dir}/`;
  let fileContent = italic ? (normalizeWeight === 'italic' ? `@use '../tools' as tools;\n\n` : `@use '../../tools' as tools;\n\n`) : `@use '../tools' as tools;\n\n`;

  if (weight.properties.truncatedType) {

    weightType = weight.properties.truncatedType;
  }

  if (italic) {

    mixinNames.complete = normalizeWeight === 'italic' ? `${normalizeWeight}Complete` : `${normalizeWeight}ItalicComplete`;

    filename += normalizeWeight === 'italic' ? `${normalizeWeight}/_index.scss` : `${normalizeWeight}/italic/_index.scss`;
    fileContent += normalizeWeight === 'italic' ? `@mixin ${normalizeWeight}Complete($font-prefix: $font-prefix) {\n` : `@mixin ${normalizeWeight}ItalicComplete($font-prefix: $font-prefix) {\n`;

  } else {

    mixinNames.complete = `${normalizeWeight}Complete`;

    filename += `${normalizeWeight}/_index.scss`;
    fileContent += `@mixin ${normalizeWeight}Complete($font-prefix: $font-prefix) {\n`;
  }

  fileContent += `\t@font-face {\n`;
  fileContent += `\t\tfont-family: '${family.name}';\n`;
  fileContent += `\t\tfont-style: ${weight.properties.fontStyle};\n`;
  fileContent += `\t\tfont-weight: ${weight.properties.fontWeight};\n`;
  fileContent += `\t\tsrc: local('${localFileName}'), local('${localPostscriptName}'), url('${urls.woff2Complete.replace('-#{$unicode-range}', '')}') format('woff2'), url('${urls.woff.replace('-#{$unicode-range}', '')}') format('woff');\n`;
  fileContent += `\t}\n}`;

  if (unicodes) {

    fileContent += `\n\n`;

    if (italic) {

      mixinNames.split = normalizeWeight === 'italic' ? `${normalizeWeight}Split` : `${normalizeWeight}ItalicSplit`;
      fileContent += normalizeWeight === 'italic' ? `@mixin ${normalizeWeight}Split($font-prefix: $font-prefix, $unicode-ranges: $unicode-ranges) {\n` : `@mixin ${normalizeWeight}ItalicSplit($font-prefix: $font-prefix, $unicode-ranges: $unicode-ranges) {\n`;
  
    } else {
  
      mixinNames.split = `${normalizeWeight}Split`;
      fileContent += `@mixin ${normalizeWeight}Split($font-prefix: $font-prefix, $unicode-ranges: $unicode-ranges) {\n`;
    }

    fileContent += `\t@each $unicode-range in $unicode-ranges {\n`;
    fileContent += `\t\t@font-face {\n`;
    fileContent += `\t\t\tfont-family: '${family.name}';\n`;
    fileContent += `\t\t\tfont-style: ${weight.properties.fontStyle};\n`;
    fileContent += `\t\t\tfont-weight: ${weight.properties.fontWeight};\n`;
    fileContent += `\t\t\tsrc: local('${localFileName}'), local('${localPostscriptName}'), url('${urls.woff2Split.replace('-#{$unicode-range}', '-#{tools.split-range($unicode-range)}')}') format('woff2');\n`;
    fileContent += `\t\t\tunicode-range: tools.get-range($unicode-range);\n`;
    fileContent += `\t\t}\t}\n}`;
  }

  fileContent += `\n\n@mixin all($font-prefix: $font-prefix${unicodes ? ', $unicode-ranges: $unicode-ranges' : ''}) {\n`;
  fileContent += `\t@include ${mixinNames.complete}($font-prefix);\n`
  fileContent += unicodes ? `\t@include ${mixinNames.split}($font-prefix, $unicode-ranges);\n}` : `}`;

  return {
    partialScssFilename: filename,
    partialScssFileContent: fileContent
  }
}

exports.creatWeightScss = creatWeightScss;