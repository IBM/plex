# IBM Type

With our new corporate typeface, IBM Plex, comes a new set of guidance and best practices. IBM typography is international and modern to reflect our brand and our design principles.

---

**Warning:** IBM Type is still in development and being carefully implemented in real cases where we can look for any difficulties. Look out for a stable v1.0.0 release in the near future.

---

### IBM Type Checker (work-in-progress)

Check that any webpage follows the IBM Type with our [Chrome and Firefox extension](https://github.com/ibm/type-checker). This is helpful to developers as they code and designers as they review work.

### Examples

We want to show off many examples of what IBM Type is capable of. Check out the examples below and learn at the bottom of this document how to provide a new example:
-  [Dev Tutorial](https://ibm.github.io/type/) ([Source](./docs/index.html))

# Design

Use [this walkthrough](https://ibm.github.io/type) to learn the foundational aspects of designing with IBM Type. Recommended for all first-time users.

### IBM Type Sketch File

Use these artboards in your Sketch files to accomplish a design at each breakpoint your developer will be working with. Right click and select `Save link as` to save this [Sketch file](https://github.com/IBM/type/raw/master/ibm-type.sketch).

# Code

The IBM Type code provides rendering and kerning that best reflects IBM Plex. The editorial and product style sets also take care of:
- Size
- Line height
- Line length
- Bottom margin
- Weights

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

Use [this walkthrough](https://ibm.github.io/type/code.html) to learn the foundational aspects of coding with IBM Type. Recommended for all first-time users.

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

There are two distinct capabilities of this codebase and you are welcome to only import what you need:
1. Core - All capabilities not listed below.
2. Styles - Provides a map of the raw type scale and then a map and mixins of the type sets.

|                          | Includes core font references? | Includes scale and styles? | Includes line lengths? | File Size | Minified | Gzipped  |
|--------------------------|---------------------|-----------------------|-------------------------|-----------|----------|-------|
| IBM Type                 | Yes                 | Yes                   | Yes                     | 39kb      | 34kb      | 2.6kb |
| _styles.scss               | Yes                 | No                    | No                      | 15kb       | 11kb      | 1.3kb |
| _core.scss               | Yes                 | No                    | No                      | 24kb       | 23kb      | 1.3kb |

Finally, each font file (~40kb) has been split into four separate files (~10kb). If your webpage does not use any unicodes from one of the four splitted files, the user’s device will not have to download the splitted file.
