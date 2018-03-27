'use strict';

const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./../webpack/systemjs.config');
const systemjsTask = require('@telerik/kendo-common-tasks/systemjs-bundle/task');

module.exports = function registerBundleSystemJSTask(gulp, libraryName, options) {
     systemjsTask(gulp, {distName: libraryName, modules: options.modules, webpackConfig }, webpackStream, webpack );
}


