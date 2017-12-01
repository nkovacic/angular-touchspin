var gulp = require('gulp'),
	gutil = require('gulp-util'),
	conf = require('../conf'),
	webpack = require('webpack'),
	WebpackDevServer = require('webpack-dev-server'),
	webpackConfig = require('../webpack/webpack');

gulp.task('server:dev', function(callback) {
	// modify some webpack config options
	var webpackDevConfig = webpackConfig(conf.tags.dev);
	// Start a webpack-dev-server
	new WebpackDevServer(webpack(webpackDevConfig), {
		contentBase: webpackDevConfig.output.path,
		stats: {
			colors: true
		}
	}).listen(8088, 'localhost', function(err) {
		if(err) throw new gutil.PluginError('webpack-dev-server', err);
		gutil.log('[webpack-dev-server]', 'http://localhost:8088/webpack-dev-server/index.html');
	});
});