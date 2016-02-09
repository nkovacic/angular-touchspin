'use strict';

var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var conf = require('./conf');

var webpack = require('webpack');
var webpackBuildConfig = require('../webpack/webpack.build');
var webpackDevConfig = require('../webpack/webpack.dev');
var webpackDistConfig = require('../webpack/webpack.dist');

gulp.task('scripts:build', function(callback) {
	// run webpack
	webpack(webpackBuildConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("scripts:build", err);
		gutil.log("scripts:build", stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task('scripts:build-dist', function(callback) {
	// run webpack
	webpack(webpackDistConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("scripts:build-dist", err);
		gutil.log("scripts:build-dist", stats.toString({
			colors: true
		}));
		callback();
	});
});

var devCompiler = webpack(webpackDevConfig);

gulp.task('scripts:build-dev', function(callback) {
	devCompiler.run(function(err, stats) {
		if(err) throw new gutil.PluginError("scripts:build-dev", err);
		gutil.log("scripts:build-dev", stats.toString({
			colors: true
		}));
		callback();
	});
});