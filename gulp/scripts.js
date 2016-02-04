'use strict';

var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var conf = require('./conf');

var webpack = require('webpack');
var webpackConfig = require('../webpack/webpack.build')
var webpackDevConfig = require('../webpack/webpack.dev');

gulp.task('scripts:build', function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.plugins = myConfig.plugins.concat(
		new webpack.DefinePlugin({
			"process.env": {
				// This has effect on the react lib size
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	);

	// run webpack
	webpack(myConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("scripts:build", err);
		gutil.log("scripts:build", stats.toString({
			colors: true
		}));
		callback();
	});
});

var devCompiler = webpack(webpackConfig);

gulp.task('scripts:build-dev', function(callback) {
	devCompiler.run(function(err, stats) {
		if(err) throw new gutil.PluginError("scripts:build-dev", err);
		gutil.log("scripts:build-dev", stats.toString({
			colors: true
		}));
		callback();
	});
});