//@ts-check

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

const externalsDependencies = [
    "react",
    "react-dom",
    "react-dom/server",
    "react-transition-group",
    "prop-types",
    "@progress/kendo-react-intl",
    "@progress/kendo-drawing"
];

const externals = externalsDependencies.reduce((accumulator, extKey) => {
    accumulator[extKey] = Object.create(Object.prototype);

    externalsTypes.forEach(extType => {
        /**
         * The UMD distributions for in-browser use expect the following format:
         * @progress/kendo-react-intl => KendoReactIntl
        */
        if (extType === 'root') {
            const value = extKey.split(splitter).filter(part => !part.match(/@progress|@telerik/)).map(part => upperFirst(part)).join('');

            if (value.startsWith('ReactDom')) {
                accumulator[extKey][extType] = value.replace('ReactDom', 'ReactDOM');
            } else {
                accumulator[extKey][extType] = value;
            }
        } else {
            accumulator[extKey][extType] = extKey;
        }
    });

    return accumulator;
}, Object.create(Object.prototype));

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
        alias: { [pkg.name]: path.resolve('./src/main') }
    },
    output: {
        libraryTarget: 'umd'
    },
    externals: externals,
    plugins: []
};
