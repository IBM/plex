# IBM Type

With our new corporate typeface, IBM Plex, comes a new set of guidance and best practices. IBM typography is international and modern to reflect our brand and our design principles.

---

**Warning:** IBM Type is still in development and being carefully implemented in real cases where we can look for any difficulties. Look out for a stable v1.0.0 release by October 16th.

---

### IBM Type Checker

Check that any webpage follows the IBM Type with our [Chrome and Firefox extension](https://github.com/ibm/type-checker). This extremely helpful to developers as they code and designers as they review work.

### Examples

We want to show off many examples of what IBM Type is capable of. Check out the examples below and learn at the bottom of this document how to provide a new example:
-  [Dev Tutorial](https://ibm.github.io/type/) ([Source](./docs/index.html))

# Design

### IBM Type Sketch File

Use these artboards in your Sketch files to accomplish a design at each breakpoint your developer will be working with. Right click and select `Save link as` to save this [Sketch file](https://github.com/IBM/type/raw/master/ibm-type.sketch).

### Type scales and weights

We consider both performance and craftmanship of typography. When we think of type ratio, we keep in mind what works for IBM Plex and effectively deliver and organize the content for our viewers. Based on the type ratio, we have a basic set of styles: 14, 16, 26, 44, and 56. Based on the type scales, IBM Plex Sans Light works well in large scale type sizes and IBM Plex Sans  Regular works well for relevant small type size.

IBM Plex Sans Light, IBM Plex Sans Regular, IBM Plex Sans SemiBold will be the primary weights for digital environment. ExtraLight and Thin are not for digital environments.

We recommend always using flush left text, no centered, no flush right.

### Tracking consideration

IBM Plex has been designed to not be spaced tightly. It requires space to breath comfortably within text and headlines. It's lighter in appearance and is more legible when spaced appropriately. We recommend a default tracking of 0. No tracking for most of the cases.

Exception:
  * Display A/B: Adobe: -5 to -10 Sketch:-0.1
  * Caption style: Adobe: +5 to +10 Sketch: +.1

### Line Length

For better reading experience, we set up max-widths for text length based on the column width, type scales and the right amount of characters.

# Code

The IBM Type code provides the following benefits:

- Rendering and kerning that best reflects IBM Plex
- Specific styles that set size, line height, and weights for both editorial and product experiences
- When used with [IBM Grid](https://github.com/ibm/grid), automatic line lengths based on which type style and which grid container

### How to Use

To install, run `npm install @ibm/type`

If you want to use the compiled css, reference the file in the dist folder:
```
<link rel="stylesheet" type="text/css" href="node_modules/@ibm/type/dist/css/ibm-type.min.css">
```

If you want to use the sass partials, import the files in the src folder:
```
@import 'node_modules/@ibm/type/src/_core.scss';
@import 'node_modules/@ibm/type/src/_styles.scss';
@import 'node_modules/@ibm/type/src/_width.scss';
```

Check out the Performance section below for a description of each partial.

### Developer Tutorial

Use [this walkthrough](https://ibm.github.io/type/) to learn the foundational aspects of coding with the IBM Type. Recommended for all first-time users.

## Classname Reference

| Classname                     | Purpose                                                                                                                                             |
|-------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| `.ibm`                        | Container div to apply IBM Plex Sans to all type by default                                                                                                                           |
| `.ibm-type-mono`           | Switch a text node and children to IBM Plex Mono                                                               |
| `.ibm-type-serif`           | Switch a text node and children to IBM Plex Serif                                                            |
| `.ibm-type-light`           | Use the light weight of either IBM Plex Sans or IBM Plex Serif                                                            |
| `.ibm-type-semibold`  | Use the semibold weight of either IBM Plex Sans or IBM Plex Serif                                                                                                    |
| `.ibm-type-italic`              | Use the italic style of either IBM Plex Sans or IBM Plex Serif                                                                                     |
| `.ibm-type-[a, b, c, d, f, i, j, k]`               | Use the sizing and weight of a style prescribed for editorial experiences                                                                                                              |
| `.ibm-type-[a, b, c, d, e, g, h]`               | Use the sizing and weight of a style prescribed for product experiences                                                                                                                         |

## Performance

There are three distinct capabilities of this codebase and you are welcome to only import what you need:
1. Core - All capabilities not listed below.
2. Styles - Provides a map of the raw type scale and then a map and mixins of the type styles.
3. Width - When using IBM Type with IBM Grid, line lengths for the written content will be optically correct automatically.

|                          | Includes core font references? | Includes scale and styles? | Includes line lengths? | File Size | Minified | Gzip  |
|--------------------------|---------------------|-----------------------|-------------------------|-----------|----------|-------|
| IBM Type                 | Yes                 | Yes                   | Yes                     | 24kb      | 19kb      | 3.1kb |
| _core.scss + _styles.scss | Yes                 | Yes                   | No                      | 12kb       | 9kb      | 1.5kb |
| _core.scss               | Yes                 | No                    | No                      | 3kb       | 3kb      | 0.5kb |
