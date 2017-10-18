'use strict';

const fallbacks = [
  {
    type: 'mono',
    families: [
      'ibm-plex-mono',
      'Menlo',
      'DejaVu Sans MOno',
      'Bitstream Vera Sans Mono',
      'Courier',
      'monospace',
    ],
  },
  {
    type: 'sans',
    families: [
      'ibm-plex-sans',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ],
  },
  {
    type: 'serif',
    families: [
      'ibm-plex-serif',
      'Georgia',
      'Times',
      'sans-serif',
    ],
  },
];

module.exports = fallbacks;
