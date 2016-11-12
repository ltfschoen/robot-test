var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');

var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {

    entry: {
        'bundleIndexEntry': APP_DIR + '/index.jsx'
    },

    output: {
        path: BUILD_DIR,
        filename: '[name].js',
        publicPath: '/src/client/',
        sourceMapFilename: '[name].js.map',
        devtoolModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]',
        devtoolFallbackModuleFilenameTemplate: 'webpack:///[resourcePath]?[hash]'
    },

    module: {
        loaders: [
            {
                test: /\.jsx|.js?/,
                include: APP_DIR,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            // CSS
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    },

    devtool: 'source-map',

    resolve: {
    // Filetypes that may be required without specifying extension
    // i.e. require('file') instead of require('file.js')
    extensions: ['', '.js', '.jsx']
}
};

module.exports = config;