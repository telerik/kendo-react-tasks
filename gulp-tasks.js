"use strict";

const path = require('path');
const tsTasks = require('@progress/kendo-typescript-tasks');
const commonTasks = require('@telerik/kendo-common-tasks');

const e2eConfigPath = path.join(__dirname, 'e2e.conf.js');
const e2eNpmConfigPath = path.join(__dirname, 'e2e-npm.conf.js');

const karmaConfigPath = path.join(__dirname, 'karma.conf.js');
const webpackConfig = require('./webpack.config.js');

module.exports = (gulp, libraryName, compilerPath, basePath) => {
    tsTasks(gulp, libraryName, karmaConfigPath, compilerPath, null, webpackConfig, { basePath: (basePath || ' ') });

    gulp.task('e2e', (done) => commonTasks.startKarma(done, e2eConfigPath, true));

    gulp.task('watch-e2e', (done) => commonTasks.startKarma(done, e2eConfigPath, false));

    gulp.task('e2e-npm', [ 'build-npm-package' ],
              (done) => commonTasks.startKarma(done, e2eNpmConfigPath, true));
};
