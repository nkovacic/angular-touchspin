var loaders = require('./loaders'),
    _ = require('lodash'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack'),
    conf = require('../conf'),
    packageJson = require('../../package.json');

function getConfig(env) {
    var config = getCommonConfig(env);

    env = env || process.env.NODE_ENV;

    switch (env) {
        case conf.tags.dev:
            config = _.merge(config, getDevConfig(env));
            break;
        case conf.tags.build:
            config = _.merge(config, getBuildConfig(env));
            break;
        case conf.tags.dist:
            config = _.merge(config, getDistConfig(env));
            break;
        case conf.tags.test:
            config = _.merge(config, getTestConfig(env));
            break;
        default:
            throw new Error('NODE_ENV not equal to development, production, or test. It is equal to ' + env);
    }

    return config;
}

function getCommonConfig() {
    return {
        context: conf.paths.root,
        output: {
            libraryTarget: 'umd',
            library: 'angular-touchspin'
        },
        stats: {
            colors: true,
            reasons: true
        },
        resolve: {
            root: __dirname,
            extensions: ['', '.ts', '.js', '.json', '.scss']
        },
        module: {
            loaders: loaders
        },
        babelLoader: {
            presets: ['es2015']
        }
    };
}

function getDevConfig(env) {
    return {
        entry: ['./dev/index.ts'],
        output: {
            filename: 'build.js',
            path: '/dev'
        },
        devtool: 'source-map',
        plugins: _.concat(getCommonPlugins(env), 
            new ExtractTextPlugin('build.css'),
            new HtmlWebpackPlugin({
                template: './dev/index.html',
                inject: 'body',
                hash: true
            })
        )
    };
}

function getBuildConfig(env) {
    var distConfig = getDistConfig(env);

    return _.extend({}, distConfig, {
        output: {
            filename: 'angular-touchspin.js',
            path: conf.paths.dist
        },
        plugins: _.concat(getCommonPlugins(env), [
            new ExtractTextPlugin('angular-touchspin.css'),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.AggressiveMergingPlugin()
        ])
    });
}

function getDistConfig(env) {
    return {
        entry: ['./src/angular-touchspin.module.ts'],
        output: {
            filename: 'angular-touchspin.min.js',
            path: conf.paths.dist
        },
        externals: {
            angular: 'angular',
            jquery: 'jQuery'
        },
        plugins: _.concat(getCommonPlugins(env), [
            new ExtractTextPlugin('angular-touchspin.min.css'),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.AggressiveMergingPlugin(),
            new webpack.optimize.UglifyJsPlugin()
        ])
    };
}

function getTestConfig(env) {
     return {};
}

function getCommonPlugins(env) {
    return [
        new webpack.BannerPlugin(getBanner(env), {raw: true}),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.jquery': 'jquery'
        })
    ];
}

function getBanner(env) {
    if (env === conf.tags.dist) {
        return '/*! ' + packageJson.name + ' v' + packageJson.version + ' | MIT | built with ♥ by ' + packageJson.author + ' */'.trim();
    } else {
        return [
            '/*!',
            '* ' + packageJson.name + ' JavaScript Library v' + packageJson.version,
            '*',
            '* @license MIT',
            '*',
            '* built with ♥ by ' + packageJson.author,
            '*/',
        ].join('\n');
    }
}

module.exports = getConfig;