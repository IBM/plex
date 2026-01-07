# IBM Plex Serif Var 1.0

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

## <picture><source height="20" width="20" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-dark.svg"><source height="20" width="20" media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"><img height="20" width="20" alt="IBM Telemetry" src="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"></picture> IBM Telemetry

This package uses IBM Telemetry to collect de-identified and anonymized metrics data. By installing
this package as a dependency you are agreeing to telemetry collection. To opt out, see
[Opting out of IBM Telemetry data collection](https://github.com/ibm-telemetry/telemetry-js/tree/main#opting-out-of-ibm-telemetry-data-collection).
For more information on the data being collected, please see the
[IBM Telemetry documentation](https://github.com/ibm-telemetry/telemetry-js/tree/main#ibm-telemetry-collection-basics).
