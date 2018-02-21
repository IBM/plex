# Usage

> Documentation for consumers on how to leverage the `@ibm/type` package
> available on `npm`.

## Install

A developer can run one of the following commands to add `@ibm/type` to their
project:

```bash
# With npm
npm i @ibm/type --save

# With yarn
yarn add @ibm/type
```

After installing `@ibm/type`, you have access to a variety of folders, namely:

- `css`: pre-compiled `css` files that derive from the sass part of the project.
  This folder holds two files:
  - `ibm-type.css`: generated, but un-minified, `css` file
  - `ibm-type.min.css`: generated, but minified, `css` file
- `fonts`: responsible for distributing the IBM Plex font files themselves.
- `scss`: the project's source files for creating the necessary `@font-face`
  declarations, and defining any base styles for each of the support font
  families and weights. This folder holds a variety of files, namely:
  - `ibm-type.scss`: this is the `scss` entrypoint for those using `scss`
    directly
  - `_fonts.scss`: file that imports **all** fonts in the project
  - `_functions.scss`: helper functions
  - `_mixins.scss`: helper mixins
  - `_variables.scss`: variable definitions
  - `mono`, `sans`, and `serif`: corresponding font folders that define
    `@font-face` declarations for the corresponding family, weight, and unicode
    ranges.

## Examples

IBM/Type has a variety of examples for how to use the `@ibm/type` package with
common frameworks, tools, and libraries located [here](./examples). For common
examples, check out the following:

- [Webpack Example](./examples/webpack)

## Reference

### Classes

| Class | Description | Source |
|-------|-------------|--------|
| `.ibm` | | |
| `.ibm-type-mono` | | |
| `.ibm-type-serif` | | |
| `.ibm-type-light` | | |
| `.ibm-type-semibold` | | |
| `.ibm-type-italic` | | |
| `.ibm-type-[a, b, c, d, f, i, j, k]` | | |
| `.ibm-type-[a, b, c, d, e, g, h]` | | |

### Variables

| Variable | Description | Source |
|----------|-------------|--------|
| `$font-prefix` | | |
| `$fallbacks` | | |
| `$base-unit` | | |
| `$breakpoints` | | |
| `$breakpoint--sm` | | |
| `$breakpoint--md` | | |
| `$breakpoint--lg` | | |
| `$breakpoint--max` | | |
| `$breakpoints-map` | | |
| `$ibm-type-scale-map` | | |
| `$ibm-type-prescription-map` | | |

### Mixins

| Mixin | Parameters | Description | Source |
|----------|------------|-------------|--------|
| `fluidRule` | | | |
| `fluidRules` | | | |
| `typePrescription` | | | |
| `singleTypePrescription` | | | |

### Functions

| Function | Parameters | Description | Source |
|----------|------------|-------------|--------|
| `strip-unit` | `$number` | Strips any given unit from the number | [Link](https://github.com/IBM/type/blob/master/src/styles/_functions.scss#L1) |
| `rem` | `$px` | Converts a given `px` value to `rem` | [Link](https://github.com/IBM/type/blob/master/src/styles/_functions.scss#L9) |
| `em` | `$px` | Converts a given `px` value to `em` | [Link](https://github.com/IBM/type/blob/master/src/styles/_functions.scss#L13) |
| `getFontSize` | `$step` | Finds the font size at the given step in the IBM Type Scale map | [Link](https://github.com/IBM/type/blob/master/src/styles/_functions.scss#L17) |
| `getLineHeight` | `$step` | Finds the line height at the given step in the IBM Type Scale map | [Link](https://github.com/IBM/type/blob/master/src/styles/_functions.scss#L25) |
| `getMaxWidth` | `$step` | Finds the max width at the given step in the IBM Type Scale map | [Link](https://github.com/IBM/type/blob/master/src/styles/_functions.scss#L33) |
