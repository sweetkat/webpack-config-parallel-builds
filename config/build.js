const chalk = require('chalk');
const webpack = require('webpack');
const webpackConfig = require('./webpack.prod.es.conf');

const createCompiler = (config, name) => {
    const compiler = webpack(config);
    console.log(chalk.blue(`Building ${name} for production...`));
    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) return reject(err);
            
            process.stdout.write(`${stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false,
            })}\n\n`);
            
            if (stats.hasErrors()) {
                console.log(chalk.red('  Build failed with errors.\n'));
                process.exit(1);
            }
            
            console.log(chalk.cyan('  Build complete.\n'));
            resolve();
        });
    });
};


(async () => {
    await process.env.ES5 ? createCompiler(webpackConfig.es5Config, 'es5') : createCompiler(webpackConfig.es6Config, 'es6');
})();
