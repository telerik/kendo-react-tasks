'use strict';

const path = require('path');
const pkg = require(path.resolve('./package.json'));

module.exports = {
    mode: 'production',
    module: {
        rules: [ {
            test: /\.tsx?$/,
            use: [ {
                loader: require.resolve('ts-loader'),
                options: { compilerOptions: { declaration: false } }
            } ]
        } ]
    },
    resolve: {
        extensions: [ '.js', '.tsx', '.ts' ],
        alias: { [ pkg.name ]: path.resolve('./src/main') }
    },
    output: {
        libraryTarget: 'umd'
    },
    externals: {
        "react": {
            "root": 'React',
            "commonjs": 'react',
            "commonjs2": 'react',
            "amd": 'react'
        },
        "react-dom": {
            "root": "ReactDOM",
            "commonjs": 'react-dom',
            "commonjs2": 'react-dom',
            "amd": 'react-dom'
        },
        "react-dom/server": {
            "root": "ReactDOMServer",
            "commonjs": 'react-dom/server',
            "commonjs2": 'react-dom/server',
            "amd": 'react-dom/server'
        },
        "react-transition-group": {
            "root": "ReactTransitionGroup",
            "commonjs": 'react-transition-group',
            "commonjs2": 'react-transition-group',
            "amd": 'react-transition-group'
        }
    },
    plugins: [
    ]
};
