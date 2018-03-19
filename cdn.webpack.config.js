var webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: [{ loader: 'ts-loader', options: { transpileOnly: true } }]
        }]
    },
    resolve: {
        extensions: ['.js', '.tsx', '.ts']
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
        // Not sure whether uglify is needed. It slows down the bundling a lot
        // and the bundles' sizes are almost equal.
        new UglifyJsPlugin()
    ]
};
