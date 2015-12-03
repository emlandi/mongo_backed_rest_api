var gulp = require('gulp');
var webpack = require('webpack-stream');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');
var watch = require('gulp-watch');

var appFiles = ['server.js'];
var testFiles = ['./test/**/*.js'];

gulp.task('static:dev', function() {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('build/'));
});

gulp.task('webpack:dev', function() {
  return gulp.src('app/js/entry.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('jshint', function() {
  return gulp.src(appFiles)
    .pipe(jshint({
      node: true,
      globals: {
        describe: true,
        it: true,
        before: true,
        after: true,
      }
    }))
    .pipe(jshint.reporter('default'));
});

gulp.task('mocha', function() {
  return gulp.src(testFiles, {read: false})
    .pipe(mocha({reporter: 'landing'}));
});

gulp.task('css:dev', function() {
  return gulp.src([
    'app/css/reset.css',
    'app/css/base.css',
    'app/css/layout.css',
    'app/css/module.css'])
  .pipe(concatCss('styles.min.css'))
  .pipe(minifyCss())
  .pipe(gulp.dest('build/'));
});

gulp.task('css:watch', function () {
  gulp.watch('./app/css/**/*.css', ['css:dev']);
});

gulp.task('webpack:test', function() {
  return gulp.src('test/client/test_entry.js')
  .pipe(webpack({
    output: {
      filename: 'test_bundle.js'
    }
  }))
  .pipe(gulp.dest('test/client/'));
});

gulp.task('build:dev', ['webpack:dev', 'static:dev', 'css:dev']);
gulp.task('default', ['build:dev', 'jshint', 'mocha']);
