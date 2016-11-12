var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');

var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {

    entry: [
        APP_DIR + '/index.jsx',
        APP_DIR + '/LikeComponent.jsx',
        APP_DIR + '/modules/instruction_reader.js',
        APP_DIR + '/modules/place.js',
        APP_DIR + '/modules/table.js',
        APP_DIR + '/modules/toy_robot.js',
        APP_DIR + '/utils/array_equality.js',
        APP_DIR + '/utils/matrix.js',
        APP_DIR + '/test.js'
    ],

    // Inform Webpack not to use any built-in modules like fs to overcome error
    // when building files with `require('fs')`: Cannot resolve module 'fs'
    target: 'node',

    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath: '/src/',
        sourceMapFilename: 'bundle.js.map',
        devtoolModuleFilenameTemplate: 'webpack:///[resource-path]',
        devtoolFallbackModuleFilenameTemplate: 'webpack:///[resourcePath]'
    },

    externals: undefined,

    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "src/client/app/modules"),
                    path.resolve(__dirname, "src/client/app/utils")
                ],
                // include: APP_DIR,
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

    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: "'development'"
            }
        })
    ],

    devtool: 'source-map',

    stats: {
        colors: true
    },

    resolve: {
        // Filetypes that may be required without specifying extension
        // i.e. require('file') instead of require('file.js')
        extensions: ['', '.jsx', '.js']
    }
};

module.exports = config;