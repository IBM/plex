# IBM Plex® typeface

<p align="center">
  <a href="https://www.ibm.com/plex/">
    <img alt="Plex" src="https://i.imgur.com/yB9xz60.jpg" />
  </a>
</p>

Meet the IBM Plex® typeface, our new corporate typeface family. It’s global, it’s versatile and it’s distinctly IBM.

We designed the IBM Plex typeface carefully to both meet our needs as a global tech company and express who we are as IBMers. It took two years and a lot of work to get here, but today we have a signature typeface we’re proud and excited to share with the world. Discover more about our development of the [IBM Plex typeface](https://www.ibm.com/plex/).

The IBM Plex typeface is an open-source project and available for download and use following the Open Font License (OFL). The IBM Plex family comes in Sans, Serif, Mono and Sans Condensed, all with roman and true italics. The fonts have been designed to work well in user interface (UI) environments, as well as other mediums. This project provides all source files and file formats to support most typographical situations. Currently, IBM Plex Sans supports Extended Latin, Arabic, Cyrillic, Devanagari, Greek, Hebrew, Korean and Thai. Japanese and Chinese will follow in 2021 and 2022.

Thanks for trying the IBM Plex typeface! We hope you like it.



## Add the IBM Plex typeface to your device

Please download the latest zip files from our [releases page](https://github.com/IBM/plex/releases) for installation.

## Web usage

This project contains the following for web development:

- IBM Plex .woff2 and .woff files split into performant subsets of glyphs
- Cascading style sheet (CSS) code to reference any weight, variant and split
- Sassy CSS (SCSS) code partials down to each weight, variant and split

We also include whole .woff2, .woff, and .eot files. However, we recommend using the prescribed split strategy for performance.

Installation with [Node.js®](https://nodejs.org/en/):
```
npm install @ibm/plex
```

Manually installing the files for web development can be done by downloading the latest web zip from our [releases page](https://github.com/IBM/plex/releases).

Developers using the CSS files should keep the directory structure as is, so the font files will be found. If you’re importing the SCSS files, you can set the path of the font files beforehand by declaring this variable:

```scss
$font-prefix: './custom/path/to/font/files';
@import 'node_modules/@ibm/plex/scss/ibm-plex.scss';
```
**Note:**
If your app, for example, React, can’t import the font because it’s outside the ‘src’ directory, then edit the imported ‘ibm-plex.scss’ file and change the relative path prefix there as follows:
```$font-prefix: '' !default;```

Below are the `font-family` rules for the family:

```css
font-family: 'IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace;
font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
font-family: 'IBM Plex Sans Condensed', 'Helvetica Neue', Arial, sans-serif;
font-family: 'IBM Plex Serif', 'Georgia', Times, serif;
```

## Building the fonts from source

### Requirements

To build binary font files from .vfb sources you need [FontLab Studio 5](https://www.fontlab.com). A Python script called `IBM Plex export FDK files.py` is necessary to export the proper files from FontLab. To run this script you’ll need  the [RoboFab](https://github.com/robofab-developers/robofab) library. Also, you’ll need to have the [Adobe Font Development Kit for OpenType](http://www.adobe.com/devnet/opentype/afdko.html) (AFDKO) installed.

### Building one font

From FontLab, run `IBM Plex export FDK files.py` and choose a directory with IBM Plex .vfb source files. The script will create a new directory called `fdk` in which subdirectories are created for every font. The script will export files necessary for AFDKO in those subdirectories.

Subsequently, OpenType Fonts (OTFs) or TrueType Fonts (TTFs) can be generated from the command line using `makeotf`, which is part of the AFDKO toolset. Information and usage instructions can be found by executing `makeotf -h`.
