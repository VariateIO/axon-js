
var gulp = require('gulp');
var awspublish = require('gulp-awspublish');
var git = require('gulp-git');
var fs = require('fs');
var path = require('path');
var rename = require('gulp-rename');

var bowerConfig = JSON.parse(fs.readFileSync('./bower.json'));
var version = bowerConfig.version;

var buildDir = './build/';
var outDir = path.join(buildDir, version);

var mkdirSync = function (path) {
  try {
    fs.mkdirSync(path);
  } catch(e) {
    if ( e.code != 'EEXIST' ) throw e;
  }
}

gulp.task('default', [], function() {

});

gulp.task('build', [], function() {

  mkdirSync(buildDir);
  mkdirSync(outDir);
  
  gulp.src(bowerConfig.main)
    .pipe(gulp.dest(outDir));
});

gulp.task('version', [], function() {
  console.log(version);
});

gulp.task('publish-s3', [], function() {
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