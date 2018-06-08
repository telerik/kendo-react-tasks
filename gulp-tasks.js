"use strict";

const deepAssign = require('lodash.merge');

const apiConfig = require('./api.conf.js');
const registerStartTask = require('./tasks/start');
const registerDocsTasks = require('./tasks/docs');
const registerE2ETestsTasks = require('./tasks/e2e-tests');
const registerCompileTasks = require('./tasks/compile');
const registerSystemJSTask = require('./tasks/systemjs');
const registerBuildPackageInAllFormatsTask = require('./tasks/build-package-in-all-formats');

const lintSlugsTask = require('@telerik/kendo-common-tasks/lint-slugs');
const apiTasks = require('@progress/kendo-typescript-tasks/api');

/* eslint-disable no-console */
module.exports = (gulp, libraryName, compilerPath, basePath, options = {}) => { // eslint-disable-line max-params
    registerCompileTasks(gulp, compilerPath);
    registerDocsTasks(gulp, libraryName);
    registerStartTask(gulp);
    registerE2ETestsTasks(gulp);
    lintSlugsTask(gulp, libraryName);
    apiTasks(gulp, deepAssign({}, apiConfig, options.apiConfig));
    registerSystemJSTask(gulp, libraryName, options);
    registerBuildPackageInAllFormatsTask(gulp);
};
