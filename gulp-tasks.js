"use strict";

const path = require('path');
const fs = require('fs');
const cdnWebpackConfig = require('./cdn.webpack.config.js');

/* eslint-disable no-console */
module.exports = (gulp, libraryName, compilerPath, basePath, options = {}) => { // eslint-disable-line max-params
    gulp.task('build-cdn', () => {
        const config = Object.assign({}, cdnWebpackConfig);
        config.output.filename = libraryName + '.js';
        // TODO:
        config.output.library = 'KendoReactGrid';
    
        return gulp.src('src/main' + ".{jsx,ts,tsx,js}")
            .pipe(webpackStream(config, webpack))
            .pipe(gulp.dest('dist/cdn/js'));
    });
};
