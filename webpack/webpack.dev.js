var bourbon = require('node-bourbon'),
    loaders = require("./loaders"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack');

module.exports = {
    entry: ['./dev/index.ts'],
    output: {
        filename: 'build.js',
        libraryTarget: 'umd',
        library: 'angular-touchspin',
        path: __dirname +'/dev'
    },
    externals: {
        'jquery': 'jQuery'
    },
    resolve: {
        root: __dirname,
        extensions: ['', '.ts', '.js', '.json']
    },
    resolveLoader: {
        modulesDirectories: ["node_modules"]
    },
    devtool: "eval",
    cssLoader: {
        sourceMap: true
    },
    sassLoader: {
        includePaths: bourbon.includePaths,
        sourceMap: true,
    },
    styleLoader: {
        sourceMap: true
    },
    plugins: [
        new ExtractTextPlugin("bundle.css"),
        new HtmlWebpackPlugin({
            template: './dev/index.html',
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