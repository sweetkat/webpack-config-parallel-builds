const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getBabelPlugin, baseOutputPath } = require('./utils');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        app: [resolve(__dirname, '../src/index.js')],
    },
    output: {
        path: baseOutputPath,
        filename: 'js/[name].js',
        chunkFilename: '[id].lazy.js',
        publicPath: '/',
    },
    devServer: {
        port: 9000,
        hot: true,
        open: false,
        publicPath: '/',
        compress: true,
        disableHostCheck: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            chunksSortMode: 'none',
            filename: 'index.html',
            template: 'src/index.html',
            inject: true
        }),
    ],
    module: {
        rules: [
            // Passing (true) can change dev build to compile down to ES5
            getBabelPlugin(),
        ],
    }
};
