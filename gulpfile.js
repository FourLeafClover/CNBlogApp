var gulp = require('gulp');

gulp.task('default', function() {
    gulp.src('src/assets/img/*.*').pipe(gulp.dest('www/assets/img'));
});