const koreanUnicodeRanges = require('./unicodes/korean');
const japaneseUnicodeRanges = require('./unicodes/japanese');

const families = [
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
    type: 'Serif',
    name: 'IBM Plex Serif',
    hasItalic: true,
    unicodes: ['Latin1', 'Latin2', 'Latin3', 'Pi', 'Cyrillic'],
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
    ownStyleSheet: true,
    hinted: true,
    hasItalic: false,
    unicodes: koreanUnicodeRanges.map(({ type }) => type),
  },
  {
    type: 'Sans JP',
    name: 'IBM Plex Sans JP',
    ownStyleSheet: true,
    hinted: true,
    hasItalic: false,
    unicodes: japaneseUnicodeRanges.map(({ type }) => type),
  },
];

module.exports = families;
