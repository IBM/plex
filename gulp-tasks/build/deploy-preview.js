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

/**
 * Copies test file to the deploy-preview folder
 *
 * @returns {*} gulp stream
 */
function _copyTest() {
  return gulp
    .src([config.testSrc])
    .pipe(gulp.dest(config.deployPreviewPath));
}

/**
 * Copies dist files to the deploy-preview folder. Must run `gulp build` first!
 *
 * @returns {*} gulp stream
 */
function _copyCss() {
  return gulp
    .src([`${config.cssSrc}/**/*`])
    .pipe(gulp.dest(config.deployPreviewCSSPath));
}

/**
 * Copies font files to the dist folder
 *
 * @returns {*} gulp stream
 */
function _copyFonts() {
  return gulp
    .src(['IBM-Plex-*/fonts/**/*.*'])
    .pipe(gulp.dest(config.deployPreviewFontsPath));
}

gulp.task('build:deploy-preview:test', _copyTest);
gulp.task('build:deploy-preview:css', _copyCss);
gulp.task('build:deploy-preview:fonts', _copyFonts);
gulp.task('build:deploy-preview', gulp.parallel('build:deploy-preview:test','build:deploy-preview:css','build:deploy-preview:fonts'));
