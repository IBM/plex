"use strict";

const unicodes = [
  {
    type: "Latin1",
    characters: [
      "U+0000-00FF",
      "U+0131",
      "U+0152-0153",
      "U+02C6",
      "U+02DA",
      "U+02DC",
      "U+2000-206F",
      "U+20AC",
      "U+2122",
      "U+2212",
      "U+FB01-FB02"
    ]
  },
  {
    type: "Latin2",
    characters: [
      "U+0100-024F",
      "U+0259",
      "U+1E00-1EFF",
      "U+20A0-20AB",
      "U+20AD-20CF",
      "U+2C60-2C7F",
      "U+A720-A7FF",
      "U+FB01-FB02"
    ]
  },
  {
    type: "Latin3",
    characters: ["U+0102-0103", "U+1EA0-1EF9", "U+20AB"]
  },
  {
    type: "Pi",
    characters: [
      "U+03C0",
      "U+0E3F",
      "U+2070",
      "U+2074-2079",
      "U+2080-2089",
      "U+2113",
      "U+2116",
      "U+2126",
      "U+212E",
      "U+2150-2151",
      "U+2153-215E",
      "U+2190-2199",
      "U+21A9-21AA",
      "U+21B0-21B3",
      "U+21B6-21B7",
      "U+21BA-21BB",
      "U+21C4",
      "U+21C6",
      "U+2202",
      "U+2206",
      "U+220F",
      "U+2211",
      "U+221A",
      "U+221E",
      "U+222B",
      "U+2248",
      "U+2260",
      "U+2264-2265",
      "U+25CA",
      "U+2713",
      "U+274C",
      "U+2B0E-2B11",
      "U+EBE1",
      "U+EBE3-EBE4",
      "U+EBE6-EBE7",
      "U+ECE0",
      "U+EFCC"
    ]
  },
  {
    type: "Cyrillic",
    characters: [
      "U+0400-045F",
      "U+0472-0473",
      "U+0490-049D",
      "U+04A0-04A5",
      "U+04AA-04AB",
      "U+04AE-04B3",
      "U+04B6-04BB",
      "U+04C0-04C2",
      "U+04CF-04D9",
      "U+04DC-04DF",
      "U+04E2-04E9",
      "U+04EE-04F5",
      "U+04F8-04F9"
    ]
  }
];

module.exports = unicodes;
