'use strict';

const runSequence = require('run-sequence');

module.exports = function registerBuildPackageInAllFormatsTask(gulp) {
    gulp.task('build-package', (done) =>
        runSequence.use(gulp)('build-npm-bundle', 'build-es-bundle', 'build-cdn', 'build-systemjs-bundle', done)
    );
};
