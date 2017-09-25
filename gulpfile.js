const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require("gulp-babel");
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const del = require('del');
const url = require('url');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const config = require('./config');
const path = config.path;
const server = config.server;

gulp.task('clean', function () {
  return del(path.dist);
});

gulp.task('scss', function () {
  return gulp.src(path.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([pxtorem(config.pxtorem), autoprefixer(config.autoprefixer)]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist + '/css'))
    .pipe(gulp.dest(path.example + '/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function () {
  return gulp.src(path.js)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist + '/js'))
    .pipe(gulp.dest( path.example + '/js'));
});

gulp.task('server', function (cb) {
  browserSync({
    server: {
      baseDir: path.example
    },
    port: server.port,
    notify: false,
    ghostMode: false,
    open: true
  }, cb);
});

gulp.task('build', gulp.parallel('scss', 'js'));

gulp.task('watch', function () {
  function serverReload(cb) {
    browserSync.reload();
    cb();
  }
  gulp.watch(path.scssWatch, gulp.series('scss'));
  gulp.watch(path.jsWatch, gulp.series('js', serverReload));
});

gulp.task('default', gulp.series('clean', 'build', 'server', 'watch'));
