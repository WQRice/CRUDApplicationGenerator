var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

//Deploy code to github branch
gulp.task('deploy', function() {
  return gulp.src('./**/*')
    .pipe(ghPages({'remoteUrl':'https://github.com/WQRice/CRUDApplicationGenerator.git','branch':'Deploy'}));
});
