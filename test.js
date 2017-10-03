const fs = require('fs');

const fonts = [
  {
    directory: 'mono',
    name: 'IBMPlexMono'
  },
  {
    directory: 'sans',
    name: 'IBMPlexSans'
  }
]

const contexts = {
  desktop: [
    'otf',
    'ttf'
  ],
  web: [
    'eot',
    'woff',
    'woff2'
  ]
}

const types = [
  'Bold',
  'BoldItalic',
  'ExtraLight',
  'ExtraLightItalic',
  'Italic',
  'Light',
  'LightItalic',
  'Medium',
  'MediumItalic',
  'Regular',
  'SemiBold',
  'SemiBoldItalic',
  'Text',
  'TextItalic',
  'Thin',
  'ThinItalic'
];

let currentPath = '';
let missingFiles = [];

for (let font of fonts) {
  for (let context in contexts) {
    for (let extension of contexts[context]) {
      for (let type of types) {
        currentPath = `./dist/fonts/${font.directory}/${context}/${extension}/${font.name}-${type}.${extension}`;

        if (!fs.existsSync(currentPath)) {
          missingFiles.push(currentPath);
        }
      }
    }
  }
}

let result;

if (missingFiles.length > 0) {
  console.error('Error - The following files are missing:')
  console.error(missingFiles);
  console.error('Autodeployment will not work until all files above are accounted for.');
  result = 1;
} else {
  console.log('All files accounted for!');
  result = 0;
}

process.exit(result);
