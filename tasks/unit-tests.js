'use strict';

const startKarma = require('@telerik/kendo-common-tasks/start-karma');
const karmaConfigPath = require.resolve('./../karma.conf.js');

module.exports = function registerUnitTestsTasks(gulp, basePath) {
    gulp.task('test', (done) =>
        startKarma(done, karmaConfigPath, true, { basePath: (basePath || ' ') }));

    gulp.task('watch-test', (done) =>
        startKarma(done, karmaConfigPath, false, { basePath: (basePath || ' ') }));
}


