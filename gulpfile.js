const browserSync = require('browser-sync').create();
const del = require('del');
const cleanCSS = require('gulp-clean-css');
const gulp = require('gulp');
const rename = require('gulp-rename');
const path = require('path');
const sass = require('gulp-sass');
const zip = require('gulp-zip');

gulp.task('clean', function() {
  return del(['css', 'scss']);
});

gulp.task('css', function() {
  return gulp
    .src('src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('ibm-type.css'))
    .pipe(gulp.dest('css'))
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(rename('ibm-type.min.css'))
    .pipe(gulp.dest('css'));
});

gulp.task('scss', function() {
  return gulp.src('src/styles/**/*.scss').pipe(gulp.dest('scss'));
});

gulp.task('grid', function() {
  return gulp
    .src('node_modules/@ibm/grid/dist/ibm-grid.min.css')
    .pipe(gulp.dest('misc'));
});

gulp.task('fonts', function() {
  return gulp
    .src('/fonts/**/*.*')
    .pipe(zip('ibm-plex.zip'))
    .pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: '.',
    },
  });

  gulp.watch('src/styles/**/*.scss', ['css']);
  gulp.watch('dist/**/*').on('change', browserSync.reload);
  gulp.watch('index.html').on('change', browserSync.reload);
});

gulp.task('default', ['fonts', 'scss', 'css', 'grid']);
