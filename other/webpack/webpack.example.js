var loaders = require('./loaders'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack');

module.exports = {
    entry: ['./example/index.ts'],
    output: {
        filename: 'build.js',
        libraryTarget: 'umd',
        library: 'angular-touchspin',
        path: __dirname +'/example'
    },
    externals: {
        'jquery': 'jQuery'
    },
    resolve: {
        root: __dirname,
        extensions: ['', '.ts', '.js', '.json', '.scss']
    },
    resolveLoader: {
        modulesDirectories: ['node_modules']
    },
    devtool: 'eval',
    cssLoader: {
        sourceMap: true
    },
    sassLoader: {
        sourceMap: true,
    },
    styleLoader: {
        sourceMap: true
    },
    plugins: [
        new ExtractTextPlugin('bundle.css'),
        new HtmlWebpackPlugin({
            template: './example/index.html',
            inject: 'body',
            hash: true
        }),
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