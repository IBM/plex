# IBM Type

## Device installation

Please download the latest zip files from our [releases page](https://github.com/IBM/type/releases) for installation.

## Web usage

This project contains the following for web development:
- IBM Plex .woff2 and .woff files split into performant subsets of glyphs
- css code to reference any weight, variant, and split
- scss code partials down to each weight, variant, and split

Installation with [Node](https://nodejs.org/en/):
```
npm install @ibm/type
```

Manually installing the files for web development can be done by downloading the latest source code zip from our [releases page](https://github.com/IBM/type/releases).

### Font file paths

The css code assumes the font directories are located in the same directory as your css directory. The location of the font directories can be changed in the scss code by declaring a path with `$font-prefix`.

### Recommended fallbacks

```css
.ibm-plex-mono {
  font-family: 'IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace;
}

.ibm-plex-sans {
  font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
}

.ibm-plex-sans-condensed {
  font-family: 'IBM Plex Sans Condensed', 'Helvetica Neue', Arial, sans-serif;
}

.ibm-plex-serif {
  font-family: 'IBM Plex Serif', 'Georgia', Times, serif;
}
```

### Weights

| `font-weight` | Weight     |
|---------------|------------|
| 100           | Thin       |
| 200           | ExtraLight |
| 300           | Light      |
| 400           | Regular    |
| 500           | Text       |
| 600           | Medium     |
| 700           | SemiBold   |
| 800           | Bold       |

## Building the fonts from source

### Requirements

To build binary font files from vfb sources you need [FontLab Studio 5](https://www.fontlab.com). A Python script called `IBM Plex export FDK files.py` is necessary to export the proper files from FontLab. In order to run this script you will need the [RoboFab](https://github.com/robofab-developers/robofab) library. Also you need to have installed the [Adobe Font Development Kit for OpenType](http://www.adobe.com/devnet/opentype/afdko.html) (AFDKO).

### Building one font

From FontLab, run `IBM Plex export FDK files.py` and choose a directory with IBM Plex vfb source files. The script will create a new directory called `fdk` in which sub-directories are created for every font. The script will export files necessary for AFDKO in those sub-directories.

Subsequently, OTF or TTF fonts can be generated from the command line using `makeotf`, which is part of the AFDKO toolset.
Information and usage instructions can be found by executing `makeotf -h`.
