const koreanUnicodeRanges = require('./unicodes/korean');

const families = [
  {
    type: 'Serif',
    name: 'IBM Plex Serif',
    hasItalic: true,
    unicodes: ['Latin1', 'Latin2', 'Latin3', 'Pi', 'Cyrillic'],
  },
  {
    type: 'Mono',
    name: 'IBM Plex Mono',
    hasItalic: true,
    unicodes: ['Latin1', 'Latin2', 'Latin3', 'Pi', 'Cyrillic'],
  },
  {
    type: 'Sans',
    name: 'IBM Plex Sans',
    hasItalic: true,
    unicodes: ['Latin1', 'Latin2', 'Latin3', 'Pi', 'Cyrillic', 'Greek'],
  },
  {
    type: 'Sans Cond',
    preferredName: 'Sans Condensed',
    truncatedType: true,
    hasItalic: true,
    name: 'IBM Plex Sans Condensed',
    unicodes: ['Latin1', 'Latin2', 'Latin3', 'Pi'],
  },
  {
    type: 'Sans Hebrew',
    name: 'IBM Plex Sans Hebrew',
    hasItalic: false,
    unicodes: [],
  },
  {
    type: 'Sans Devanagari',
    name: 'IBM Plex Sans Devanagari',
    hasItalic: false,
    unicodes: [],
  },
  {
    type: 'Sans Thai',
    name: 'IBM Plex Sans Thai',
    hasItalic: false,
    unicodes: [],
  },
  {
    type: 'Sans Thai Looped',
    name: 'IBM Plex Sans Thai Looped',
    hasItalic: false,
    unicodes: [],
  },
  {
    type: 'Sans Arabic',
    name: 'IBM Plex Sans Arabic',
    hasItalic: false,
    unicodes: [],
  },
  {
    type: 'Sans KR',
    name: 'IBM Plex Sans KR',
    excludedWeights: ['Thin'],
    ownStyleSheet: true,
    hinted: true,
    hasItalic: false,
    unicodes: koreanUnicodeRanges.map(({ type }) => type),
  },
];

module.exports = families;
