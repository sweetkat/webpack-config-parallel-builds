const { resolve } = require('path');
const webpack = require('webpack');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { getBabelPlugin, baseOutputPath } = require('./utils');

const ES5_PATH = 'es5';
const ES6_PATH = 'es6';

const buildConfig = (path, useEs5) => ({
    mode: process.env.NODE_ENV,
    entry: {
        app: [resolve(__dirname, '../src/index.js')],
    },
    output: {
        path: baseOutputPath,
        filename: `${path}/js/[name].[contenthash].js`,
        chunkFilename: `${path}/js/[name].[contenthash].js`,
        publicPath: '/',
    },
    plugins: [
        // extract css into its own file
        // new MiniCssExtractPlugin({
        //     filename: `${path}/css/[name].[contenthash].css`,
        // }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ManifestPlugin({
            fileName: `manifest.json`
        })
    ],
    module: {
        rules: [
            getBabelPlugin(useEs5)
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
    es5Config,
};
