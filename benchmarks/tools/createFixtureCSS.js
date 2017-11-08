'use strict';

const path = require('path');
const sass = require('node-sass');

const defaultOptions = {
  includePaths: [path.resolve(__dirname, '../../src/styles')],
};

const createFixtureCSS = ({ family, weight, unicode }) => {
  const fontImport = [
    family.type,
    weight && weight.type,
    weight && weight.variant,
    unicode ? `${unicode.type}.scss` : 'index',
  ]
    .filter(Boolean)
    .map(string => string.toLowerCase())
    .join('/');

  const partialData = `$publicPath: '/';
@import '../../src/styles/variables';
@import '../../src/styles/functions';
@import '../../src/styles/mixins';
@import '../../src/styles/${fontImport}';

body {
  font-size: #{$base-unit}px;

  &.ibm-type-serif,
  .ibm-type-serif {
    font-size: #{$base-unit - 1}px;
  }
}

@each $name, $prescription in $ibm-type-prescription-map {
  .ibm-type-#{$name} {
    @include typePrescription($prescription);
  }
}

.ibm,
[class*='ibm-type'] {
  font-family: map-get($fallbacks, 'Sans');
}

[class*='ibm-type'] {
  margin-top: 0;
}

.ibm-type-italic {
  font-style: italic;
}

.ibm-type-light {
  font-weight: 300;
}

code,
.ibm-type-mono,
.ibm-type-mono * {
  font-family: map-get($fallbacks, 'Mono');
}

.ibm-type-regular {
  font-weight: 400;
}

strong,
.ibm-type-semibold {
  font-weight: 600;
}

.ibm-type-serif,
.ibm-type-serif * {
  font-family: map-get($fallbacks, 'Serif');
}
`;

  return sass
    .renderSync({
      ...defaultOptions,
      data: partialData,
    })
    .css.toString();
};

module.exports = createFixtureCSS;
