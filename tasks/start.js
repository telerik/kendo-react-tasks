'use strict';

const webpack = require('webpack');
const startWebpackConfig = require('./../webpack/start.config');
const glob = require('glob');
const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
const $ = require('gulp-load-plugins')();
const argv = require('yargs').argv;

const listenAddress = process.env['LISTEN_ADDRESS'] || '0.0.0.0';

module.exports = function registerStartTask(gulp) {
    gulp.task('start', (done) => {
        const config = Object.assign({}, startWebpackConfig);

        config.entry = addHMR(`examples/**/${argv.e || '*'}.tsx`);

        startWebpackDevServer(config, done);
    });
};

function addHMR(path) {
    return glob.sync(path).reduce(addHMRCallback, {});
}
function addHMRCallback(entries, name) {
    entries[path.basename(name).replace(/\.(tsx?|jsx)$/, '')] = [
        require.resolve('webpack/hot/dev-server'),
        require.resolve('webpack-dev-server/client') + `?http://` + listenAddress + `:8888`,
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
