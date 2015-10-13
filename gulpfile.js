
var gulp = require('gulp');
var awspublish = require('gulp-awspublish');

gulp.task('default', [], function() {

});

gulp.task('publish-s3', [], function() {
  var publisher = awspublish.create({
    params: {
      Bucket: 'variate'
    },
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  });

  return gulp.src('variate.axon.js')
    .pipe(publisher.publish())
    .pipe(awspublish.reporter());
});

