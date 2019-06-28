const { existsSync } = require('fs');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { baseOutputPath } = require('./utils');
const { es5Config, es6Config } = require('./webpack.prod.es.conf');

const readManifest = (path) => {
    if (existsSync(`${path}/manifest.json`)) {
        return require(`${path}/manifest.json`);
    } else {
        return {}
    }
};

console.log('es5Config.output.path', es5Config.output.path)
const es5Manifest = readManifest(`${es5Config.output.path}`);
const es6Manifest = readManifest(`${es6Config.output.path}`);
const es5Js = `${es5Manifest['app.js']}`;
const es6Js = `${es6Manifest['app.js']}`;
const css = `${es6Manifest['app.css']}`;

const htmlConfig = {
    mode: 'production',
    target: "node",
    output: {
        path: baseOutputPath,
        filename: "placeholder-not-used.js"
    },
    plugins: [
        // Add any plugin you require to run for the final stage of the build
        // For example, CopyWebpackPlugin to copy static assets across

        // Generate dist index.html with correct asset hash for caching.
        // You can customize output by editing /index.html
        // See https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            es5Js,
            es6Js,
            css,
            filename: resolve(`${baseOutputPath}/index.html`),
            template: 'src/index.html',
            inject: false,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
            },
            // Set to none to prevent cyclic error
            // https://github.com/jantimon/html-webpack-plugin/issues/870
            chunksSortMode: 'none',
        })
    ]
};

module.exports = htmlConfig;
