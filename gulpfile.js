/**
 * Created by xiaobxia on 2017/5/30.
 */
const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-clean-css');
const gulpSequence = require('gulp-sequence');
const webpack = require('webpack-stream');

gulp.task('minify-css', function () {
    gulp.src('dist/css/*.css') // 要压缩的css文件
        .pipe(minifyCss()) //压缩css
        .pipe(gulp.dest('dist/css'));
});
gulp.task('minify-js', function () {
    gulp.src('dist/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
gulp.task('compile-sass', function () {
    gulp.src('sass/xbx-core.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});
gulp.task('transform-js', function () {
    return gulp.src('js/xbx-core.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('clean', function () {
    return del("dist");
});

gulp.task('build', gulpSequence('clean', ['transform-js', 'compile-sass'], ['minify-css', 'minify-js']));
