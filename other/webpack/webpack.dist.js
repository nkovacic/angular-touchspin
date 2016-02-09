var loaders = require('./loaders'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack');

module.exports = {
    entry: ['./src/angular-touchspin.module.ts'],
    output: {
        filename: 'angular-touchspin.js',
        libraryTarget: 'umd',
        library: 'angular-touchspin',
        path: './dist'
    },
    externals: {
        'angular': 'angular',
        'jquery': 'jQuery'
    },
    resolve: {
        root: './',
        extensions: ['', '.ts', '.js', '.scss']
    },
    resolveLoader: {
        modulesDirectories: ['node_modules']
    },
    plugins: [
        new ExtractTextPlugin('angular-touchspin.min.css'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin(),        
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.jquery': 'jquery'
        })
    ],
    module:{
        loaders: loaders
    }
};