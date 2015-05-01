var gulp = require('gulp');
var pbjs = require('./pbjs.js');

gulp.task('test', function() {
    return gulp.src('test/protob/messages.proto')
        .pipe(pbjs())
        .pipe(gulp.dest('./test'));
});