# IBM Plex® Sans Hebrew

<p align="center">
  <a href="https://www.ibm.com/plex/">
    <img alt="Plex" src="https://i.imgur.com/yB9xz60.jpg" />
  </a>
</p>

## Add the IBM Plex Sans Hebrew typeface to your device

Please download the latest zip files from our [releases page](https://github.com/IBM/plex/releases) for installation.

## Web usage

This project contains the following for web development:

- IBM Plex .woff2 and .woff files split into performant subsets of glyphs
- Cascading style sheet (CSS) code to reference any weight, variant and split
- Sass (SCSS) modules for more granular configuration and control of output css

We only include .woff2 and .woff files due to NPM package size limitation.

Installation with [Node.js®](https://nodejs.org/en/):

```
npm install @ibm/plex-sans-hebrew
```

Manually installing the files for web development can be done by downloading the latest web zip from our [releases page](https://github.com/IBM/plex/releases).

Developers using the CSS files should keep the directory structure as is, so the font files will be found. If you’re importing the SCSS files, you can set the path of the font files by declaring `$font-prefix: 'font-path-prefix'` inside the `@use`. For example:

```scss
@use '@ibm/plex-sans-hebrew/scss' as PlexSansHebrew with (
  $font-prefix: 'font-path'
);

@include PlexSansHebrew.all();
```

### Font weights

We provide two ways of importing weights into your project. Using `PlexSansHebrew.all()` will import all available weights and `PlexSansHebrew.default()` will import only `light`, `regular` and `semibold` weight. You can also `disable` unwanted weights inside the `@use`. For example:

```scss
// Disable weights
@use '@ibm/plex-sans-hebrew/scss' as PlexSansHebrew with (
  $font-weights: (
    bold: false,
    extralight: false,
    light: false,
    medium: false,
    regular: false,
    semibold: false,
    text: false,
    thin: false,
  )
);

@include PlexSansHebrew.all();
```

IBM Plex Sans Hebrew typeface weights map:

| Weight     | Enabled by default with | PlexSansHebrew.all() | PlexSansHebrew.default() |
| ---------- | ----------------------- | -------------------- | ------------------------ |
| bold       |                         | ✅                   | ✅                       |
| extralight |                         | ✅                   | ❌                       |
| light      |                         | ✅                   | ❌                       |
| medium     |                         | ✅                   | ❌                       |
| regular    |                         | ✅                   | ✅                       |
| semibold   |                         | ✅                   | ✅                       |
| text       |                         | ✅                   | ❌                       |
| thin       |                         | ✅                   | ❌                       |

Below are the `font-family` rules for the family:

```css
font-family: 'IBM Plex Sans Hebrew';
```

## Building the fonts from source

### Requirements

To build binary font files from .vfb sources you need [FontLab Studio 5](https://www.fontlab.com). A Python script called `IBM Plex export FDK files.py` is necessary to export the proper files from FontLab. To run this script you’ll need the [RoboFab](https://github.com/robofab-developers/robofab) library. Also, you’ll need to have the [Adobe Font Development Kit for OpenType](http://www.adobe.com/devnet/opentype/afdko.html) (AFDKO) installed.

### Building one font

From FontLab, run `IBM Plex export FDK files.py` and choose a directory with IBM Plex .vfb source files. The script will create a new directory called `fdk` in which subdirectories are created for every font. The script will export files necessary for AFDKO in those subdirectories.

Subsequently, OpenType Fonts (OTFs) or TrueType Fonts (TTFs) can be generated from the command line using `makeotf`, which is part of the AFDKO toolset. Information and usage instructions can be found by executing `makeotf -h`.

## <picture><source height="20" width="20" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-dark.svg"><source height="20" width="20" media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"><img height="20" width="20" alt="IBM Telemetry" src="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"></picture> IBM Telemetry

This package uses IBM Telemetry to collect de-identified and anonymized metrics data. By installing
this package as a dependency you are agreeing to telemetry collection. To opt out, see
[Opting out of IBM Telemetry data collection](https://github.com/ibm-telemetry/telemetry-js/tree/main#opting-out-of-ibm-telemetry-data-collection).
For more information on the data being collected, please see the
[IBM Telemetry documentation](https://github.com/ibm-telemetry/telemetry-js/tree/main#ibm-telemetry-collection-basics).
