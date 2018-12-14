'use strict';

const families = [
  {
    type: 'Mono',
    name: 'IBM Plex Mono',
    unicodes: ['Latin1', 'Latin2', 'Latin3', 'Pi', 'Cyrillic'],
  },
  {
    type: 'Sans',
    name: 'IBM Plex Sans',
    unicodes: ['Latin1', 'Latin2', 'Latin3', 'Pi', 'Cyrillic', 'Greek'],
  },
  {
    type: 'Sans Condensed',
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
    type: 'Devanagari',
    name: 'IBM Plex Devanagari',
    hasItalic: false,
    unicodes: [],
  },
  {
    type: 'Thai',
    name: 'IBM Plex Thai',
    hasItalic: false,
    unicodes: [],
  },
  {
    type: 'Serif',
    name: 'IBM Plex Serif',
    unicodes: ['Latin1', 'Latin2', 'Latin3', 'Pi', 'Cyrillic'],
  },
];

module.exports = families;
