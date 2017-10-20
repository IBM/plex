const path = require('path');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

gulp.task('clean', function() {
  return del([
    'css',
    'scss',
    'fonts',
    'docs/css/**/*',
    'docs/fonts/**/*',
    'docs/js/**/*',
  ]);
});

gulp.task('js', function() {
  gulp
    .src('node_modules/menuspy/dist/menuspy.min.js')
    .pipe(gulp.dest('docs/js'));
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
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('docs/css'));
});

gulp.task('scss', function() {
  return gulp.src('src/styles/**/*.scss').pipe(gulp.dest('scss'));
});

gulp.task('fonts', function() {
  return gulp
    .src('src/fonts/**/*.*')
    .pipe(gulp.dest('fonts'))
    .pipe(gulp.dest('docs/fonts'));
});

gulp.task('grid', function() {
  return gulp
    .src('node_modules/@ibm/grid/dist/ibm-grid.min.css')
    .pipe(gulp.dest('docs/css'));
});

gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: './docs',
    },
  });

  gulp.watch('src/styles/**/*.scss', ['styles']);
  gulp.watch('dist/**/*').on('change', browserSync.reload);
  gulp.watch('docs/**/*').on('change', browserSync.reload);
});

gulp.task('default', ['fonts', 'scss', 'css', 'js', 'grid']);
