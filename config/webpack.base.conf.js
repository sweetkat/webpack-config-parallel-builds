const path = require('path');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        app: [path.resolve(__dirname, '../src/index.js')],
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].js',
        chunkFilename: '[id].lazy.js',
        publicPath: '/',
    },
    module: {
        rules: [],
    },
};
