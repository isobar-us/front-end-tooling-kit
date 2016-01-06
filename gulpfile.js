'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var webpack = require('webpack');
var imagemin = require('gulp-imagemin');
var del = require('del');
var runSequence = require('run-sequence');

var webpackDevConfig = require('./webpack.dev.js');
var webpackProdConfig = require('./webpack.prod.js');

var APP_SRC     = './app';
var APP_DIST    = './dist';
var SASS_SRC    = APP_SRC + '/sass/**/*.scss';
var SASS_DIST   = APP_DIST + '/css';
var SCRIPTS_SRC = APP_SRC + '/scripts/**/*.+(js|jsx)';
var IMG_SRC     = APP_SRC + '/images/**/*.+(png|jpg|gif|svg|ico)';
var IMG_DIST    = APP_DIST + '/images';
var FONTS_SRC   = APP_SRC + '/fonts/**/*';
var FONTS_DIST  = APP_DIST + '/fonts';

gulp.task('sass:dev', function () {
  return gulp.src(SASS_SRC)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed', sourceComments: true}).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(SASS_DIST));
});

gulp.task('sass:prod', function () {
  return gulp.src(SASS_SRC)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(SASS_DIST));
});

function doWebpack(config, callback) {
  webpack(config, function (err, stats) {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      // output options
    }));
    callback();
  });
}

gulp.task('webpack:dev', function (callback) {
  doWebpack(Object.create(webpackDevConfig), callback);
});

gulp.task('webpack:prod', function (callback) {
  doWebpack(Object.create(webpackProdConfig), callback);
});

gulp.task('images:dev', function(){
  return gulp.src(IMG_SRC)
    .pipe(gulp.dest(IMG_DIST))
});

gulp.task('images:prod', function(){
  return gulp.src(IMG_SRC)
    .pipe(imagemin())
    .pipe(gulp.dest(IMG_DIST))
});

gulp.task('fonts', function() {
  return gulp.src(FONTS_SRC)
    .pipe(gulp.dest(FONTS_DIST))
});

gulp.task('clean', function(callback) {
  return del(APP_DIST, callback);
});

gulp.task('build', function(callback){
  runSequence('clean', ['sass:prod', 'webpack:prod', 'images:prod', 'fonts'], callback);
});

gulp.task('watch', ['sass:dev', 'webpack:dev', 'images:dev', 'fonts'], function () {
  gulp.watch(SASS_SRC, ['sass:dev']);
  gulp.watch([SCRIPTS_SRC], ['webpack:dev']);
  gulp.watch(IMG_SRC, ['images:dev']);
  gulp.watch(FONTS_SRC, ['fonts']);
});
