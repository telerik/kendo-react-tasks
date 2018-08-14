'use strict';

const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const pkg = require(path.resolve('./package.json'));
const listenAddress = process.env['LISTEN_ADDRESS'] || '0.0.0.0';
const webpack = require('webpack');

// Once the react-tasks package is consumed w/o npm link, loaders can be referred w/o require.resolve
// (e.g. loader: 'ts-loader').

module.exports = {
    mode: 'development',
    module: {
        rules: [ {
            test: /\.tsx?$/,
            use: [ {
                loader: require.resolve('ts-loader'),
                options: { compilerOptions: { sourceMap: true } }
            } ]
        }, {
            test: /\.scss$/,
            use: [ {
                loader: require.resolve('style-loader')
            }, {
                loader: require.resolve('css-loader')
            }, {
                loader: require.resolve('sass-loader')
            } ]
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [ {
                loader: require.resolve('url-loader'),
                options: { name: "[name].[ext]?[hash]", limit: 10000 }
            } ]
        } ]
    },
    resolve: {
        extensions: [ '.js', '.tsx', '.ts', '.scss' ],
        alias: { [ pkg.name ]: path.resolve('./src/main') }
    },
    devtool: 'cheap-module-eval-source-map',
    output: { publicPath: '/', path: '/', filename: '[name].js' },
    plugins: [
        new BrowserSyncPlugin(
            // BrowserSync options
            {
                open: false,
                host: listenAddress,
                port: 3000,
                proxy: 'http://' + listenAddress + ':8888/'
            },
            // plugin options
            {
                // prevent BrowserSync from reloading the page
                // and let Webpack Dev Server take care of this
                reload: false
            }
        ),
        new webpack.HotModuleReplacementPlugin()
    ]
};
