const express = require('express');
const webpack = require('webpack');
const startWebpackConfig = require('./../webpack/start.config');
const glob = require('glob');
const path = require('path');
const WebpackDevServer = require('webpack-dev-server');

const listenAddress = process.env['LISTEN_ADDRESS'] || '0.0.0.0';

module.exports = function registerStartTask(gulp, libraryName) {
    gulp.task('start', () => {
        const config = Object.assign({}, startWebpackConfig);

        config.entry = addHMR('examples/**/*.tsx');

        startWebpackDevServer(config);
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
};

function startWebpackDevServer(webpackConfig) {
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

// function startExpressServer(webpackConfig) {
//     const app = express();
//     const compiler = webpack(webpackConfig);

//     // Tell express to use the webpack-dev-middleware and use the webpack.config.js
//     // configuration file as a base.
//     app.use(webpackDevMiddleware(compiler, {
//         publicPath: webpackConfig.output.publicPath
//     }));

//     // Serve the files on port 3000.
//     app.listen(3000, function () {
//         console.log('Example app listening on port 3000!\n');
//     });
// }
