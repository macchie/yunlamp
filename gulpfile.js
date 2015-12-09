// Gulp Libraries

var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var coffee = require('gulp-coffee');
var jade = require('gulp-jade');

// Error Handling

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

// Sources Paths

var paths = {
  sass: ['./src/scss/**/*.scss', './src/sass/**/*.sass'],
  coffee: ['./src/coffee/**/*.coffee'],
  jade: ['./src/jade/**/*.jade']
};

// Gulp Default Task

gulp.task('default', ['sass', 'coffee', 'jade', 'watch']);

// Gulp Sass Task

gulp.task('sass', function(done) {
  gulp.src('./src/sass/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

// Gulp Coffee Task

gulp.task('coffee', function(done) {
  gulp.src(paths.coffee)
  .pipe(coffee({
    bare: true
  })
  .on('error', handleError))
  .pipe(concat('application.js'))
  .pipe(gulp.dest('./www/js'))
  .on('end', done);
});

// Gulp Jade Task

gulp.task('jade', function(done) {
  var YOUR_LOCALS = {};
 
  gulp.src(paths.jade)
    .pipe(jade({
      locals: YOUR_LOCALS
    })
    .on('error', handleError))
    .pipe(gulp.dest('./www/'))
    .on('end', done);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.coffee, ['coffee']);
  gulp.watch(paths.jade, ['jade']);
});
