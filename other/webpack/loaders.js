var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [{
    test: /\.js$/,
    loader: 'babel',
    exclude: /(node_modules|bower_components)/
}, {
    test: /\.ts$/,
    loader: 'ng-annotate!babel!ts-loader',
    exclude: /node_modules/
}, {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
}, {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
    exclude: /node_modules/
}, {
    test: /\.html$/,
    exclude: /node_modules/,
    loader: 'html'
}, {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader?limit=10000&minetype=application/font-woff'
}, {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader'
}, {
    test: '\.jpg$',
    exclude: /node_modules/,
    loader: 'file'
}, {
    test: '\.png$',
    exclude: /node_modules/,
    loader: 'url'
}];