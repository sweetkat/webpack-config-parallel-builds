const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./utils');
const baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
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
            utils.getBabelPlugin(),
        ],
    }
});
