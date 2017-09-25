const gulp = require('gulp');
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const pxtorem = require('postcss-pxtorem');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');

const config = require('./config');
const path = config.path;

gulp.task('clean', function () {
  return del(path.dist);
});

gulp.task('scss', function () {
  return gulp.src(path.scss)
    .pipe(sass())
    .pipe(postcss([pxtorem(config.pxtorem), autoprefixer(config.autoprefixer)]))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(path.dist + '/css'))
});

gulp.task('js', function () {
  return gulp.src(path.js)
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(path.dist + '/js'))
});

gulp.task('build', gulp.parallel('scss', 'js'));

gulp.task('default', gulp.series('clean', 'build'));
