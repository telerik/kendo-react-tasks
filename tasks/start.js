'use strict';

const webpack = require('webpack');
const startWebpackConfig = require('./../webpack/start.config');
const glob = require('glob');
const WebpackDevServer = require('webpack-dev-server');
const $ = require('gulp-load-plugins')();
const argv = require('yargs').argv;

const listenAddress = process.env['LISTEN_ADDRESS'] || '0.0.0.0';
const devServerPath = require.resolve('webpack/hot/dev-server');
const devServerClientPath = require.resolve('webpack-dev-server/client') + `?http://` + listenAddress + `:8888`;

module.exports = function registerStartTask(gulp) {
    gulp.task('start', (done) => {
        const config = Object.assign({}, startWebpackConfig);

        config.entry = addHMR(argv.e || 'examples/**/*.tsx');

        startWebpackDevServer(config, done);
    });
};

function addHMR(path) {
    return glob.sync(path).reduce(addHMRCallback, {});
}
function addHMRCallback(entries, name) {
    entries[name.replace(/\.(tsx?|jsx)$/, '')] = [
        devServerPath,
        devServerClientPath,
        `./${name}`
    ];

    return entries;
}

function startWebpackDevServer(webpackConfig, callback) {
    const webpackPort = 8888;
    const host = listenAddress;

    const server = new WebpackDevServer(webpack(webpackConfig), {
        contentBase: './',
        hot: true,
        noInfo: true,
        disableHostCheck: true
    });

    server.listen(webpackPort, host, err => {
        if (err) {
            callback();
            throw new $.util.PluginError('webpack-dev-server', err);
        }
    });
}
