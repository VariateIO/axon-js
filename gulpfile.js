
var gulp = require('gulp');
var awspublish = require('gulp-awspublish');
var git = require('gulp-git');
var fs = require('fs');
var path = require('path');
var rename = require('gulp-rename');
var minify = require('gulp-minify');
var webserver = require('gulp-webserver');
var hostile = require('hostile');

var bowerConfig = JSON.parse(fs.readFileSync('./bower.json'));
var version = bowerConfig.version;

var buildDir = './build/';
var outDir = path.join(buildDir, version);
var previewHost = 'axon.local.variate.io';
var previewPort = 9002;

var mkdirSync = function (path) {
  try {
    fs.mkdirSync(path);
  } catch(e) {
    if ( e.code != 'EEXIST' ) throw e;
  }
}

gulp.task('default', ['preview'], function() {

});

gulp.task('build', ['version', 'minify'], function() {

  mkdirSync(buildDir);
  mkdirSync(outDir);
  
  gulp.src(bowerConfig.main)
    .pipe(gulp.dest(outDir));
});

gulp.task('minify', [], function() {
  gulp.src(bowerConfig.main)
    .pipe(minify())
    .pipe(gulp.dest(outDir));
});

gulp.task('version', [], function() {
  console.log(version);
});

gulp.task('preview', ['build'], function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: 35739,
      host: previewHost,
      port: previewPort
    }));
});

gulp.task('hostfile', [], function(done) {
  hostile.set('127.0.0.1', previewHost, function(error) {
    if(error) {
      console.error(error);
    } else {
      console.log('Set hostfile entry');
    }
    done();
  });
});

gulp.task('publish-s3', ['build'], function() {
  var publisher = awspublish.create({
    params: {
      Bucket: 'variate'
    },
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  });

  return gulp.src(outDir+'/**/*')
    .pipe(rename(function (path) {
      path.dirname += '/axon/'+version;
    }))
    .pipe(publisher.publish())
    .pipe(awspublish.reporter());
});