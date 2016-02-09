var gulp = require('gulp');
var conf = require('../conf');
var path = require('path');

gulp.task('watch', function() {
	gulp.watch([path.join(conf.paths.src, '/*.*')], ['build:dev']);
});