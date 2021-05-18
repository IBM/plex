# IBM Plex 6.0 Breaking Changes

This release will include an overhaul to the IBM Plex Sass build pipeline. It will leverage Sass modules to allow for totally customized font-face declarations depending on the application's supported languages and font distribution preferences.

1. If your application is using the generated, all-language, all-weight css/sass currently shipped with Plex, there will be guidance on how to refine those styles.

2. If your project is using node-sass, it won't be able to utilize this new tooling. You'll likely want to migrate from node-sass to [Dart Sass](https://sass-lang.com/dart-sass), as node-sass and the library it's based on [are deprecated](https://sass-lang.com/blog/libsass-is-deprecated).

See https://github.com/IBM/plex/issues/370 for 6.0 goals and progress.

## Unreleased

IBM Plex Sans JP
IBM Plex Sans CN
IBM Plex Mono - Addition of glyphs /currency /prime /primedbl

## IBM PLEX SANS ARABIC V1.2 - 2021-02-14

### Added

Glyphs /alefMaksura_zain-ar.fina.rlig /alefMaksura_zain-ar.fina.rlig.short /alefMaksura_jeh-ar.fina.rlig /alefMaksura_jeh-ar.fina.rlig.short /alefMaksura_noon-ar.fina.rlig

### Fixed

Mark placement on alternative form of /kaf
referenced in issue 284
Multiple spacing issues including /lam_meem ligatures
PostScript BlueScale values
FamilyClass value in OS/2 table

### Changed

included logographs are not used by default anymore but can be activated through OpenType layout feature “dlig”
referenced in issue 336
abbreviated font names used for style mapping (name ID1 + ID2) to improve interoperability
Removed
Glyphs /tteh_reh-ar.fina.short /tteh_zain-ar.fina.short /tteh_rreh-ar.fina.short /tteh_jeh-ar.fina.short

## IBM PLEX SANS HEBREW V1.3 - 2020-12-04

### Fixed

placement of dot in glyph /lamed_holam-hb
placement of dot in glyph /lamed_dagesh_holam-hb
metrics of /resh-hb
referenced in issue 343
metrics of /tav-hb
PostScript BlueScale values
FamilyClass value in OS/2 table

### Changed

abbreviated font names used for style mapping (name ID1 + ID2) to improve interoperability

## Generated changelog

- breaking: don't include styles in GH release (99fd503b)
- breaking: update Arabic, changes font name (65703ead)
- breaking: update Hebrew, changes font name (2fd23f1a)
- breaking: begin sass module based build pipeline restructure (2383e47a)

- chore: update release asset generation (1bf46cbe)
- chore: update Arabic source files (1494f456)
- chore: remove unused dep, resolve sec issue (270ee7ad)
- chore: update deps and resolve security warning (2b46ba78)
- chore(deps): bump bl from 4.0.2 to 4.0.3 (4cc1e509)
- chore: remove zip log (eff77345)

# IBM Plex v5.1.0

## [Unreleased]

- IBM Plex Sans JP
- IBM Plex Sans CN
- [IBM Plex Mono] Addition of glyphs /currency /prime /primedbl
- Allow more granular selection of font-families and weights [#329](https://github.com/IBM/plex/issues/329)

## IBM Plex Sans KR Styles

### Added

- CSS stylesheets: `css/ibm-plex-sans-kr.css` and `css/ibm-plex-sans-kr.min.css`
- Sass entrypoint: `scss/sans-kr/index.scss`

Rendering CJK fonts performantly on the web requires many more subsets than western languages. These additional subsets result in many more `font-family` declarations. Adding these declarations to the currently generated stylesheet would cause it to double in size.

For this reason, we've split `IBM Plex Sans KR` off into it's own style sheet. In the future, we'll be exporting similar stylesheets per-language so developers can chose inidividual languages to suit their users.

# Plex v5.0.0

## IBM Plex Sans KR

### Added

- Korean font files

## IBM Plex Sans Condensed

### Added

- glyphs /acaron /acaron.alt01 /icaron /ocaron /ucaron /udieresismacron /udieresisacute /udieresisgrave /udieresiscaron /Acaron /Icaron /Ocaron /Ucaron /Udieresismacron /Udieresisacute /Udieresisgrave /Udieresiscaron to support pinyin
  referenced in issue 84
- glyph /longs
  referenced in issue 158
- glyphs /prime /primedbl
  referenced in issue 145
- glyphs /currency /divisionslash
- OpenType layout feature “subs”
- meta table to all generated otf and ttf font files

### Fixed

- Condensed: correction to PS Font Name fields (name ID 6)
  referenced in #316
- issue that prevented certain OTF fonts to install on Windows
  referenced in issue 161 and issue 268
- certain font names being trimmed in MS Office font menus
  referenced in issue 302
- difference in vertical metrics between certain web browsers
  referenced in issue 254
- errors in PS hint replacement in all files containing PostScript outlines
- various small bugs in contours, spacing and features

### Changed

- abbreviated font names used for style mapping (name ID1 + ID2) to improve interoperability
- replaced commaaccent with cedilla in glyphs /Tcedilla /tcedilla
  referenced in issue 251
- disabled bit 38 (Mathematical Operators) from OS/2 UnicodeRanges
- OpenType layout feature “mark” includes support for combining mark positioning on accented glyphs
  referenced in issue 152

# Plex v4.0.2

## Added

- OpenType layout feature “subs”
- meta table to all generated otf and ttf font files

## Removed

- Glyph /ibmlogo07 (0xEBE7)

## Fixed

- [IBM Plex Sans Hebrew-Text] /samekh (0x05E1) wrong right sidebearing
- Wrong kerning between /vav (0x05D5) /dagesh (0xFB35)
- Small metrics errors in Latin glyphs
- Errors in PS hint replacement in all files containing PostScript outlines

# Plex v4.0.1

## Chore

- removed deprecated `arabic` directory from sass distribution

# Plex v4.0

## Breaking

- Added “Sans” to font family name: “IBM Plex Sans Arabic”

## Fixed

- Set bit 67 (Arabic Presentation Forms B) of UnicodeRanges in OS/2 table

# Plex v3.0

## Breaking

- Added “Sans” to Thai and Devanagari family names: “IBM Plex Sans Thai” and “IBM Plex Sans Devanagari"

## [IBM PLEX SANS THAI V1.1] - 2019-09-10

### Changed

- Synchronised vertical metrics with IBM Plex Sans Thai Looped 1.1

### Removed

- Glyph /ibmlogo07 (0xEBE7)

### Fixed

- Errors in PS hint replacement in all files containing PostScript outlines

## [IBM PLEX SANS DEVANAGARI V1.1] - 2019-07-19

### Fixed

- Certain font info fields in SemiBold style were incorrectly named “Medium”
- Many unbalanced bezier handles in extreme points

# Plex v2.0

## Breaking

- Added "Sans" to font family name: "IBM Plex Sans Thai Looped"

## [IBM PLEX SANS THAI LOOPED V1.1] - 2019-05-21

### Fixed

- Metrics errors in combining marks

## [IBM PLEX THAI LOOPED V1.0] - 2019-03-29

### Added

- Support for Thai (158 glyphs per font)

## [IBM PLEX SANS VAR V1.0] - 2019-03-14

### Added

- IBM Plex Sans in variable font format containing a weight and width axis
  Contains predefined instances for Thin, ExtraLight, Light, Regular, Text, Medium, SemiBold and Bold weights in both normal and Condensed widths.
  Weight axis ranges from 100 (Thin) to 700 (Bold) and width axis ranges from 85 (Condensed) to 100 (Normal)
  Alternate shapes for glyphs /naira (0x20A6) /won (0x20A9) and /fraction (0x2044) are automatically applied in certain weight ranges

## [IBM PLEX ARABIC V1.0] - 2019-02-06

### Added

- Support for Arabic (1312 glyphs per font)

## [IBM PLEX DEVANAGARI V1.0] - 2018-12-05

### Added

- Support for Devanagari (727 glyphs per font)

## [IBM PLEX SANS V3.1] - 2018-11-21

### Added

- OpenType layout feature "subs"
- meta table to all generated otf and ttf font files

### Removed

- Glyph /ibmlogo07 (0xEBE7)

### Changed

- OpenType layout feature "mark" includes support for combining mark positioning on accented glyphs
  Referenced in [issue 152](https://github.com/IBM/plex/issues/152)
- Synchronised vertical metrics settings between hhea and OS/2 table

### Fixed

- Errors in PS hint replacement in all files containing PostScript outlines

## [IBM PLEX THAI V1.0] - 2018-09-06

### Added

- Support for Thai (158 glyphs per font)

## [IBM PLEX SERIF V2.5] - 2018-09-05

### Added

- Glyph /currency (0x00A4)
- Glyph /prime (0x2032)
  Referenced in [issue 145](https://github.com/IBM/plex/issues/145)
- Glyph /primedbl (0x2033)
  Referenced in [issue 145](https://github.com/IBM/plex/issues/145)
- meta table to all generated otf and ttf font files

### Changed

- Width of all glyphs is now 98% of original width to improve pairing with IBM Plex Sans
- Weight of all glyphs has been reduced slightly to improve pairing with IBM Plex Sans
- All ascenders have been made 10 units less tall
- OpenType layout feature "mark" includes support for combining mark positioning on Cyrillic vowels
  Referenced in [issue 155](https://github.com/IBM/plex/issues/155)
- Glyph /gcommaaccent (0x0123) uses /g.alt02 now (instead of /g)
- Glyph /gdotaccent (0x0121) uses /g.alt02 now (instead of /g)
- Synchronised vertical metrics settings between hhea and OS/2 table
- Glyph /ibmlogo07 updated to new version

### Fixed

- Errors in PS hint replacement in all files containing PostScript outlines
- Error in OpenType feature "zero"

## [IBM PLEX SANS HEBREW V1.1] - 2018-06-15

### Fixed

- Errors in mark positioning
- Added license.txt to all folders

## [IBM PLEX SANS HEBREW V1.0] - 2018-06-02

### Added

- Support for Hebrew including cantillation marks (103 glyphs per font)
- OpenType layout feature <locl> offers alternate shapes for standard numerals and /sheqel (0x20AA)

## [IBM PLEX SANS V3.0] - 2018-05-27

### Added

- Support for monotonic Greek (73 glyphs per font)
- Glyph /currency (0x00A4)
- Glyph /prime (0x2032)
  Referenced in [issue 145](https://github.com/IBM/plex/issues/145)
- Glyph /primedbl (0x2033)
  Referenced in [issue 145](https://github.com/IBM/plex/issues/145)

### Changed

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

## [IBM PLEX SANS V2.2] - 2018-12-06

### Added

- IBM Plex Sans Thai

## [IBM PLEX SANS V2.3] - 2018-12-18

### Added

- IBM Plex Sans Devanagari
