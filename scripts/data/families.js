const koreanUnicodeRanges = require('./unicodes/korean');
const japaneseUnicodeRanges = require('./unicodes/japanese');
const chinesetcUnicodeRanges = require('./unicodes/chinesetc');
const chinesescUnicodeRanges = require('./unicodes/chinesesc');
const serifUnicodeRanges = require('./unicodes/serif');

const families = [
  {
    type: 'Mono',
    name: 'IBM Plex Mono',
    packageName: 'plex-mono',
    hasItalic: true,
    unicodes: ['Latin1', 'Latin2', 'Latin3', 'Pi', 'Cyrillic'],
  },
  {
    type: 'Sans',
    name: 'IBM Plex Sans',
    packageName: 'plex-sans',
    hasItalic: true,
    unicodes: ['Latin1', 'Latin2', 'Latin3', 'Pi', 'Cyrillic', 'Greek'],
  },
  {
    type: 'Sans Cond',
    preferredName: 'Sans Condensed',
    hasItalic: true,
    name: 'IBM Plex Sans Condensed',
    packageName: 'plex-sans-condensed',
    unicodes: ['Latin1', 'Latin2', 'Latin3', 'Pi'],
  },
  {
    type: 'Sans Hebrew',
    name: 'IBM Plex Sans Hebrew',
    packageName: 'plex-sans-hebrew',
    hasItalic: false,
    unicodes: [],
  },
  {
    type: 'Sans Devanagari',
    name: 'IBM Plex Sans Devanagari',
    packageName: 'plex-sans-devanagari',
    hasItalic: false,
    unicodes: [],
  },
  {
    type: 'Sans Thai',
    name: 'IBM Plex Sans Thai',
    packageName: 'plex-sans-thai',
    hasItalic: false,
    unicodes: [],
  },
  {
    type: 'Sans Thai Looped',
    name: 'IBM Plex Sans Thai Looped',
    packageName: 'plex-sans-thai-looped',
    hasItalic: false,
    unicodes: [],
  },
  {
    type: 'Serif',
    name: 'IBM Plex Serif',
    packageName: 'plex-serif',
    hasItalic: true,
    unicodes: serifUnicodeRanges.map(({ type }) => type),
  },
  {
    type: 'Sans Arabic',
    name: 'IBM Plex Sans Arabic',
    packageName: 'plex-sans-arabic',
    hasItalic: false,
    unicodes: [],
  },
  {
    type: 'Sans KR',
    name: 'IBM Plex Sans KR',
    packageName: 'plex-sans-kr',
    hinted: true,
    hasItalic: false,
    unicodes: koreanUnicodeRanges.map(({ type }) => type),
  },
  {
    type: 'Sans JP',
    name: 'IBM Plex Sans JP',
    packageName: 'plex-sans-jp',
    hinted: true,
    hasItalic: false,
    unicodes: japaneseUnicodeRanges.map(({ type }) => type),
  },
  {
    type: 'Sans TC',
    name: 'IBM Plex Sans TC',
    packageName: 'plex-sans-tc',
    hinted: true,
    hasItalic: false,
    unicodes: chinesetcUnicodeRanges.map(({ type }) => type),
  },
  {
    type: 'Sans SC',
    name: 'IBM Plex Sans SC',
    packageName: 'plex-sans-sc',
    hinted: true,
    hasItalic: false,
    unicodes: chinesescUnicodeRanges.map(({ type }) => type),
  },
  {
    type: 'Math',
    name: 'IBM Plex Math',
    packageName: 'plex-math',
    hasItalic: false,
    unicodes: [],
    weights: ['Regular'],
  },
];

module.exports = families;
