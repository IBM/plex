# IBM Plex™

Meet IBM Plex, our new corporate typeface. It’s global, it’s versatile and it’s distinctly IBM.

We designed Plex carefully to both meet our needs as a global tech company and express who we are as people. It took two years and a lot of work to get here, but today we have a signature typeface we’re proud and excited to share with the world. Plex is an open-source project (OFL) and free to download and use. The Plex family comes in a Sans, Serif, Mono and Sans Condensed, all with roman and true italics. The fonts have been designed to work well in user interface (UI) environments as well as other mediums. This project provides all source files and file formats to support most typographical situations.

Thanks for trying Plex! We hope you like it.

## Add Plex to your device

Please download the latest zip files from our [releases page](https://github.com/IBM/plex/releases) for installation.

## Web usage

This project contains the following for web development:
- IBM Plex .woff2 and .woff files split into performant subsets of glyphs
- css code to reference any weight, variant, and split
- scss code partials down to each weight, variant, and split

We also include whole .woff2, .woff, and .eot files. However, we recommend using the prescribed split strategy for performance.

Installation with [Node](https://nodejs.org/en/):
```
npm install @ibm/plex
```

Manually installing the files for web development can be done by downloading the latest web zip from our [releases page](https://github.com/IBM/plex/releases).

Devs using the css files should keep the directory structure as-is so that the font files will be found. If you are importing the scss files, you can set the path of the font files beforehand by declaring this variable:

```scss
$font-prefix: './custom/path/to/font/files';
@import 'node_modules/@ibm/plex/scss/ibm-plex.scss';
```

Below are the `font-family` rules for the family:

```css
font-family: 'IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace;
font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
font-family: 'IBM Plex Sans Condensed', 'Helvetica Neue', Arial, sans-serif;
font-family: 'IBM Plex Serif', 'Georgia', Times, serif;
```

## Building the fonts from source

### Requirements

To build binary font files from vfb sources you need [FontLab Studio 5](https://www.fontlab.com). A Python script called `IBM Plex export FDK files.py` is necessary to export the proper files from FontLab. In order to run this script you will need the [RoboFab](https://github.com/robofab-developers/robofab) library. Also you need to have installed the [Adobe Font Development Kit for OpenType](http://www.adobe.com/devnet/opentype/afdko.html) (AFDKO).

### Building one font

From FontLab, run `IBM Plex export FDK files.py` and choose a directory with IBM Plex vfb source files. The script will create a new directory called `fdk` in which sub-directories are created for every font. The script will export files necessary for AFDKO in those sub-directories.

Subsequently, OTF or TTF fonts can be generated from the command line using `makeotf`, which is part of the AFDKO toolset.
Information and usage instructions can be found by executing `makeotf -h`.
