"use strict";

const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const cdnWebpackConfig = require('./cdn.webpack.config.js');
const _ = require('lodash');

/* eslint-disable no-console */
module.exports = (gulp, libraryName, compilerPath, basePath, options = {}) => { // eslint-disable-line max-params
    gulp.task('build-cdn', () => {
        const config = Object.assign({}, cdnWebpackConfig);
        config.output.filename = libraryName + '.js';
        // The library name is in pascal case.
        config.output.library = _.flow(_.camelCase, _.upperFirst)(libraryName);

        return gulp.src('src/main' + ".{jsx,ts,tsx,js}")
            .pipe(webpackStream(config, webpack))
            .pipe(gulp.dest('dist/cdn/js'));
    });
};
