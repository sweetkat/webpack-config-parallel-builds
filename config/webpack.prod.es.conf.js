const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const utils = require('./utils');

const ES5_PATH = 'es5';
const ES6_PATH = 'es6';

const buildConfig = (path, isLegacy) => merge(baseWebpackConfig, {
    output: {
        filename: `${path}/js/[name].[contenthash].js`,
        chunkFilename: `${path}js/[name].[contenthash].js`
    },
    plugins: [
        // extract css into its own file
        new MiniCssExtractPlugin({
            filename: `${path}/css/[name].[contenthash].css`,
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ManifestPlugin({
            fileName: `${path}/manifest.json`
        })
    ],
    module: {
        rules: [
            utils.getBabelPlugin(isLegacy)
        ],
    },
    optimization: {
        minimizer: [
            new TerserPugin()
        ]
    }
});

const es5Config = buildConfig(ES5_PATH, true);
const es6Config = buildConfig(ES6_PATH);

module.exports = {
    es6Config,
    es5Config
};
