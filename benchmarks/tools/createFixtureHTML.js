'use strict';

const defaultSample = 'IBM Type';

const getContent = unicode => {
  if (unicode === undefined) {
    return defaultSample;
  }
  return defaultSample;
};

const getObserversFor = (family, weight) => {
  const options = {};

  if (weight) {
    options.weight = weight.properties.fontWeight;
    if (weight.variant) {
      options.style = weight.properties.fontStyle;
    }

    return `const font = new FontFaceObserver('${family.name}', ${JSON.stringify(
      options
    )});`;
  }

  return `const font = new FontFaceObserver('${family.name}');`;
};

const createFixtureHTML = ({ family, weight, unicode }) => {
  // If we have a family, apply the appropriate selector to the sample
  // If we have a weight, apply the appropriate selector to the sample
  // If we have a unicode, test only in that range

  const selector = [family.selector, weight && weight.selector]
    .filter(Boolean)
    .join(' ');
  const observers = getObserversFor(family, weight);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${family.type} Benchmark</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <p class="${selector}">${getContent(unicode)}</p>
  <script src="https://unpkg.com/fontfaceobserver@2.0.13/fontfaceobserver.standalone.js"></script>
  <script>
    performance.mark('font-load-start');
    // Measure logic
    ${observers}
    font.load()
      .then(() => {
        performance.mark('font-load-end');
        performance.measure(
          'font-load',
          'font-load-start',
          'font-load-end'
        );
      });
  </script>
</body>
</html>
`;
};

module.exports = createFixtureHTML;
