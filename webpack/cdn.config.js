'use strict';

const path = require('path');
const pkg = require(path.resolve('./package.json'));
const { upperFirst } = require('lodash');

const splitter = /\-|\//;

/* https://webpack.js.org/configuration/externals/#externals */
const externalsTypes = [
    "root",
    "commonjs",
    "commonjs2",
    "amd"
];

const externals = [
    "react",
    "react-dom",
    "react-dom/server",
    "react-transition-group",
    "prop-types",
    "@progress/kendo-react-intl",
    "@progress/kendo-drawing"
];

const reducedExternals = externals.reduce((externals, key) => {
    externals[key] = Object.create(null);

    externalsTypes.forEach(extType => {
        if (extType === 'root') {
            /**
             * The UMD distributions for in-browser use expect the following format:
             * @progress/kendo-react-intl => KendoReactIntl
            */
            externals[key][extType] = key
                .split(splitter)
                .filter(part => !part.match(/@progress|@telerik/))
                .map(part => upperFirst(part))
                .join('');
        } else {
            externals[key][extType] = key;
        }
    });

    return externals;
}, {});

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
    externals: reducedExternals,
    plugins: [ ]
};
