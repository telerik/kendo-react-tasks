"use strict";
``
const path = require('path');
const fs = require('fs');
const selenium = require('selenium-standalone');
const seleniumConfig = require('./../selenium.conf');
const nightwatch = './../node_modules/.bin/nightwatch';

module.exports = function registerE2ETasks(gulp) {
    gulp.task('e2e', (done) => {
        console.log(`Installing selenium standalone server and chrome web driver`);
        selenium.install(seleniumConfig, (err) => {
            if (err) {
                console.log(`Error installing selenium standalone server and chrome drivers ${err}`);
                done(1);
            } else {
                const command = process.platform === 'win32' ? `${nightwatch}.cmd` : nightwatch;
                let nightwatchPath = path.resolve(process.cwd(), command);

                if (fs.existsSync(nightwatchPath) === false) {
                    console.log(`No binary in the current node_modules, try two levels up for the root of the monorepo`);
                    nightwatchPath = path.resolve(process.cwd(), '../../', command);
                }

                console.log(`Starting Nightwatch with E2E tests`);
                const { spawn } = require('child_process');
                const nightwatchProcess = spawn(nightwatchPath, [ '-c', path.join(__dirname, './../nightwatch.conf.js'), ...process.argv.slice(3) ]);

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
}
