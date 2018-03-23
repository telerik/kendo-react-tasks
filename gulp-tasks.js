"use strict";

const deepAssign = require('lodash.merge');

const apiConfig = require('./api.conf.js');
const registerStartTask = require('./tasks/start');
const registerDocsTasks = require('./tasks/docs');
const registerE2ETasks = require('./tasks/e2e');
const registerCompileTasks = require('./tasks/compile');
const docsServer = require('@telerik/kendo-common-tasks/docs-server');
const lintSlugsTask = require('@telerik/kendo-common-tasks/lint-slugs');
const apiTasks = require('@progress/kendo-typescript-tasks/api');


const path = require('path');
const fs = require('fs');
const selenium = require('selenium-standalone');
const seleniumConfig = require('./selenium.conf.js');
const nightwatch = './node_modules/.bin/nightwatch';


module.exports = (gulp, libraryName, compilerPath, basePath, options = {}) => {
    registerCompileTasks(gulp, compilerPath);
    registerDocsTasks(gulp, libraryName, options);
    registerStartTask(gulp, libraryName);
    // registerE2ETasks(gulp);

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

    lintSlugsTask(gulp);
    apiTasks(gulp, deepAssign({}, apiConfig, options.apiConfig));
};
