"use strict";

const path = require('path');
const fs = require('fs');
const tsTasks = require('@progress/kendo-typescript-tasks');
const selenium = require('selenium-standalone');
const seleniumConfig = require('./selenium.conf.js');
const nightwatch = './node_modules/.bin/nightwatch';
/**
* Add more relaxing options when generating api-docs,
* temporary solves the problem with the missing return type for the React.Component methods.
*/
const apiConfig = { warningsAsErrors: false };
const karmaConfigPath = path.join(__dirname, 'karma.conf.js');
const webpackConfig = require('./webpack.config.js');
const docsServer = require('@telerik/kendo-common-tasks/docs-server');

/* eslint-disable no-console */
module.exports = (gulp, libraryName, compilerPath, basePath) => {
    tsTasks(gulp, libraryName, karmaConfigPath, compilerPath, apiConfig, webpackConfig, { basePath: (basePath || ' ') });

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
                const nightwatchProcess = spawn(nightwatchPath, [ '-c', path.join(__dirname, './nightwatch.conf.js'), ...process.argv.slice(3) ]);

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

    gulp.task('docs', [ 'lint-slugs', 'build-cdn' ], (done) => docsServer(libraryName, (browserSync) => {
        gulp.watch("docs/**/*.{md,hbs}", [ 'lint-slugs' ]).on('change', browserSync.reload);
        gulp.watch("public/**/*.{css,js}").on('change', browserSync.reload);
        gulp.watch("dist/cdn/**/*.{css,js}").on('change', browserSync.reload);
        gulp.watch("src/**/*.{ts,tsx}", [ "build-cdn" ]);
    }, done));
};
