const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

gulp.task('clean', function () {
	return del(['dist/**/*', 'docs/css/**/*', 'docs/fonts/**/*']);
});

gulp.task('styles', function () {
	gulp.src("src/**/*.scss")
		.pipe(gulp.dest('dist/scss'))
		.pipe(sass().on('error', sass.logError))
		.pipe(rename('ibm-type.css'))
		.pipe(gulp.dest('dist/css'))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(rename('ibm-type.min.css'))
		.pipe(gulp.dest('dist/css'))
		.pipe(gulp.dest('docs/css'));
});

gulp.task('fonts', function () {
	gulp.src("src/fonts/**/*.*")
		.pipe(gulp.dest('dist/fonts'))
		.pipe(gulp.dest('docs/fonts'));
});

gulp.task('grid', function () {
	gulp.src("node_modules/@ibm/grid/dist/ibm-grid.min.css")
		.pipe(gulp.dest('docs/css'));
});

gulp.task('watch', function () {
	browserSync.init({
		server: {
			baseDir: "./docs"
		}
	});

	gulp.watch('src/**/*.scss', ['styles']);
	gulp.watch("dist/**/*").on("change", browserSync.reload);
	gulp.watch("docs/**/*").on("change", browserSync.reload);
});

gulp.task('default', ['clean', 'fonts', 'styles', 'grid']);
