/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util'),
    path = require('path'),
    projectRoot = __dirname + '/../';

/**
 *  The main paths of your project handle these with care
 */
module.exports = {
    errorHandler: function(title) {
        'use strict';

        return function(err) {
            gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
            this.emit('end');
        };
    },
    paths: {
        src: path.join(projectRoot, 'src'),
        dev: path.join(projectRoot, 'dev'),
        dist: path.join(projectRoot, 'dist'),
        root: projectRoot
    },    
    tags: {
        build: 'build',
        dev: 'development',
        dist: 'production',
        test: 'test'
    }
};