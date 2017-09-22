"use strict";

const path = require('path');
const tsTasks = require('@progress/kendo-typescript-tasks');
const selenium = require('selenium-standalone');
const seleniumConfig = require('./selenium.conf.js');
const nightwatch = './node_modules/.bin/nightwatch';

const karmaConfigPath = path.join(__dirname, 'karma.conf.js');
const webpackConfig = require('./webpack.config.js');

/* eslint-disable no-console */
module.exports = (gulp, libraryName, compilerPath, basePath) => {
    tsTasks(gulp, libraryName, karmaConfigPath, compilerPath, null, webpackConfig, { basePath: (basePath || ' ') });

    gulp.task('e2e', (done) => {
        console.log(`Installing selenium standalone server and chrome web driver`);
        selenium.install(seleniumConfig, (err) => {
            if (err) {
                console.log(`Error installing selenium standalone server and chrome drivers ${err}`);
                done(1);
            } else {
                const command = process.platform === 'win32' ? `${nightwatch}.cmd` : nightwatch;
                console.log(`Starting Nightwatch with E2E tests`);
                const { spawn } = require('child_process');
                const nightwatchProcess = spawn(path.resolve(command), [ '-c', path.join(__dirname, './nightwatch.conf.js') ]);

                nightwatchProcess.stdout.on('data', (data) => {
                    console.log(`${data}`);
                });

                nightwatchProcess.stderr.on('data', (data) => {
                    console.log(`${data}`);
                });

                nightwatchProcess.on('close', (code) => {
                    console.log(`Nightwatch exited with code ${code}`);
                    done(code);
                });
            }
        });
    });

    gulp.task('watch-e2e', () => gulp.watch('e2e/**/*.*', [ 'e2e' ]));
};
