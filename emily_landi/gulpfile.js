var gulp = require('gulp');
var webpack = require('webpack-stream');
var minifyCss = require('gulp-minify-css');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');

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

gulp.task('sass:dev', function() {
  gulp.src('./app/sass/**/*.scss')
  .pipe(maps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(minifyCss())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('build/'));
});

gulp.task('sass:watch', function () {
  gulp.watch(['./app/sass/**/*.scss', './app/index.html'], ['sass:dev', 'static:dev']);
});

gulp.task('img:dev', function() {
  gulp.src(['app/img/*.jpeg', 'app/img/*.jpg', 'app/img/*.png'])
  .pipe(gulp.dest('build/'));
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

gulp.task('build:dev', ['webpack:dev', 'static:dev', 'sass:dev', 'img:dev']);
gulp.task('default', ['build:dev']);

