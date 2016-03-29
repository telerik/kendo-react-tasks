const jasmine = require('gulp-jasmine');
const path = require('path');
const specReporter = require('jasmine-spec-reporter');
const webpackConfig = require('./webpack.config.js');
const commonTasks = require('@telerik/kendo-common-tasks');

const KarmaServer = require('karma').Server;
const e2eConfigPath = path.join(__dirname, 'e2e.conf.js');

const SRC = "src/**/*.jsx";
const TESTS = "test/**/*.jsx";
const SRC_TESTS = [ SRC, TESTS ];

module.exports = function(gulp, libraryName) {
    commonTasks.addTasks(gulp, libraryName, SRC, webpackConfig);

    gulp.task('test', () =>
        gulp.src(TESTS)
        .pipe(commonTasks.webpackStream(webpackConfig.test))
        .pipe(gulp.dest('tmp/test/'))
        .pipe(jasmine({
            reporter: new specReporter()
        }))
    );

    gulp.task('watch-test', () => {
        gulp.run('test');
        return gulp.watch(SRC_TESTS, [ 'test' ]);
    });

    gulp.task('e2e', (done) => {
        new KarmaServer({
            configFile: e2eConfigPath,
            singleRun: true
        }, function(exitStatus) {
            if (exitStatus !== 0) {
                done("e2e suite failed");
            } else {
                done();
            }
        }).start();
    });
};
