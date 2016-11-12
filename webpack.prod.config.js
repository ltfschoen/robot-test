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
                test: /\.jsx?/,
                include: APP_DIR,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
                PORT: 5000
            }
        })
    ],

    devtool: 'source-map'
};

module.exports = config;