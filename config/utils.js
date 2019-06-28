const { resolve } = require('path');

const babelEs5 = {
    'presets': [
        [
            '@babel/preset-env',
            { 'modules': false },
            '@babel/preset-stage-2'
        ]
    ]
};

const babelEs6 = {
    'presets': [
        [
            '@babel/preset-env',
            { 'targets': { 'node': '6.5' } }
        ]
    ],
};

const getBabelPlugin = function (useEs5) {
    const options = useEs5 ? { options: babelEs5 } : { options: babelEs6 };
    return {
        test: /\.js$/,
        use: [{
            loader: 'babel-loader',
            ...options
        }]
    }
};

const baseOutputPath = resolve(__dirname, '../dist/');

module.exports = {
    getBabelPlugin,
    baseOutputPath
};
