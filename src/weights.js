'use strict';

const weights = [
  {
    type: 'Italic',
    mono: true,
    properties: {
      fontStyle: 'italic',
      fontWeight: 400,
    },
  },
  {
    type: 'Light',
    properties: {
      fontStyle: 'normal',
      fontWeight: 300,
    },
  },
  {
    type: 'Light',
    variant: 'Italic',
    properties: {
      fontStyle: 'italic',
      fontWeight: 300,
    },
  },
  {
    type: 'Regular',
    mono: true,
    properties: {
      fontStyle: 'normal',
      fontWeight: 400,
    },
  },
  {
    type: 'SemiBold',
    properties: {
      fontStyle: 'normal',
      fontWeight: 600,
    },
  },
  {
    type: 'SemiBold',
    variant: 'Italic',
    properties: {
      fontStyle: 'italic',
      fontWeight: 600,
    },
  },
];

module.exports = weights;
