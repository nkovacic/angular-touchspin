var loaders = require('./loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: ['./src/index.ts'],
    output: {
        filename: 'angular-touchspin.js',
        libraryTarget: 'umd',
        library: 'angular-touchspin',
        path: 'dist'
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                // This has effect on the react lib size
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            warning: false,
            mangle: true,
            comments: false
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            hash: true
        })
    ],
    module:{
        loaders: loaders
    },
    resolve: {
        extensions: ['', '.ts', '.js', '.html', '.json', '.woff', '.svg', '.ttf', '.eot'],
        modulesDirectories: ['./src', 'shared', 'node_modules'],
        root: [__dirname]
    }
};