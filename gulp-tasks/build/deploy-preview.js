/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const gulp = require('gulp');
const config = require('../config');
const { globSync } = require('glob');
const inject = require('gulp-inject');
const replace = require('gulp-replace');

const _LIST_PACKAGES = [];

/**
 * List packages with output CSS
 */
function _listPackages() {

  const listPackages = globSync(`packages/**/${config.cssSrc}`);

  listPackages.length && listPackages.forEach(( path ) => {

    const [, family] = path.split("/");

    _LIST_PACKAGES.push({
      family, 
      path,
      cssPath: `assets/${family}/${config.cssSrc}/ibm-${family}.css`
    });
  });
}

/**
 * Transform family name map
 */
const _transformFamilyMap = {
  jp: "JP",
  kr: "KR",
  tc: "TC"
}

function _transformFamilyName(family) {

  return "IBM " + family.split("-").map((part) => {

    return _transformFamilyMap[part] ? _transformFamilyMap[part] : part.charAt(0).toUpperCase() + part.slice(1);

  }).join(" ");
}

/**
 * Copies test file to the deploy-preview folder
 *
 * @returns {*} gulp stream
 */
function _copyTest() {

  _listPackages();

  return gulp
    .src([config.testSrc + "/index.html"])
    .pipe(gulp.dest(config.deployPreviewPath));
}

/**
 * Injects used CSS files into deploy-preview index file
 * 
 * @returns {*} gulp stream
 */
function _injectHtml() {

  console.log("Inject html");

  const injectCss = [];
  const injectStyle = [];
  const injectOptions = [
    `<option value="select" selected>Select family</option>`
  ];
  
  _LIST_PACKAGES.forEach(({ family, cssPath }) => {

    injectCss.push(`${config.deployPreviewPath}/${cssPath}`);

    injectStyle.push(`div[data-family="${family}"] { display: initial; }`);

    const transformedFamily = _transformFamilyName(family);

    injectOptions.push(`<option value="${transformedFamily}">${transformedFamily}</option>`)
  });

  const target = gulp.src(`${config.deployPreviewPath}/index.html`);

  return target
    .pipe(inject(
      gulp.src(injectCss, { read: false }), {
        transform: function(filepath) {
          
          return `<link rel="stylesheet" href="${filepath.replace("/deploy-preview/", "")}" />`;
        }
      }
    ))
    .pipe(inject(
      gulp.src(config.testSrc + "/inject.txt", { ready: false }), {
        starttag: '<!-- inject:style -->',
        transform: function() {

          return `<style>\n${injectStyle.join('\n')}\n</style>`;
        }
      }
    ))
    .pipe(inject(
      gulp.src(config.testSrc + "/inject.txt", { ready: false }), {
        starttag: '<!-- inject:options -->',
        transform: function() {

          return injectOptions.join('\n');
        }
      }
    ))
    .pipe(gulp.dest(config.deployPreviewPath));
}

/**
 * Copies dist files to the deploy-preview folder. Must run `gulp build` first!
 *
 * @returns {*} gulp stream
 */
function _copyCss(done) {

  console.log("Copy css");

  const tasks = _LIST_PACKAGES.map(({ path, family }) => {

    return () => gulp
      .src([path + "/*.*", "!" + path + "/*.min.*"])
      .pipe(replace(/local\(.*?\),/gm, ""))
      .pipe(gulp.dest([`${config.deployPreviewAssets}/${family}/${config.cssSrc}`]));
  });

  return gulp.series(...tasks, (seriesDone) => {
    seriesDone();
    done();
  })(); 
}

/**
 * Copies font files to the dist folder
 *
 * @returns {*} gulp stream
 */
function _copyFonts(done) {

  console.log("Copy fonts");

  const tasks = _LIST_PACKAGES.map(({ path, family }) => {

    return () => gulp
      .src([`packages/${family}/fonts/**/*.*`])
      .pipe(gulp.dest([`${config.deployPreviewAssets}/${family}/fonts`]));
  });

  return gulp.series(...tasks, (seriesDone) => {
    seriesDone();
    done();
  })(); 
}

gulp.task('build:deploy-preview', gulp.series(_copyTest, _copyFonts, _copyCss, _injectHtml));
