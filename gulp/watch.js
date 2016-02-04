var gulp = require('gulp');

gulp.task('watch', function() {
	gulp.watch([path.join(conf.paths.src, '/*.*')], ['build:dev']);
});