"use strict";

const deepAssign = require('lodash.merge');

const apiConfig = require('./api.conf.js');
const registerStartTask = require('./tasks/start');
const registerDocsTasks = require('./tasks/docs');
const registerE2ETasks = require('./tasks/e2e');
const docsServer = require('@telerik/kendo-common-tasks/docs-server');
const lintSlugsTask = require('@telerik/kendo-common-tasks/lint-slugs');
const apiTasks = require('@progress/kendo-typescript-tasks/api');

module.exports = (gulp, libraryName, compilerPath, basePath, options = {}) => {
    registerDocsTasks(gulp, libraryName, options);
    registerStartTask(gulp, libraryName);
    registerE2ETasks(gulp);
    lintSlugsTask(gulp);
    apiTasks(gulp, deepAssign({}, apiConfig, options.apiConfig));
};
