"use strict";

const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const _ = require('lodash');

const cdnWebpackConfig = require('./../webpack/cdn.config');
const docsServer = require('@telerik/kendo-common-tasks/docs-server');

module.exports = function registerDocsTasks(gulp, libraryName, options = {}) {
    gulp.task('build-cdn', () => {
        const config = Object.assign({}, cdnWebpackConfig);
        config.output.filename = libraryName + '.js';
        // The library name is in pascal case.
        config.output.library = _.flow(_.camelCase, _.upperFirst)(libraryName);

        return gulp.src('src/main.{jsx,ts,tsx,js}')
            .pipe(webpackStream(config, webpack))
            .pipe(gulp.dest('dist/cdn/js'));
    });

    gulp.task('docs', ['lint-slugs', 'build-cdn'], (done) => docsServer(libraryName, (browserSync) => {
        gulp.watch("docs/**/*.{md,hbs}", ['lint-slugs']).on('change', browserSync.reload);
        gulp.watch("public/**/*.{css,js}").on('change', browserSync.reload);
        gulp.watch("dist/cdn/**/*.{css,js}").on('change', browserSync.reload);
        gulp.watch("src/**/*.{ts,tsx}", ["build-cdn"]);
    }, done));
}
