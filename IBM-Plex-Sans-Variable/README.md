# IBM Plex Sans Var 1.0

## Using pre-compiled ttf fonts

Pre-compiled binaries are supplied in the `fonts` folder.
 
The pre-compiled ttf fonts contain several enhancements that are not included when compiling source files yourself:
- Variable TrueType hint instructions for better rendering on Windows;
- Alternate forms for glyphs `naira`, `won` and `fraction` that are automatically shown when using particular widths;
- A `stat` table containing names of all instances that is used to show these instances in font menus;
- A `meta` table.

## Building fonts from source

UFO source files are supplied in the `sources` folder.

### Requirements

To build binary font files from the supplied UFO sources you need [fontmake](https://github.com/googlei18n/fontmake).
Fonts in this release have been generated with fontmake 1.9.1.

### Building

Run `build.sh` from the command line. This will compile both IBMPlexSansVar-Roman.ttf and IBMPlexSansVar-Italic.ttf in a new folder called `variable_ttf`.
