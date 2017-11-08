'use strict';

const weights = [
  {
    type: 'Italic',
    mono: true,
    properties: {
      fontStyle: 'italic',
      fontWeight: 400,
    },
    selector: 'ibm-type-italic',
  },
  {
    type: 'Light',
    properties: {
      fontStyle: 'normal',
      fontWeight: 300,
    },
    selector: 'ibm-type-light',
  },
  {
    type: 'Light',
    variant: 'Italic',
    properties: {
      fontStyle: 'italic',
      fontWeight: 300,
    },
    selector: 'ibm-type-light ibm-type-italic',
  },
  {
    type: 'Regular',
    mono: true,
    properties: {
      fontStyle: 'normal',
      fontWeight: 400,
    },
    selector: 'ibm-type-regular',
  },
  {
    type: 'SemiBold',
    properties: {
      fontStyle: 'normal',
      fontWeight: 600,
    },
    selector: 'ibm-type-semibold',
  },
  {
    type: 'SemiBold',
    variant: 'Italic',
    properties: {
      fontStyle: 'italic',
      fontWeight: 600,
    },
    selector: 'ibm-type-semibold ibm-type-italic',
  },
];

module.exports = weights;
