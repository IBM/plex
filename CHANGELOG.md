# Changelog for IBM Plex
All notable changes to the IBM Plex typeface family will be documented in this file.


## [Unreleased]
- IBM Plex Sans Hebrew
- IBM Plex Sans Thai
- IBM Plex Sans Devanagari
- IBM Plex Sans Arabic
- IBM Plex CJK
- [IBM Plex Mono] Addition of glyphs /currency /prime /primedbl
- [IBM Plex Sans Condensed] Bug that prevents OTF versions of certain members to be installed on Windows
  Referenced in [issue 161](https://github.com/IBM/plex/issues/161)
- [IBM Plex Sans Condensed] Addition of glyphs /currency /prime /primedbl
- [IBM Plex Serif] Addition of glyphs /currency /prime /primedbl


## [IBM PLEX SANS V3.0] - 2018-05-27
### Added
- Support for monotonic Greek (73 glyphs per font)
- Glyph /currency (0x00A4)
- Glyph /prime (0x2032)
  Referenced in [issue 145](https://github.com/IBM/plex/issues/145)
- Glyph /primedbl (0x2033)
  Referenced in [issue 145](https://github.com/IBM/plex/issues/145)

### Changed
- TrueType hinting for many glyphs has been refined. Thanks to Mike Duggan at Microsoft for reporting some!
- OpenType layout feature <mark> includes support for combining mark positioning on Cyrillic vowels
  Referenced in [issue 155](https://github.com/IBM/plex/issues/155)
- OpenType layout feature <mark> includes support for combining mark positioning on Greek vowels
- OpenType layout feature <ss01> includes alternate shape for Greek lowercase letter /alpha and related glyphs
- OpenType layout feature <salt> includes alternate shape for Greek lowercase letter /alpha and related glyphs
- Glyph /gcommaaccent (0x0123) uses /g.alt02 now (instead of /g)
- Glyph /gdotaccent (0x0121) uses /g.alt02 now (instead of /g)

### Fixed
- Errors in PS hint replacement in all files containing PostScript outlines
- Various small errors in mark positioning
- Various small errors in symmetry of shapes
- Various small errors in metrics



## [IBM PLEX SANS V2.1] - 2018-02-18
### Removed
- Glyph /ibmlogo01 (0xEBE1)
- Glyph /ibmlogo03 (0xEBE3)
- Glyph /ibmlogo04 (0xEBE4)
- Glyph /ibmlogo06 (0xEBE6)



## [IBM PLEX SANS CONDENSED V1.1] - 2018-02-18
### Added
- PS common stem info to all files containing PostScript outlines

### Removed
- Glyph /ibmlogo01 (0xEBE1)
- Glyph /ibmlogo03 (0xEBE3)
- Glyph /ibmlogo04 (0xEBE4)
- Glyph /ibmlogo06 (0xEBE6)



## [IBM PLEX SERIF V2.1] - 2018-02-18
### Added
- Glyph /checkmark (0x2713) to IBM Plex Serif ExtraLight Italic (TrueType)
- Glyph /crossmark (0x274C) to IBM Plex Serif ExtraLight Italic (TrueType)
- Glyph /arrowleftarrowright (0x21C6) to IBM Plex Serif ExtraLight Italic (TrueType)
- Glyph /arrowrightarrowleft (0x21C4) to IBM Plex Serif ExtraLight Italic (TrueType)
- Glyph /arrowleftright (0x2194) to IBM Plex Serif ExtraLight Italic (TrueType)
- Glyph /arrowupdown (0x2195) to IBM Plex Serif ExtraLight Italic (TrueType)

### Removed
- Glyph /ibmlogo01 (0xEBE1)
- Glyph /ibmlogo03 (0xEBE3)
- Glyph /ibmlogo04 (0xEBE4)
- Glyph /ibmlogo06 (0xEBE6)
