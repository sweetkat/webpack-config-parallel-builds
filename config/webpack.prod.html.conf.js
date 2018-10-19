const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');

const readManifest = (path) => {
    if (fs.existsSync(`${path}/manifest.json`)) {
        return require(`${path}/manifest.json`);
    } else {
        return {}
    }
};

const es5Manifest = readManifest(`${baseWebpackConfig.output.path}/${'es5'}`);
const es6Manifest = readManifest(`${baseWebpackConfig.output.path}/${'es6'}`);
const es5Js = `${es5Manifest['app.js']}`;
const es6Js = `${es6Manifest['app.js']}`;
const css = `${es6Manifest['app.css']}`;

const htmlConfig = {
    mode: 'production',
    target: "node",
    output: {
        path: path.resolve(__dirname, '../dist'),
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
            filename: path.resolve(`${baseWebpackConfig.output.path}/index.html`),
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
