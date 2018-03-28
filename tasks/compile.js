'use strict';

const path = require('path');
const exec = require('child_process').exec;

module.exports = function registerCompileTasks(gulp, compilerPath) {
    const compile = (configFile) => (done) => {
        const tsConfigPath = path.join(process.cwd(), configFile);

        exec(`${compilerPath} -p ${tsConfigPath}`, (error, stdout) => {
            if (error) {
                console.log('Upon compilation the following error occured:', stdout);// eslint-disable-line no-console
            }
            done();
        });
    };

    gulp.task('build-es-bundle', compile('tsconfig.es.json'));
    gulp.task('build-npm-bundle', compile('tsconfig.npm.json'));
};


